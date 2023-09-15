import {ValidationResponse, ValidationResult} from '../common/sarif.js';
import {getFileLocation, getResourceLocation} from './sarif.js';

/**
 * Sorts the results, first alphabetically by analysis target URI, then numerically by line number, then by column number, then alphabetically by rule id.
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541377
 */
export function sortResults(response: ValidationResponse) {
  response.runs.forEach(run => run.results.sort(compareResult));
}

function compareResult(a: ValidationResult, b: ValidationResult) {
  const aFile = getFileLocation(a).physicalLocation?.artifactLocation.uri;
  const bFile = getFileLocation(b).physicalLocation?.artifactLocation.uri;
  const fileComparison = defaultCompare(aFile, bFile);
  if (fileComparison !== 0) return fileComparison;

  const aRule = a.ruleId;
  const bRule = b.ruleId;
  const ruleComparison = defaultCompare(aRule, bRule);
  if (ruleComparison !== 0) return ruleComparison;

  const aFingerprint = a.fingerprints?.['monokleHash/v1'];
  const bFingerprint = b.fingerprints?.['monokleHash/v1'];
  return defaultCompare(aFingerprint, bFingerprint);
}

const defaultCompare = (x: any, y: any) => {
  //INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare

  if (x === undefined && y === undefined) return 0;

  if (x === undefined) return 1;

  if (y === undefined) return -1;

  const xString = toString(x);
  const yString = toString(y);

  if (xString < yString) return -1;

  if (xString > yString) return 1;

  return 0;
};

const toString = (obj: any) => {
  //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-tostring

  if (obj === null) return 'null';

  if (typeof obj === 'boolean' || typeof obj === 'number') return obj.toString();

  if (typeof obj === 'string') return obj;

  if (typeof obj === 'symbol') throw new TypeError();

  //we know we have an object. perhaps return JSON.stringify?
  return obj.toString();
};
