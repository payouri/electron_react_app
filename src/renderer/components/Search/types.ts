export type SearchProps = {
  onDebouncedValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  onSearch: (value: string) => void;
  debounceTimeMS?: number;
  loading?: boolean;
};
