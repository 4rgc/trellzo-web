import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof GhostCard>;

const Template: ComponentStory<typeof GhostCard> = ({ children, ...args }) => (
	<GhostCard {...args} style={{ width: '200px' }}>
		{children}
	</GhostCard>
);

export const Default = Template.bind({});
