/**
 * Multi-ID Generator Application
 * Generates various types of identifiers with copy and export functionality
 */

class IDGenerator {
    constructor() {
        this.generatedIDs = [];
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.updateConfigOptions();
        this.updateInfoSection(); // Update info section based on selected type
        this.generateSingleID(); // Generate initial ID
    }

    initializeElements() {
        this.typeSelect = document.getElementById('type');
        this.countInput = document.getElementById('count');
        this.generateBtn = document.getElementById('generateBtn');
        this.generateBtnText = this.generateBtn ? this.generateBtn.querySelector('.btn-text') : null;
        this.outputArea = document.getElementById('outputArea');
        this.copyBtn = document.getElementById('copyBtn');
        this.exportSelect = document.getElementById('exportSelect');
        this.exportBtn = document.getElementById('exportBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.statsElement = document.getElementById('stats');
        
        // Configuration elements
        this.configOptions = document.getElementById('configOptions');
        this.uppercaseCheck = document.getElementById('uppercase');
        this.lowercaseCheck = document.getElementById('lowercase');
        this.numbersCheck = document.getElementById('numbers');
        this.symbolsCheck = document.getElementById('symbols');
        this.lengthSlider = document.getElementById('lengthSlider');
        this.lengthValue = document.getElementById('lengthValue');
        

        
        // Info elements
        this.infoTitle = document.getElementById('infoTitle');
        this.definitionTitle = document.getElementById('definitionTitle');
        this.definitionText = document.getElementById('definitionText');
        this.exampleCode = document.getElementById('exampleCode');
        
        // Validate critical elements only
        const criticalElements = ['typeSelect', 'countInput', 'generateBtn'];
        
        for (const elementName of criticalElements) {
            if (!this[elementName]) {
                console.error(`Critical element not found: ${elementName}`);
                return;
            }
        }
        
        // Log warnings for optional elements
        const optionalElements = {
            'outputArea': this.outputArea,
            'copyBtn': this.copyBtn,
            'exportBtn': this.exportBtn,
            'clearBtn': this.clearBtn,
            'exportSelect': this.exportSelect,
            'statsElement': this.statsElement
        };
        
        for (const [name, element] of Object.entries(optionalElements)) {
            if (!element) {
                console.warn(`Optional element not found: ${name}`);
            }
        }
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateIDs());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.exportBtn.addEventListener('click', () => this.exportData());
        this.clearBtn.addEventListener('click', () => this.clearResults());
        
        // Type selection change
        this.typeSelect.addEventListener('change', () => {
            this.updateConfigOptions();
            this.updateInfoSection();
            this.updateButtonText();
            this.generateSingleID(); // Live update on type change
            this.saveSettings();
        });
        
        // Configuration changes
        [this.uppercaseCheck, this.lowercaseCheck, this.numbersCheck, this.symbolsCheck].forEach(checkbox => {
            if (checkbox) {
                const checkboxGroup = checkbox.closest('.checkbox-group');
                
                // Set initial state
                if (checkbox.checked && checkboxGroup) {
                    checkboxGroup.classList.add('checked');
                }
                
                checkbox.addEventListener('change', () => {
                    // Update visual state
                    if (checkboxGroup) {
                        if (checkbox.checked) {
                            checkboxGroup.classList.add('checked');
                        } else {
                            checkboxGroup.classList.remove('checked');
                        }
                    }
                    
                    this.validateCharacterConfig();
                    this.generateSingleID(); // Live update on config change
                    this.saveSettings();
                });
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.generateIDs();
                        break;
                    case 'c':
                        if (this.generatedIDs.length > 0) {
                            e.preventDefault();
                            this.copyToClipboard();
                        }
                        break;
                }
            }
        });
        
        // Input validation
        this.countInput.addEventListener('input', () => this.validateInput());
        
        // Length slider event
        if (this.lengthSlider) {
            this.lengthSlider.addEventListener('input', () => {
                // Update length value display
                if (this.lengthValue) {
                    this.lengthValue.textContent = this.lengthSlider.value;
                }
                this.generateSingleID(); // Live update on length change
                this.saveSettings();
            });
        }
        if (this.exportSelect) {
            this.exportSelect.addEventListener('change', () => this.saveSettings());
        }
    }

    updateConfigOptions() {
        const selectedType = this.typeSelect.value;
        
        switch(selectedType) {
            case 'uuid':
                this.configOptions.classList.add('disabled');
                break;
            case 'nanoid':
            case 'slug':
                this.configOptions.classList.remove('disabled');
                document.getElementById('lengthConfig').style.display = 'block';
                break;
            case 'hashids':
                this.configOptions.classList.remove('disabled');
                document.getElementById('lengthConfig').style.display = 'none';
                break;
        }
    }
    
    updateButtonText() {
        const typeMap = {
            'uuid': 'Generate UUID',
            'nanoid': 'Generate NanoID',
            'hashids': 'Generate HashIDs',
            'slug': 'Generate Slug'
        };
        if (this.generateBtnText) {
            this.generateBtnText.textContent = typeMap[this.typeSelect.value] || 'Generate ID';
        }
    }
    
    updateInfoSection() {
        const type = this.typeSelect.value;
        const infoData = {
            uuid: {
                title: '📚 What are UUIDs?',
                definition: '<strong>UUID (Universally Unique Identifier)</strong> are 128-bit unique identifiers used to identify information in computer systems. They are designed to be globally unique without requiring a central coordinating authority.',
                example: '550e8400-e29b-41d4-a716-446655440000',
                structure: '<h3>🏗️ Structure</h3><p>A UUID is typically represented as a string of 32 hexadecimal characters, divided into five groups separated by hyphens:</p><code class="uuid-example">xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code><p>Where M indicates the version and N indicates the variant of the UUID.</p>',
                history: '<h3>📚 History and Evolution</h3><p>UUIDs were first introduced in the 1980s as part of the Apollo Network Computing System (NCS) operating system. They were subsequently standardized in:</p><ul><li><strong>1987</strong>: First implementation in Apollo NCS</li><li><strong>1997</strong>: RFC 4122 - Official IETF standard</li><li><strong>2005</strong>: RFC 4122 update</li><li><strong>2022</strong>: RFC 9562 - New versions and improvements</li></ul>',
                versions: '<h3>🔢 UUID Versions</h3><div class="versions-grid"><div class="version-item"><strong>Version 1</strong><p>Based on timestamp and MAC address</p></div><div class="version-item"><strong>Version 2</strong><p>Similar to v1 but with DCE security</p></div><div class="version-item"><strong>Version 3</strong><p>Based on MD5 hash of a namespace</p></div><div class="version-item"><strong>Version 4</strong><p>Completely random (the one generated here)</p></div><div class="version-item"><strong>Version 5</strong><p>Based on SHA-1 hash of a namespace</p></div><div class="version-item"><strong>Versions 6-8</strong><p>New versions introduced in 2022</p></div></div>',
                useCases: '<h3>🎯 Main Uses</h3><div class="use-cases"><div class="use-case"><h4>💾 Database</h4><p>Unique primary keys without central coordination</p></div><div class="use-case"><h4>🌐 Web Development</h4><p>Session identifiers, tokens, transaction IDs</p></div><div class="use-case"><h4>📱 Mobile Apps</h4><p>Device identifiers, offline synchronization</p></div><div class="use-case"><h4>☁️ Cloud Computing</h4><p>Resource identifiers, microservices, containers</p></div><div class="use-case"><h4>🔐 Security</h4><p>Authentication tokens, cryptographic nonces</p></div><div class="use-case"><h4>📊 Analytics</h4><p>Event tracking, anonymous user identifiers</p></div></div>',
                advantages: '<h3>✅ Advantages</h3><ul class="advantages"><li><strong>Global Uniqueness</strong>: No coordination needed between systems</li><li><strong>Scalability</strong>: Distributed generation without conflicts</li><li><strong>Portability</strong>: Universal standard supported everywhere</li><li><strong>Security</strong>: Difficult to guess (version 4)</li><li><strong>Performance</strong>: Fast and efficient generation</li></ul>',
                considerations: '<h3>⚠️ Considerations</h3><ul class="considerations"><li><strong>Size</strong>: 128 bits may be excessive for some cases</li><li><strong>Readability</strong>: Not human-friendly like sequential IDs</li><li><strong>Ordering</strong>: UUID v4 don\'t maintain temporal order</li><li><strong>Storage</strong>: Take up more space than numeric IDs</li></ul>',
                statistics: '<h3>🔬 Collision Probability</h3><p>The probability of generating two identical UUID v4s is incredibly low:</p><div class="probability-stats"><div class="stat"><strong>1 in 5.3 × 10³⁶</strong><span>Collision probability for single UUID</span></div><div class="stat"><strong>1 billion UUIDs/second</strong><span>For 85 years = 0.00000001% collision probability</span></div></div>'
            },
            nanoid: {
                title: '🔗 What are NanoIDs?',
                definition: '<strong>NanoID</strong> are URL-safe unique identifiers, smaller than UUIDs but equally secure. They use a customizable alphabet and are optimized for modern web applications.',
                example: 'V1StGXR8_Z5jdHi6B-myT',
                structure: '<h3>🏗️ Structure</h3><p>NanoIDs are composed of URL-safe characters from a customizable alphabet. The default alphabet includes:</p><code class="uuid-example">A-Za-z0-9_-</code><p>You can customize which character types to include using the checkboxes above.</p>',
                history: '<h3>📚 History and Development</h3><p>NanoID was created by Andrey Sitnik in 2017 as a modern alternative to UUIDs:</p><ul><li><strong>2017</strong>: Initial release as open-source project</li><li><strong>2018</strong>: Gained popularity in JavaScript ecosystem</li><li><strong>2019</strong>: Ported to multiple programming languages</li><li><strong>2020+</strong>: Widely adopted in modern web applications</li></ul>',
                versions: '<h3>🔧 Customization Options</h3><div class="versions-grid"><div class="version-item"><strong>Alphabet</strong><p>Customizable character set (A-Z, a-z, 0-9, symbols)</p></div><div class="version-item"><strong>Length</strong><p>Configurable length (default: 21 characters)</p></div><div class="version-item"><strong>URL-Safe</strong><p>No special characters that need URL encoding</p></div><div class="version-item"><strong>Collision-Resistant</strong><p>Cryptographically strong random generation</p></div></div>',
                useCases: '<h3>🎯 Main Uses</h3><div class="use-cases"><div class="use-case"><h4>🌐 Web URLs</h4><p>Short, URL-safe identifiers for web resources</p></div><div class="use-case"><h4>📱 Mobile Apps</h4><p>Compact IDs for mobile applications</p></div><div class="use-case"><h4>🔗 API Keys</h4><p>Short API tokens and session identifiers</p></div><div class="use-case"><h4>📊 Analytics</h4><p>Tracking IDs and event identifiers</p></div><div class="use-case"><h4>🎮 Gaming</h4><p>Player IDs, game session tokens</p></div><div class="use-case"><h4>💬 Chat Apps</h4><p>Message IDs, room identifiers</p></div></div>',
                advantages: '<h3>✅ Advantages</h3><ul class="advantages"><li><strong>Compact Size</strong>: Smaller than UUIDs (21 vs 36 characters)</li><li><strong>URL-Safe</strong>: No special encoding needed for URLs</li><li><strong>Customizable</strong>: Configurable alphabet and length</li><li><strong>Fast Generation</strong>: Optimized for performance</li><li><strong>Collision-Resistant</strong>: Cryptographically secure</li></ul>',
                considerations: '<h3>⚠️ Considerations</h3><ul class="considerations"><li><strong>Not Standard</strong>: Not an official standard like UUID</li><li><strong>Language Support</strong>: May need libraries for some languages</li><li><strong>Alphabet Dependency</strong>: Security depends on alphabet size</li><li><strong>Length Trade-off</strong>: Shorter length = higher collision probability</li></ul>',
                statistics: '<h3>🔬 Collision Probability</h3><p>NanoID collision probability depends on alphabet size and length:</p><div class="probability-stats"><div class="stat"><strong>21 characters</strong><span>Default length with 64-character alphabet</span></div><div class="stat"><strong>~126 years</strong><span>To have 1% probability of collision at 1000 IDs/hour</span></div></div>'
            },
            hashids: {
                title: '🔢 What are HashIDs?',
                definition: '<strong>HashIDs</strong> are identifiers that encode integers into short and unique strings. They are ideal for hiding numeric database IDs while maintaining reversibility.',
                example: 'jR7bqn',
                structure: '<h3>🏗️ Structure</h3><p>HashIDs encode integers using a custom alphabet. The encoding is deterministic and reversible:</p><code class="uuid-example">123 → jR7bqn → 123</code><p>The alphabet can be customized to include different character types.</p>',
                history: '<h3>📚 History and Development</h3><p>HashIDs was created by Ivan Akimov in 2013 to solve the problem of exposing database IDs:</p><ul><li><strong>2013</strong>: Initial release for JavaScript</li><li><strong>2014</strong>: Ported to multiple programming languages</li><li><strong>2015+</strong>: Widely adopted for URL shortening</li><li><strong>2020+</strong>: Enhanced with better algorithms</li></ul>',
                versions: '<h3>🔧 Configuration Options</h3><div class="versions-grid"><div class="version-item"><strong>Alphabet</strong><p>Customizable character set for encoding</p></div><div class="version-item"><strong>Salt</strong><p>Secret salt for additional security</p></div><div class="version-item"><strong>Min Length</strong><p>Minimum length for generated IDs</p></div><div class="version-item"><strong>Reversible</strong><p>Can decode back to original number</p></div></div>',
                useCases: '<h3>🎯 Main Uses</h3><div class="use-cases"><div class="use-case"><h4>🔗 URL Shortening</h4><p>Convert long URLs to short, shareable links</p></div><div class="use-case"><h4>💾 Database IDs</h4><p>Hide sequential database primary keys</p></div><div class="use-case"><h4>📊 Analytics</h4><p>Obfuscate numeric tracking IDs</p></div><div class="use-case"><h4>🎫 Tickets</h4><p>Generate short ticket or order numbers</p></div><div class="use-case"><h4>📱 Invites</h4><p>Create short invitation codes</p></div><div class="use-case"><h4>🎮 Gaming</h4><p>Player ranks, game room codes</p></div></div>',
                advantages: '<h3>✅ Advantages</h3><ul class="advantages"><li><strong>Reversible</strong>: Can decode back to original number</li><li><strong>Short Length</strong>: Generates compact identifiers</li><li><strong>Obfuscation</strong>: Hides sequential patterns</li><li><strong>Customizable</strong>: Configurable alphabet and salt</li><li><strong>Deterministic</strong>: Same input always produces same output</li></ul>',
                considerations: '<h3>⚠️ Considerations</h3><ul class="considerations"><li><strong>Not Cryptographically Secure</strong>: Can be reverse-engineered</li><li><strong>Predictable</strong>: Sequential inputs produce related outputs</li><li><strong>Salt Dependency</strong>: Security relies on keeping salt secret</li><li><strong>Limited Input</strong>: Only works with positive integers</li></ul>',
                statistics: '<h3>🔬 Performance Stats</h3><p>HashIDs performance characteristics:</p><div class="probability-stats"><div class="stat"><strong>Deterministic</strong><span>Same number always produces same HashID</span></div><div class="stat"><strong>Fast Encoding</strong><span>Optimized algorithms for quick generation</span></div></div>'
            },
            slug: {
                title: '📝 What are Slugs?',
                definition: '<strong>Slugs</strong> are human-readable identifiers, typically used in URLs. They are composed of alphanumeric characters and hyphens, optimized for SEO and usability.',
                example: 'article-example-2024',
                structure: '<h3>🏗️ Structure</h3><p>Slugs are composed of readable words connected by separators:</p><code class="uuid-example">word1-word2-number</code><p>Character configuration affects case, numbers, and separator type (_ vs -).</p>',
                history: '<h3>📚 History and Usage</h3><p>Slugs have been used since the early days of the web for creating user-friendly URLs:</p><ul><li><strong>1990s</strong>: Early web servers used file-based URLs</li><li><strong>2000s</strong>: CMS systems popularized slug-based URLs</li><li><strong>2005+</strong>: SEO benefits drove widespread adoption</li><li><strong>2010+</strong>: Modern frameworks made slugs standard</li></ul>',
                versions: '<h3>🔧 Customization Options</h3><div class="versions-grid"><div class="version-item"><strong>Case Style</strong><p>Uppercase, lowercase, or mixed case</p></div><div class="version-item"><strong>Separators</strong><p>Hyphens (-) or underscores (_)</p></div><div class="version-item"><strong>Numbers</strong><p>Optional numeric suffixes</p></div><div class="version-item"><strong>Length</strong><p>Configurable maximum length</p></div></div>',
                useCases: '<h3>🎯 Main Uses</h3><div class="use-cases"><div class="use-case"><h4>🌐 URLs</h4><p>SEO-friendly web page addresses</p></div><div class="use-case"><h4>📝 Blog Posts</h4><p>Article and blog post identifiers</p></div><div class="use-case"><h4>🛍️ E-commerce</h4><p>Product page URLs and categories</p></div><div class="use-case"><h4>📚 Documentation</h4><p>Section and page identifiers</p></div><div class="use-case"><h4>🎬 Media</h4><p>Video, image, and file identifiers</p></div><div class="use-case"><h4>👥 User Profiles</h4><p>Human-readable profile URLs</p></div></div>',
                advantages: '<h3>✅ Advantages</h3><ul class="advantages"><li><strong>SEO-Friendly</strong>: Search engines prefer readable URLs</li><li><strong>Human-Readable</strong>: Easy to understand and remember</li><li><strong>Shareable</strong>: Clean URLs are more likely to be shared</li><li><strong>Accessible</strong>: Screen readers can pronounce them</li><li><strong>Brandable</strong>: Can include brand or topic keywords</li></ul>',
                considerations: '<h3>⚠️ Considerations</h3><ul class="considerations"><li><strong>Not Unique</strong>: May need additional identifiers for uniqueness</li><li><strong>Language Dependent</strong>: Works best with Latin characters</li><li><strong>Length Limits</strong>: URLs have practical length constraints</li><li><strong>Special Characters</strong>: Limited character set for URL safety</li></ul>',
                statistics: '<h3>🔬 SEO Impact</h3><p>Slugs provide measurable SEO benefits:</p><div class="probability-stats"><div class="stat"><strong>15-20%</strong><span>Average improvement in click-through rates</span></div><div class="stat"><strong>Better Rankings</strong><span>Search engines favor descriptive URLs</span></div></div>'
            }
        };
        
        const info = infoData[type];
        if (info) {
            this.infoTitle.textContent = info.title;
            this.definitionText.innerHTML = info.definition;
            this.exampleCode.textContent = info.example;
            
            // Update dynamic content blocks
            document.getElementById('structureBlock').innerHTML = info.structure;
            document.getElementById('historyBlock').innerHTML = info.history;
            document.getElementById('versionsBlock').innerHTML = info.versions;
            document.getElementById('useCasesBlock').innerHTML = info.useCases;
            document.getElementById('advantagesBlock').innerHTML = info.advantages;
            document.getElementById('considerationsBlock').innerHTML = info.considerations;
            document.getElementById('statisticsBlock').innerHTML = info.statistics;
        }
    }
    
    validateCharacterConfig() {
        const hasSelection = this.uppercaseCheck.checked || 
                           this.lowercaseCheck.checked || 
                           this.numbersCheck.checked || 
                           this.symbolsCheck.checked;
        
        if (!hasSelection) {
            this.showNotification('Select at least one character type', 'error');
            // Ensure at least one option is selected
            this.lowercaseCheck.checked = true;
            return false;
        }
        return true;
    }
    
    validateInput() {
        const count = parseInt(this.countInput.value);
        const isValid = count >= 1 && count <= 10000;
        
        this.generateBtn.disabled = !isValid;
        
        if (!isValid && this.countInput.value !== '') {
            this.countInput.style.borderColor = '#dc3545';
        } else {
            this.countInput.style.borderColor = '';
        }
    }

    /**
     * Generates a single UUID v4
     * @returns {string} UUID v4 string
     */
    generateUUID() {
        // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Generates a single ID for live preview
     */
    generateSingleID() {
        const type = this.typeSelect ? this.typeSelect.value : 'uuid';
        
        let id;
        switch (type) {
            case 'nanoid':
                id = this.generateNanoID();
                break;
            case 'hashids':
                id = this.generateHashID(1);
                break;
            case 'slug':
                id = this.generateSlug();
                break;
            default:
                id = this.generateUUID();
        }
        
        this.generatedIDs = [id];
        this.displayResults();
    }

    /**
     * Generates multiple IDs based on user input and selected type
     */
    generateIDs() {
        const count = parseInt(this.countInput.value) || 1;
        const type = this.typeSelect.value;
        
        if (count < 1 || count > 10000) {
            this.showError('Enter a number between 1 and 10,000');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Use setTimeout to allow UI to update before heavy computation
        setTimeout(() => {
            try {
                this.generatedIDs = [];
                
                for (let i = 0; i < count; i++) {
                    let id;
                    switch(type) {
                        case 'uuid':
                            id = this.generateUUID();
                            break;
                        case 'nanoid':
                            id = this.generateNanoID();
                            break;
                        case 'hashids':
                            id = this.generateHashID(i + 1);
                            break;
                        case 'slug':
                            id = this.generateSlug();
                            break;
                        default:
                            id = this.generateUUID();
                    }
                    this.generatedIDs.push(id);
                }

                this.displayResults();
                this.setLoadingState(false);
            } catch (error) {
                console.error('Error generating IDs:', error);
                this.showError('An error occurred while generating IDs');
                this.setLoadingState(false);
            }
        }, 10);
    }

    /**
     * Generates a NanoID with custom configuration
     * @returns {string} NanoID string
     */
    generateNanoID() {
        const length = parseInt(this.lengthSlider.value) || 21;
        let alphabet = '';
        
        if (this.uppercaseCheck && this.uppercaseCheck.checked) alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.lowercaseCheck && this.lowercaseCheck.checked) alphabet += 'abcdefghijklmnopqrstuvwxyz';
        if (this.numbersCheck && this.numbersCheck.checked) alphabet += '0123456789';
        if (this.symbolsCheck && this.symbolsCheck.checked) alphabet += '-_.~!*()[]{}|:;@#$%^&+=?';
        
        if (!alphabet) alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return result;
    }

    /**
     * Generates a HashID from a number
     * @param {number} number - Number to encode
     * @returns {string} HashID string
     */
    generateHashID(number) {
        let alphabet = '';
        
        if (this.uppercaseCheck && this.uppercaseCheck.checked) alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.lowercaseCheck && this.lowercaseCheck.checked) alphabet += 'abcdefghijklmnopqrstuvwxyz';
        if (this.numbersCheck && this.numbersCheck.checked) alphabet += '0123456789';
        if (this.symbolsCheck && this.symbolsCheck.checked) alphabet += '-_';
        
        if (!alphabet) alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        
        const salt = 'this is my salt';
        const desiredLength = parseInt(this.lengthSlider?.value) || 8;
        
        // Simple HashID implementation
        let hash = '';
        let num = number;
        const alphabetLength = alphabet.length;
        
        do {
            hash = alphabet[num % alphabetLength] + hash;
            num = Math.floor(num / alphabetLength);
        } while (num > 0);
        
        // Add salt-based padding to reach desired length
        while (hash.length < desiredLength) {
            const saltIndex = (hash.length + salt.charCodeAt(hash.length % salt.length)) % alphabetLength;
            hash = alphabet[saltIndex] + hash;
        }
        
        // Trim if too long
        if (hash.length > desiredLength) {
            hash = hash.substring(0, desiredLength);
        }
        
        return hash;
    }

    /**
     * Generates a URL-friendly slug
     * @returns {string} Slug string
     */
    generateSlug() {
        const targetLength = parseInt(this.lengthSlider.value) || 12;
        const words = [
            'awesome', 'brilliant', 'creative', 'dynamic', 'elegant', 'fantastic',
            'gorgeous', 'incredible', 'amazing', 'beautiful', 'wonderful', 'perfect',
            'project', 'article', 'post', 'content', 'story', 'guide', 'tutorial',
            'example', 'sample', 'demo', 'test', 'new', 'latest', 'modern', 'fresh'
        ];
        
        // Determine separator based on symbols checkbox
        const separator = (this.symbolsCheck && this.symbolsCheck.checked) ? '_' : '-';
        
        // Build character set for padding
        let charset = '';
        if (this.uppercaseCheck && this.uppercaseCheck.checked) {
            charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (this.lowercaseCheck && this.lowercaseCheck.checked) {
            charset += 'abcdefghijklmnopqrstuvwxyz';
        }
        if (this.numbersCheck && this.numbersCheck.checked) {
            charset += '0123456789';
        }
        if (this.symbolsCheck && this.symbolsCheck.checked) {
            charset += '_-';
        }
        
        // If no charset is selected, default to lowercase
        if (!charset) {
            charset = 'abcdefghijklmnopqrstuvwxyz';
        }
        
        let slug = '';
        
        // Start with a word
        let word = words[Math.floor(Math.random() * words.length)];
        
        // Apply character configuration to the word
        if (this.uppercaseCheck && this.uppercaseCheck.checked) {
            word = word.toUpperCase();
        } else if (this.lowercaseCheck && this.lowercaseCheck.checked) {
            word = word.toLowerCase();
        }
        
        slug = word;
        
        // Add separators and more content to reach target length
        while (slug.length < targetLength) {
            const remainingLength = targetLength - slug.length;
            
            if (remainingLength === 1) {
                // Add a single character
                slug += charset[Math.floor(Math.random() * charset.length)];
            } else if (remainingLength >= 2) {
                // Add separator and more content
                slug += separator;
                
                if (remainingLength >= 3) {
                    // Try to add another word or random characters
                    const nextWord = words[Math.floor(Math.random() * words.length)];
                    let processedWord = nextWord;
                    
                    // Apply character configuration
                    if (this.uppercaseCheck && this.uppercaseCheck.checked) {
                        processedWord = processedWord.toUpperCase();
                    } else if (this.lowercaseCheck && this.lowercaseCheck.checked) {
                        processedWord = processedWord.toLowerCase();
                    }
                    
                    if (slug.length + processedWord.length <= targetLength) {
                        slug += processedWord;
                    } else {
                        // Fill remaining space with random characters
                        const remaining = targetLength - slug.length;
                        for (let i = 0; i < remaining; i++) {
                            slug += charset[Math.floor(Math.random() * charset.length)];
                        }
                    }
                } else {
                    // Only one character left after separator
                    slug += charset[Math.floor(Math.random() * charset.length)];
                }
            }
        }
        
        // Ensure exact length
        if (slug.length > targetLength) {
            slug = slug.substring(0, targetLength);
        }
        
        return slug;
    }

    /**
     * Displays the generated IDs in the results section
     */
    displayResults() {
        if (this.generatedIDs.length === 0) {
            if (this.outputArea) this.outputArea.style.display = 'none';
            return;
        }

        if (this.outputArea) {
            this.outputArea.value = this.generatedIDs.join('\n');
            this.outputArea.style.display = 'block';
        }
        
        // Show action buttons
        if (this.copyBtn) this.copyBtn.style.display = 'inline-flex';
        if (this.exportBtn) this.exportBtn.style.display = 'inline-flex';
        if (this.clearBtn) this.clearBtn.style.display = 'inline-flex';
        
        // Update stats
        if (this.statsElement) {
            const typeName = this.getTypeName(this.typeSelect.value);
            this.statsElement.textContent = `${this.generatedIDs.length} ${typeName}${this.generatedIDs.length !== 1 ? 's' : ''} generated`;
        }
        
        // Scroll to results
        if (this.outputArea) {
            this.outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Copies IDs to clipboard
     */
    async copyToClipboard() {
        if (this.generatedIDs.length === 0) {
            this.showNotification('No IDs to copy', 'warning');
            return;
        }

        try {
            const text = this.generatedIDs.join('\n');
            await navigator.clipboard.writeText(text);
            const typeName = this.typeSelect ? this.getTypeName(this.typeSelect.value) : 'ID';
            this.showNotification(`${typeName} copied to clipboard!`, 'success');
            if (this.copyBtn) this.animateButton(this.copyBtn);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            // Fallback for older browsers
            this.fallbackCopyToClipboard();
        }
    }

    /**
     * Fallback copy method for older browsers
     */
    fallbackCopyToClipboard() {
        this.resultsTextarea.select();
        this.resultsTextarea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (error) {
            console.error('Fallback copy failed:', error);
            this.showError('Failed to copy to clipboard');
        }
    }

    /**
     * Shows copy success feedback
     */
    showCopySuccess() {
        const originalClass = this.copyBtn.className;
        const originalHTML = this.copyBtn.innerHTML;
        
        this.copyBtn.className = originalClass.replace('btn-secondary', 'btn-success');
        this.copyBtn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20,6 9,17 4,12"/>
            </svg>
        `;
        
        setTimeout(() => {
            this.copyBtn.className = originalClass;
            this.copyBtn.innerHTML = originalHTML;
        }, 2000);
    }

    /**
     * Exports IDs in the specified format
     */
    exportData() {
        if (this.generatedIDs.length === 0) {
            this.showNotification('No IDs to export', 'warning');
            return;
        }

        const format = this.exportSelect ? this.exportSelect.value : 'txt';
        const type = this.typeSelect ? this.typeSelect.value : 'uuid';
        const typeName = this.getTypeName(type).toLowerCase();
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        let filename, content, mimeType;

        switch (format) {
            case 'txt':
                filename = `${typeName}s-${timestamp}.txt`;
                content = this.generatedIDs.join('\n');
                mimeType = 'text/plain';
                break;
            case 'csv':
                filename = `${typeName}s-${timestamp}.csv`;
                content = `${typeName.toUpperCase()}\n` + this.generatedIDs.join('\n');
                mimeType = 'text/csv';
                break;
            case 'json':
                filename = `${typeName}s-${timestamp}.json`;
                content = JSON.stringify({
                    type: type,
                    generated_at: new Date().toISOString(),
                    count: this.generatedIDs.length,
                    ids: this.generatedIDs
                }, null, 2);
                mimeType = 'application/json';
                break;
            default:
                this.showNotification('Invalid export format', 'error');
                return;
        }

        this.downloadFile(content, filename, mimeType);
        const typePluralName = this.getTypeName(type) + (type === 'hashids' ? '' : 's');
        this.showNotification(`Exported ${this.generatedIDs.length} ${typePluralName} as ${format.toUpperCase()}`, 'success');
        if (this.exportBtn) this.animateButton(this.exportBtn);
    }

    /**
     * Downloads a file with the given content
     * @param {string} content - File content
     * @param {string} filename - File name
     * @param {string} mimeType - MIME type
     */
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }

    /**
     * Gets the display name for an ID type
     * @param {string} type - The ID type
     * @returns {string} Display name
     */
    getTypeName(type) {
        const typeNames = {
            'uuid': 'UUID',
            'nanoid': 'NanoID',
            'hashids': 'HashIDs',
            'slug': 'Slug'
        };
        return typeNames[type] || 'ID';
    }

    /**
     * Clears all generated IDs
     */
    clearResults() {
        this.generatedIDs = [];
        if (this.outputArea) {
            this.outputArea.value = '';
            this.outputArea.style.display = 'none';
        }
        if (this.copyBtn) this.copyBtn.style.display = 'none';
        if (this.exportBtn) this.exportBtn.style.display = 'none';
        if (this.clearBtn) this.clearBtn.style.display = 'none';
        if (this.statsElement) this.statsElement.textContent = '';
        this.showNotification('Results cleared', 'info');
    }

    /**
     * Animates a button when clicked
     * @param {HTMLElement} button - Button to animate
     */
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    /**
     * Fallback method for copying text to clipboard
     * @param {string} text - Text to copy
     */
    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            const typeName = this.getTypeName(this.typeSelect.value);
            this.showNotification(`${typeName} copied to clipboard!`, 'success');
            this.animateButton(this.copyBtn);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            this.showNotification('Unable to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Sets loading state for the generate button
     * @param {boolean} loading - Loading state
     */
    setLoadingState(loading) {
        if (loading) {
            this.generateBtn.disabled = true;
            this.generateBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Generating...
            `;
            this.generateBtn.style.opacity = '0.7';
        } else {
            this.generateBtn.disabled = false;
            this.generateBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Generate UUIDs
            `;
            this.generateBtn.style.opacity = '1';
        }
    }

    /**
     * Shows a notification message
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, warning, info)
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Shows an error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Loads user settings from localStorage
     */
    loadSettings() {
        try {
            const settings = JSON.parse(localStorage.getItem('idGeneratorSettings') || '{}');
            
            if (settings.type) this.typeSelect.value = settings.type;
            if (settings.count) this.countInput.value = settings.count;
            
            // Load checkbox settings and update visual state
            const checkboxes = [
                { element: this.uppercaseCheck, setting: 'uppercase' },
                { element: this.lowercaseCheck, setting: 'lowercase' },
                { element: this.numbersCheck, setting: 'numbers' },
                { element: this.symbolsCheck, setting: 'symbols' }
            ];
            
            checkboxes.forEach(({ element, setting }) => {
                if (element && settings[setting] !== undefined) {
                    element.checked = settings[setting];
                    
                    // Update visual state
                    const checkboxGroup = element.closest('.checkbox-group');
                    if (checkboxGroup) {
                        if (element.checked) {
                            checkboxGroup.classList.add('checked');
                        } else {
                            checkboxGroup.classList.remove('checked');
                        }
                    }
                }
            });
            
            if (settings.length) {
                this.lengthSlider.value = settings.length;
                 if (this.lengthValue) {
                     this.lengthValue.textContent = settings.length;
                 }
            }
            if (settings.exportFormat) this.exportSelect.value = settings.exportFormat;
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    /**
     * Saves user settings to localStorage
     */
    saveSettings() {
        try {
            const settings = {
                type: this.typeSelect.value,
                count: this.countInput.value,
                uppercase: this.uppercaseCheck.checked,
                lowercase: this.lowercaseCheck.checked,
                numbers: this.numbersCheck.checked,
                symbols: this.symbolsCheck.checked,
                length: this.lengthSlider.value,
                exportFormat: this.exportSelect.value
            };
            
            localStorage.setItem('idGeneratorSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IDGenerator();
});

// Add some utility functions for potential future use
window.UUIDUtils = {
    /**
     * Validates if a string is a valid UUID v4
     * @param {string} uuid - UUID string to validate
     * @returns {boolean} True if valid UUID v4
     */
    isValidUUID: function(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    },

    /**
     * Formats UUID with different cases
     * @param {string} uuid - UUID string
     * @param {string} format - 'upper', 'lower', or 'mixed'
     * @returns {string} Formatted UUID
     */
    formatUUID: function(uuid, format = 'lower') {
        switch (format) {
            case 'upper':
                return uuid.toUpperCase();
            case 'lower':
                return uuid.toLowerCase();
            case 'mixed':
            default:
                return uuid;
        }
    }
};