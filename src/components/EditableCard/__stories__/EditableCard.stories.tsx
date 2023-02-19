import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import EditableCard from '..';
import Button from '../../Button';

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
} as Meta<typeof EditableCard>;

const Template: StoryFn<typeof EditableCard> = (args) => {
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

export const WithAButton = Template.bind({});
WithAButton.args = {
	hasButtons: true,
	children: (
		<Button height="thin" size="medium" onClick={action('button clicked')}>
			click me
		</Button>
	),
};

export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
	hasButtons: true,
	children: (
		<>
			<Button
				kind="secondary"
				height="thin"
				size="small"
				onClick={action('button clicked')}
			>
				cancel
			</Button>
			<Button
				size="small"
				height="thin"
				onClick={action('button clicked 2')}
			>
				ok
			</Button>
		</>
	),
};

export const SmallWithAButton = Template.bind({});
SmallWithAButton.args = {
	size: 'sm',
	hasButtons: true,
	children: (
		<Button height="thin" size="medium" onClick={action('button clicked')}>
			click me
		</Button>
	),
};
