import APIRequestParams from '../../util/APIParams';
import refresh from '../refresh';
import { unprotectedRouteRequest } from '../trellzoApiRequest';

jest.mock('../trellzoApiRequest', () => ({
	__esModule: true,
	...jest.requireActual('../trellzoApiRequest'),
	unprotectedRouteRequest: jest.fn(),
}));

describe('method returns the result of the api request', () => {
	const fakeQueryFunctionContext = { queryKey: ['refresh'], meta: {} };
	afterAll(() => {
		jest.clearAllMocks();
	});

	it('returns the result of the api request', async () => {
		const mockResult = {};
		(unprotectedRouteRequest as jest.Mock).mockResolvedValueOnce(
			mockResult
		);

		const result = await refresh(fakeQueryFunctionContext);

		expect(result).toBe(mockResult);
	});

	it('calls the api request with the correct params', async () => {
		const params = new APIRequestParams('post');
		params.setRoute('/auth/refresh');

		await refresh(fakeQueryFunctionContext);

		expect(unprotectedRouteRequest).toHaveBeenCalledWith(params);
	});
});
