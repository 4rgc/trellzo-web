import TextInput from '../TextInput';
import { ComponentMeta, ComponentStory } from '@storybook/react';
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
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div
			style={{
				padding: '20px',
				border: '2px black solid',
				width: '400px',
			}}
		>
			<TextInput {...args} value={value} onChanged={setValue} />
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

export const InATightContainer: ComponentStory<typeof TextInput> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div
			style={{
				border: '2px black solid',
				width: '100px',
				padding: '10px',
			}}
		>
			<TextInput {...args} value={value} onChanged={setValue} />
		</div>
	);
};
