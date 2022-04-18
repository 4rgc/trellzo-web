import AnyElement from '../types/AnyElement';
import IProps from './IProps';

export default interface IPropsWithChildren<T extends AnyElement>
	extends IProps<T> {
	children?: React.ReactChild | React.ReactChild[];
}
