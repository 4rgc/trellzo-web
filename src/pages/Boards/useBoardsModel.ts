import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getBoards from '../../api/getBoards';
import createBoard from '../../api/createBoard';

const useBoardsModel = () => {
	const queryClient = useQueryClient();

	const boardsQuery = useQuery({
		queryKey: ['getBoards'],
		queryFn: getBoards,
		refetchOnWindowFocus(query) {
			return !query.state.error;
		},
	});

	const createBoardMutation = useMutation({
		mutationFn: createBoard,
		onSettled: () => {
			queryClient.invalidateQueries(['getBoards']);
		},
	});

	return { boardsData: boardsQuery.data, boardsQuery, createBoardMutation };
};

export default useBoardsModel;
