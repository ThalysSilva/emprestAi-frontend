import React from 'react';
import { BigText1, Text3 } from '../Texts';
import { When } from '../When';
type Props = {
  size?: 'small' | 'large';
};

export function Hero({ size = 'large' }: Props) {
  const isLargeSize = size === 'large';
  return (
    <When
      value={isLargeSize}
      render={
        <div className={`flex justify-center items-start h-28`}>
          <BigText1 className="font-alfaSlabOne font-normal">{'ca'}</BigText1>
          <BigText1 className="font-alfaSlabOne font-normal relative top-11 right-7">
            {'Lendário'}
          </BigText1>
        </div>
      }
      elseRender={
        <div className={`flex justify-center items-start h-12`}>
          <Text3 className="font-alfaSlabOne font-normal text-white">{'ca'}</Text3>
          <Text3 className="font-alfaSlabOne font-normal relative top-5 right-2 text-white">
            {'Lendário'}
          </Text3>
        </div>
      }
    />
  );
}
