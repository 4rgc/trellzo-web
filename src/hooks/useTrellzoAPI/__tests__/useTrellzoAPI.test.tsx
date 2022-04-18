import useTrellzoAPI from '../useTrellzoAPI';
import APIRequestParams from '../../../util/APIParams';
import useFetcher from '../../useFetcher/useFetcher';
import { Dispatch } from 'react';

const BASE_URL = 'http://localhost:3000';

jest.mock('../../useFetcher/useFetcher');
jest.mock('../../../util/fetcher.ts');

describe('useTrellzoAPI', () => {
	const mockUseFetcher = (
		data: any = { success: true },
		error: Error | undefined = undefined,
		customHandlerParams: [
			Response | undefined,
			Dispatch<any>,
			Dispatch<Error | undefined>
		] = [undefined, () => {}, () => {}]
	) => {
		(useFetcher as jest.Mock).mockImplementationOnce(
			(initUrl, initParams, customHandler?) => {
				return [
					data,
					error,
					() => {
						if (customHandler)
							customHandler(...customHandlerParams);
					},
					() => {},
				];
			}
		);
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('passes empty string into fetcher when route is empty', () => {
		const params = new APIRequestParams();

		mockUseFetcher();

		useTrellzoAPI(params);

		expect(useFetcher).toHaveBeenCalledWith(
			'',
			expect.anything(),
			expect.any(Function)
		);
	});

	it('passes correct url into useFetcher when route is set', () => {
		const params = new APIRequestParams();
		params.setRoute('/');

		mockUseFetcher();

		useTrellzoAPI(params);

		expect(useFetcher).toHaveBeenCalledWith(
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

		useTrellzoAPI(params);

		expect(useFetcher).toHaveBeenCalledWith(
			expect.anything(),
			params,
			expect.anything()
		);
	});

	it('returns data and error from useFetcher', () => {
		const params = new APIRequestParams();

		const error = new Error('error');
		mockUseFetcher({ data: 'data' }, error);

		const result = useTrellzoAPI(params);

		expect(result).toStrictEqual([
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

		const [data, error, login, changeParams] = useTrellzoAPI(params);

		await login();

		expect(setDataMock).not.toHaveBeenCalled();
		expect(setErrorMock).toHaveBeenCalledWith(expect.any(Error));
	});

	it('sets data on 200, 201', async () => {
		const params = new APIRequestParams();
		const setDataMock = jest.fn();
		const setErrorMock = jest.fn();

		const res = new Response(undefined, { status: 200 });
		res.json = () => Promise.resolve('data');

		mockUseFetcher(undefined, undefined, [res, setDataMock, setErrorMock]);

		const [data, error, login, changeParams] = useTrellzoAPI(params);

		await login();

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

			//eslint-disable-next-line react-hooks/rules-of-hooks
			const [data, error, login, changeParams] = useTrellzoAPI(params);

			await login();

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

			//eslint-disable-next-line react-hooks/rules-of-hooks
			const [data, error, login, changeParams] = useTrellzoAPI(params);

			await login();

			expect(setDataMock).not.toHaveBeenCalled();
			expect(setErrorMock).toHaveBeenCalledWith(expect.any(Error));
		}
	});
});
