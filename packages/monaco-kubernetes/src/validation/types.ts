import { Config } from "@monokle/validation";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Diagnostic, DefinitionLink } from "vscode-languageserver-types";
import { DefinitionParams } from "vscode-languageserver-protocol/lib/common/protocol";

export type ValidationLanguageSettings = {
  validation?: Config;
};

export interface MonokleLanguageService {
  configure(settings: ValidationLanguageSettings): void;
  doValidation(document: TextDocument): Promise<Diagnostic[]>;
  doDefinition(
    document: TextDocument,
    params: DefinitionParams
  ): DefinitionLink[] | undefined;
}
