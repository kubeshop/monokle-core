# Custom Rule Implementation

Apart from providing rule metadata as described in [plugin metadata](plugin-metadata.md) each rule
needs to implement a `validate` method that is called for each resource to be validated. This method 
takes two arguments:

- a `RuleContext` object that provides metadata for the resource(s) to be validated
- a `RuleApi` object that provides helper methods for rule execution

These are both defined in [config.ts](../src/validators/custom/config.ts).

Let's have a look at these in more detail.

## RuleContext

The RuleContext contains the following properties:

### `resources` 

A list of Resource objects that need to be (re)validated in the call to validate. This is defined as follows in 
[types.ts](../src/common/types.ts):

```typescript
export type Resource = {
  id: string;
  fileId: string;
  filePath: string;
  fileOffset: number; // Offset of this resource's startLine within the parent file.
  name: string;
  apiVersion: string;
  kind: string;
  namespace?: string;
  content?: any;
  text: string;
  isSelected?: boolean;
  refs?: ResourceRef[];
  range?: {
    start: number;
    length: number;
  };
};
```

The most important properties during validation will (probably) be:

- `name` : the name of the resource, for example "petstore-deployment"
- `kind` : the kind of resource, for example "Deployment"
- `apiVersion` : the apiVersion, for example "apps/v1"
- `metadata` : the metadata available in the resource (see example below)
- `content` : the entire resource object, giving you access to any property you might want to validate

### `allResources` 

A list of all resources available to the validator, use this to resolve references, etc. 

### `settings`

A custom settings object provided to the validator - for example `monokle.validation.yaml`:

```yaml
plugins:
  kubernetes-schema: true
settings:
  kubernetes-schema:
    schemaVersion: v1.24.2
```

## RuleApi

The RuleApi object provides the following methods:

### `getRelated(resource: Resource): Resource[];`

Returns all related resources of the given resource, using the `refs` property of the given Resource to resolve these.

### `report(resource: Resource, args: ReportArgs)`

Use this method to report a problem with the resource(s) being validated. ReportArgs takes two properties:

- `path` : a path to the error, for example
  - "metadata.annotations" for an incorrect annotation
  - "spec.template.spec.containers.0.image" for an incorrect image in the first container of a Deployment.
- `message` : an optional message with additional context

### `parse(resource: Resource): Document.Parsed<ParsedNode>`

Returns an internally cached parsed YAML instance of the resource, this is for advanced use cases for now.
  
## Example

The below validate call extracts the `resources` and `report` properties from the provided arguments and then 
iterates each resource, checking the `metadata` property for annotations and reporting an error if none found.

```typescript
validate({ resources }, { report }){
  resources.forEach((resource) => {
    // get annotations of resource
    const annotations = Object.entries(resource.metadata?.annotations ?? {});
    
    // were there any?
    const hasAnnotations = annotations.length > 0;

    if (!hasAnnotations) {
      // report error for this resource
      report(resource, { path: "metadata.annotations" });
    }
  });
}
```
