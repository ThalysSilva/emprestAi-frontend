import { useEffect, useRef, useState } from 'react';

import { isOverflowing } from '@/utils/functions/isOverflowing';
import { useBreakpointValue } from '@chakra-ui/react';
import { useButton } from '../../Button/hooks/useButton';
import useWindowSize from '@/hooks/useWindowSize';

type Props = {
  resistanceSwap?: 0 | 1 | 2 | 3 | 4 | 5;
  zoomMode: 'none' | 'onSelect' | 'onHover';
  onSelectIndex?: (index: number) => void;
  elementsName: string;
  defaultCurrentItem?: number;
};

export function useCarousel({
  resistanceSwap = 2,
  onSelectIndex,
  elementsName,
  zoomMode,
  defaultCurrentItem,
}: Props) {
  const [initialSync, setInitialSync] = useState(true);
  const [isOverflow, setIsOverflow] = useState(true);
  const [isAbleToSwitch, setIsAbleToSwitch] = useState(true);
  const [currentItem, setCurrentItem] = useState(defaultCurrentItem ?? 0);
  const [startX, setStartX] = useState(0);
  const { isMobileDevice } = useWindowSize();

  const [direction, setDirection] = useState<'right' | 'left' | null>(null);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const { getAnimation } = useButton();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const zoomCanBeEnabled = isWideVersion && zoomMode !== 'none';

  function syncCurrentItem() {
    if (!parentRef.current) return;
    const parent = parentRef.current;

    const elements = document.querySelectorAll(`[id*='${elementsName}-item']`);
    const pivot = parent.scrollWidth / elements.length;
    const index = Math.round(parent.scrollLeft / pivot);
    setCurrentItem(index);
  }

  function checkOverflow() {
    if (isMobileDevice) return;
    if (!isAbleToSwitch) return;
    if (!parentRef.current) return;
    const parent = parentRef.current as HTMLDivElement;

    const hasOverflow = isOverflowing(parent, 'width');

    if (hasOverflow !== isOverflow) setIsOverflow(hasOverflow);
    syncCurrentItem();
  }

  function mouseIsDown(e: MouseEvent) {
    if (!isAbleToSwitch) return;
    if (!parentRef.current) return;
    if (!isOverflow) return;

    const parent = parentRef.current as HTMLDivElement;
    setStartX(e.pageX - parent.offsetLeft);
  }

  function mouseIsUp(e: MouseEvent) {
    if (!isAbleToSwitch) return;
    if (!parentRef.current) return;
    if (!isOverflow) return;

    e.preventDefault();

    const parent = parentRef.current as HTMLDivElement;
    const x = e.pageX - parent.offsetLeft;
    const walkX = x - startX;

    if (walkX > 50 * resistanceSwap) return setDirection('right');
    if (walkX < -50 * resistanceSwap) return setDirection('left');
  }

  function touchStart(e: TouchEvent) {
    if (!isAbleToSwitch) return;
    if (!parentRef.current) return;
    if (!isOverflow) return;

    const parent = parentRef.current as HTMLDivElement;
    setStartX(e.changedTouches[0].pageX - parent.offsetLeft);
  }

  function touchEnd(e: TouchEvent) {
    if (!isAbleToSwitch) return;
    if (!isAbleToSwitch) return;
    if (!parentRef.current) return;
    if (!isOverflow) return;

    const parent = parentRef.current as HTMLDivElement;
    const x = e.changedTouches[0].pageX - parent.offsetLeft;
    const walkX = x - startX;

    const timeout = setTimeout(() => {
      if (walkX > 50 * resistanceSwap) return setDirection('right');
      if (walkX < -50 * resistanceSwap) return setDirection('left');
      clearTimeout(timeout);
    }, 50);
  }

  function getZoomMode(isActive: boolean) {
    if (zoomMode === 'none') return;
    switch (zoomMode) {
      case 'onSelect':
        return `transform duration-150 ${
          isWideVersion
            ? isActive
              ? ' scale-100 mx-5 delay-300 '
              : 'scale-[0.75] -translate-y-6 -mx-4 delay-300'
            : ''
        }  `;
      case 'onHover':
        return ` ${isWideVersion ? 'transform duration-200 scale-100 hover:scale-110' : ''}`;
    }
  }

  function moveCarousel(mode: 'auto' | 'smooth' | 'instant' | undefined = 'smooth') {
    const parent = parentRef.current as HTMLDivElement;
    const elements = document.querySelectorAll(`[id*='${elementsName}-item']`);
    const element = elements[currentItem] as HTMLInputElement;
    if (!element) return;
    const distanceBetween = element.offsetLeft - parent.offsetWidth / 2 + element.offsetWidth / 2;
    parent.scroll({ left: distanceBetween, behavior: mode === 'instant' ? undefined : mode });

    onSelectIndex?.(currentItem);
    setTimeout(() => setIsAbleToSwitch(true), 450);
  }

  useEffect(() => {
    if (!direction) return;
    if (!parentRef.current) return;
    if (!isOverflow) return;
    if (!isAbleToSwitch) return;
    const elements = document.querySelectorAll(`[id*='${elementsName}-item']`);

    switch (direction) {
      case 'right':
        if (currentItem > 0) setCurrentItem((prev) => prev - 1);
        break;
      case 'left':
        if (currentItem < elements.length - 1) setCurrentItem((prev) => prev + 1);
        break;
    }
  }, [direction]);

  useEffect(() => {
    if (!parentRef.current) return;
    if (!isAbleToSwitch) return;
    setIsAbleToSwitch(false);
    if (initialSync) {
      setTimeout(() => moveCarousel('instant'), 10);
    } else {
      moveCarousel();
    }

    setInitialSync(false);
    setDirection(null);
  }, [currentItem]);

  useEffect(() => {
    if (typeof defaultCurrentItem === 'undefined') return;
    setCurrentItem(defaultCurrentItem);
  }, [defaultCurrentItem]);

  useEffect(() => {
    if (!parentRef.current) return;
    const parent = parentRef.current as HTMLDivElement;

    parent.addEventListener('touchstart', touchStart);
    parent.addEventListener('touchend', touchEnd);

    parent.addEventListener('mousedown', mouseIsDown);
    parent.addEventListener('mouseup', mouseIsUp);

    window.addEventListener('resize', checkOverflow);

    return () => {
      parent.removeEventListener('touchstart', touchStart);
      parent.removeEventListener('touchend', touchEnd);

      parent.removeEventListener('mousedown', mouseIsDown);
      parent.removeEventListener('mouseup', mouseIsUp);

      window.removeEventListener('resize', checkOverflow);
    };
  }, [currentItem, isOverflow, startX, direction, setDirection, isAbleToSwitch]);

  return {
    parentRef,
    setCurrentItem,
    currentItem,
    isOverflow,
    direction,
    getZoomMode,
    zoomCanBeEnabled,
    isAbleToSwitch,
    getAnimation,
    initialSync,
  };
}
