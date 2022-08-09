import './Button.scss';

export interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	size?: 'square' | 'small' | 'medium' | 'large';
	kind?: 'primary' | 'secondary';
	height?: 'regular' | 'thin';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactChild | React.ReactChild[];
}

const Button: React.FC<IButtonProps> = (props) => {
	const {
		disabled = false,
		children,
		onClick,
		kind = 'primary',
		size = 'medium',
		height = 'regular',
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
	const heightToClass = { regular: 'reg', thin: 'thn' };

	const buttonClass = `btn-${kindToClass[kind]}${
		disabled ? disabledToClass : ''
	}-${sizeToClass[size]}-${heightToClass[height]} ${className || ''}`;

	return (
		<button
			className={buttonClass}
			onClick={disabled ? undefined : onClick}
		>
			{children}
		</button>
	);
};

export default Button;
