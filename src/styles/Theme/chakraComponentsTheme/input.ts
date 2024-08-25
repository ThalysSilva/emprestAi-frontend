import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys,
);

const flushed = definePartsStyle({
  field: {
    borderBottomWidth: 2,
    borderColor: 'borderColor.secondary',
    color: 'brand.secondary',
    focusBorderColor: 'brand.secondary',
    paddingX: 2,
    _hover: { borderColor: 'borderColor.secondary' },
    _focus: {
      borderColor: 'borderColor.secondary',
      boxShadow:
        '0 4px 4px -4px var(--chakra-colors-brand-secondary),  inset 0 -6px 4px -7px var(--chakra-colors-brand-secondary)',
    },
  },
});

const outline = definePartsStyle({
  field: {
    borderColor: 'borderColor.secondary',
    color: 'text.text.secondary',
    borderRadius: 8,
    borderWidth: 1,
    focusBorderColor: 'borderColor.secondary',
    _focus: {
      borderColor: 'borderColor.secondary',
      boxShadow: '0 0 0 1px var(--chakra-colors-borderColor-secondary)',
    },
    _active: { borderColor: 'borderColor.secondary' },
    _hover: { borderColor: 'borderColor.secondary' },
    _focusVisible: { outline: 'none' },
  },
});

const filled = definePartsStyle({
  field: {
    _readOnly: {
      borderColor: 'borderColor.secondary',
      backgroundColor: 'neutral.100',
    },
    _active: {
      borderColor: 'borderColor.secondary',
      backgroundColor: 'neutral.100',
    },
    _focus: { borderColor: 'borderColor.secondary', backgroundColor: 'neutral.100' },
  },
});

export const inputTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'flushed',
  } as any,
  baseStyle: {
    field: {
      _placeholder: {
        color: '#FFFFFF',
        opacity: 0.6,
      },
    },
  },
  variants: {
    flushed,
    outline,
    filled,
  },
});
