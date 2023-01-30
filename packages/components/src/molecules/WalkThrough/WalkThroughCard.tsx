import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import * as S from './WalkThroughCard.styles';
import {WalkThroughCardProps} from './types';

const WalkThroughCard: React.FC<WalkThroughCardProps> = ({heading, items, mediaItems, onFinish}) => {
  const [sliceIndex, setSliceIndex] = useState(0);
  const onNextClickHandler = () => {
    if (items?.length - 1 === sliceIndex) {
      onFinish();
    } else {
      setSliceIndex(sliceIndex + 1);
    }
  };

  const mediaItem = mediaItems?.find(el => el.index === sliceIndex);

  return (
    <S.Container>
      <S.CardMedia>
        <AnimatePresence>
          {mediaItem && (
            <S.AnimatedImg
              key={`key_${sliceIndex}`}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              src={mediaItem.src}
            />
          )}
        </AnimatePresence>
      </S.CardMedia>

      <S.CardContent>
        <S.Heading>{heading}</S.Heading>
        <S.Slide>
          <AnimatePresence>
            <motion.div
              style={{position: 'absolute'}}
              key={`key_${sliceIndex}`}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              {items?.at(sliceIndex)}
            </motion.div>
          </AnimatePresence>
        </S.Slide>

        <S.Actions>
          <S.BackButton disabled={sliceIndex === 0} onClick={onFinish}>
            Back to Learn
          </S.BackButton>
          <S.NextButton onClick={onNextClickHandler}>
            {items?.length - 1 === sliceIndex ? 'Got it' : 'Next'}
          </S.NextButton>
        </S.Actions>
      </S.CardContent>
    </S.Container>
  );
};

export default WalkThroughCard;
