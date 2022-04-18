import IPropsWithClassGenerator from '../interfaces/IPropsWithClassGenerator';

type ClassGenerator<T extends IPropsWithClassGenerator<any>> = (
	props: T
) => string;

export default ClassGenerator;
