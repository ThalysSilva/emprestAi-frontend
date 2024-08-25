import { useConfigsContext } from '@/contexts/Configs';
import { colors } from '@/styles/Theme/colors';
import { useState } from 'react';

export function useMenuMobile() {
  const [show, setShow] = useState(false);
  const { secondaryLight: secondaryLightColor } = colors.brand;
  const {
    header: { hasBackButton, backButtonAction, logoClickAction },
  } = useConfigsContext();

  function openMenu() {
    setShow(true);
  }

  function closeMenu() {
    setShow(false);
  }

  return {
    secondaryLightColor,
    backButtonAction,
    logoClickAction,
    hasBackButton,
    closeMenu,
    openMenu,
    show,
  };
}
