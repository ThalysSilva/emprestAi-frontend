import { User } from '@/@types/entities';
import { SideMenu } from '../SideMenu';
import { Hero } from '../Hero';
import { MenuItem } from '../Menu/types';

type Props = {
  userData?: User;
  items: MenuItem[];
};

export function SideMenuDesktop({ userData, items }: Props) {
  return (
    <SideMenu.Root>
      <SideMenu.Header.Root userData={userData}>
        <SideMenu.Header.LogoutButton />
      </SideMenu.Header.Root>
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
