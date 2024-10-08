import { colors } from '@/styles/Theme/colors';
import { CustomIconProps } from '@/utils/types';
import React from 'react';

const { secondary } = colors.brand;

export default function PencilIcon({
  fill = secondary,
  width = '17',
  height = '16',
  hoverAnimate,
}: CustomIconProps) {
  const viewBox = `0 0 17 16`;
  return (
    <svg
      className={hoverAnimate ? `hover:opacity-70 duration-200 cursor-pointer` : ``}
      xmlns={'http://www.w3.org/2000/svg'}
      viewBox={viewBox}
      height={height}
      width={width}
      fill={'none'}
    >
      <path
        d="M15.9062 1.78125L14.7188 0.59375C14.3438 0.21875 13.8125 0 13.3125 0C12.8125 0 12.2812 0.21875 11.9062 0.59375L9.5625 2.9375L8.5 4L0.875 11.625L0.5 15.1875C0.4375 15.625 0.78125 16 1.21875 16C1.25 16 1.28125 16 1.3125 16L4.875 15.625L12.5 8L13.5625 6.9375L15.9062 4.59375C16.6875 3.8125 16.6875 2.5625 15.9062 1.78125ZM4.1875 14.1875L2.09375 14.4062L2.3125 12.3125L9.53125 5.0625L10.5 4.09375L12.4062 6L11.4375 6.96875L4.1875 14.1875ZM14.8438 3.53125L13.4688 4.9375L11.5625 3.03125L12.9688 1.65625C13.0938 1.53125 13.25 1.5 13.3125 1.5C13.375 1.5 13.5312 1.53125 13.6562 1.65625L14.8438 2.84375C15.0312 3.03125 15.0312 3.34375 14.8438 3.53125Z"
        fill={fill}
      />
    </svg>
  );
}
