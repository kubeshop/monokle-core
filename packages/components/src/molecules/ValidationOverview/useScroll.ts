import {ValidationResult} from '@monokle/validation';
import {useLayoutEffect, useRef} from 'react';
import {GroupByFilterOptionType, ValidationListNode} from './types';
import {isProblemSelected} from './utils';

export function useScroll({
  scrollTo,
  list,
  selectedProblem,
  groupByFilterValue,
}: {
  scrollTo: (index: number) => void;
  list: ValidationListNode[];
  selectedProblem: ValidationResult | undefined;
  groupByFilterValue: GroupByFilterOptionType;
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
      item => item.type === 'problem' && isProblemSelected(selectedProblem, item.problem)
    );

    if (index === -1) return;
    scrollToRef.current(index);
  }, [list, selectedProblem]);
}
