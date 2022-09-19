import { keyBy } from 'lodash';
import invariant from 'tiny-invariant';
import { getResourceId } from '../utils/sarif';
import { ValidationResult, ValidationRun } from './sarif';
import {
  Incremental,
  Resource, Validator, ValidatorConfig
} from './types';

const UNLOADED_ERR_MSG =
  'Cannot validate resources. The service must first be loaded.';

export abstract class AbstractValidator<
  TConfig extends ValidatorConfig = ValidatorConfig
> implements Validator<TConfig>
{
  public name: string;
  public loaded = false;

  protected config: TConfig | undefined;
  protected previous: ValidationResult[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get enabled(): boolean {
    return this.config?.enabled ?? false;
  }

  async load(config: TConfig): Promise<void> {
    this.config = config;
    if (!this.config.enabled) return;
    await this.doLoad(config);

    this.loaded = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected doLoad(config: TConfig): Promise<void> {
    return Promise.resolve();
  }

  async clear() {
    this.previous = [];
  }

  async validate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationRun> {
    invariant(this.loaded, UNLOADED_ERR_MSG);

    let results = await this.doValidate(resources, incremental);

    if (incremental) {
      results = this.merge(this.previous, results, incremental);
    }

    this.previous = results;

    return {
      tool: {
        driver: {
          name: this.name,
        },
      },
      results,
    };
  }

  protected abstract doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]>;

  protected merge(
    previous: ValidationResult[],
    current: ValidationResult[],
    incremental?: Incremental
  ) {
    const results: ValidationResult[] = [];
    const hashmap = keyBy(incremental?.resourceIds);

    for (const result of previous) {
      const resourceId = getResourceId(result);
      const isDirty = Boolean(resourceId && hashmap[resourceId]);

      if (!isDirty) {
        results.push(result);
      }
    }

    for (const result of current) {
      const resourceId = getResourceId(result);
      const isDirty = resourceId && hashmap[resourceId];

      if (isDirty) {
        results.push(result);
      }
    }

    return results;
  }
}
