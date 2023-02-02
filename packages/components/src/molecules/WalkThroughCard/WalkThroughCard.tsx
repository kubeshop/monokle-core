import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import * as S from './WalkThroughCard.styled';
import {WalkThroughCardProps} from './types';
import styled, { css } from 'styled-components';
import { Typography } from 'antd';
import { Colors } from '@/styles/Colors';

function WalkThroughCard({heading, items, mediaItems, onFinish}: WalkThroughCardProps) {
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
          <S.BackButton onClick={onFinish}>Back to Learn</S.BackButton>
          <S.NextButton onClick={onNextClickHandler}>
            {items?.length - 1 === sliceIndex ? 'Got it' : 'Next'}
          </S.NextButton>
        </S.Actions>
      </S.CardContent>
    </S.Container>
  );
};

WalkThroughCard.Slice = styled.div`
  display: grid;

  ul {
    padding-inline-start: 20px;
  }

  ul li::marker {
    color: ${Colors.grey2};
  }
`;

WalkThroughCard.SubHeading = styled(Typography.Title)`
  color: ${Colors.grey2} !important;
  font-weight: 700;
  font-size: 28px !important;
  line-height: 36px !important;
`;

WalkThroughCard.Text = styled(Typography.Text)<{$bold?: boolean}>`
  margin-bottom: 16px;
  color: ${Colors.grey2};
  font-size: 16px;
  line-height: 26px;
  ${({$bold}) => {
    if ($bold) {
      return css`
        font-weight: 700;
      `;
    } else {
      return css`
        font-weight: 400;
      `;
    }
  }};
`;

export default WalkThroughCard;
