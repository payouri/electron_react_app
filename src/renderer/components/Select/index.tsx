/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-default-export */
import { ReactNode, useMemo } from 'react';
import ReactSelect, { Options, StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';

export type SelectProps<
  Option extends { label: ReactNode; value: string | number }
> = {
  value?: Option['value'];
  options: Options<Option>;
  onChange: (value: Option) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
};

export const Select = <
  Option extends { label: ReactNode; value: string | number }
>({
  value,
  options,
  onChange,
  ...props
}: SelectProps<Option>) => {
  const { gap } = useTheme();
  const currentValue = useMemo(() => {
    return options.find(
      (option) => 'value' in option && option.value === value
    );
  }, [value, JSON.stringify(options)]);

  const styles = useMemo(
    (): StylesConfig<Option> => ({
      container: (provided) => ({
        ...provided,
        flex: '1 1 auto',
      }),
      input: (provided) => ({
        ...provided,
        margin: gap[2],
        padding: `${gap[2]} 0`,
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: `${gap[2]} ${gap[8]}`,
      }),
      placeholder: (provided) => ({
        ...provided,
        margin: `0 ${gap[2]}`,
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        marginTop: gap[8],
        marginBottom: gap[8],
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      indicatorContainer: (provided) => ({
        ...provided,
        padding: gap[8],
      }),
      option: (provided) => ({
        ...provided,
        padding: `${gap[8]} ${gap[12]}`,
      }),
      menuList: (provided) => ({
        ...provided,
        paddingTop: gap[8],
        paddingBottom: gap[8],
      }),
    }),
    [JSON.stringify(gap)]
  );

  return (
    <ReactSelect<Option, false>
      {...props}
      styles={styles}
      value={currentValue}
      options={options}
      onChange={(data, meta) => {
        if (
          data &&
          meta.action === 'select-option' &&
          'value' in data &&
          data?.value
        ) {
          onChange(data);
        }
      }}
    />
  );
};

export default Select;
