import {Colors} from '@/styles/Colors';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {WalkThroughCard} from '@/molecules/WalkThroughCard';
import WalkThrough from './WalkThrough';
import * as S from './WalkThrough.styled';
import { WalkThoughArgs } from './args';

export default {
  title: 'Molecules/WalkThrough',
  component: WalkThrough,
} as ComponentMeta<typeof WalkThrough>;

const Template: ComponentStory<typeof WalkThrough> = args => (
  <WalkThrough {...args}>
    {args.topic === 'explore' && (
      <WalkThroughCard
        heading="Explore"
        onFinish={() => {}}
        mediaItems={[]}
        items={[
          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>1. Your K8s workspace</WalkThroughCard.SubHeading>

            <WalkThroughCard.Text>
              Create a project - then find here all the resource inputs contained in it. Switch between them for
              different views. Click on <S.MenuOutlinedIcon /> to change project or create a new one.
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,

          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>2. Preview Helm charts & Kustomization</WalkThroughCard.SubHeading>
            <WalkThroughCard.Text>
              We find and show Helm charts and Kustomization found on your projects. Also, you can preview them, see &
              fix errors and more.
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,

          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>3. Quick cluster preview</WalkThroughCard.SubHeading>
            <WalkThroughCard.Text>
              Click
              <S.Icon name="cluster-dashboard" />
              on the left menu to quickly connect your cluster (no project creation needed) and have a dedicated
              dashboard with live activity, incidences, resources, performance, errors and more.
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,
        ]}
      />
    )}

    {args.topic === 'edit' && (
      <WalkThroughCard
        heading="Edit"
        onFinish={() => {}}
        mediaItems={[]}
        items={[
          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>1. Templates & Forms</WalkThroughCard.SubHeading>
            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Use code or forms indistinctly.</WalkThroughCard.Text> Jump from one to another anytime to see changes.
            </WalkThroughCard.Text>
            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Code / form split editor.</WalkThroughCard.Text> Click on
              <S.Icon name="split-view" $transparent $color={Colors.blue6} />
              to access a split screen with side-to-side code and form views.
            </WalkThroughCard.Text>
            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Right click to use a template</WalkThroughCard.Text>
              &nbsp;anywhere in your code.
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,

          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>2. Compare & sync</WalkThroughCard.SubHeading>
            <WalkThroughCard.Text>
              Try this dedicated utility to compare resources that are at any stage of the k8s lifecycle: local,
              cluster, previews, on git...
            </WalkThroughCard.Text>
            <WalkThroughCard.Text>You can promote, deploy or commit changes made, or take to local anything published.</WalkThroughCard.Text>
          </WalkThroughCard.Slice>,
        ]}
      />
    )}

    {args.topic === 'validate' && (
      <WalkThroughCard
        heading="Validate"
        onFinish={() => {}}
        mediaItems={[]}
        items={[
          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>1. Enforce validation policies</WalkThroughCard.SubHeading>

            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Activate OPA rules </WalkThroughCard.Text>based on your policy or preferences, severity etc. Set it all
              up in
              <S.SettingOutlinedIcon />
            </WalkThroughCard.Text>

            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Check schema version.</WalkThroughCard.Text> Make sure you have your desired K8s schema version on. Find
              it always on the top bar for quick switch.
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,

          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>2. See errors introduced</WalkThroughCard.SubHeading>

            <WalkThroughCard.Text>
              A validation or schema change can incur in new errors. Find them easily grouped for a quick fix in
              <S.Icon name="checked" />
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,
        ]}
      />
    )}

    {args.topic === 'publish' && (
      <WalkThroughCard
        heading="Publish"
        onFinish={() => {}}
        mediaItems={[]}
        items={[
          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>1. Git</WalkThroughCard.SubHeading>
            <WalkThroughCard.Text>Take your changes management into the Git workflow - for any project. You can:</WalkThroughCard.Text>
            <ul>
              <li>
                <WalkThroughCard.Text>
                  <WalkThroughCard.Text $bold>Get your local files to git</WalkThroughCard.Text> with 1 click.
                </WalkThroughCard.Text>
              </li>
              <li>
                <WalkThroughCard.Text>
                  <WalkThroughCard.Text $bold>Manage branches</WalkThroughCard.Text> from the top bar.
                </WalkThroughCard.Text>
              </li>
              <li>
                <WalkThroughCard.Text>
                  <WalkThroughCard.Text $bold>Create PRs, commit, push, stage/unstage...</WalkThroughCard.Text>
                  &nbsp;in a nutshell, everything git. Find it all in
                </WalkThroughCard.Text>
              </li>
            </ul>
          </WalkThroughCard.Slice>,

          <WalkThroughCard.Slice>
            <WalkThroughCard.SubHeading>2. Cluster</WalkThroughCard.SubHeading>
            <WalkThroughCard.Text>Connect & manage as many clusters as you want:</WalkThroughCard.Text>
            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Deploy </WalkThroughCard.Text>any change or state of your resources to the cluster anytime.
            </WalkThroughCard.Text>
            <WalkThroughCard.Text>
              <WalkThroughCard.Text $bold>Configure a different accent color </WalkThroughCard.Text>for each one of your clusters for easier
              differentiation.
            </WalkThroughCard.Text>
          </WalkThroughCard.Slice>,
        ]}
      />
    )}
  </WalkThrough>
);

export const WalkThroughPage = Template.bind({});
WalkThroughPage.args = WalkThoughArgs;
