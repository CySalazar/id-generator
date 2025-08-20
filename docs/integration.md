# UUID Generator - Integration Guide

## Overview

This guide explains how to integrate the UUID Generator into your own projects, use its components, and extend its functionality. The application is built with vanilla JavaScript and can be easily integrated into various environments.

## Integration Methods

### 1. Direct Integration

Copy the entire application into your project:

```bash
# Copy all files
cp -r uuid-generator/* your-project/uuid-tool/

# Or copy specific files
cp uuid-generator/script.js your-project/js/
cp uuid-generator/styles.css your-project/css/
```

### 2. Component Integration

Extract and use specific components:

```javascript
// Extract just the UUID generation logic
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
```

### 3. Module Integration

Convert to ES6 modules:

```javascript
// uuid-generator.js
export class UUIDGenerator {
    // ... class implementation
}

export function generateUUID() {
    // ... function implementation
}

// In your application
import { UUIDGenerator, generateUUID } from './uuid-generator.js';
```

### 4. NPM Package Integration

Create a package.json for npm distribution:

```json
{
  "name": "simple-uuid-generator",
  "version": "1.0.0",
  "description": "Simple UUID v4 generator with export functionality",
  "main": "script.js",
  "module": "uuid-generator.esm.js",
  "files": ["script.js", "styles.css", "index.html"],
  "keywords": ["uuid", "generator", "v4", "unique", "identifier"]
}
```

## API Reference

### UUIDGenerator Class

#### Constructor
```javascript
const generator = new UUIDGenerator();
```

Initializes the UUID generator with DOM bindings.

#### Methods

##### generateUUID()
```javascript
const uuid = generator.generateUUID();
// Returns: "550e8400-e29b-41d4-a716-446655440000"
```

Generates a single UUID v4 string.

**Returns**: `string` - A valid UUID v4

##### generateUUIDs()
```javascript
generator.generateUUIDs();
```

Generates multiple UUIDs based on user input and updates the UI.

**Side effects**: Updates `this.generatedUUIDs` array and UI

##### copyToClipboard()
```javascript
await generator.copyToClipboard();
```

Copies generated UUIDs to the system clipboard.

**Returns**: `Promise<void>`
**Throws**: Error if clipboard access fails

##### exportUUIDs(format)
```javascript
generator.exportUUIDs('json');
```

Exports UUIDs in the specified format.

**Parameters**:
- `format` (string): Export format ('txt', 'csv', 'json')

**Side effects**: Triggers file download

### Utility Functions

#### UUIDUtils.isValidUUID(uuid)
```javascript
const isValid = UUIDUtils.isValidUUID('550e8400-e29b-41d4-a716-446655440000');
// Returns: true
```

Validates if a string is a valid UUID v4.

**Parameters**:
- `uuid` (string): UUID string to validate

**Returns**: `boolean` - True if valid UUID v4

#### UUIDUtils.formatUUID(uuid, format)
```javascript
const formatted = UUIDUtils.formatUUID(uuid, 'upper');
// Returns: "550E8400-E29B-41D4-A716-446655440000"
```

Formats UUID with different cases.

**Parameters**:
- `uuid` (string): UUID string to format
- `format` (string): Format type ('upper', 'lower', 'mixed')

**Returns**: `string` - Formatted UUID

## Framework Integration

### React Integration

```jsx
import React, { useState } from 'react';

// Extract the UUID generation function
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function UUIDGeneratorComponent() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);

    const handleGenerate = () => {
        const newUuids = Array.from({ length: count }, () => generateUUID());
        setUuids(newUuids);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(uuids.join('\n'));
            alert('Copied to clipboard!');
        } catch (error) {
            console.error('Copy failed:', error);
        }
    };

    return (
        <div className="uuid-generator">
            <input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                min="1" 
                max="10000" 
            />
            <button onClick={handleGenerate}>Generate UUIDs</button>
            
            {uuids.length > 0 && (
                <div>
                    <button onClick={handleCopy}>Copy to Clipboard</button>
                    <textarea 
                        value={uuids.join('\n')} 
                        readOnly 
                        rows={Math.min(uuids.length, 10)}
                    />
                </div>
            )}
        </div>
    );
}

export default UUIDGeneratorComponent;
```

### Vue.js Integration

```vue
<template>
  <div class="uuid-generator">
    <input 
      v-model.number="count" 
      type="number" 
      min="1" 
      max="10000"
    />
    <button @click="generateUUIDs">Generate UUIDs</button>
    
    <div v-if="uuids.length > 0">
      <button @click="copyToClipboard">Copy to Clipboard</button>
      <textarea 
        :value="uuids.join('\n')" 
        readonly 
        :rows="Math.min(uuids.length, 10)"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UUIDGenerator',
  data() {
    return {
      uuids: [],
      count: 1
    };
  },
  methods: {
    generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    generateUUIDs() {
      this.uuids = Array.from({ length: this.count }, () => this.generateUUID());
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.uuids.join('\n'));
        this.$emit('copied');
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  }
};
</script>
```

### Angular Integration

```typescript
// uuid-generator.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-uuid-generator',
  template: `
    <div class="uuid-generator">
      <input 
        type="number" 
        [(ngModel)]="count" 
        min="1" 
        max="10000"
      />
      <button (click)="generateUUIDs()">Generate UUIDs</button>
      
      <div *ngIf="uuids.length > 0">
        <button (click)="copyToClipboard()">Copy to Clipboard</button>
        <textarea 
          [value]="uuids.join('\n')" 
          readonly 
          [rows]="Math.min(uuids.length, 10)"
        ></textarea>
      </div>
    </div>
  `
})
export class UUIDGeneratorComponent {
  uuids: string[] = [];
  count: number = 1;

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateUUIDs(): void {
    this.uuids = Array.from({ length: this.count }, () => this.generateUUID());
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.uuids.join('\n'));
      console.log('Copied to clipboard');
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }
}
```

## Backend Integration

### Node.js Integration

```javascript
// uuid-generator.js (Node.js version)
const crypto = require('crypto');

class UUIDGenerator {
    generateUUID() {
        // Use crypto for better randomness in Node.js
        const bytes = crypto.randomBytes(16);
        
        // Set version (4) and variant bits
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        
        // Format as UUID string
        const hex = bytes.toString('hex');
        return [
            hex.slice(0, 8),
            hex.slice(8, 12),
            hex.slice(12, 16),
            hex.slice(16, 20),
            hex.slice(20, 32)
        ].join('-');
    }
    
    generateBatch(count) {
        if (count < 1 || count > 10000) {
            throw new Error('Count must be between 1 and 10000');
        }
        
        return Array.from({ length: count }, () => this.generateUUID());
    }
    
    exportToFormat(uuids, format) {
        switch (format) {
            case 'txt':
                return uuids.join('\n');
            
            case 'csv':
                return 'UUID\n' + uuids.join('\n');
            
            case 'json':
                return JSON.stringify({
                    generated_at: new Date().toISOString(),
                    count: uuids.length,
                    uuids: uuids
                }, null, 2);
            
            default:
                throw new Error('Invalid format');
        }
    }
}

module.exports = UUIDGenerator;
```

### Express.js API

```javascript
// server.js
const express = require('express');
const UUIDGenerator = require('./uuid-generator');

const app = express();
const generator = new UUIDGenerator();

app.use(express.json());

// Generate single UUID
app.get('/api/uuid', (req, res) => {
    try {
        const uuid = generator.generateUUID();
        res.json({ uuid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generate multiple UUIDs
app.post('/api/uuids', (req, res) => {
    try {
        const { count = 1, format = 'json' } = req.body;
        const uuids = generator.generateBatch(count);
        
        if (format === 'json') {
            res.json({ uuids, count: uuids.length });
        } else {
            const content = generator.exportToFormat(uuids, format);
            const mimeTypes = {
                txt: 'text/plain',
                csv: 'text/csv'
            };
            
            res.setHeader('Content-Type', mimeTypes[format]);
            res.send(content);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('UUID Generator API running on port 3000');
});
```

## Database Integration

### SQL Examples

```sql
-- PostgreSQL: Using generated UUIDs as primary keys
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cySalazar VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MySQL: Using UUIDs (requires MySQL 8.0+)
CREATE TABLE sessions (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

-- Insert with generated UUID
INSERT INTO sessions (id, user_id, token, expires_at) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', '...', '...', '...');
```

### MongoDB Integration

```javascript
// Using UUIDs in MongoDB
const { MongoClient } = require('mongodb');
const UUIDGenerator = require('./uuid-generator');

const generator = new UUIDGenerator();

async function createDocument() {
    const client = new MongoClient(connectionString);
    const db = client.db('myapp');
    const collection = db.collection('documents');
    
    const document = {
        _id: generator.generateUUID(),
        title: 'Sample Document',
        content: 'Document content...',
        createdAt: new Date()
    };
    
    await collection.insertOne(document);
    client.close();
}
```

## Testing Integration

### Unit Tests

```javascript
// uuid-generator.test.js
const UUIDGenerator = require('./uuid-generator');

describe('UUIDGenerator', () => {
    let generator;
    
    beforeEach(() => {
        generator = new UUIDGenerator();
    });
    
    test('generates valid UUID v4', () => {
        const uuid = generator.generateUUID();
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        
        expect(uuid).toMatch(uuidRegex);
        expect(uuid.length).toBe(36);
    });
    
    test('generates unique UUIDs', () => {
        const uuids = generator.generateBatch(1000);
        const uniqueUuids = new Set(uuids);
        
        expect(uniqueUuids.size).toBe(1000);
    });
    
    test('validates batch count limits', () => {
        expect(() => generator.generateBatch(0)).toThrow();
        expect(() => generator.generateBatch(10001)).toThrow();
    });
    
    test('exports to different formats', () => {
        const uuids = ['uuid1', 'uuid2', 'uuid3'];
        
        const txt = generator.exportToFormat(uuids, 'txt');
        expect(txt).toBe('uuid1\nuuid2\nuuid3');
        
        const csv = generator.exportToFormat(uuids, 'csv');
        expect(csv).toBe('UUID\nuuid1\nuuid2\nuuid3');
        
        const json = generator.exportToFormat(uuids, 'json');
        const parsed = JSON.parse(json);
        expect(parsed.uuids).toEqual(uuids);
        expect(parsed.count).toBe(3);
    });
});
```

### Browser Testing

```javascript
// browser-test.js (using Jest with jsdom)
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the script
const scriptContent = fs.readFileSync(
    path.join(__dirname, '../script.js'), 
    'utf8'
);

describe('Browser UUID Generator', () => {
    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = `
            <input id="quantity" type="number" value="1" />
            <button id="generateBtn">Generate</button>
            <div id="resultsSection" style="display: none;">
                <textarea id="resultsTextarea"></textarea>
                <span id="countInfo"></span>
            </div>
        `;
        
        // Execute the script
        eval(scriptContent);
    });
    
    test('initializes without errors', () => {
        expect(window.UUIDUtils).toBeDefined();
        expect(window.UUIDUtils.isValidUUID).toBeInstanceOf(Function);
    });
    
    test('validates UUIDs correctly', () => {
        const validUUID = '550e8400-e29b-41d4-a716-446655440000';
        const invalidUUID = 'not-a-uuid';
        
        expect(window.UUIDUtils.isValidUUID(validUUID)).toBe(true);
        expect(window.UUIDUtils.isValidUUID(invalidUUID)).toBe(false);
    });
});
```

## Performance Optimization

### Web Workers Integration

```javascript
// uuid-worker.js
self.onmessage = function(e) {
    const { count } = e.data;
    const uuids = [];
    
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    for (let i = 0; i < count; i++) {
        uuids.push(generateUUID());
        
        // Report progress every 1000 UUIDs
        if (i % 1000 === 0) {
            self.postMessage({ type: 'progress', completed: i, total: count });
        }
    }
    
    self.postMessage({ type: 'complete', uuids });
};

// In main thread
class OptimizedUUIDGenerator {
    generateUUIDs(count) {
        return new Promise((resolve, reject) => {
            const worker = new Worker('uuid-worker.js');
            
            worker.onmessage = (e) => {
                const { type, uuids, completed, total } = e.data;
                
                if (type === 'progress') {
                    this.updateProgress(completed, total);
                } else if (type === 'complete') {
                    worker.terminate();
                    resolve(uuids);
                }
            };
            
            worker.onerror = (error) => {
                worker.terminate();
                reject(error);
            };
            
            worker.postMessage({ count });
        });
    }
    
    updateProgress(completed, total) {
        const percentage = Math.round((completed / total) * 100);
        console.log(`Progress: ${percentage}%`);
    }
}
```

## Security Considerations

### Input Validation

```javascript
class SecureUUIDGenerator {
    validateInput(count) {
        // Type checking
        if (typeof count !== 'number') {
            throw new Error('Count must be a number');
        }
        
        // Range checking
        if (!Number.isInteger(count) || count < 1 || count > 10000) {
            throw new Error('Count must be an integer between 1 and 10000');
        }
        
        return true;
    }
    
    generateBatch(count) {
        this.validateInput(count);
        
        // Rate limiting (example)
        const now = Date.now();
        if (this.lastGeneration && (now - this.lastGeneration) < 1000) {
            throw new Error('Rate limit exceeded');
        }
        this.lastGeneration = now;
        
        return Array.from({ length: count }, () => this.generateUUID());
    }
}
```

### Content Security Policy

```html
<!-- Add CSP headers for security -->
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    connect-src 'self';
">
```

## Deployment Integration

### Docker Integration

```dockerfile
# Dockerfile for containerized deployment
FROM nginx:alpine

# Copy application files
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY docs/ /usr/share/nginx/html/docs/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### CI/CD Integration

```yaml
# .github/workflows/deploy.yml
name: Deploy UUID Generator

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Run tests
      run: |
        npm install
        npm test
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## Customization Examples

### Custom Styling

```css
/* custom-theme.css */
:root {
    --primary-color: #your-brand-color;
    --secondary-color: #your-secondary-color;
    --background-gradient: linear-gradient(135deg, #your-color1, #your-color2);
}

/* Override existing styles */
.btn-primary {
    background: var(--primary-color);
}

body {
    background: var(--background-gradient);
}
```

### Custom Export Formats

```javascript
// Extend the UUIDGenerator class
class ExtendedUUIDGenerator extends UUIDGenerator {
    exportUUIDs(format) {
        switch (format) {
            case 'xml':
                this.exportAsXML();
                break;
            case 'yaml':
                this.exportAsYAML();
                break;
            default:
                super.exportUUIDs(format);
        }
    }
    
    exportAsXML() {
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<uuids generated_at="${new Date().toISOString()}" count="${this.generatedUUIDs.length}">
${this.generatedUUIDs.map(uuid => `  <uuid>${uuid}</uuid>`).join('\n')}
</uuids>`;
        
        this.downloadFile(xmlContent, `uuids_${this.getTimestamp()}.xml`, 'application/xml');
    }
    
    exportAsYAML() {
        const yamlContent = `generated_at: ${new Date().toISOString()}
count: ${this.generatedUUIDs.length}
uuids:
${this.generatedUUIDs.map(uuid => `  - ${uuid}`).join('\n')}`;
        
        this.downloadFile(yamlContent, `uuids_${this.getTimestamp()}.yaml`, 'application/x-yaml');
    }
    
    getTimestamp() {
        return new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    }
}
```

This integration guide provides comprehensive examples for incorporating the UUID Generator into various environments and frameworks. Choose the integration method that best fits your project's architecture and requirements.