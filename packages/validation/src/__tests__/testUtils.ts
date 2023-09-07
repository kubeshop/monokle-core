import type {BaseFile} from '@monokle/parser';
import {readFile as readFileFromFs} from 'fs/promises';
import chunkArray from 'lodash/chunk.js';
import glob from 'tiny-glob';
import {expect} from 'vitest';
import {ValidationResult} from '../index.js';

export async function readDirectory(directoryPath: string): Promise<BaseFile[]> {
  const filePaths = await glob(`${directoryPath}/**/*.{yaml,yml}`);
  const files: BaseFile[] = [];

  for (const chunk of chunkArray(filePaths, 5)) {
    const promise = await Promise.allSettled(
      chunk.map(path => {
        return readFileFromFs(path, 'utf8').then((content): BaseFile => ({id: path, path, content}));
      })
    );

    for (const result of promise) {
      if (result.status === 'rejected') {
        continue;
      }
      files.push(result.value);
    }
  }

  return files;
}

export function expectResult(result: ValidationResult, ruleId: string, level: string, resource: string) {
  expect(result.ruleId).toBe(ruleId);
  expect(result.level).toBe(level);
  expect(result.message.text).toContain(resource);
}

export const PRACTICES_ALL_DISABLED = {
  'practices/no-latest-image': false,
  'practices/no-sys-admin': false,
  'practices/no-mounted-docker-sock': false,
  'practices/no-writable-fs': false,
  'practices/drop-capabilities': false,
  'practices/no-low-user-id': false,
  'practices/no-low-group-id': false,
  'practices/no-automounted-service-account-token': false,
  'practices/no-pod-create': false,
  'practices/no-pod-execute': false,
  'practices/no-root-group': false,
};
