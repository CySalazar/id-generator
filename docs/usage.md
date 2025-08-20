# UUID Generator - User Guide

## Overview

The UUID Generator is a simple, fast, and secure web application for generating Universally Unique Identifiers (UUIDs). It works entirely in your browser without sending any data to external servers, ensuring complete privacy and security.

## What are UUIDs?

UUIDs (Universally Unique Identifiers) are 128-bit identifiers that are guaranteed to be unique across time and space. They are commonly used in:

- Database primary keys
- API request tracking
- File naming
- Session identifiers
- Distributed systems
- Software development

### UUID Format

UUIDs follow this format: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`

Example: `550e8400-e29b-41d4-a716-446655440000`

## Getting Started

### Accessing the Application

1. **Online**: Visit the hosted application URL
2. **Offline**: Download the files and open `index.html` in your browser
3. **Local Development**: Clone the repository and serve locally

### System Requirements

- **Browser**: Chrome 60+, Firefox 55+, Safari 12+, or Edge 79+
- **Internet**: Not required after initial load
- **Storage**: No local storage used

## Basic Usage

### Generating a Single UUID

1. Open the UUID Generator in your browser
2. The default setting generates 1 UUID
3. Click the **"Generate UUIDs"** button
4. Your UUID will appear in the results area

![Single UUID Generation](images/single-uuid.png)

### Generating Multiple UUIDs

1. Enter the desired number of UUIDs (1-10,000) in the input field
2. Click **"Generate UUIDs"**
3. All UUIDs will be displayed in the results area

![Multiple UUID Generation](images/multiple-uuids.png)

## Features

### 1. UUID Generation

#### Single UUID
- Generate one UUID at a time
- Instant generation
- Perfect for quick needs

#### Bulk Generation
- Generate up to 10,000 UUIDs at once
- Efficient batch processing
- Progress indication for large batches

### 2. Copy to Clipboard

#### How to Copy
1. Generate your UUIDs
2. Click the **copy icon** button (📋)
3. The UUIDs are now in your clipboard
4. Paste anywhere using `Ctrl+V` (Windows/Linux) or `Cmd+V` (Mac)

#### Copy Formats
- **Single UUID**: Copies the UUID directly
- **Multiple UUIDs**: Copies all UUIDs, one per line

#### Browser Compatibility
- **Modern browsers**: Uses the Clipboard API
- **Older browsers**: Falls back to text selection method
- **HTTPS required**: Some browsers require HTTPS for clipboard access

### 3. Export Options

Export your generated UUIDs in various formats for different use cases.

#### TXT Format
**Use case**: Simple text files, documentation, lists

**Format**:
```
550e8400-e29b-41d4-a716-446655440000
6ba7b810-9dad-11d1-80b4-00c04fd430c8
6ba7b811-9dad-11d1-80b4-00c04fd430c8
```

**How to export**:
1. Generate UUIDs
2. Click the **download icon** (⬇️)
3. Select **"Export as TXT"
4. File downloads as `uuids_YYYY-MM-DD-HH-MM-SS.txt`

#### CSV Format
**Use case**: Spreadsheets, databases, data analysis

**Format**:
```csv
UUID
550e8400-e29b-41d4-a716-446655440000
6ba7b810-9dad-11d1-80b4-00c04fd430c8
6ba7b811-9dad-11d1-80b4-00c04fd430c8
```

**How to export**:
1. Generate UUIDs
2. Click the **download icon** (⬇️)
3. Select **"Export as CSV"
4. File downloads as `uuids_YYYY-MM-DD-HH-MM-SS.csv`

**Import into Excel/Google Sheets**:
1. Open your spreadsheet application
2. Import the CSV file
3. UUIDs will appear in the first column

#### JSON Format
**Use case**: APIs, programming, data interchange

**Format**:
```json
{
  "generated_at": "2025-01-15T10:30:00.000Z",
  "count": 3,
  "uuids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "6ba7b811-9dad-11d1-80b4-00c04fd430c8"
  ]
}
```

**How to export**:
1. Generate UUIDs
2. Click the **download icon** (⬇️)
3. Select **"Export as JSON"
4. File downloads as `uuids_YYYY-MM-DD-HH-MM-SS.json`

## Advanced Usage

### Keyboard Shortcuts

- **Enter**: Generate UUIDs (when input field is focused)
- **Ctrl+A** / **Cmd+A**: Select all UUIDs in results area
- **Ctrl+C** / **Cmd+C**: Copy selected text

### Input Validation

The application automatically validates your input:

- **Minimum**: 1 UUID
- **Maximum**: 10,000 UUIDs
- **Invalid input**: Automatically corrected
- **Non-numeric input**: Ignored

### Performance Considerations

#### Generation Speed
- **1-100 UUIDs**: Instant
- **100-1,000 UUIDs**: < 1 second
- **1,000-10,000 UUIDs**: 1-5 seconds

#### Memory Usage
- **1,000 UUIDs**: ~50KB
- **10,000 UUIDs**: ~500KB
- **Browser limit**: Varies by browser and available memory

## Common Use Cases

### 1. Database Development

**Scenario**: Creating test data for a database

**Steps**:
1. Generate 100 UUIDs
2. Export as CSV
3. Import into your database tool
4. Use as primary keys for test records

### 2. API Development

**Scenario**: Creating unique request IDs

**Steps**:
1. Generate 10 UUIDs
2. Copy to clipboard
3. Use in API testing tools (Postman, curl)
4. Track requests with unique identifiers

### 3. File Management

**Scenario**: Creating unique file names

**Steps**:
1. Generate 1 UUID
2. Copy to clipboard
3. Use as part of filename: `document_550e8400-e29b-41d4-a716-446655440000.pdf`

### 4. Session Management

**Scenario**: Web application session IDs

**Steps**:
1. Generate UUIDs as needed
2. Export as JSON for programmatic use
3. Implement in your application

## Troubleshooting

### Common Issues

#### Copy to Clipboard Not Working

**Symptoms**: Copy button doesn't work or shows error

**Solutions**:
1. **Use HTTPS**: Some browsers require secure connection
2. **Update browser**: Ensure you're using a supported version
3. **Manual copy**: Select text and use Ctrl+C/Cmd+C
4. **Try different browser**: Test in Chrome, Firefox, or Safari

#### Large Generation Takes Too Long

**Symptoms**: Browser becomes unresponsive with large UUID counts

**Solutions**:
1. **Reduce quantity**: Try smaller batches (1,000-5,000)
2. **Close other tabs**: Free up browser memory
3. **Wait patiently**: Large generations may take a few seconds
4. **Refresh if stuck**: Reload the page and try again

#### Export Downloads Not Working

**Symptoms**: Export buttons don't trigger downloads

**Solutions**:
1. **Check browser settings**: Ensure downloads are allowed
2. **Disable popup blockers**: May interfere with downloads
3. **Try different format**: Test with TXT format first
4. **Clear browser cache**: Remove temporary files

#### Mobile Device Issues

**Symptoms**: App doesn't work properly on mobile

**Solutions**:
1. **Use landscape mode**: Better layout for mobile
2. **Update mobile browser**: Ensure latest version
3. **Try different mobile browser**: Chrome Mobile, Safari, Firefox
4. **Reduce UUID count**: Mobile devices have less memory

### Browser-Specific Issues

#### Safari
- **Clipboard API**: May require user interaction
- **Downloads**: Check Safari download settings
- **Private browsing**: Some features may be limited

#### Firefox
- **Clipboard permissions**: May prompt for permission
- **Large datasets**: May show slow script warning
- **Downloads**: Check download folder settings

#### Chrome
- **HTTPS requirement**: Clipboard API requires secure connection
- **Memory limits**: May limit very large generations
- **Extensions**: Ad blockers may interfere

#### Edge
- **Legacy Edge**: Use Chromium-based Edge
- **Enterprise settings**: Corporate policies may restrict features
- **Compatibility mode**: Ensure modern mode is enabled

## Privacy and Security

### Data Privacy

- **No data transmission**: Everything runs in your browser
- **No tracking**: No analytics or user tracking
- **No storage**: No data saved locally or remotely
- **No accounts**: No registration or login required

### Security Features

- **Client-side only**: No server-side processing
- **No external dependencies**: No third-party services
- **Open source**: Code is publicly auditable
- **No cookies**: No tracking cookies used

### UUID Security

- **Cryptographically random**: Uses secure random number generation
- **Collision resistant**: Extremely low probability of duplicates
- **Standard compliant**: Follows RFC 4122 specification
- **Version 4**: Uses random/pseudo-random numbers

## Accessibility

### Keyboard Navigation

- **Tab navigation**: Navigate through all interactive elements
- **Enter key**: Activate buttons and generate UUIDs
- **Arrow keys**: Navigate dropdown menus
- **Escape key**: Close dropdown menus

### Screen Reader Support

- **ARIA labels**: Descriptive labels for all controls
- **Semantic HTML**: Proper heading structure
- **Status announcements**: Results are announced
- **Error messages**: Clear error descriptions

### Visual Accessibility

- **High contrast**: Good color contrast ratios
- **Scalable text**: Respects browser zoom settings
- **Focus indicators**: Clear focus outlines
- **Color independence**: No color-only information

## Tips and Best Practices

### Performance Tips

1. **Batch generation**: Generate multiple UUIDs at once for efficiency
2. **Close other tabs**: Free up memory for large generations
3. **Use appropriate format**: Choose the right export format for your needs
4. **Regular cleanup**: Clear browser cache periodically

### Usage Tips

1. **Bookmark the page**: Quick access for frequent use
2. **Test with small batches**: Verify functionality before large generations
3. **Use descriptive filenames**: Rename exported files appropriately
4. **Keep backups**: Save important UUID lists

### Integration Tips

1. **Copy format**: UUIDs are copied one per line for easy parsing
2. **JSON structure**: Use the metadata in JSON exports
3. **Validation**: Always validate UUIDs in your applications
4. **Error handling**: Plan for generation failures in your workflow

## Frequently Asked Questions

### General Questions

**Q: Are the generated UUIDs truly unique?**
A: Yes, UUID v4 has an extremely low probability of collision (less than 1 in 2^122).

**Q: Can I use this offline?**
A: Yes, after the initial page load, no internet connection is required.

**Q: Is there a limit to how many UUIDs I can generate?**
A: The application limits generation to 10,000 UUIDs per batch for performance reasons.

**Q: Are my UUIDs sent to any server?**
A: No, everything runs in your browser. No data is transmitted anywhere.

### Technical Questions

**Q: What UUID version is generated?**
A: The application generates UUID version 4 (random UUIDs).

**Q: How random are the UUIDs?**
A: They use JavaScript's Math.random() which provides sufficient entropy for UUID v4.

**Q: Can I integrate this into my application?**
A: Yes, see the integration guide for details on using the code in your projects.

**Q: What browsers are supported?**
A: Modern browsers including Chrome 60+, Firefox 55+, Safari 12+, and Edge 79+.

### Troubleshooting Questions

**Q: Why isn't the copy button working?**
A: The clipboard API requires HTTPS in most browsers. Try using a secure connection.

**Q: Why is generation slow for large numbers?**
A: Generating thousands of UUIDs requires processing time. The app shows progress for large batches.

**Q: Can I generate more than 10,000 UUIDs?**
A: The current limit is 10,000 per batch. You can generate multiple batches if needed.

## Support

If you encounter issues or have questions:

1. **Check this documentation**: Most common issues are covered here
2. **Try different browser**: Test in Chrome, Firefox, or Safari
3. **Check browser console**: Look for error messages (F12 → Console)
4. **Report issues**: Create an issue on the GitHub repository
5. **Community support**: Check existing issues and discussions

## Version History

See the project's CHANGELOG.md for detailed version history and updates.