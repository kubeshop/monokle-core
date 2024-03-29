#!/usr/bin/env node

// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import prompts from "prompts";
import { blue, red, reset, yellow } from "kolorist";

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist(process.argv.slice(2), { string: ["_"] });
const cwd = process.cwd();

const PLUGIN_TYPES = [
  {
    name: "validation",
    color: yellow,
    variants: [
      {
        name: "validation-ts",
        display: "TypeScript",
        description: "Validation plugin written in Typescript",
        color: blue,
        templates: [
          {
            name: "basic",
            description: "A sample typescript plugin with a single sample rule",
            path: "validation-ts/basic-template"
          },
          {
            name: "with-custom-crd",
            description: "A sample typescript plugin using a custom resource definition (CRD)",
            path: "validation-ts/crd-template"
          }
        ]
      }
    ]
  }
];

const TEMPLATES = PLUGIN_TYPES.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]
).reduce((a, b) => a.concat(b), []);

const renameFiles = {
  _gitignore: ".gitignore",
  _npmrc: ".npmrc"
};

async function init() {
  const defaultTargetDir = "monokle-plugin";
  let targetDir = formatTargetDir(argv._[0]);
  let template = argv.template || argv.t;
  let pluginName;

  const hasTemplateArg = template !== undefined;
  const communityPath = path.join(cwd, ".community");
  const isMonokleCommunityRepository = fs.existsSync(communityPath);

  const getProjectName = () =>
    targetDir === "." ? path.basename(path.resolve()) : pluginName;

  let result = {};

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : "text",
          name: "pluginName",
          message: reset("Plugin name:"),
          initial: defaultTargetDir,
          onState: (state) => {
            pluginName = state.value ?? defaultTargetDir;
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          }
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : "text"),
          name: "packageName",
          message: reset("Package name:"),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name"
        },
        {
          type: template && TEMPLATES.includes(template) ? null : "select",
          name: "pluginType",
          message:
            typeof template === "string" && !TEMPLATES.includes(template)
              ? reset(
                `"${template}" isn't a valid template. Please choose from below: `
              )
              : reset("Select a plugin type:"),
          initial: 0,
          choices: PLUGIN_TYPES.map((pluginTypes) => {
            const pluginTypeColor = pluginTypes.color;
            return {
              title: pluginTypeColor(pluginTypes.name),
              value: pluginTypes
            };
          }),
          onState: (state) => {
            if (!isMonokleCommunityRepository) {
              return;
            }

            targetDir = `${state.value.name}/${targetDir}`;
          }
        },
        {
          type: (pluginType) =>
            pluginType && pluginType.variants ? "select" : null,
          name: "variant",
          message: reset("Select a variant:"),
          // @ts-ignore
          choices: (pluginType) =>
            pluginType.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.name),
                description: variant.description,
                value: variant.name
              };
            })
        },
        {
          type: (variant, values) => {
            return values.pluginType && variant &&
              values.pluginType.variants.find(elm => elm.name === variant) ? "select" : null;
          },
          name: "variantTemplate",
          message: reset("Select a template:"),
          // @ts-ignore
          choices: (variant, values) =>
            values.pluginType.variants.find(elm => elm.name === variant)?.templates.map(template => {
              return {
                title: template.name,
                description: template.description,
                value: template.path
              };
            })
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
          name: "overwrite",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker"
        }
      ],

      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        }
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { pluginType, overwrite, packageName, variant, variantTemplate } = result;

  if (hasTemplateArg && isMonokleCommunityRepository) {
    if (template.startsWith("validation")) {
      targetDir = `validation/${targetDir}`;
    }
  }

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // determine template
  template = variantTemplate ? path.join( "templates", variantTemplate ) : variant || pluginType || template;

  console.log(`\nScaffolding plugin in ${root}...`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    template
  );

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );

  pkg.name = packageName || getProjectName();

  write("package.json", JSON.stringify(pkg, null, 2));

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  switch (pkgManager) {
    case "yarn":
      console.log("  yarn");
      console.log("  yarn dev");
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();
}

/**
 * @param {string | undefined} targetDir
 */
function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

/**
 * @param {string} projectName
 */
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}

/**
 * @param {string} projectName
 */
function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

/**
 * @param {string} srcDir
 * @param {string} destDir
 */
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

/**
 * @param {string} path
 */
function isEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

/**
 * @param {string} dir
 */
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}

init().catch((e) => {
  console.error(e);
});
