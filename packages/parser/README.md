# Monokle Parser

This package is designed to be used to parse Kubernetes resources.

## Usage

The core function is `extractK8sResources()` function. It accepts a list of file objects:

```ts
export type BaseFile = {
  id: string; // unique id
  path: string; // path to source
  content: string; // file content as text
};
```

> `BaseFile` can represent regular file present in local file storage, but can be also any remote resource or basically anything else (like data read from db). It important to keep in mind that id should be unique.

File objects can be then passed to `extractK8sResources()` to be parsed. All non K8s-related files will be ignored:

```ts
import {extractK8sResources} from `@monokle/parser`;

const resources = extractK8sResources(files);
```

Each resource contains following information:

```ts
{
  id: string;
  fileId: string;
  filePath: string;
  fileOffset: number;
  name: string;
  apiVersion: string;
  kind: string;
  namespace?: string;
  content?: any;
  text: string;
  refs?: ResourceRef[];
  range?: {
    start: number;
    length: number;
  };
}
```