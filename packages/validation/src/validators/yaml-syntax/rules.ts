import { ErrorCode } from "yaml";
import { RuleMetadata } from "../../common/sarif.js";
import { NO_HELP_AVAILABLE } from "../../constants.js";

/**
 * Maps a YAML error code to its rule identifier.
 *
 * This is done because rule identifiers should be opaque.
 * Let's use a consistent format so printing looks nice across validators.
 *
 * @see https://eemeli.org/yaml/#errors
 */
export const YAML_RULE_MAP: Record<ErrorCode | string, string> = {
  ALIAS_PROPS: "YML001",
  BAD_ALIAS: "YML002",
  BAD_DIRECTIVE: "YML003",
  BAD_DQ_ESCAPE: "YML004",
  BAD_INDENT: "YML005",
  BAD_PROP_ORDER: "YML006",
  BAD_SCALAR_START: "YML007",
  BLOCK_AS_IMPLICIT_KEY: "YML008",
  BLOCK_IN_FLOW: "YML009",
  DUPLICATE_KEY: "YML010",
  IMPOSSIBLE: "YML011",
  KEY_OVER_1024_CHARS: "YML012",
  MISSING_ANCHOR: "YML013", // not available in TypeScript (reason for `| string`)
  MISSING_CHAR: "YML014",
  MULTILINE_IMPLICIT_KEY: "YML015",
  MULTIPLE_ANCHORS: "YML016",
  MULTIPLE_DOCS: "YML017",
  MULTIPLE_TAGS: "YML018",
  TAB_AS_INDENT: "YML019",
  TAG_RESOLVE_FAILED: "YML020",
  UNEXPECTED_TOKEN: "YML021",
};

export const YAML_RULES: RuleMetadata[] = [
  {
    id: "YML001",
    name: "alias-props",
    shortDescription: {
      text: "The alias props are incorrect.",
    },
    fullDescription: {
      text: "Unlike scalars and collections, alias nodes cannot have an anchor or tag associated with it.",
    },
    help: {
      text: "Do not associate anchors with alias nodes.",
    },
  },
  {
    id: "YML002",
    name: "no-bad-alias",
    shortDescription: {
      text: "The alias' format is incorrect.",
    },
    fullDescription: {
      text: "An alias identifier must be a non-empty sequence of valid characters.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML003",
    name: "no-bad-directive",
    shortDescription: {
      text: "The directive is incorrect.",
    },
    fullDescription: {
      text: "Only the %YAML and %TAG directives are supported, and they need to follow the specified structure.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML004",
    name: "no-bad-dq-escape",
    shortDescription: {
      text: "The double quotes are escaped incorrectly.",
    },
    fullDescription: {
      text: "Double-quotes strings may include '\\' escaped content, but that needs to be valid.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML005",
    name: "no-bad-indent",
    shortDescription: {
      text: "The indentation is incorrect.",
    },
    fullDescription: {
      text: "Indentation is important in YAML, and collection items need to all start at the same level. Block scalars are also picky about their leading content.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML006",
    name: "no-bad-prop-order",
    shortDescription: {
      text: "The anchors and tags are used incorrectly.",
    },
    fullDescription: {
      text: "Anchors and tags must be placed after the ?, : and - indicators.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML007",
    name: "no-bad-scalar-start",
    shortDescription: {
      text: "The scalar is formatted incorrectly.",
    },
    fullDescription: {
      text: "Plain scalars cannot start with a block scalar indicator, or one of the two reserved characters: @ and `.",
    },
    help: {
      text: "To fix, use a block or quoted scalar for the value",
    },
  },
  {
    id: "YML008",
    name: "no-block-as-implicit-key",
    shortDescription: {
      text: "The identation is incorrect.",
    },
    fullDescription: {
      text: "There's probably something wrong with the indentation, or you're trying to parse something like a: b: c, where it's not clear what's the key and what's the value.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML009",
    name: "no-block-in-flow",
    shortDescription: {
      text: "Cannot use block within flow.",
    },
    fullDescription: {
      text: "YAML scalars and collections both have block and flow styles. Flow is allowed within block, but not the other way around.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML010",
    name: "no-duplicate-key",
    shortDescription: {
      text: "Cannot use duplicate keys.",
    },
    fullDescription: {
      text: "Keys within a map must be unique.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML011",
    name: "impossible",
    shortDescription: {
      text: "Something unexpected went wrong",
    },
    fullDescription: {
      text: "This really should not happen. If you encounter this error code, please file a bug.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML012",
    name: "no-long-key",
    shortDescription: {
      text: "The key is longer than 1024 characters.",
    },
    fullDescription: {
      text: "Due to legacy reasons, implicit keys must have their following : indicator after at most 1k characters.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML013",
    name: "no-missing-anchor",
    shortDescription: {
      text: "The anchor is missing.",
    },
    fullDescription: {
      text: "Aliases can only dereference anchors that are before them in the document.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML014",
    name: "no-missing-char",
    shortDescription: {
      text: "A character is missing.",
    },
    fullDescription: {
      text: "Some character or characters are missing here. See the error message for what you need to add.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML015",
    name: "no-multiline-implicit-key",
    shortDescription: {
      text: "Cannot use multiple lines with implicit keys.",
    },
    fullDescription: {
      text: "Implicit keys need to be on a single line.",
    },
    help: {
      text: "Does the input include a plain scalar with a : followed by whitespace, which is getting parsed as a map key?",
    },
  },
  {
    id: "YML016",
    name: "no-multiple-anchors",
    shortDescription: {
      text: "Cannot have multiple anchors.",
    },
    fullDescription: {
      text: "A node is only allowed to have one anchor.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML017",
    name: "no-multiple-docs",
    shortDescription: {
      text: "Cannot parse this document.",
    },
    fullDescription: {
      text: "A YAML stream may include multiple documents.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML018",
    name: "no-multiple-tags",
    shortDescription: {
      text: "Cannot use multiple tags.",
    },
    fullDescription: {
      text: "A node is only allowed to have one tag.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML019",
    name: "no-tab-as-indent",
    shortDescription: {
      text: "Cannot use tabs for identation.",
    },
    fullDescription: {
      text: "Only spaces are allowed as indentation.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML020",
    name: "no-failed-tag-resolve",
    shortDescription: {
      text: "Cannot resolve the tag.",
    },
    fullDescription: {
      text: "Something went wrong when resolving a node's tag with the current schema.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
  {
    id: "YML021",
    name: "no-unexpected-token",
    shortDescription: {
      text: "The token was unexpected.",
    },
    fullDescription: {
      text: "A token was encountered in a place where it wasn't expected.",
    },
    help: {
      text: NO_HELP_AVAILABLE,
    },
  },
];
