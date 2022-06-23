/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Happy path', () => {

    test('executes order phases correctly', async () => {
        render(<App />);

        // Add scoops and toppings
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: 'Vanilla' }
        );
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        const chocolateInput = screen.getByRole(
            'spinbutton', { name: 'Chocolate' }
        );
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');

        const hotFudgeCheckbox = await screen.findByRole(
            'checkbox', { name: 'Hot fudge' }
        );
        userEvent.click(hotFudgeCheckbox);

        const pbCupsCheckbox = screen.getByRole(
            'checkbox', { name: 'Peanut butter cups' }
        );
        userEvent.click(pbCupsCheckbox);

        // Find and click order button
        const orderButton = screen.getByRole(
            'button', { name: /order sundae/i } 
        );
        userEvent.click(orderButton);

        // Check summary information based on order
        const summaryHeading = screen.getByRole(
            'heading', { name: 'Order Summary' }
        );
        expect(summaryHeading).toBeInTheDocument();

        const scoopsHeading = screen.getByRole(
            'heading', { name: 'Scoops: $6.00' }
        );
        expect(scoopsHeading).toBeInTheDocument();

        const toppingsHeading = screen.getByRole(
            'heading', { name: 'Toppings: $3.00'}
        );
        expect(toppingsHeading).toBeInTheDocument();

        // Check summary options
        expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
        expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Hot fudge')).toBeInTheDocument();
        expect(screen.getByText('Peanut butter cups')).toBeInTheDocument();

        // Accept terms and conditions and click button to confirm order
        const tcCheckbox = screen.getByRole(
            'checkbox', { name: /terms and conditions/i }
        );
        userEvent.click(tcCheckbox);

        const confirmOrderButton = screen.getByRole(
            'button', { name: /confirm order/i }
        );
        userEvent.click(confirmOrderButton);

        // Confirm 'Loading' is not on the screen
        let loadingMessage = screen.getByText(/loading/i);
        expect(loadingMessage).toBeInTheDocument();

        // Confirm order number on confirmation page
        const thankYouHeader = await screen.findByRole(
            'heading', { name: /thank you/i }
        );
        expect(thankYouHeader).toBeInTheDocument();

        // Confirm loading message gone
        loadingMessage = screen.queryByText(/loading/i);
        expect(loadingMessage).not.toBeInTheDocument();

        const orderNumber = screen.getByText(/order number/i);
        expect(orderNumber).toBeInTheDocument();

        // Click 'new order' button on confirmation page
        const newOrderButton = screen.getByRole(
            'button', { name: /new order/i }
        );
        userEvent.click(newOrderButton);

        // Check that scoops and toppings subtotals have been reset
        const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
        expect(scoopsSubtotal).toBeInTheDocument();
        const toppingsSubtotal = screen.getByText('Toppings total: $0.00');
        expect(toppingsSubtotal).toBeInTheDocument();

        // Wait for items to appear after async call so exit without errors
        await screen.findByRole('spinbutton', { name: 'Vanilla' });
        await screen.findByRole('checkbox', { name: 'Hot fudge' });
    });

    test('displays no toppings header on summary page if no toppings ordered', async () => {
        render(<App />);

        // Add scoops only
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: /vanilla/i }
        );
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        const chocolateInput = screen.getByRole(
            'spinbutton', { name: /chocolate/i }
        );
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');

        // Find and click order  button
        const orderButton = screen.getByRole(
            'button', { name: /order sundae/i }
        );
        userEvent.click(orderButton);

        // Check summary header and information for scoops
        const scoopsHeading = screen.getByRole(
            'heading', { name: 'Scoops: $6.00' }
        );
        expect(scoopsHeading).toBeInTheDocument();

        // Check toppings information not present
        const toppingsHeading = screen.queryByRole(
            'heading', { name: /toppings:/i }
        );
        expect(toppingsHeading).not.toBeInTheDocument();
    });
});