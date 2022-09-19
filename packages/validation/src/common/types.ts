import { ResourceParser } from "./resourceParser.js";
import { ValidationRun } from "./sarif.js";

export type Resource = {
  id: string;
  fileId: string;
  filePath: string;
  name: string;
  apiVersion: string;
  kind: string;
  namespace?: string;
  content?: any;
  text: string;
  isSelected?: boolean;
  // refs?: ResourceRef[];
  range?: {
    start: number;
    length: number;
  };
};

export type ValidatorConfig<T extends string = string> = {
  tool: T;
  enabled: boolean;
};

export type Incremental = {
  resourceIds: string[];
};

export interface ValidatorConstructor {
  new (parser: ResourceParser): Validator;
}

export interface Validator<TConfig extends ValidatorConfig = ValidatorConfig> {
  get name(): string;
  get enabled(): boolean;
  load(config: TConfig): Promise<void>;
  validate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationRun>;
}
