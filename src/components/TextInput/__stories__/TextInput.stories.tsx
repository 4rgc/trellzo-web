import TextInput from '../TextInput';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

export default {
	title: 'Components/TextInput',
	component: TextInput,
	args: {
		variant: 'single',
	},
	argTypes: {
		onChanged: { action: 'clicked' },
	},
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div
			style={{
				padding: '20px',
				border: '2px black solid',
				width: '400px',
			}}
		>
			<TextInput {...args} value={value} onChange={setValue} />
		</div>
	);
};

export const Default = Template.bind({});

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = { placeholder: 'Enter something...' };

export const SingleLineWithRowsSpecified = Template.bind({});
SingleLineWithRowsSpecified.args = { rows: 5 };

export const Multiline = Template.bind({});
Multiline.args = { variant: 'multi' };

export const BiggerMultiline = Template.bind({});
BiggerMultiline.args = { variant: 'multi', rows: 6 };

export const MultilineWithPlaceholder = Template.bind({});
MultilineWithPlaceholder.args = {
	variant: 'multi',
	placeholder: 'Type something long here...',
};

export const LargeFont = Template.bind({});
LargeFont.args = { fontSize: 'lg' };

export const InATightContainer: StoryFn<typeof TextInput> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div
			style={{
				border: '2px black solid',
				width: '100px',
				padding: '10px',
			}}
		>
			<TextInput {...args} value={value} onChange={setValue} />
		</div>
	);
};
