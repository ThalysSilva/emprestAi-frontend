import React from 'react';

import { useInputAutocomplete } from './hooks/useInputAutocomplete';
import { Text4 } from '../../Texts';
import { Option, OptionList } from '@/utils/types';
import { BaseInput } from '@/components/Input/components/BaseInput';
import { cn } from '@/utils/tailwind/className';
import { Input } from '@/components/Input';

type Props = {
  dispatchActionOnSelect?: (option: Option) => void;
  countOfDisplayedItems?: number;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  list: OptionList;
  id?: string;
  width?: number | 'full' | 'fit-content';
  zIndex?: number;
  withoutControl?: boolean;
};

export function InputAutocomplete({
  countOfDisplayedItems = 5,
  dispatchActionOnSelect,
  id = 'autocomplete',
  disabled = false,
  placeholder = '',
  withoutControl,
  zIndex = 17,
  label: label,
  width,
  list,
}: Props) {
  const {
    handleChange,
    listFiltered,
    onSelectItem,
    positionTop,
    selectedItem,
    handleBlur,
    handleFocus,
    showList,
  } = useInputAutocomplete({
    dispatchActionOnSelect,
    label,
    list,
    id,
  });

  return (
    <div className="relative flex flex-col text-start w-full group">
      <Input
        id={id}
        type={'hidden'}
        value={selectedItem.value ?? ''}
        withoutControl={withoutControl}
      />
      <BaseInput
        value={selectedItem.label ?? ''}
        placeholder={placeholder}
        label={label}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        autoComplete={'off'}
        isDisabled={disabled}
        width={width}
        id={id + '-label'}
      />
      <div
        className={cn(
          `absolute flex flex-col bg-background-primary z-10 overflow-y-scroll rounded-b-xl py-2 w-full transition-all duration-200 border-b border-x border-borderColor-secondary `,
          { hidden: listFiltered.length === 0 || !showList },
        )}
        style={{
          top: positionTop,
          maxHeight: (countOfDisplayedItems * 25 + 8).toString() + 'px',
          zIndex,
          boxShadow:
            '0 1px 0 0 var(--chakra-colors-borderColor-secondary), 1px 0 0 0 var(--chakra-colors-borderColor-secondary), -1px 0 0 0 var(--chakra-colors-borderColor-secondary)',
        }}
      >
        {listFiltered.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectItem(item)}
            className={
              'w-full flex h-[25px] cursor-pointer px-4 bg-background-primary hover:bg-background-primaryLight'
            }
          >
            <Text4>{item.label}</Text4>
          </div>
        ))}
      </div>
    </div>
  );
}
