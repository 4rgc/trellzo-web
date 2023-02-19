import { DragDropContext } from '@hello-pangea/dnd';
import { Meta, StoryFn } from '@storybook/react';
import NotesList from '../NotesList';

export default {
	title: 'Components/NotesList',
	args: {
		list: {
			_id: '60c5d161a6c781e43c11a5a3',
			name: 'List 1',
			notes: [
				{
					_id: '60c5d167a6c781e43c11a5a4',
					name: 'Note Something',
					description: 'Buy something',
					tags: [],
				},
				{
					_id: '6106f35927d5f4001d197e65',
					name: 'Delete me',
					description: '',
					tags: [],
				},
			],
			notesOrder: [
				'60c5d167a6c781e43c11a5a4',
				'6106f35927d5f4001d197e65',
			],
			boardId: '60c9cdae9c9ae6133cdcd03b',
		},
	},
} as Meta<typeof NotesList>;

const Template: StoryFn<typeof NotesList> = (args) => (
	<DragDropContext onDragEnd={() => {}}>
		<NotesList {...args} />
	</DragDropContext>
);

export const Default = Template.bind({});

export const Empty = Template.bind({});
Empty.args = {
	list: {
		_id: '1',
		name: 'List aa',
		notes: [],
		notesOrder: [],
		boardId: '2',
	},
};
