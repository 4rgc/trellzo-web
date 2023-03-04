import { Meta, StoryFn } from '@storybook/react';
import LoadingBar from '../LoadingBar';

export default {
	title: 'Components/LoadingBar',
	component: LoadingBar,
} as Meta<typeof LoadingBar>;

const Template: StoryFn<typeof LoadingBar> = (args) => (
	<div style={{ width: '120px' }}>
		<LoadingBar {...args} />
	</div>
);

export const Default = Template.bind({});

export const Large = Template.bind({});
Large.args = { size: 'large' };

export const Blue = Template.bind({});
Blue.args = { color: 'blue', state: 100 };

export const Green = Template.bind({});
Green.args = { color: 'green', state: 100 };

export const HalfFull = Template.bind({});
HalfFull.args = { state: 50 };
