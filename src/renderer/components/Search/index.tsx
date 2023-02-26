/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../customHooks/useDebouncedValue';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { SpinnerElement } from '../Spinner/Spinner';
import { SearchProps } from './types';

export const Search = ({
  onDebouncedValueChange,
  onChange,
  onSearch,
  debounceTimeMS,
  loading,
}: SearchProps) => {
  const [value, setValue] = useState('');
  const [debouncedValue, { cancel, setDebouncedValue }] = useDebouncedValue(
    value,
    debounceTimeMS || 425
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (onDebouncedValueChange) {
      onDebouncedValueChange(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  return (
    <Input
      value={value}
      addonBefore={
        loading ? (
          <SpinnerElement
            ringSize=".125rem"
            size={{ width: '1.375rem', height: '1.375rem' }}
          />
        ) : (
          <Icon name="search" size="medium" />
        )
      }
      placeholder="Search"
      onChange={handleChange}
      onPressEnter={() => {
        onSearch(debouncedValue);
        cancel();
        setDebouncedValue(value);
      }}
    />
  );
};
