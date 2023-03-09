import { Resource, ResourceMapType, RuleLevel, ValidationResult } from "@monokle/validation";
import { KnownResourceKinds } from "@monokle/validation/lib/utils/knownResourceKinds";

export type ResourceGraphProps = {
  resources: Resource[];
  resourceMap: ResourceMapType;
  getProblemsForResource: (id: string, level: RuleLevel) => ValidationResult[];
  onSelectResource?: (resource: Resource) => void;
  onSelectImage?: (imageId: string) => void;
  elkWorker: Worker;
};

export enum NodeType {
  Compact = 'compact',
  Expanded = 'expanded',
  None = 'none',
}

export type ResourceNodeKind = KnownResourceKinds | 'Kustomization' | 'Image';
export type ResourceNodeData = {
  name: string;
  kind: ResourceNodeKind;
  errors: ValidationResult[];
  warnings: ValidationResult[];
};
