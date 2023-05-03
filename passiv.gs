const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.passiv.com/api/v1';

// Fetches account data from the Passiv API
function getAccounts() {
  const accountsUrl = `${BASE_URL}/accounts`;
  const options = {
    headers: {
      'Authorization': `Token ${API_KEY}`
    },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(accountsUrl, options);

  if (response.getResponseCode() === 200) {
    Logger.log(JSON.parse(response.getContentText()));
    return JSON.parse(response.getContentText());
  } else {
    Logger.log(`Error getting accounts. Response code: ${response.getResponseCode()}, response text: ${response.getContentText()}`);
    throw new Error(`Error getting accounts. Response code: ${response.getResponseCode()}`);
  }
}

// Fetches balance data for the specified account ID
function getBalances(accountId) {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/accounts/${accountId}/balances`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    Logger.log(JSON.parse(response.getContentText()));
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log(`Error getting balances for account ${accountId}: ${error}`);
    return [];
  }
}

// Fetches position data for the specified account ID
function getPositions(accountId) {
  try {
    const response = UrlFetchApp.fetch(`${BASE_URL}/accounts/${accountId}/positions`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    Logger.log(JSON.parse(response.getContentText()));
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log(`Error getting positions for account ${accountId}: ${error}`);
    return [];
  }
}

// Writes account data to the "Account Info" sheet
function writeToAccountSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Account Info");
  sheet.clear();
  //sheet.appendRow(['Brokerage Name', 'Account Number', 'Account Name', 'Cash Balance', 'Position Values']);

  data.forEach(row => {
    sheet.appendRow(row);
  });
}

// Writes holdings data to the "Holdings" sheet
function writeToHoldingsSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Holdings");
  sheet.clear();
  sheet.appendRow(['Account Number', 'Account Name', 'Symbol', 'Quantity', 'Current Price', 'Purchase Price', 'Market Value', 'Profit']);

  data.forEach(row => {
    sheet.appendRow(row);
  });
}

function main() {
  // Check if sheets exist, if not create them
  if (!SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Account Info")) {
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Account Info");
  }

  if (!SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Holdings")) {
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Holdings");
  }

  const accounts = getAccounts();
  const accountData = [];
  const holdingsData = [];

  // Initialize the header with fixed columns
  const accountInfoHeader = ['Brokerage Name', 'Account Number', 'Account Name'];
  const currencyCodes = new Set();

  accounts.forEach(account => {
    const accountId = account.id;
    const accountName = account.name;
    const brokerageName = account.institution_name;
    const accountNumber = account.number;
    const balances = getBalances(accountId);
    const positions = getPositions(accountId);

    // Collect all unique currency codes
    balances.forEach(balance => {
      currencyCodes.add(balance.currency.code);
    });

    // Create an object to store currency values for each account
    const currencyBalances = {};
    balances.forEach(balance => {
      currencyBalances[balance.currency.code] = balance.cash;
    });

    // Create an array for the account data row
    const accountDataRow = [
      brokerageName,
      accountNumber,
      accountName,
      ...Array.from(currencyCodes).map(code => currencyBalances[code] || 0)
    ];

    accountData.push(accountDataRow);

    positions.forEach(position => {
      holdingsData.push([
        accountNumber,
        accountName,
        position.symbol.symbol.symbol,
        position.units,
        position.price,
        position.average_purchase_price,
        position.units * position.price,
        position.units * (position.price - position.average_purchase_price),
      ]);
    });
  });

  // Update the header with currency codes
  accountInfoHeader.push(...Array.from(currencyCodes));

  writeToAccountSheet([accountInfoHeader, ...accountData]);
  writeToHoldingsSheet(holdingsData);
  // Inform the user that data has been loaded successfully
  // SpreadsheetApp.getUi().alert('Data has been loaded successfully.');
}

// Adds a custom menu to the spreadsheet UI when it is opened
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Passiv')
    .addItem('Load Data', 'main')
    .addToUi();
}
