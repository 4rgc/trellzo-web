export type NamedError = [string, unknown];

const formatErrors = (namedErrors: NamedError[]) =>
	namedErrors
		.map((ne) =>
			ne[1]
				? `${ne[0]}: ${ne[1] instanceof Error ? ne[1].message : ne[1]}`
				: ''
		)
		.filter((s) => !!s)
		.join('\n');

export default formatErrors;
