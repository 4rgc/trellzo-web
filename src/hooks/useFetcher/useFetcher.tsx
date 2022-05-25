import {
	Dispatch,
	MutableRefObject,
	useCallback,
	useRef,
	useState,
} from 'react';
import APIRequestParams from '../../util/APIParams';
import fetcher from '../../util/fetcher';

function useAsyncReference<T>(
	value: T
): [MutableRefObject<T>, (newState: T) => void] {
	const ref = useRef(value);
	const [, forceRender] = useState(false);

	function updateState(newState: T) {
		if (!Object.is(ref.current, newState)) {
			ref.current = newState;
			forceRender((s) => !s);
		}
	}

	return [ref, updateState];
}

const useFetcher = (
	initialUrl: string,
	initialParams: APIRequestParams,
	customHandler?: (
		res: Response | undefined,
		setData: Dispatch<any>,
		setError: Dispatch<Error | undefined>
	) => Promise<void>
): [
	any,
	Error | undefined,
	() => Promise<void>,
	({ url, params }: { url?: string; params?: APIRequestParams }) => void
] => {
	const [data, setData] = useState<any>(undefined);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [urlState, setUrlState] = useAsyncReference<string>(initialUrl);
	const [paramsState, setParamsState] =
		useAsyncReference<APIRequestParams>(initialParams);

	const reload = useCallback(async () => {
		try {
			const res = await fetcher(urlState.current, paramsState.current);
			if (customHandler) await customHandler(res, setData, setError);
			else {
				const newData = res && (await res?.json());
				setData(newData);
			}
		} catch (err) {
			setData(undefined);
			if (err instanceof Error) setError(err);
			else if (typeof err === 'string') setError(new Error(err));
			else setError(new Error(`Fetcher error: ${JSON.stringify(err)}`));
		}
	}, [customHandler, paramsState, urlState]);

	const changeParams = useCallback(
		({
			url: newUrl,
			params: newParams,
		}: {
			url?: string;
			params?: APIRequestParams;
		}) => {
			if (newUrl) setUrlState(newUrl);
			if (newParams) setParamsState(newParams);
		},
		[setParamsState, setUrlState]
	);

	return [data, error, reload, changeParams];
};

export default useFetcher;
