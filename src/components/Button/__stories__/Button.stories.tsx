import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../Button';

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
	<Button {...args}>{children}</Button>
);

export const Default = Template.bind({});

export const Square = Template.bind({});
Square.args = { size: 'square', children: 'OK' };

export const Small = Template.bind({});
Small.args = { size: 'small', children: 'Small' };

export const Medium = Template.bind({});
Medium.args = { size: 'medium', children: 'Medium Btn' };

export const Large = Template.bind({});
Large.args = { size: 'large', children: 'Large Button !!!' };

export const Primary = Template.bind({});
Primary.args = { kind: 'primary', children: 'Primary' };

export const Secondary = Template.bind({});
Secondary.args = { kind: 'secondary', children: 'Secondary' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, children: 'disabled' };

export const Thin = Template.bind({});
Thin.args = { height: 'thin' };

export const CustomClass = Template.bind({});
CustomClass.args = {
	disabled: false,
	children: 'fake disabled',
	className: 'btn-dis',
};
