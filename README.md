[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/latetedemelon) [![Donate](https://img.shields.io/badge/Donate-Buy%20Me%20a%20Coffee-yellow)](https://buymeacoffee.com/latetedemelon) [![Donate](https://img.shields.io/badge/Donate-Ko--Fi-ff69b4)](https://ko-fi.com/latetedemelon)
# passiv-to-gsheets

This Google Sheets Passiv Integration is a Google Apps Script that connects your Google Sheet to your Passiv account. It fetches your account and holdings data from the Passiv API and populates your Google Sheet with the fetched data.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [Donations](#donations)

## Features

- Fetch account and holdings data from the Passiv API
- Display account balances in multiple currencies
- Create separate sheets for account and holdings data

## Setup

1. Open a new Google Sheet.
2. Click on `Extensions` > `Apps Script`.
3. Delete the default `Code.gs` file.
4. Click on `File` > `New` > `Script` and name the file `passiv`.
5. Copy the entire script from the [Google Sheets Passiv Integration repository](https://github.com/latetedemelon/passiv-to-gsheets/blob/main/passiv.gs) and paste it into the `passiv.gs` file.
6. Replace the `API_KEY` constant with your Passiv API key.
7. Save the script by clicking on the floppy disk icon or pressing `Ctrl + S` (or `Cmd + S` on macOS).
8. Close the Apps Script editor.

## Usage

1. After setting up the script, go back to your Google Sheet and refresh the page via the browser.
2. Click on `Passiv` in the menu bar.
3. Click on `Load Data` to fetch account and holdings data from the Passiv API.
4. Two new sheets, `Account Info` and `Holdings`, will be created with the fetched data.

## Contributing

Contributions to the Google Sheets Passiv Integration project are welcome! If you have improvements, bug fixes, or new features you'd like to see added, please submit a Pull Request.

## Donations

If you find this integration helpful and would like to support its development, consider making a donation. Every little bit helps!

<a href='https://paypal.me/latetedemelon' target='_blank'><img src="https://github.com/stefan-niedermann/paypal-donate-button/blob/master/paypal-donate-button.png" width="270" height="105" alt='Donate via PayPal' />

<a href='https://ko-fi.com/latetedemelon' target='_blank'><img height='35' style='border:0px;height:46px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/latetedemelon)

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/latetedemelon/passiv-to-gsheets/blob/main/LICENSE) file for details.

Please update the links and usernames
