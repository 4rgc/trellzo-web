import { ComponentMeta, ComponentStory } from '@storybook/react';
import EditableCard from '..';

export default {
	title: 'Components/EditableCard',
} as ComponentMeta<typeof EditableCard>;

const Template: ComponentStory<typeof EditableCard> = (args) => (
	<EditableCard {...args} style={{ width: '200px' }} />
);

export const Default = Template.bind({});

export const WithTitle = Template.bind({});
WithTitle.args = { hasTitleField: true };
