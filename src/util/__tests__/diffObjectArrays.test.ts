import diffObjectArrays from '../diffObjectArrays';

describe('diffObjectArrays', () => {
	it('should return empty arrays if inputs are empty', () => {
		const { added, removed, changed } = diffObjectArrays([], []);

		expect(added).toStrictEqual([]);
		expect(removed).toStrictEqual([]);
		expect(changed).toStrictEqual([]);
	});

	it('should return the added object', () => {
		const a1 = [{ _id: '1' }];
		const a2 = [{ _id: '1' }, { _id: '2' }];

		const { added, removed, changed } = diffObjectArrays(a1, a2);

		expect(added).toStrictEqual([{ _id: '2' }]);
		expect(removed).toStrictEqual([]);
		expect(changed).toStrictEqual([]);
	});

	it('should return the removed object', () => {
		const a1 = [{ _id: '1' }, { _id: '2' }];
		const a2 = [{ _id: '1' }];

		const { added, removed, changed } = diffObjectArrays(a1, a2);

		expect(added).toStrictEqual([]);
		expect(removed).toStrictEqual([{ _id: '2' }]);
		expect(changed).toStrictEqual([]);
	});

	it('should return the changed object', () => {
		const a1 = [{ _id: '1', data: 'hello' }];
		const a2 = [{ _id: '1', data: 'world' }];

		const { added, removed, changed } = diffObjectArrays(a1, a2);

		expect(added).toStrictEqual([]);
		expect(removed).toStrictEqual([]);
		expect(changed).toStrictEqual([{ _id: '1', data: 'world' }]);
	});

	it('should return added, removed and changed simultaneously', () => {
		const a1 = [{ _id: '1', data: 'hello' }, { _id: '2' }];
		const a2 = [{ _id: '1', data: 'world' }, { _id: '3' }];

		const { added, removed, changed } = diffObjectArrays(a1, a2);

		expect(added).toStrictEqual([{ _id: '3' }]);
		expect(removed).toStrictEqual([{ _id: '2' }]);
		expect(changed).toStrictEqual([{ _id: '1', data: 'world' }]);
	});

	it('should disregard the order', () => {
		const a1 = [{ _id: '1' }, { _id: '3' }, { _id: '2' }];
		const a2 = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];

		const { added, removed, changed } = diffObjectArrays(a1, a2);

		expect(added).toStrictEqual([]);
		expect(removed).toStrictEqual([]);
		expect(changed).toStrictEqual([]);
	});
});
