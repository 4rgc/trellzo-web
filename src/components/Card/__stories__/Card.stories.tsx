import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from '../Card';

export default {
	title: 'Components/Card',
	component: Card,
	argTypes: {
		onClick: { action: 'clicked' },
		title: { defaultValue: 'Title' },
		content: {
			defaultValue: `Labore odio voluptas voluptas vel qui vel. Aut est quo. Eveniet non tempore incidunt eum vero. Quia tempore error neque nam et numquam quidem. Amet voluptas delectus quisquam architecto numquam quia et impedit eos. Excepturi aliquid eum.`,
		},
	},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ children, ...args }) => (
	<Card {...args} style={{ width: '200px' }}>
		{children}
	</Card>
);

export const Default = Template.bind({});
