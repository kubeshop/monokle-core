import { WalkThroughCardProps } from "./types";
import WalkThroughCard from "./WalkThroughCard";
import * as S from './WalkThroughCard.styled';

export const WalkThoughCardArgs: WalkThroughCardProps = {
  heading: "Welcome to the new K8s workspace",
  onFinish: () => {},
  mediaItems: [],
  items: [
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
  ],
};
