'use client';

import React, { ReactNode } from 'react';

import { doNothing } from '@/utils/functions/general';
import { useCarousel } from './hook/useCarousel';
import { twMerge } from 'tailwind-merge';
import { Text1 } from '../Texts';
import { When } from '../When';
import ArrowLeftIcon from '@/assets/icons/ArrowLeft';

type Props = {
  zoomMode?: 'none' | 'onSelect' | 'onHover';
  onSelectIndex?: (index: number) => void;
  resistanceSwap?: 0 | 1 | 2 | 3 | 4 | 5;
  wrapperSwitchClassName?: string;
  switchType?: 'arrow' | 'line';
  containerClassName?: string;
  alwaysShowSwitch?: boolean;
  type?: 'fit' | 'overflow';
  wrapperClassName?: string;
  hideSpacesAround?: boolean;
  children?: ReactNode[];
  currentLabel?: string;
  elementsName?: string;
  hideSwitch?: boolean;
  paddingX?: number;
  defaultCurrentItem?: number
};

export function Carousel({
  elementsName = 'carousel-item',
  wrapperSwitchClassName,
  switchType = 'line',
  containerClassName,
  type = 'overflow',
  zoomMode = 'none',
  wrapperClassName,
  alwaysShowSwitch,
  hideSpacesAround,
  resistanceSwap,
  paddingX = 80,
  onSelectIndex,
  currentLabel,
  hideSwitch,
  children,
  defaultCurrentItem,
}: Props) {
  const {
    zoomCanBeEnabled,
    setCurrentItem,
    currentItem,
    getZoomMode,
    isOverflow,
    parentRef,
    direction,
    isAbleToSwitch,
    getAnimation,
    initialSync,
  } = useCarousel({
    resistanceSwap,
    onSelectIndex,
    elementsName,
    zoomMode,
    defaultCurrentItem,
  });

  return (
    <div
      className={twMerge(
        `flex flex-col ${
          type === 'overflow' ? 'w-screen ' : 'w-full'
        } justify-center items-center gap-6  h-fit`,
        containerClassName,
      )}
    >
      <div
        ref={parentRef}
        id={'containerCarousel'}
        style={{
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
        }}
        className={twMerge(
          `relative flex overflow-x-hidden gap-4 md:gap-12 w-full z-50 h-fit xl:px-6 scroll-smooth snap-mandatory snap-x flex-nowrap select-none drag-none 
          ${zoomCanBeEnabled ? 'py-16 xl:-top-[64px]' : ''}
          ${initialSync ? 'hidden' : 'flex'}`,
          wrapperClassName,
        )}
      >
        <When value={!hideSpacesAround}>
          <div
            className={twMerge(
              `flex min-w-[1000px] h-1 xl:hidden ${alwaysShowSwitch ? 'xl:flex' : ''}`,
            )}
          />
        </When>
        {children?.map((child, index) => (
          <div
            className={`w-fit h-fit z-[60] flex-none select-none snap-center drag-none ${getZoomMode(
              index === currentItem,
            )}`}
            onClick={direction || !isAbleToSwitch ? doNothing : () => setCurrentItem(index)}
            id={`${elementsName}-item-${index}`}
            key={index}
          >
            {child}
          </div>
        ))}
        <When value={!hideSpacesAround}>
          <div
            className={twMerge(
              `flex min-w-[1000px] h-1 xl:hidden ${alwaysShowSwitch ? 'xl:flex' : ''}`,
            )}
          />
        </When>
      </div>
      <When value={alwaysShowSwitch || (!hideSwitch && isOverflow)}>
        <When value={switchType === 'line' && children?.length}>
          <div
            className={twMerge(
              `flex gap-6 w-[40%] justify-center items-center ${
                zoomCanBeEnabled ? '-mt-20' : 'mt-5'
              }`,
              wrapperSwitchClassName,
            )}
          >
            {children?.map((_, index) => (
              <button
                disabled={!isAbleToSwitch}
                key={index}
                onClick={() => setCurrentItem(index)}
                id={`${elementsName}-switch-${index}`}
                className={`flex flex-1 h-10 justify-center items-center`}
              >
                <div
                  className={`flex flex-1  h-1 rounded-full transition-all duration-200 ${
                    currentItem === index ? 'bg-brand-secondary' : 'bg-borderColor-light'
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </When>
        <When value={switchType === 'arrow'}>
          <div
            className={twMerge(
              `flex gap-6 w-fit justify-center items-center ${
                zoomCanBeEnabled ? '-mt-20' : 'mt-5'
              }`,
              wrapperSwitchClassName,
            )}
          >
            <When
              value={currentItem === 0}
              render={<div className="h-10 w-10" />}
              elseRender={
                <button
                  disabled={!isAbleToSwitch}
                  key={'arrowLeft'}
                  onClick={() => setCurrentItem(currentItem === 0 ? currentItem : currentItem - 1)}
                  id={`switch-arrowLeft`}
                  className={twMerge(
                    ` bg-slate-300 rounded-lg flex flex-1 h-10 w-10 justify-center items-center select-none`,
                    getAnimation(!isAbleToSwitch),
                  )}
                >
                  <span className="flex justify-center items-center">
                    <ArrowLeftIcon />
                  </span>
                </button>
              }
            />
            <When value={currentLabel}>
              <Text1 className="min-w-[200px] text-center">{currentLabel}</Text1>
            </When>
            <When
              value={currentItem === (children?.length ?? 1) - 1}
              render={<div className="h-10 w-10" />}
              elseRender={
                <button
                  disabled={!isAbleToSwitch}
                  key={'arrowRight'}
                  onClick={() =>
                    setCurrentItem(
                      currentItem === (children?.length ?? 1) - 1 ? currentItem : currentItem + 1,
                    )
                  }
                  id={`switch-arrowRight`}
                  className={twMerge(
                    `bg-slate-300 rounded-lg flex flex-1 h-10 w-10 justify-center items-center select-none`,
                    getAnimation(!isAbleToSwitch),
                  )}
                >
                  <span className="flex justify-center items-center rotate-180">
                    <ArrowLeftIcon />
                  </span>
                </button>
              }
            />
          </div>
        </When>
      </When>
    </div>
  );
}
