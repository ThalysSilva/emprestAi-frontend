'use client';
import React from 'react';

import { SideMenuMobile } from '@/components/SideMenuMobile';
import { SideMenu } from '@/components/SideMenu';
import { Text4 } from '@/components/Texts';
import { signOut } from 'next-auth/react';
import { User } from '@/@types/entities';
import { MenuItem } from '@/components/Menu/types';

type Props = {
  closeMenu: () => void;
  userData?: User;
  show: boolean;
  items: MenuItem[];
};

export function SideMenuMobileModal({ closeMenu, show, userData, items }: Props) {
  const { alias } = userData ?? {};
  return (
    <SideMenuMobile
      closeMenu={closeMenu}
      show={show}
      leftHeaderElement={
        <div className="flex justify-center items-center w-fit h-fit">
          <span className="w-10 h-10 rounded-full bg-white" />
        </div>
      }
    >
      <div className="flex flex-col w-full gap-3 justify-between h-full">
        <div className="flex flex-col flex-1 w-full gap-3 pb-3">
          <div className="flex w-full h-fit border-b-2 border-b-brand-secondaryLight px-4 pb-2 gap-4">
            <div className="flex-1 flex flex-col justify-between">
              <Text4 className="text-white">{`Olá, ${alias}`}</Text4>
            </div>
          </div>
          <SideMenu.Content className="px-4 gap-4">
            {items.map((item, index) => (
              <SideMenu.Item key={index} text={item.label} onClick={item.onClick} />
            ))}
            <SideMenu.Item onClick={() => signOut()} text="Sair" />
          </SideMenu.Content>
        </div>
      </div>
    </SideMenuMobile>
  );
}
