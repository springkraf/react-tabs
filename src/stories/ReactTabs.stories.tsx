import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactTabs } from '../tabs';
import { useArgs } from 'storybook/internal/preview-api';
import { fn } from 'storybook/test';

const meta: Meta<typeof ReactTabs> = {
  title: 'Example/ReactTabs',
  tags: ['autodocs'],
  component: ReactTabs,
  argTypes: {
    variant: { control: 'select', options: ['compact', 'normal'] },
    activeKey: { control: 'text' },
    items: { control: 'object' },
    containerClass: { control: 'text' },
    iconColors: { control: 'object' },
  },
  args: {
    onChange: fn(),
    onRemove: fn(),
    onReorder: fn(),
    onResizing: fn(),
    renderLeft: fn(),
    renderRight: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactTabsStory: Story = {
  args: {
    items: [
      {
        key: '1',
        title: { content: <span>Tab 1</span> },
        getContent() {
          return <div>Content Tab 1</div>;
        },
      },
      {
        key: '2',
        title: { content: <span>Tab 2</span> },
        getContent() {
          return <div>Content Tab 2</div>;
        },
      },
      {
        key: '3',
        title: { content: <span>Tab 3</span> },
        getContent() {
          return <div>Content Tab 3</div>;
        },
      },
      {
        key: '4',
        title: { content: <span>Tab 4</span> },
        getContent() {
          return <div>Content Tab 4</div>;
        },
      },
      {
        key: '5',
        title: { content: <span>Tab 5</span> },
        getContent() {
          return <div>Content Tab 5</div>;
        },
      },
      {
        key: '6',
        title: { content: <span>Tab 6</span> },
        getContent() {
          return <div>Content Tab 6</div>;
        },
      },
      {
        key: '7',
        title: { content: <span>Tab 7</span> },
        getContent() {
          return <div>Content Tab 7</div>;
        },
      },
      {
        key: '8',
        title: { content: <span>Tab 8</span> },
        getContent() {
          return <div>Content Tab 8</div>;
        },
      },
      {
        key: '9',
        title: { content: <span>Tab 9</span> },
        getContent() {
          return <div>Content Tab 9</div>;
        },
      },
    ],
    activeKey: '1',
    variant: 'normal',
  },
  render(args) {
    const [, updateArgs] = useArgs();

    const handleChange = (val: string) => {
      updateArgs({ activeKey: val });
      args.onChange?.(val);
    };

    return <ReactTabs {...args} onChange={handleChange} />;
  },
};
