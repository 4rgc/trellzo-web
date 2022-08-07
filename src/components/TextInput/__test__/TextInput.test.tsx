import TextInput from '../TextInput';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('TextInput', () => {
	it('calls onChange when input changes', async () => {
		const handler = jest.fn();

		render(<TextInput value={''} onChange={handler} />);

		const input = await screen.findByRole('textbox');

		await user.click(input);
		await user.type(input, 'h');

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith('h');
	});

	it('calls onChange when multiline input changes', async () => {
		const handler = jest.fn();

		render(<TextInput value={''} onChange={handler} variant="multi" />);

		const input = await screen.findByRole('textbox');

		await user.click(input);
		await user.type(input, 'i');

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith('i');
	});
});
