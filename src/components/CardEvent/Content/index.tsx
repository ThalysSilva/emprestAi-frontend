'use client';
import { Text2, Text3, Text4, Text5 } from '@/components/Texts';
import { formatDatePTBR } from '@/utils/functions/date';
import React, { ReactNode } from 'react';
import { ThumbsUp, ChatsCircle } from '@phosphor-icons/react';

type Props = {
  children?: ReactNode;
  description: string;
  name: string;
  date: Date;
  upvotes: number;
  commentQty: number;
};

export function CardEventContent({
  children,
  commentQty,
  date,
  description,
  name,
  upvotes,
}: Props) {
  return (
    <div className={'flex flex-col w-full h-full bg-background-primaryLight'}>
      {children}
      <div className="flex flex-col w-full flex-1 p-3">
        <div className="flex flex-col flex-1 w-full">
          <Text2 className="font-bold">{name}</Text2>
          <Text5>{description}</Text5>
        </div>
        <div className={'flex justify-between w-full'}>
          <Text5>{formatDatePTBR(date)}</Text5>
          <div className={'flex gap-5'}>
            <span className="flex gap-2  justify-center items-center">
              <ChatsCircle size={20} />
              <Text5 className="font-semibold">{upvotes}</Text5>
            </span>
            <span className="flex gap-2 justify-center items-center">
              <ThumbsUp size={20}/>
              <Text5 className="font-semibold">{commentQty}</Text5>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
