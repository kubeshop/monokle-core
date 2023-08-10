export type KubernetesLike = {
  apiVersion: string;
  kind: string;
  metadata?: {
    name: string;
    namespace?: string;
  };
  spec?: {
    names?: {
      kind?: string;
    };
  };
};

export function isKubernetesLike(content: any): content is KubernetesLike {
  return content && typeof content.apiVersion === 'string' && typeof content.kind === 'string';
}
