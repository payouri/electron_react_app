/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-default-export */
import { Meta, Story } from '@storybook/react';
import { Search } from '.';
import { SearchProps } from './types';

export const SearchStory: Story<SearchProps> = (args) => <Search {...args} />;

const SearchMeta: Meta<SearchProps> = {
  title: 'Components/Search',
  component: SearchStory,
};

export default SearchMeta;
