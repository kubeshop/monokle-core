function definePlugin(name, init) {
    const rules = Object.entries(init.rules).map(([name, r]) => {
        return {
            id: r.id,
            name: r.name,
            shortDescription: {
                text: r.description,
            },
            fullDescription: {
                text: r.fullDescription ?? r.description,
            },
            help: {
                text: r.help ?? "No help available.",
            },
            validate: r.validate,
        };
    });
    return {
        name,
        description: init.description,
        rules,
    };
}
function defineRule(id, init) {
    return { id, ...init };
}

const noEmptyAnnotations = defineRule("RCA001", {
    name: "no-empty-annotations",
    description: "Require annotations as metadata.",
    help: "Add any annotation to the Kubernetes resource.",
    validate({ resources }, { report }) {
        resources.forEach((resource) => {
            const labels = Object.entries(resource.content.metadata?.labels ?? {});
            const hasLabels = labels.length > 0;
            if (!hasLabels) {
                report(resource, { path: "metadata.labels" });
            }
        });
    },
});

var main = definePlugin("annotations", {
    description: "Validates your annotations",
    rules: {
        noEmptyAnnotations,
    },
});

export { main as default };
