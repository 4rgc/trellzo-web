import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import EditableCard from '..';

export default {
	title: 'Components/EditableCard',
	args: {
		bodyPlaceholder: '',
		titlePlaceholder: undefined,
	},
	argTypes: {
		onBodyChange: { action: 'body input changed', type: 'function' },
		onTitleChange: { action: 'title input changed', type: 'function' },
		titlePlaceholder: {
			type: 'string',
		},
		hasTitleField: {
			type: 'boolean',
		},
		size: {
			control: { type: 'radio' },
			options: ['sm', 'md', 'lg'],
		},
	},
} as ComponentMeta<typeof EditableCard>;

const Template: ComponentStory<typeof EditableCard> = (args) => {
	const [bodyValue, setBodyValue] = useState('');
	const [titleValue, setTitleValue] = useState('');

	return args.hasTitleField ? (
		<EditableCard
			{...args}
			bodyValue={bodyValue}
			onBodyChange={(text) => {
				setBodyValue(text);
				if (args.onBodyChange) args.onBodyChange(text);
			}}
			titleValue={titleValue}
			onTitleChange={(text: string) => {
				setTitleValue(text);
				if (args.onTitleChange) args.onTitleChange(text);
			}}
			style={{ width: '200px' }}
		/>
	) : (
		<EditableCard
			{...args}
			bodyValue={bodyValue}
			onBodyChange={(text) => {
				setBodyValue(text);
				if (args.onBodyChange) args.onBodyChange(text);
			}}
			style={{ width: '200px' }}
		/>
	);
};

export const Default = Template.bind({});

export const WithTitle = Template.bind({});
WithTitle.args = { hasTitleField: true };

export const Small = Template.bind({});
Small.args = { size: 'sm' };

// Shouldn't have a title field
export const SmallWithTitle = Template.bind({});
SmallWithTitle.args = { size: 'sm', hasTitleField: true };

export const Medium = Template.bind({});
Medium.args = { size: 'md' };

export const Large = Template.bind({});
Large.args = { size: 'lg' };

export const LargeWithTitle = Template.bind({});
LargeWithTitle.args = { size: 'lg', hasTitleField: true };
