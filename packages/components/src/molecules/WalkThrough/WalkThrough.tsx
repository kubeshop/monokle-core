import {Colors} from '@/styles/Colors';
import {WalkThroughProps} from './types';

import * as S from './WalkThrough.styled';
import WalkThroughCard from './WalkThroughCard';

const WalkThrough: React.FC<WalkThroughProps> = ({
  topic,
  mediaItems,
  dismissWalkThrough,
}) => {
  return (
    <S.Modal open={!!topic} onCancel={dismissWalkThrough} footer={null}>
      {topic === 'explore' && (
        <WalkThroughCard
          heading="Explore"
          onFinish={dismissWalkThrough}
          mediaItems={mediaItems}
          items={[
            <S.Slice>
              <S.SubHeading>1. Your K8s workspace</S.SubHeading>

              <S.Text>
                Create a project - then find here all the resource inputs
                contained in it. Switch between them for different views. Click
                on <S.MenuOutlinedIcon /> to change project or create a new one.
              </S.Text>
            </S.Slice>,

            <S.Slice>
              <S.SubHeading>
                2. Preview Helm charts & Kustomization
              </S.SubHeading>
              <S.Text>
                We find and show Helm charts and Kustomization found on your
                projects. Also, you can preview them, see & fix errors and more.
              </S.Text>
            </S.Slice>,

            <S.Slice>
              <S.SubHeading>3. Quick cluster preview</S.SubHeading>
              <S.Text>
                Click
                <S.Icon name="cluster-dashboard" />
                on the left menu to quickly connect your cluster (no project
                creation needed) and have a dedicated dashboard with live
                activity, incidences, resources, performance, errors and more.
              </S.Text>
            </S.Slice>,
          ]}
        />
      )}

      {topic === 'edit' && (
        <WalkThroughCard
          heading="Edit"
          mediaItems={mediaItems}
          onFinish={dismissWalkThrough}
          items={[
            <S.Slice>
              <S.SubHeading>1. Templates & Forms</S.SubHeading>
              <S.Text>
                <S.Text $bold>Use code or forms indistinctly.</S.Text> Jump from
                one to another anytime to see changes.
              </S.Text>
              <S.Text>
                <S.Text $bold>Code / form split editor.</S.Text> Click on
                <S.Icon name="split-view" $transparent $color={Colors.blue6} />
                to access a split screen with side-to-side code and form views.
              </S.Text>
              <S.Text>
                <S.Text $bold>Right click to use a template</S.Text>
                anywhere in your code.
              </S.Text>
            </S.Slice>,

            <S.Slice>
              <S.SubHeading>2. Compare & sync</S.SubHeading>
              <S.Text>
                Try this dedicated utility to compare resources that are at any
                stage of the k8s lifecycle: local, cluster, previews, on git...
              </S.Text>
              <S.Text>
                You can promote, deploy or commit changes made, or take to local
                anything published.
              </S.Text>
            </S.Slice>,
          ]}
        />
      )}

      {topic === 'validate' && (
        <WalkThroughCard
          heading="Validate"
          mediaItems={mediaItems}
          onFinish={dismissWalkThrough}
          items={[
            <S.Slice>
              <S.SubHeading>1. Enforce validation policies</S.SubHeading>

              <S.Text>
                <S.Text $bold>Activate OPA rules </S.Text>based on your policy
                or preferences, severity etc. Set it all up in
                <S.SettingOutlinedIcon />
              </S.Text>

              <S.Text>
                <S.Text $bold>Check schema version.</S.Text> Make sure you have
                your desired K8s schema version on. Find it always on the top
                bar for quick switch.
              </S.Text>
            </S.Slice>,

            <S.Slice>
              <S.SubHeading>2. See errors introduced</S.SubHeading>

              <S.Text>
                A validation or schema change can incur in new errors. Find them
                easily grouped for a quick fix in
                <S.Icon name="checked" />
              </S.Text>
            </S.Slice>,
          ]}
        />
      )}

      {topic === 'publish' && (
        <WalkThroughCard
          heading="Publish"
          mediaItems={mediaItems}
          onFinish={dismissWalkThrough}
          items={[
            <S.Slice>
              <S.SubHeading>1. Git</S.SubHeading>
              <S.Text>
                Take your changes management into the Git workflow - for any
                project. You can:
              </S.Text>
              <ul>
                <li>
                  <S.Text>
                    <S.Text $bold>Get your local files to git</S.Text> with 1
                    click.
                  </S.Text>
                </li>
                <li>
                  <S.Text>
                    <S.Text $bold>Manage branches</S.Text> from the top bar.
                  </S.Text>
                </li>
                <li>
                  <S.Text>
                    <S.Text $bold>
                      Create PRs, commit, push, stage/unstage...
                    </S.Text>
                    &nbsp;in a nutshell, everything git. Find it all in
                  </S.Text>
                </li>
              </ul>
            </S.Slice>,

            <S.Slice>
              <S.SubHeading>2. Cluster</S.SubHeading>
              <S.Text>Connect & manage as many clusters as you want:</S.Text>
              <S.Text>
                <S.Text $bold>Deploy </S.Text>any change or state of your
                resources to the cluster anytime.
              </S.Text>
              <S.Text>
                <S.Text $bold>Configure a different accent color </S.Text>for
                each one of your clusters for easier differentiation.
              </S.Text>
            </S.Slice>,
          ]}
        />
      )}
    </S.Modal>
  );
};

export default WalkThrough;
