import {LearnTopicType} from '@/types';

type NonEmptyArray<T> = [T, ...T[]];

export interface WalkThroughCardProps {
  heading: string;
  items: NonEmptyArray<React.ReactNode>;
  mediaItems: LearnMediaItem[];
  onFinish: () => void;
}

export interface WalkThroughProps {
  topic: LearnTopicType;
  mediaItems: LearnMediaItem[];
  dismissWalkThrough: () => void;
}

interface LearnMediaItem {
  index: number;
  url: string;
}
