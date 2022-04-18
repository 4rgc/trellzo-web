import AnyElement from '../types/AnyElement';
import ClassGenerator from '../types/ClassGenerator';
import IProps from './IProps';

export default interface IPropsWithClassGenerator<T extends AnyElement>
	extends IProps<T> {
	classGenerator?: ClassGenerator<IPropsWithClassGenerator<T>>;
}
