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
        <div className={`flex justify-center items-center h-28`}>
          <BigText1 className="font-alfaSlabOne font-normal">{'EmprestAí'}</BigText1>
        </div>
      }
      elseRender={
        <div className={`flex justify-center items-center h-12`}>
          <Text3 className="font-alfaSlabOne font-normal text-white">{'EmprestAí'}</Text3>
        </div>
      }
    />
  );
}
