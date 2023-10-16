export type DryRunConfigKind = 'kustomize' | 'helm';

type Args = Array<Array<string>>;

interface BaseConfig {
  workdir?: string;
  kind: DryRunConfigKind;
  version?: string;
  command?: string;
}

interface HelmConfig extends BaseConfig {
  kind: 'helm';
  command?: 'template';
  values?: string[];
  output?: string;
  set?: {
    [k: string]: unknown;
  };
  args?: Args;
}

interface KustomizeConfig extends BaseConfig {
  kind: 'kustomize';
  command?: 'build';
  env?: {
    [k: string]: unknown;
  };
  enableHelm?: boolean;
  output?: string;
  reorder?: 'legacy' | 'none';
  args?: Args;
}

export interface DryRunHelmConfig extends HelmConfig {
  postRender?: Array<HelmConfig | Omit<DryRunKustomizeConfig, 'postRender'>>
}

export interface DryRunKustomizeConfig extends KustomizeConfig {
  postRender?: Array<Omit<DryRunHelmConfig, 'postRender'> | Omit<DryRunKustomizeConfig, 'postRender'>>
}

export type DryRunConfig = DryRunKustomizeConfig | DryRunHelmConfig;

export interface DryRunConfigObject<
  T extends DryRunConfig = DryRunConfig
> {
  [key: string]: unknown;
  apiVersion: string;
  kind: 'DryRun';
  metadata: {
    name: string;
    [k: string]: unknown;
  };
  include?: string[]; // regex of involved files, when changed it automatically re-renders
  data: T;
}
