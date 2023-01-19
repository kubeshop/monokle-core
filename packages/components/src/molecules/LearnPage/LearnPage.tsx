import { CheckOutlined, UnorderedListOutlined } from "@ant-design/icons";

import { Icon } from "@/atoms/Icon";

import HelpfulResourceCard from "./HelpfulResourceCard";
import LearnCard from "./LearnCard";
import * as S from "./LearnPage.styled";

type LearnTopic = "explore" | "edit" | "validate" | "publish";

type HelpTopic =
	| "start-guide"
	| "video-tutorial"
	| "documentation"
	| "discord"
	| "whats-new"
	| "feedback";

export interface IProps {
	onLearnCardClick: (topic: LearnTopic) => void;
	onHelpfulResourceCardClick: (topic: HelpTopic) => void;
}

const LearnPage: React.FC<IProps> = ({
	onLearnCardClick,
	onHelpfulResourceCardClick,
}) => {
	return (
		<S.LearnPageContainer>
			<S.Description>
				Select in which stage of the K8s manifests management you are in (or
				from which one you want to learn more about) and let us show you how
				Monokle can help you.
			</S.Description>

			<S.LearnCardsContainer>
				<LearnCard
					buttonText="Your workspace"
					description="Configure your resources workspace, whereas it's local, on a Git, a cluster or from scratch."
					icon={<UnorderedListOutlined />}
					title="Explore"
					onClick={() => onLearnCardClick("explore")}
				/>

				<LearnCard
					buttonText="Edit & fix"
					description="Fix errors in your resources, compare them, learn about yaml best practices and much more."
					icon={<Icon name="terminal" style={{ fontSize: "16px" }} />}
					title="Edit"
					onClick={() => onLearnCardClick("edit")}
				/>

				<LearnCard
					buttonText="Validate"
					description="Configure your policies & validation rules, create your own. See & fix validation errors."
					icon={<CheckOutlined />}
					title="Validate"
					onClick={() => onLearnCardClick("validate")}
				/>

				<LearnCard
					buttonText="Publish & Git"
					description="Save locally, get into Git (Github, Gitlab), create PRs, deploy to a cluster..."
					icon={<S.CloudUploadOutlined />}
					title="Publish"
					onClick={() => onLearnCardClick("publish")}
				/>
			</S.LearnCardsContainer>

			<S.SubTitle>Helpful resources</S.SubTitle>

			<S.HelpfulResourcesContainer>
				<HelpfulResourceCard
					description="A quick read"
					title="Start Guide"
					onClick={() => onHelpfulResourceCardClick("start-guide")}
				/>
				<HelpfulResourceCard
					description="To learn the basics"
					title="3-minute Video Tutorial"
					onClick={() => onHelpfulResourceCardClick("video-tutorial")}
				/>
				<HelpfulResourceCard
					description="in Confluence"
					title="Documentation"
					onClick={() => onHelpfulResourceCardClick("documentation")}
				/>
				<HelpfulResourceCard
					description="Join the conversation"
					title="Discord"
					onClick={() => onHelpfulResourceCardClick("discord")}
				/>
				<HelpfulResourceCard
					description="in the latest version?"
					title="What's new"
					onClick={() => onHelpfulResourceCardClick("whats-new")}
				/>
				<HelpfulResourceCard
					description="Share your thoughts"
					title="Feedback"
					onClick={() => onHelpfulResourceCardClick("feedback")}
				/>
			</S.HelpfulResourcesContainer>
		</S.LearnPageContainer>
	);
};

export default LearnPage;
