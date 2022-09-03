import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DateTime, Duration } from 'luxon';
import NoteCard from '../NoteCard';

export default {
	title: 'Components/NoteCard',
	args: {
		note: {
			_id: '1',
			name: 'Buy Groceries',
			description: 'eggs, chicken, tomatoes, green onion',
		},
	},
} as ComponentMeta<typeof NoteCard>;

const Template: ComponentStory<typeof NoteCard> = (args) => (
	<DragDropContext onDragEnd={() => {}}>
		<Droppable droppableId="1">
			{(provided) => {
				return (
					<div
						style={{ width: '200px' }}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<NoteCard {...args} index={1} />
						{provided.placeholder}
					</div>
				);
			}}
		</Droppable>
	</DragDropContext>
);

export const Default = Template.bind({});

export const LongName = Template.bind({});
LongName.args = {
	note: {
		_id: '1',
		name: 'hello my name is asdf nice to meet you',
		description: 'description',
	},
};

export const LongDesctription = Template.bind({});
LongDesctription.args = {
	note: {
		_id: '1',
		name: 'Name is short',
		description:
			'description is very very very very very very very very very very very very long',
	},
};

export const DueIn5Days = Template.bind({});
DueIn5Days.args = {
	note: {
		_id: '1',
		name: 'Name',
		description: 'Description',
		dueDate: DateTime.now()
			.plus(Duration.fromDurationLike({ days: 5 }))
			.toISO(),
	},
};

export const DueIn3Days = Template.bind({});
DueIn3Days.args = {
	note: {
		_id: '1',
		name: 'Name',
		description: 'Description',
		dueDate: DateTime.now()
			.plus(Duration.fromDurationLike({ days: 3 }))
			.toISO(),
	},
};

export const DueTomorrow = Template.bind({});
DueTomorrow.args = {
	note: {
		_id: '1',
		name: 'Name',
		description: 'Description',
		dueDate: DateTime.now()
			.plus(Duration.fromDurationLike({ days: 1 }))
			.toISO(),
	},
};

export const DueToday = Template.bind({});
DueToday.args = {
	note: {
		_id: '1',
		name: 'Name',
		description: 'Description',
		dueDate: DateTime.now().toISO(),
	},
};

export const OneDayPastDue = Template.bind({});
OneDayPastDue.args = {
	note: {
		_id: '1',
		name: 'Name',
		description: 'Description',
		dueDate: DateTime.now().minus({ days: 1 }).toISO(),
	},
};
