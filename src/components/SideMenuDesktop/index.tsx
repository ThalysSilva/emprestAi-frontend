import React from 'react';

import { SideMenu } from '../SideMenu';
import { Hero } from '../Hero';
import { MenuItem } from '../Menu/types';

type Props = {
  items: MenuItem[];
};

export function SideMenuDesktop({ items }: Props) {
  return (
    <SideMenu.Root>
      <SideMenu.Header.Root />
      <SideMenu.Content>
        {items.map((item) => (
          <SideMenu.Item key={item.label} text={item.label} onClick={item.onClick} />
        ))}
      </SideMenu.Content>
      <div className="mb-5">
        <Hero size="small" />
      </div>
    </SideMenu.Root>
  );
}
