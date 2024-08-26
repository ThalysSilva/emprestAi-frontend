import { Option } from '@/utils/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type ListItem = {
  value: string;
  label: string;
};

type Props = {
  list: ListItem[];
  id: string;
  dispatchActionOnSelect?: (option: Option) => void;
  label?: string;
  withoutControl?: boolean;
};

const optionEmpty = { value: '', label: '' };

export function useInputAutocomplete({
  dispatchActionOnSelect,
  label = '',
  list,
  id,
  withoutControl,
}: Props) {
  const [listFiltered, setListFiltered] = useState<ListItem[]>([]);
  const [positionTop, setPositionTop] = useState('0px');
  const [selectedItem, setSelectedItem] = useState<ListItem>(optionEmpty);
  const [showList, setShowList] = useState(false);
  const {
    register,
    setValue,
    unregister,
    formState: { errors },
  } = useFormContext();
  const messageError = errors[id]?.message as string;

  const shouldValidate = !!messageError;

  function handleBlur() {
    setTimeout(() => {
      setShowList(false);
    }, 200);
  }

  function handleFocus() {
    setShowList(true);
  }

  useEffect(() => {
    const autocompleteInput = document.getElementById(id + '-label');
    if (!autocompleteInput) return;
    const height = autocompleteInput.scrollHeight;
    setPositionTop((height + (label ? 24 : 0)).toString() + 'px');
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const targetValue = e.target.value;
    if (!list) return;

    if (!targetValue && !selectedItem.value) {
      setSelectedItem(optionEmpty);
      setListFiltered([]);
      return;
    }

    const listTemp = list.filter((item) => {
      if (!list[0].label) {
        return false;
      }
      return item.label.toLocaleLowerCase().includes(targetValue.toLocaleLowerCase());
    });

    setSelectedItem({ value: targetValue, label: targetValue });
    setListFiltered(listTemp);
  }

  function onSelectItem(item: ListItem) {
    setSelectedItem(item);
    setListFiltered([]);
    if (dispatchActionOnSelect) dispatchActionOnSelect(item);
    if (withoutControl) return;
    setValue(id, item.value, { shouldValidate });
  }

  useEffect(() => {
    if (withoutControl) return;
    register(id);
    return () => unregister(id);
  }, [id, register, withoutControl, unregister]);

  return {
    showList,
    handleChange,
    selectedItem,
    listFiltered,
    positionTop,
    onSelectItem,
    handleBlur,
    handleFocus,
    messageError,
  };
}
