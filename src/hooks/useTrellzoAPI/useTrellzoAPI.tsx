import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import APIRequestParams from '../../util/APIParams';
import fetcher from '../../util/fetcher';

const useTrellzoAPI = (params: APIRequestParams) => {
	// TODO: use env variable
	const baseUrl = 'localhost:3000';

	const apiUrl = params.getRoute()
		? `${baseUrl}${params.getRoute()}${params.getUrlParamsString()}`
		: '';

	const config: Partial<PublicConfiguration> = {};
	config.refreshInterval = 0;
	config.revalidateOnMount = false;
	config.shouldRetryOnError = false;

	const { data, error } = useSWR([apiUrl, params], fetcher, config);

	return [data, error];
};

export default useTrellzoAPI;
