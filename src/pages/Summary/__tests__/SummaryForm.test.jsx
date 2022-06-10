import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

describe('SummaryForm component', () => {

	test('Initial conditions', () => {
        render(<SummaryForm />);

        const checkbox = screen.getByRole('checkbox', {
            name: /terms and conditions/i
        });
        expect(checkbox).not.toBeChecked();

        const confirmButton = screen.getByRole('button', {
            name: /confirm order/i
        });
		expect(confirmButton).toBeDisabled();
	});

    test('Checkbox enables button on first click and disables on second',  () => {
        render(<SummaryForm />);

        const checkbox = screen.getByRole('checkbox', {
            name: /terms and conditions/i
        });
        const confirmButton = screen.getByRole('button', {
            name: /confirm order/i
        });

        userEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();

        userEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();
    });

    test('Popover responds to hover', async () => {
        render(<SummaryForm />);

        // Popover starts hidden
        const nullPopover = screen.queryByText(
            /no ice cream will actually be delivered/i
        );
        expect(nullPopover).not.toBeInTheDocument();

        // Popover appears on mouse over of checkbox label
        const termsAndConditions = screen.getByText(/terms and conditions/i);
        userEvent.hover(termsAndConditions);

        const popover = screen.getByText(
            /no ice cream will actually be delivered/i
        );
        expect(popover).toBeInTheDocument();

        // Popover disappears on mouse out
        userEvent.unhover(termsAndConditions);
        await waitForElementToBeRemoved(() =>
            screen.queryByText(/no ice cream will actually be delivered/i)
        );
    });
});