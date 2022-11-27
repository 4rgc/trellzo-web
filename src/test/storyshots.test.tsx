import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';

const reactTestingLibrarySerializer = {
	print: (val: any, serialize: any, indent: any) =>
		// eslint-disable-next-line testing-library/no-node-access
		serialize(val.container.firstChild),
	test: (val: any) => val && val.hasOwnProperty('container'),
};

initStoryshots({
	renderer: render,
	snapshotSerializers: [reactTestingLibrarySerializer],
});
