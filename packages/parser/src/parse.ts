import {LineCounter, parseAllDocuments, parseDocument} from 'yaml';

export function parseYamlDocument(text: string, lineCounter?: LineCounter) {
  return parseDocument(text, {lineCounter, uniqueKeys: false, strict: false, logLevel: 'silent'});
}

/**
 * Wrapper that ensures consistent options
 */
export function parseAllYamlDocuments(text: string, lineCounter?: LineCounter) {
  return parseAllDocuments(text, {
    lineCounter,
    uniqueKeys: false,
    strict: false,
    logLevel: 'silent',
  });
}
