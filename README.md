# Checkout Autofill Chrome Extension

A powerful Chrome extension that automatically fills checkout and registration forms with realistic, randomized data. Perfect for testing, development, and demonstration purposes.

## 🚀 Features

- **Real-world Data**: Uses the RandomUser.me API to generate authentic-looking user data
- **Country-Specific**: Supports 22+ countries with localized names, addresses, and phone numbers
- **Dual Address Support**: Automatically fills both billing and shipping addresses
- **Smart Form Detection**: Automatically detects and fills common form fields
- **Customizable Options**: Toggle company names and additional information
- **Persistent Settings**: Remembers your preferences across sessions
- **WordPress/WooCommerce Optimized**: Specifically designed for e-commerce platforms

## 📋 Supported Countries

| Country | Code | Country | Code |
|---------|------|---------|------|
| Australia | AU | Ireland | IE |
| Brazil | BR | India | IN |
| Canada | CA | Iran | IR |
| Switzerland | CH | Mexico | MX |
| Germany | DE | Netherlands | NL |
| Denmark | DK | Norway | NO |
| Spain | ES | New Zealand | NZ |
| Finland | FI | Serbia | RS |
| France | FR | Turkey | TR |
| United Kingdom | GB | Ukraine | UA |
| United States | US | | |

## 🛠️ Installation

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/Asikur22/chrome-ext-checkout-autofill.git
   cd chrome-ext-checkout-autofill
   ```

2. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the `checkout-autofill` directory

3. **Pin the extension** (optional)
   - Click the puzzle piece icon in the Chrome toolbar
   - Find "Checkout Autofill" and click the pin icon

## 🎯 How to Use

1. **Navigate to a checkout or registration form**
2. **Click the Checkout Autofill extension icon** in your browser toolbar
3. **Configure your options**:
   - Select your preferred country for localized data
   - Toggle "Enable Company Name" to include a random company
   - Toggle "Enable Additional Info" to add delivery instructions
4. **Click "Autofill"** to populate the form instantly

### Supported Form Fields

The extension automatically detects and fills the following fields:

| Field Type | Billing Selectors | Shipping Selectors |
|------------|-------------------|-------------------|
| First Name | `input[name="billing_first_name"]` | `input[name="shipping_first_name"]` |
| Last Name | `input[name="billing_last_name"]` | `input[name="shipping_last_name"]` |
| Company | `input[name="billing_company"]` | `input[name="shipping_company"]` |
| Address | `input[name="billing_address_1"]` | `input[name="shipping_address_1"]` |
| City | `input[name="billing_city"]` | `input[name="shipping_city"]` |
| Postal Code | `input[name="billing_postcode"]` | `input[name="shipping_postcode"]` |
| Phone | `input[name="billing_phone"]` | N/A |
| Email | `input[name="billing_email"]` | N/A |
| Country | `select[name="billing_country"]` | `select[name="shipping_country"]` |
| State | `select[name="billing_state"]` | `select[name="shipping_state"]` |
| Comments | `#order_comments`, `textarea[name*="comment"]` | N/A |

### Additional Generic Field Support

The extension also attempts to fill common non-prefixed fields:
- `input[name="first_name"]`
- `input[name="last_name"]`
- `input[type="email"]` (if empty)
- `input[type="tel"]` (if empty)

## 🔧 Configuration

### Extension Options

- **Country Selection**: Choose from 22+ supported countries
- **Company Name**: Toggle to include/exclude random company names
- **Additional Info**: Toggle to add delivery instructions or comments

### Data Sources

The extension uses the [RandomUser.me API](https://randomuser.me/) to generate:
- Realistic names (localized by country)
- Authentic addresses and postal codes
- Valid phone number formats
- Random email addresses

## 🎨 Customization

### Adding Custom Companies

Edit the `companyNameOptions` array in `assets/scripts/popup.js`:

```javascript
const companyNameOptions = [
    "Your Company Inc.",
    "Custom Corp.",
    "Demo Ltd.",
    // Add your custom company names here
];
```

### Adding Custom Additional Info

Edit the `additionalInfoOptions` array in `assets/scripts/popup.js`:

```javascript
const additionalInfoOptions = [
    "Your custom message here.",
    "Another delivery instruction.",
    // Add your custom messages here
];
```

## 🔒 Privacy & Security

- **No Data Storage**: The extension doesn't store any personal data
- **Local Settings Only**: Only your preferences are saved locally in Chrome storage
- **Secure API**: All external requests use HTTPS
- **Minimal Permissions**: Only requests access to the active tab

## 🐛 Troubleshooting

### Common Issues

**Form not filling completely?**
- Check if the form uses standard field names
- Some custom forms may not be automatically detected
- Verify that both billing and shipping sections exist on the page

**Extension not working on certain sites?**
- Some sites may block script injection
- Try refreshing the page and clicking the extension again

**Getting incorrect country data?**
- Ensure you've selected the correct country in the dropdown
- Some countries may have limited data availability

**Shipping fields not filling?**
- Make sure the shipping address section is visible on the page
- Some sites show shipping fields only after billing is filled
- Try clicking "Ship to different address" if available

### Debug Mode

To enable debug logging:
1. Open Chrome DevTools (F12) on the target page
2. Check the Console tab for detailed logging
3. Look for "Filled user data:" messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test the extension locally
5. Submit a pull request

### Code Style

- Use modern JavaScript (ES6+)
- Follow the existing code formatting
- Add comments for complex logic
- Test your changes thoroughly

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. **Check the troubleshooting section** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with:
   - Description of the problem
   - Steps to reproduce
   - Browser version and OS
   - Screenshots if applicable

## 🔄 Changelog

### Version 1.6
- **NEW**: Added support for shipping address fields
- Improved form field detection with helper functions
- Enhanced compatibility with dual-address checkout forms
- Added support for generic field selectors

### Version 1.5
- Added support for 22 countries
- Improved form field detection
- Enhanced UI with toggle switches
- Added persistent settings storage

### Version 1.4
- Initial release with basic autofill functionality
- Support for WordPress/WooCommerce forms

## 🌟 Acknowledgments

- [RandomUser.me](https://randomuser.me/) for providing realistic user data API
- Chrome Extensions documentation and community
- All contributors and users who help improve this extension

---

**Made with ❤️ for developers and testers everywhere**

## 👤 Author

**Asiqur Rahman**
- Email: asiq.webdev@gmail.com
- GitHub: [Asikur22](https://github.com/Asikur22)
