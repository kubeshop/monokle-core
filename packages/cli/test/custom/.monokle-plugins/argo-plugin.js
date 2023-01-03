const a=["argocd-cm","argocd-cmd-params-cm","argocd-rbac-cm","argocd-tls-certs-cm","argocd-ssh-known-hosts-cm"];function e(a){return"object"==typeof a&&"argoproj.io/v1alpha1"===a?.apiVersion&&"Application"===a?.kind}var o={id:"ARGO",name:"argo",displayName:"ArgoCD Validation plugin",description:"Validation rules related to ArgoCD",rules:{argoConfigMaps:{id:1,description:"Check that ArgoCD ConfigMaps have required label",help:"Add app.kubernetes.io/part-of: argocd label to this ConfigMap for ArgoCD to use it",validate({resources:e},{report:o}){e.filter((a=>function(a){return"object"==typeof a&&"v1"===a?.apiVersion&&"ConfigMap"===a?.kind}(a))).filter((e=>a.includes(e.metadata?.name))).forEach((a=>{"argocd"!==(a.metadata?.labels??{})["app.kubernetes.io/part-of"]&&o(a,{path:"metadata.labels"})}))}},appDestination:{id:2,description:"Argo Application's destination are mutually exclusive",help:"Either use 'server' or 'name', but not both.",validate({resources:a},{report:o}){a.filter(e).forEach((a=>{const e=void 0!==a.spec.destination.name,t=void 0!==a.spec.destination.server;!e&&t||e&&!t||o(a,{path:"spec.destination"})}))}}}};export{o as default};
