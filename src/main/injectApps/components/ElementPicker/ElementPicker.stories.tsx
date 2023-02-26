/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-default-export */
import { Meta, Story } from '@storybook/react';
import { ImagePreview } from '../../../../renderer/components/ImagePreview';
import { ElementPicker as Component } from '.';
import { ElementPickerProps } from './types';

const Template: Story<ElementPickerProps> = (args) => (
  <div>
    <Component {...args} />
    <ImagePreview
      hasPointerEvents
      width="5rem"
      alt="Akropolis, Athens, Greece"
      src="https://images.unsplash.com/photo-1668093375941-ccfe6c34c89c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod</p>
    <a href="https://www.zalando.com">Zalando Website</a>
    <div>1000</div>
  </div>
);

export const ElementPicker = Template.bind({});

export const ElementPickerMeta: Meta = {
  title: 'Injected Apps/ElementPicker',
  component: ElementPicker,
  argTypes: {
    elementType: {
      control: {
        type: 'select',
        options: ['link', 'image', 'text', 'number'],
      },
    },
  },
};

export default ElementPickerMeta;
