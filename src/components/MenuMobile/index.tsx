'use client';
import React from 'react';

import { List as HamburgerIcon } from '@phosphor-icons/react';
import { ButtonIcon } from '@/components/ButtonIcon';
import ArrowLeftIcon from '@/assets/icons/ArrowLeft';
import { SideMenuMobileModal } from './components';
import { useMenuMobile } from './useMenuMobile';
import { When } from '@/components/When';
import { Hero } from '@/components/Hero';
import { User } from '@/@types/entities';
import { MenuItem } from '../Menu/types';

type Props = {
  userData?: User;
  items: MenuItem[];
};

export function MenuMobile({ userData, items }: Props) {
  const {
    hasBackButton,
    show,
    closeMenu,
    openMenu,
    secondaryLightColor,
    backButtonAction,
    logoClickAction,
  } = useMenuMobile();
  return (
    <div className="grid grid-cols-3 items-center bg-brand-primary h-16">
      <SideMenuMobileModal closeMenu={closeMenu} show={show} userData={userData} items={items} />
      <When value={!hasBackButton}>
        <div className="flex flex-1 justify-start">
          <ButtonIcon bgTransparent onClick={openMenu}>
            <HamburgerIcon size={30} color={secondaryLightColor} />
          </ButtonIcon>
        </div>
      </When>
      <When value={hasBackButton}>
        <ButtonIcon bgTransparent onClick={backButtonAction}>
          <ArrowLeftIcon />
        </ButtonIcon>
      </When>
      <div className="flex justify-center items-center">
        <button className="flex justify-center items-center w-fit h-fit" onClick={logoClickAction}>
          <Hero size="small" />
        </button>
      </div>
    </div>
  );
}
