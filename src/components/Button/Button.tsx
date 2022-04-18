import IPropsWithChildren from '../../interfaces/IPropsWithChildren';
import IPropsWithClassGenerator from '../../interfaces/IPropsWithClassGenerator';
import ClassGenerator from '../../types/ClassGenerator';
import './Button.css';

interface IButtonProps
	extends IPropsWithClassGenerator<'button'>,
		IPropsWithChildren<'button'>,
		React.ComponentPropsWithoutRef<'button'> {
	size?: 'square' | 'small' | 'medium' | 'large';
	kind?: 'primary' | 'secondary';
	disabled?: boolean;
	onClick?: () => void;
	classGenerator?: ClassGenerator<IButtonProps>;
	children?: React.ReactChild | React.ReactChild[];
}

export type ButtonProps = IButtonProps;

const defaultButtonClassGenerator: ClassGenerator<IButtonProps> = (props) => {
	const {
		size = 'medium',
		kind = 'primary',
		disabled = false,
		className,
	} = props;
	let buttonClass = 'btn-base';

	switch (kind) {
		case 'primary':
			buttonClass += ' btn-prm';
			break;
		case 'secondary':
			buttonClass += ' btn-sec';
			break;
	}

	switch (size) {
		case 'square':
			buttonClass += ' btn-sq';
			break;
		case 'small':
			buttonClass += ' btn-sm';
			break;
		case 'medium':
			buttonClass += ' btn-md';
			break;
		case 'large':
			buttonClass += ' btn-lg';
			break;
	}

	if (disabled) {
		buttonClass += ' btn-dis';
	}

	buttonClass += className ? ` ${className}` : '';

	return buttonClass;
};

export const Button: React.FC<ButtonProps> = (props) => {
	const {
		disabled = false,
		children,
		onClick,
		classGenerator = defaultButtonClassGenerator,
	} = props;

	let buttonClass = classGenerator(props);

	return (
		<button
			className={buttonClass}
			onClick={disabled ? undefined : onClick}
		>
			{children}
		</button>
	);
};
