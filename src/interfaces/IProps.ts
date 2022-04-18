import AnyElement from '../types/AnyElement';

export default interface IProps<T extends AnyElement> {
	props?: React.ComponentPropsWithoutRef<T>;
}
