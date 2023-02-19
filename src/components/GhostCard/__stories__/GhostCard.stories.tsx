import { StoryFn, Meta } from '@storybook/react';

import GhostCard from '../GhostCard';

export default {
	title: 'Components/GhostCard',
	component: GhostCard,
	args: {
		innerText: 'Add a new asdf...',
	},
	argTypes: {
		onClick: { action: 'clicked' },
	},
} as Meta<typeof GhostCard>;

const Template: StoryFn<typeof GhostCard> = ({ children, ...args }) => (
	<GhostCard {...args} style={{ width: '200px' }}>
		{children}
	</GhostCard>
);

export const Default = Template.bind({});

export const NoImage = Template.bind({});
NoImage.args = { isImageDisabled: true };

export const Small = Template.bind({});
Small.args = { size: 'sm' };

export const Large = Template.bind({});
Large.args = { size: 'lg' };
