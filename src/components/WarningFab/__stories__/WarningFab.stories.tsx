import { StoryFn, Meta } from '@storybook/react';
import WarningFab from '../WarningFab';

export default {
	title: 'Components/WarningFab',
	argTypes: {
		display: {
			type: 'boolean',
		},
		displayOnMessage: {
			type: 'boolean',
		},
		message: {
			type: 'string',
		},
	},
} as Meta<typeof WarningFab>;

const Template: StoryFn<typeof WarningFab> = (args) => <WarningFab {...args} />;

export const Default = Template.bind({});

export const AlwaysDisplay = Template.bind({});
AlwaysDisplay.args = { display: true };

export const DisplayOnMessage = Template.bind({});
DisplayOnMessage.args = { displayOnMessage: true, message: 'hello' };

export const DisplayOnMessageNoMessage = Template.bind({});
DisplayOnMessageNoMessage.args = { displayOnMessage: true };

export const WithCustomAction = Template.bind({});
WithCustomAction.args = { display: true };
WithCustomAction.argTypes = { onClick: { action: 'clicked' } };
