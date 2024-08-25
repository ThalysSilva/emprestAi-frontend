'use client';

import { User } from '@/@types/entities';
import { MenuMobile } from '../MenuMobile';
import { SideMenuDesktop } from '../SideMenuDesktop';
import { When } from '../When';
import { useMenu } from './hooks/useMenu';

export function Menu() {
  const { isWideVersion, menuItems } = useMenu();

  return (
    <When
      value={isWideVersion}
      render={<SideMenuDesktop items={menuItems} />}
      elseRender={<MenuMobile items={menuItems} />}
    />
  );
}
