import type { JSONSchema4, JSONSchema6, JSONSchema7 } from "json-schema";
import type { IEvent } from "monaco-editor";
import type { Config } from "@monokle/validation";

/**
 * Configure `monaco-yaml` diagnostics options.
 *
 * @param options The options to set.
 */
export function configure(settings?: LanguageSettings): void;

type LanguageSettings = {
  validation?: Config;
};
