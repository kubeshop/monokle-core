type NonEmptyArray<T> = [T, ...T[]];

export interface WalkThroughCardProps {
  heading: string;
  items: NonEmptyArray<React.ReactNode>;
  mediaItems: LearnMediaItem[];
  onFinish: () => void;
}

interface LearnMediaItem {
  index: number;
  src: string;
}
