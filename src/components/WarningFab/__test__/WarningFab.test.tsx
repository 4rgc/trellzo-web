import WarningFab from '..';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('WarningFab', () => {
	it('should call custom onClick', async () => {
		const mockHandler = jest.fn();

		render(<WarningFab display onClick={mockHandler} />);

		const icon = await screen.findByAltText(/warning/i);

		await user.click(icon);

		expect(mockHandler).toHaveBeenCalledTimes(1);
	});

	it('should not call default handler when custom onClick passed', async () => {
		const mockHandler = jest.fn();

		render(
			<WarningFab display message="hello world" onClick={mockHandler} />
		);

		const icon = await screen.findByAltText(/warning/i);

		user.click(icon);

		const message = screen.queryByText(/hello world/i);

		expect(message).not.toBeInTheDocument();
	});

	it('should show text when icon is clicked', async () => {
		render(<WarningFab display message="hello world" />);

		const icon = await screen.findByAltText(/warning/i);

		await user.click(icon);

		const message = screen.queryByText(/hello world/i);

		expect(message).toBeInTheDocument();
	});
});
