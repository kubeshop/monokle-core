import {expect, it, suite} from 'vitest';
import {LineCounter} from 'yaml';
import {GUESS_NAME_REGEX, getTextDocuments} from '../extract.js';
import {parseAllYamlDocuments} from '../parse.js';

/**
 * GUESS_NAME_REGEX
 */

suite('`GUESS_NAME_REGEX`', () => {
  it('should correctly match with the most basic config', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it('should correctly match with a different indentation', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx-deployment`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it('should correctly match event without indentation', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
name: nginx-deployment`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it('should match only the metadata.name field', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
foo:
  name: bar
name: foobar
metadata:
  name: nginx-deployment`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it('should correctly match when the name field is not on the first line', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
  foo: bar
  name: nginx-deployment`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it('should correctly match even with inconsistent indentation', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx-deployment
  foo: bar`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it('should correctly match even with incorrect format', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
    name:       
            nginx-deployment`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBe('nginx-deployment');
  });

  it("shouldn't match from a nested block", () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
foo:
  metadata:
    name: bar`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBeUndefined();
  });

  it("shouldn't match anything if not present", () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
  foo: bar`;

    expect(GUESS_NAME_REGEX.exec(fileContents)?.at(1)).toBeUndefined();
  });
});

/**
 * getTextDocuments()
 */

suite('`getTextDocuments()`', () => {
  it('returns the same number of items as `parseAllYamlDocuments` for a single document', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment`;

    const lineCounter = new LineCounter();
    const docs = parseAllYamlDocuments(fileContents, lineCounter);
    const textDocs = getTextDocuments(fileContents);

    expect(textDocs).toHaveLength(docs.length);
  });

  it('returns the same number of items as `parseAllYamlDocuments` for multiple documents', () => {
    const fileContents = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-2
  `;

    const lineCounter = new LineCounter();
    const docs = parseAllYamlDocuments(fileContents, lineCounter);
    const textDocs = getTextDocuments(fileContents);

    expect(textDocs).toHaveLength(docs.length);
  });

  it('returns the same number of items as `parseAllYamlDocuments` when it starts with a separator', () => {
    const fileContents = `---
apiVersion: 
kind: 
metadata:
  name: nginx-deployment
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-2
  `;

    const lineCounter = new LineCounter();
    const docs = parseAllYamlDocuments(fileContents, lineCounter);
    const textDocs = getTextDocuments(fileContents);

    expect(textDocs).toHaveLength(docs.length);
  });

  it('returns the same number of items as `parseAllYamlDocuments` when it starts and/or ends with a separator and whitespaces', () => {
    const fileContents = `
    
    
---
apiVersion: 
kind: 
metadata:
  name: nginx-deployment
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-2
...


  `;

    const lineCounter = new LineCounter();
    const docs = parseAllYamlDocuments(fileContents, lineCounter);
    const textDocs = getTextDocuments(fileContents);

    expect(textDocs).toHaveLength(docs.length);
  });

  it('returns the same number of items as `parseAllYamlDocuments` when it also has ending separators', () => {
    const fileContents = `---
apiVersion: 
kind: 
metadata:
  name: nginx-deployment
---
# comment
...
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-2
...`;

    const lineCounter = new LineCounter();
    const docs = parseAllYamlDocuments(fileContents, lineCounter);
    const textDocs = getTextDocuments(fileContents);

    expect(textDocs).toHaveLength(docs.length);
  });

  it('returns the same number of items as `parseAllYamlDocuments` even with document errors', () => {
    const fileContents = `
apiVersion: 
kind: 
metadata:
  name: nginx-deployment
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-2
  `;

    const lineCounter = new LineCounter();
    const docs = parseAllYamlDocuments(fileContents, lineCounter);
    const textDocs = getTextDocuments(fileContents);

    expect(textDocs).toHaveLength(docs.length);
  });
});
