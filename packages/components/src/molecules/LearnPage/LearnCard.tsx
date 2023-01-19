import React from "react";
import * as S from "./LearnCard.styled";

type IProps = {
	description: string;
	icon: JSX.Element;
	title: string;
	onClick: () => void;
};

const LearnCard: React.FC<IProps> = (props) => {
	const { description, icon, title, onClick } = props;

	const onKeyDown = (event: React.KeyboardEvent) => {
		event.preventDefault();
		if (event.key === "Enter" || event.key === " ") {
			onClick();
		}
	};

	return (
		<S.LearnCardContainer role="button" onClick={onClick} onKeyDown={onKeyDown}>
			<S.IconContainer>{icon}</S.IconContainer>
			<S.Title>{title}</S.Title>
			<S.Description>{description}</S.Description>
		</S.LearnCardContainer>
	);
};

export default LearnCard;
