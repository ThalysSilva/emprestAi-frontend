export type MenuOption = 'discover' | 'create' | 'myEvents' | 'myAccount' | 'calendar';
export type MenuItem = {
  label: string;
  onClick: () => void;
};
export type MenuOptions = {
  [key in MenuOption]: MenuItem;
};
