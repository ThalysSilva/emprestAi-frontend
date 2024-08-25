'use client';
import React from 'react';

import { SideMenuMobile } from '@/components/SideMenuMobile';
import { SideMenu } from '@/components/SideMenu';
import { Text4 } from '@/components/Texts';
import { MenuItem } from '@/components/Menu/types';
import Image from 'next/image';

type Props = {
  closeMenu: () => void;
  show: boolean;
  items: MenuItem[];
};

export function SideMenuMobileModal({ closeMenu, show, items }: Props) {
  return (
    <SideMenuMobile
      closeMenu={closeMenu}
      show={show}
      leftHeaderElement={
        <div className="relative w-20 h-20 flex justify-center items-center">
          <Image alt="Avatar" className="rounded-full" fill src={'/cute-dog.jpg'} />
        </div>
      }
    >
      <div className="flex flex-col w-full gap-3 justify-between h-full">
        <div className="flex flex-col flex-1 w-full gap-3 pb-3">
          <div className="flex w-full h-fit border-b-2 border-b-brand-secondaryLight px-4 pb-2 gap-4">
            <div className="flex-1 flex flex-col justify-between">
              <Text4 className="text-white pl-7">{`Olá!!`}</Text4>
            </div>
          </div>
          <SideMenu.Content className="px-4 gap-4">
            {items.map((item, index) => (
              <SideMenu.Item key={index} text={item.label} onClick={item.onClick} />
            ))}
          </SideMenu.Content>
        </div>
      </div>
    </SideMenuMobile>
  );
}
