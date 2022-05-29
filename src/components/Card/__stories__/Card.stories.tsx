import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from '../Card';

export default {
	title: 'Components/Card',
	component: Card,
	args: {
		content: `Labore odio voluptas voluptas vel qui vel. Aut est quo. Eveniet non tempore incidunt eum vero. Quia tempore error neque nam et numquam quidem. Amet voluptas delectus quisquam architecto numquam quia et impedit eos. Excepturi aliquid eum.`,
		title: 'Title',
	},
	argTypes: {
		onClick: { action: 'clicked' },
	},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ children, ...args }) => (
	<Card {...args} style={{ width: '200px' }}>
		{children}
	</Card>
);

export const Default = Template.bind({});

export const WithCover = Template.bind({});
WithCover.args = { imageUrl: '/regular-cover.png' };

export const WithVerticalCover = Template.bind({});
WithVerticalCover.args = { imageUrl: '/vertical-cover.png' };

export const WithHorizontalCover = Template.bind({});
WithHorizontalCover.args = { imageUrl: '/horizontal-cover.png' };

export const WithLongTitle = Template.bind({});
WithLongTitle.args = { title: 'Hello this is long title' };

export const WithCustomChildren: ComponentStory<typeof Card> = (args) => (
	<Card {...args} style={{ width: '200px' }}>
		<div
			style={{
				backgroundColor: 'blue',
				color: 'white',
				borderRadius: '10px',
				textAlign: 'center',
			}}
		>
			Custom stuff
		</div>
	</Card>
);

export const WithCustomContent: ComponentStory<typeof Card> = (args) => (
	<Card
		{...args}
		style={{ width: '200px' }}
		content={
			<div
				style={{
					backgroundColor: 'blue',
					color: 'white',
					borderRadius: '10px',
					textAlign: 'center',
				}}
			>
				Custom content
			</div>
		}
	/>
);
