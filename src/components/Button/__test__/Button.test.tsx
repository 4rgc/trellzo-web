import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
	it('calls onClick when button is clicked', async () => {
		const handler = jest.fn();

		render(<Button onClick={handler}>Button</Button>);

		const button = screen.getByText(/button/i);

		await userEvent.click(button);

		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("doesn't call onClick if button is disabled", () => {
		const handler = jest.fn();

		render(
			<Button onClick={handler} disabled={true}>
				Button
			</Button>
		);

		const button = screen.getByText(/button/i);

		userEvent.click(button);

		expect(handler).not.toHaveBeenCalled();
	});
});
