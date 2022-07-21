import { ComponentProps } from 'react';
import './TextInput.scss';

type InputChangeHandler = (text: string) => void;

interface ISingleLineInputProps {
	onChanged?: InputChangeHandler;
	fontSize?: 'md' | 'lg';
	value?: string;
	variant?: 'single';
}

interface IMultilineInputProps {
	variant?: 'multi';
	onChanged?: InputChangeHandler;
	fontSize?: 'md' | 'lg';
	value?: string;
	rows?: number;
	cols?: number;
}

export type TextInputProps = (ISingleLineInputProps | IMultilineInputProps) &
	(ComponentProps<'input'> & ComponentProps<'textarea'>);

const TextInput: React.FC<TextInputProps> = (props = { variant: 'single' }) => {
	const { variant, onChanged, value, fontSize = 'md', ...otherProps } = props;

	const className = `tinput-${fontSize}`;

	return variant === 'multi' ? (
		<textarea
			className={className}
			onChange={onChanged && ((e) => onChanged(e.target.value))}
			{...otherProps}
		>
			{value}
		</textarea>
	) : (
		<input
			className={className}
			value={value}
			onChange={onChanged && ((e) => onChanged(e.target.value))}
			{...otherProps}
		/>
	);
};

export default TextInput;
