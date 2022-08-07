import Card from '..';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Card', () => {
	it('should call the onClick callback when clicked', () => {
		const mockHandler = jest.fn();

		render(<Card onClick={mockHandler} title="Test card" />);

		const card = screen.getByText(/test card/i);
		user.click(card);

		expect(mockHandler).toHaveBeenCalledTimes(1);
	});

	it('should not call the onClick callback when clicked', () => {
		const mockHandler = jest.fn();

		render(
			<Card onClick={mockHandler} isDisabled={true} title="Test card" />
		);

		const card = screen.getByText(/test card/i);
		user.click(card);

		expect(mockHandler).not.toHaveBeenCalled();
	});
});
