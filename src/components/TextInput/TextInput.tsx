import { ComponentProps } from 'react';
import './TextInput.scss';

type InputChangeHandler = (text: string) => void;

interface ISingleLineInputProps {
	variant?: 'single';
	onChange?: InputChangeHandler;
	fontSize?: 'md' | 'lg';
	value?: string;
}

interface IMultilineInputProps {
	variant?: 'multi';
	onChange?: InputChangeHandler;
	fontSize?: 'md' | 'lg';
	value?: string;
	rows?: number;
	cols?: number;
}

export type TextInputProps = (ISingleLineInputProps | IMultilineInputProps) &
	Omit<ComponentProps<'input'> & ComponentProps<'textarea'>, 'onChange'>;

const TextInput: React.FC<TextInputProps> = (props) => {
	const {
		variant = 'single',
		onChange,
		value,
		fontSize = 'md',
		...otherProps
	} = props;

	const className = `tinput-${fontSize}`;

	return variant === 'multi' ? (
		<textarea
			className={className}
			onChange={onChange && ((e) => onChange(e.target.value))}
			value={value}
			{...otherProps}
		>
			{value}
		</textarea>
	) : (
		<input
			className={className}
			value={value}
			onChange={onChange && ((e) => onChange(e.target.value))}
			{...otherProps}
		/>
	);
};

export default TextInput;
