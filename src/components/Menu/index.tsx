'use client';

import { User } from '@/@types/entities';
import { MenuMobile } from '../MenuMobile';
import { SideMenuDesktop } from '../SideMenuDesktop';
import { When } from '../When';
import { useMenu } from './hooks/useMenu';

type Props = {
  userData?: User;
};

export function Menu({ userData }: Props) {
  const { isWideVersion, menuItems } = useMenu();

  return (
    <When
      value={isWideVersion}
      render={<SideMenuDesktop userData={userData} items={menuItems} />}
      elseRender={<MenuMobile userData={userData} items={menuItems} />}
    />
  );
}
