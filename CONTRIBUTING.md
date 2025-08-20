# Contributing to UUID Generator

First off, thank you for considering contributing to UUID Generator! It's people like you that make UUID Generator such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for UUID Generator. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting A Bug Report**

- Check the [documentation](docs/) for a list of common questions and problems.
- Perform a [cursory search](https://github.com/username/uuid-generator/issues) to see if the problem has already been reported.

**How Do I Submit A (Good) Bug Report?**

Bugs are tracked as [GitHub issues](https://github.com/username/uuid-generator/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
- **Include details about your configuration and environment**:
  - Browser name and version
  - Operating system and version
  - Screen resolution
  - Any browser extensions that might interfere

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for UUID Generator, including completely new features and minor improvements to existing functionality.

**Before Submitting An Enhancement Suggestion**

- Check if the enhancement has already been suggested by searching [existing issues](https://github.com/username/uuid-generator/issues).
- Check if the feature already exists in the latest version.

**How Do I Submit A (Good) Enhancement Suggestion?**

Enhancement suggestions are tracked as [GitHub issues](https://github.com/username/uuid-generator/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of UUID Generator which the suggestion is related to.
- **Explain why this enhancement would be useful** to most UUID Generator users.
- **Specify which version of UUID Generator you're using.**

### Your First Code Contribution

Unsure where to begin contributing to UUID Generator? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues](https://github.com/username/uuid-generator/labels/beginner) - issues which should only require a few lines of code, and a test or two.
- [Help wanted issues](https://github.com/username/uuid-generator/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

### Pull Requests

The process described here has several goals:

- Maintain UUID Generator's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible UUID Generator
- Enable a sustainable system for UUID Generator's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies
  - 👕 `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript must adhere to the following style:

- Use 4 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use camelCase for variable and function names
- Use PascalCase for class names
- Use UPPER_SNAKE_CASE for constants
- Add JSDoc comments for all functions and classes
- Keep lines under 100 characters when possible
- Use meaningful variable and function names
- Prefer `const` and `let` over `var`
- Use arrow functions for short anonymous functions
- Use template literals for string interpolation

**Example:**

```javascript
/**
 * Generates a UUID v4 string
 * @returns {string} A valid UUID v4
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * UUID Generator class
 */
class UUIDGenerator {
    constructor() {
        this.generatedUUIDs = [];
        this.initializeElements();
    }
    
    /**
     * Initialize DOM elements and event listeners
     */
    initializeElements() {
        // Implementation here
    }
}
```

### CSS Styleguide

- Use 4 spaces for indentation
- Use kebab-case for class names
- Use meaningful class names that describe purpose, not appearance
- Group related properties together
- Use shorthand properties when possible
- Include vendor prefixes when necessary
- Use CSS custom properties (variables) for repeated values
- Keep selectors as simple as possible
- Avoid using `!important` unless absolutely necessary

**Example:**

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --border-radius: 8px;
    --transition-duration: 0.3s;
}

.uuid-generator {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.btn-primary {
    background-color: var(--primary-color);
    border: none;
    border-radius: var(--border-radius);
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    transition: background-color var(--transition-duration) ease;
}

.btn-primary:hover {
    background-color: #0056b3;
}
```

### HTML Styleguide

- Use 4 spaces for indentation
- Use semantic HTML5 elements
- Include proper meta tags
- Use meaningful `id` and `class` attributes
- Include `alt` attributes for images
- Use proper heading hierarchy (h1, h2, h3, etc.)
- Include ARIA attributes for accessibility
- Validate HTML using W3C validator

**Example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Generate UUID v4 identifiers quickly and easily">
    <title>UUID Generator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>UUID Generator</h1>
    </header>
    
    <main class="uuid-generator">
        <section class="generator-section" aria-label="UUID Generation">
            <div class="input-group">
                <label for="quantity">Number of UUIDs:</label>
                <input 
                    type="number" 
                    id="quantity" 
                    min="1" 
                    max="10000" 
                    value="1"
                    aria-describedby="quantity-help"
                >
                <small id="quantity-help">Enter a number between 1 and 10,000</small>
            </div>
        </section>
    </main>
</body>
</html>
```

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown/) for documentation
- Use clear, concise language
- Include code examples where appropriate
- Use proper heading hierarchy
- Include table of contents for long documents
- Use consistent formatting throughout
- Proofread for spelling and grammar

## Development Setup

### Prerequisites

- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Text editor or IDE (VS Code, Sublime Text, etc.)
- Git for version control
- Optional: Node.js for development tools

### Setting Up Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/uuid-generator.git
   cd uuid-generator
   ```

3. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes** following the style guidelines

5. **Test your changes** thoroughly:
   - Open `index.html` in multiple browsers
   - Test all functionality (generation, copy, export)
   - Test responsive design on different screen sizes
   - Test accessibility with keyboard navigation
   - Validate HTML, CSS, and JavaScript

6. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** on GitHub

### Testing

#### Manual Testing Checklist

- [ ] UUID generation works with different quantities (1, 10, 100, 1000, 10000)
- [ ] Copy to clipboard functionality works
- [ ] Export to TXT format works
- [ ] Export to CSV format works
- [ ] Export to JSON format works
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader compatibility (test with browser screen reader)
- [ ] Error handling works (invalid input, clipboard failures)
- [ ] Performance is acceptable for large batches

#### Browser Testing

Test in the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Accessibility Testing

- Use keyboard-only navigation
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Check color contrast ratios
- Verify ARIA labels and descriptions
- Test with browser zoom up to 200%

### Performance Guidelines

- Keep the total bundle size under 100KB
- Ensure UUID generation completes in under 1 second for 10,000 UUIDs
- Minimize DOM manipulations
- Use efficient algorithms and data structures
- Test performance on lower-end devices

### Security Guidelines

- Never send generated UUIDs to external servers
- Validate all user inputs
- Use Content Security Policy headers
- Avoid using `eval()` or similar dangerous functions
- Keep dependencies up to date (if any)
- Follow OWASP security guidelines

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

#### Type of Issue and Issue State

- `enhancement` - Feature requests
- `bug` - Confirmed bugs or reports that are very likely to be bugs
- `question` - Questions more than bug reports or feature requests
- `feedback` - General feedback more than bug reports or feature requests
- `help-wanted` - The UUID Generator core team would appreciate help from the community in resolving these issues
- `beginner` - Less complex issues which would be good first issues to work on for users who want to contribute to UUID Generator
- `more-information-needed` - More information needs to be collected about these problems or feature requests
- `needs-reproduction` - Likely bugs, but haven't been reliably reproduced
- `blocked` - Issues blocked on other issues
- `duplicate` - Issues which are duplicates of other issues
- `wontfix` - The UUID Generator core team has decided not to fix these issues for now
- `invalid` - Issues which aren't valid (e.g. user errors)

#### Topic Categories

- `windows` - Related to UUID Generator running on Windows
- `linux` - Related to UUID Generator running on Linux
- `mac` - Related to UUID Generator running on macOS
- `documentation` - Related to any type of documentation
- `performance` - Related to performance
- `security` - Related to security
- `ui` - Related to visual design and usability
- `api` - Related to UUID Generator's public APIs
- `crash` - Reports of UUID Generator completely crashing
- `network` - Related to network problems or working with remote files
- `git` - Related to Git functionality
- `accessibility` - Related to accessibility

## Recognition

Contributors who make significant contributions will be recognized in:

- The project README
- Release notes
- The project website (if applicable)

Thank you for contributing to UUID Generator! 🎉