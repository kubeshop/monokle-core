import {ValidationResult} from '@monokle/validation';
import {useLayoutEffect, useRef} from 'react';
import {ShowByFilterOptionType, ValidationListNode} from './types';
import {isProblemSelected} from './utils';

export function useScroll({
  scrollTo,
  list,
  selectedProblem,
  showByFilterValue,
}: {
  scrollTo: (index: number) => void;
  list: ValidationListNode[];
  selectedProblem: ValidationResult | undefined;
  showByFilterValue: ShowByFilterOptionType;
}) {
  const listRef = useRef(list);
  listRef.current = list;
  const scrollToRef = useRef(scrollTo);
  scrollToRef.current = scrollTo;

  useLayoutEffect(() => {
    if (!selectedProblem) {
      return;
    }

    const index = listRef.current.findIndex(
      item => item.type === 'problem' && isProblemSelected(selectedProblem, item.problem, showByFilterValue)
    );

    if (index === -1) return;
    scrollToRef.current(index);
  }, [list, selectedProblem]);
}
