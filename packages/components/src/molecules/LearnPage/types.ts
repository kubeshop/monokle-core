export type HelpTopicType = 'documentation' | 'video-tutorial' | 'discord';

export type LearnTopicType = 'explore' | 'edit' | 'validate' | 'publish';

export type HelpfulResourceCardType = {
  description: string;
  title: string;
  onClick: () => void;
};

export type LearnCardType = {
  description: string;
  icon: JSX.Element;
  title: string;
  onClick: () => void;
};

export type LearnPageType = {
  onLearnCardClick: (topic: LearnTopicType) => void;
  onHelpfulResourceCardClick: (topic: HelpTopicType) => void;
};
