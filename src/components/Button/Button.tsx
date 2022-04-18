import './Button.scss';

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	size?: 'square' | 'small' | 'medium' | 'large';
	kind?: 'primary' | 'secondary';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactChild | React.ReactChild[];
}

export const Button: React.FC<IButtonProps> = (props) => {
	const {
		disabled = false,
		children,
		onClick,
		kind = 'primary',
		size = 'medium',
		className,
	} = props;

	const kindToClass = { primary: 'prm', secondary: 'sec' };
	const disabledToClass = '-dis';
	const sizeToClass = {
		square: 'sq',
		small: 'sm',
		medium: 'md',
		large: 'lg',
	};

	const buttonClass = `btn-${kindToClass[kind]}${
		disabled ? disabledToClass : ''
	}-${sizeToClass[size]} ${className || ''}`;

	return (
		<button
			className={buttonClass}
			onClick={disabled ? undefined : onClick}
		>
			{children}
		</button>
	);
};
