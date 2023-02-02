export type HelpTopicType = 'documentation' | 'video-tutorial' | 'discord';

export type HelpfulResourceCardType = {
  description: string;
  title: string;
  onClick: () => void;
};

export type LearnPageType = {
  onHelpfulResourceCardClick: (topic: HelpTopicType) => void;
  children: React.ReactNode;
};
