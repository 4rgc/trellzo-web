import fetcher from '../../../util/fetcher';
import { renderHook, act } from '@testing-library/react-hooks';
import useFetcher from '../useFetcher';
import APIRequestParams from '../../../util/APIParams';

jest.mock('../../../util/fetcher.ts');

describe('useFetcher', () => {
	const mockFetcher = (
		res: Promise<Partial<Response>> | undefined = Promise.resolve({
			json: async () => ({ success: true }),
		})
	) => {
		(fetcher as jest.Mock).mockImplementationOnce(
			() => res || Promise.resolve(res)
		);
	};

	it('should have no data initially', () => {
		mockFetcher();

		const { result } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);
		const [data, error, reload] = result.current;

		expect(data).toBe(undefined);
	});

	it('should have no error initially', () => {
		mockFetcher();

		const { result } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);
		const [data, error, reload] = result.current;

		expect(error).toBe(undefined);
	});

	it('should have a reload function initially', () => {
		mockFetcher();

		const { result } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);
		const [data, error, reload] = result.current;

		expect(reload).toStrictEqual(expect.any(Function));
	});

	it('should call fetcher on reload', async () => {
		mockFetcher();

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);
		const [data, error, reload] = result.current;

		reload();

		await waitForNextUpdate();

		expect(fetcher).toHaveBeenCalled();
	});

	it('should change data on reload', async () => {
		mockFetcher();

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		//data
		expect(result.current[0]).toStrictEqual({ success: true });
	});

	it('should set the error on error', async () => {
		mockFetcher(
			Promise.resolve({
				json: () => {
					throw new Error('asd');
				},
			})
		);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		//error
		expect(result.current[1]).toStrictEqual(new Error('asd'));
	});

	it('should set data to undefined on error', async () => {
		mockFetcher();

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		mockFetcher(
			Promise.resolve({
				json: () => {
					throw new Error('asd');
				},
			})
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		//data
		expect(result.current[0]).toBeUndefined();
	});

	it('should handle different error types', async () => {
		mockFetcher(
			Promise.resolve({
				json: () => {
					throw 'asd';
				},
			})
		);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher('asd', new APIRequestParams())
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		expect(result.current[1]).toStrictEqual(new Error('asd'));

		mockFetcher(
			Promise.resolve({
				json: () => {
					throw { p1: 'd', p2: 6 };
				},
			})
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		expect(result.current[1]).toBeInstanceOf(Error);
		expect(result.current[1]?.message).toMatch(/fetcher error/i);
	});

	it('should run custom handler code instead of the default', async () => {
		mockFetcher(
			Promise.resolve({
				json: () => Promise.resolve({ message: 'success' }),
			})
		);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher(
				'asd',
				new APIRequestParams(),
				async (res, setData, setError) => {
					setError(new Error('e'));
				}
			)
		);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		//data
		expect(result.current[0]).toBeUndefined();
		//error
		expect(result.current[1]).toStrictEqual(new Error('e'));
	});

	it('should change request url', async () => {
		mockFetcher(
			Promise.resolve({
				json: () => Promise.resolve({ message: 'success' }),
			})
		);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher(
				'asd',
				new APIRequestParams(),
				async (res, setData, setError) => {
					setError(new Error('e'));
				}
			)
		);

		act(() => {
			//changeParams({url: 'test'})
			result.current[3]({ url: 'test' });
		});

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		expect(fetcher).toHaveBeenCalledWith('test', expect.anything());
	});

	it('should change request params', async () => {
		mockFetcher(
			Promise.resolve({
				json: () => Promise.resolve({ message: 'success' }),
			})
		);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher(
				'asd',
				new APIRequestParams(),
				async (res, setData, setError) => {
					setError(new Error('e'));
				}
			)
		);

		act(() => {
			//changeParams({ params: new APIRequestParams('patch') })
			result.current[3]({ params: new APIRequestParams('patch') });
		});

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		expect(fetcher).toHaveBeenCalledWith(
			expect.anything(),
			new APIRequestParams('patch')
		);
	});

	it('should not trigger updates if url/params are the same', async () => {
		mockFetcher(
			Promise.resolve({
				json: () => Promise.resolve({ message: 'success' }),
			})
		);

		const params = new APIRequestParams();

		const { result, waitForNextUpdate } = renderHook(() =>
			useFetcher('asd', params, async (res, setData, setError) => {
				setError(new Error('e'));
			})
		);

		//changeParams({ params: new APIRequestParams('patch') })
		result.current[3]({ url: 'asd', params });

		await expect(waitForNextUpdate()).rejects.toThrow(/timed out/i);

		//reload()
		result.current[2]();

		await waitForNextUpdate();

		expect(fetcher).toHaveBeenCalledWith('asd', params);
	});
});
