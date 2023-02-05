import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {WalkThroughCardProps} from './types';
import styled, {css} from 'styled-components';
import {Button, Typography} from 'antd';
import {Colors} from '@/styles/Colors';

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
    <Container>
      <CardMedia>
        <AnimatePresence>
          {mediaItem && (
            <AnimatedImg
              key={`key_${sliceIndex}`}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              src={mediaItem.src}
            />
          )}
        </AnimatePresence>
      </CardMedia>

      <CardContent>
        <Heading>{heading}</Heading>
        <Slide>
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
        </Slide>

        <Actions>
          <BackButton onClick={onFinish}>Back to Learn</BackButton>
          <NextButton onClick={onNextClickHandler}>{items?.length - 1 === sliceIndex ? 'Got it' : 'Next'}</NextButton>
        </Actions>
      </CardContent>
    </Container>
  );
}

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

// Styled Components

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 64px;
  padding: 24px 32px 32px 32px;

  height: 402px;
`;

const CardMedia = styled.div`
  position: relative;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Slide = styled.div`
  position: relative;
`;

const Heading = styled(Typography.Title)`
  color: ${Colors.geekblue8} !important;
  font-weight: 700 !important;
  font-size: 28px !important;
  line-height: 36px !important;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const NextButton = styled(Button).attrs({
  size: 'large',
})`
  min-width: 72px !important;
  background-color: ${Colors.grey3};
  color: ${Colors.whitePure};

  :hover {
    color: ${Colors.blue6};
  }
`;

const BackButton = styled(Button).attrs({
  type: 'text',
})`
  padding: 0;
  color: ${Colors.blue6} !important;

  :hover:not(:disabled),
  :focus:not(:disabled) {
    background-color: unset !important;
    color: ${Colors.grey3} !important;
  }
`;

const AnimatedImg = styled(motion.img)`
  position: absolute;
  background: ${Colors.gradientBackground};
  border-radius: 4px;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  max-width: 390px;
  height: auto;
  object-fit: contain;
`;
