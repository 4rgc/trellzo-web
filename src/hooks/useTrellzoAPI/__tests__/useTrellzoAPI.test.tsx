import * as UseFetcher from '../../useFetcher/useFetcher';
import useTrellzoAPI from '../useTrellzoAPI';
import APIRequestParams from '../../../util/APIParams';
import { Dispatch } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';

const BASE_URL = 'http://localhost:3000';

describe('useTrellzoAPI', () => {
	let useFetcherMock = jest.spyOn(UseFetcher, 'default');

	const mockUseFetcher = (
		data: any = { success: true },
		error: Error | undefined = undefined,
		customHandlerParams: [
			Response | undefined,
			Dispatch<any>,
			Dispatch<Error | undefined>
		] = [undefined, () => {}, () => {}]
	) => {
		useFetcherMock = jest.spyOn(UseFetcher, 'default');
		useFetcherMock = useFetcherMock.mockImplementationOnce(
			(initUrl, initParams, customHandler?) => {
				return [
					data,
					error,
					async () => {
						if (customHandler)
							customHandler(...customHandlerParams);
					},
					() => {},
				];
			}
		);
	};

	afterEach(() => {
		useFetcherMock.mockRestore();
		fetchMock.restore();
	});

	it('passes empty string into fetcher when route is empty', () => {
		const params = new APIRequestParams();

		mockUseFetcher();

		renderHook(() => useTrellzoAPI(params));

		expect(useFetcherMock).toHaveBeenCalledWith(
			'',
			expect.anything(),
			expect.any(Function)
		);
	});

	it('passes correct url into useFetcher when route is set', () => {
		const params = new APIRequestParams();
		params.setRoute('/');

		mockUseFetcher();

		renderHook(() => useTrellzoAPI(params));

		expect(useFetcherMock).toHaveBeenCalledWith(
			`${BASE_URL}/`,
			expect.anything(),
			expect.any(Function)
		);
	});

	it('passes url params into useFetcher', () => {
		const params = new APIRequestParams();
		params.setRoute('/');
		params.setUrlParam('a', 'b');

		mockUseFetcher();

		renderHook(() => useTrellzoAPI(params));

		expect(useFetcherMock).toHaveBeenCalledWith(
			expect.anything(),
			params,
			expect.anything()
		);
	});

	it('returns data and error from useFetcher', () => {
		const params = new APIRequestParams();

		const error = new Error('error');
		mockUseFetcher({ data: 'data' }, error);

		const { result } = renderHook(() => useTrellzoAPI(params));

		expect(result.current).toStrictEqual([
			{ data: 'data' },
			error,
			expect.any(Function),
			expect.any(Function),
		]);
	});

	it('sets an empty response error', async () => {
		const params = new APIRequestParams();
		const setDataMock = jest.fn();
		const setErrorMock = jest.fn();

		mockUseFetcher(undefined, undefined, [
			undefined,
			setDataMock,
			setErrorMock,
		]);

		const { result } = renderHook(() => useTrellzoAPI(params));

		const [data, error, login, changeParams] = result.current;

		await act(() => login());

		expect(setDataMock).not.toHaveBeenCalled();
		expect(setErrorMock).toHaveBeenCalledWith(expect.any(Error));
	});

	it('rerenders the hook on params change', async () => {
		useFetcherMock.mockRestore();

		const params1 = new APIRequestParams();
		params1.setRoute('/a');
		const data1 = { a: 'data' };

		const params2 = new APIRequestParams();
		params2.setRoute('/b');
		const data2 = { b: 'data' };

		fetchMock.get(/\/a/, { body: data1 }).get(/\/b/, { body: data2 });

		const { result } = renderHook(() => useTrellzoAPI(params1));
		await act(() => result.current[2]());
		const [data, error, reload, changeParams] = result.current;
		expect(data).toStrictEqual(data1);

		act(() => changeParams(params2));
		await act(() => reload());
		const [newData] = result.current;
		expect(newData).toStrictEqual(data2);

		fetchMock.restore();
	});

	it('sets data on 200, 201', async () => {
		const params = new APIRequestParams();
		params.setRoute('/a');
		const setDataMock = jest.fn();
		const setErrorMock = jest.fn();

		const res = new Response(undefined, { status: 200 });
		res.json = () => Promise.resolve('data');

		mockUseFetcher(undefined, undefined, [res, setDataMock, setErrorMock]);

		const { result } = renderHook(() => useTrellzoAPI(params));

		const [data, error, login, changeParams] = result.current;

		await act(() => login());

		expect(setErrorMock).not.toHaveBeenCalled();
		expect(setDataMock).toBeCalledWith('data');
	});

	it('sets error on 400-600', async () => {
		const params = new APIRequestParams();
		const setDataMock = jest.fn();
		const setErrorMock = jest.fn();

		for (let status of [400, 403, 500, 510]) {
			const res = new Response(undefined, { status });
			res.json = () => Promise.resolve({ message: 'error' });

			mockUseFetcher(undefined, undefined, [
				res,
				setDataMock,
				setErrorMock,
			]);

			const { result } = renderHook(() => useTrellzoAPI(params));

			const [data, error, login, changeParams] = result.current;

			await act(() => login());

			expect(setDataMock).not.toHaveBeenCalled();
			expect(setErrorMock).toHaveBeenCalledWith(expect.any(Error));
		}
	});

	it('sets error on all other status codes', async () => {
		const params = new APIRequestParams();
		const setDataMock = jest.fn();
		const setErrorMock = jest.fn();

		for (let status of [101, 300, 206, 210]) {
			const res = new Response(undefined, { status });
			res.json = () => Promise.resolve({ message: 'error' });

			mockUseFetcher(undefined, undefined, [
				res,
				setDataMock,
				setErrorMock,
			]);

			const { result } = renderHook(() => useTrellzoAPI(params));

			const [data, error, login, changeParams] = result.current;

			await act(() => login());

			expect(setDataMock).not.toHaveBeenCalled();
			expect(setErrorMock).toHaveBeenCalledWith(expect.any(Error));
		}
	});
});
