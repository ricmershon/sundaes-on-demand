import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';
describe('Total', () => {

    test('update scoops subtotal when scoops changes', async () => {
        render(<Options optionType='scoops' />);

        // Total starts as $0.00
        const scoopsSubtotal = screen.getByText(
            'Scoops total: $', { exact: false }
        );
        expect(scoopsSubtotal).toHaveTextContent('0.00');

        // Update vanilla scoops to 1 and check subtotal
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: 'Vanilla' }
        );
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('2.00');

        // Update chocolate scoops to 2 and check subtotal
        const chocolateInput = await screen.findByRole(
            'spinbutton', { name: 'Chocolate' }
        );
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');
        expect(scoopsSubtotal).toHaveTextContent('6.00');
    });

    test('update toppings subtotal when topping checkbox checked', async () => {
        render(<Options optionType='toppings' />);

        // Total starts as $0.00
        const toppingsSubtotal = screen.getByText(
            'Toppings total: $', { exact: false }
        );
        expect(toppingsSubtotal).toHaveTextContent('0.00');

        // Click Hot fudge topping and check subtotal is 1.50
        const hotFudgeCheckbox = await screen.findByRole(
            'checkbox', { name: 'Hot fudge'}
        );
        userEvent.click(hotFudgeCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');

        // Click Peanut butter cups topping and check subtotal is 3.00
        const pbCupsCheckbox = await screen.findByRole(
            'checkbox', { name: 'Peanut butter cups' }
        );
        userEvent.click(pbCupsCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('3.00');

        // Unclick Hot fudge topping and expect subtotal to go back to 1.50.
        userEvent.click(pbCupsCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');
    });
});

describe('Grand total', () => {

    test('updates properly if scoop is added first', async () => {
        render(<OrderEntry />);

        // Grab screen components
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: 'Vanilla' }
        );
        const chocolateInput = await screen.findByRole(
            'spinbutton', { name: 'Chocolate' }
        );
        const hotFudgeCheckbox = await screen.findByRole(
            'checkbox', { name: 'Hot fudge' }
        );
        const grandTotal = screen.getByRole(
            'heading', { name: /grand total: \$/i }
        );

        //  Expect grand total to start at 0.00
        expect(grandTotal).toHaveTextContent(0.00);

        // Add scoops then topping and check grand total
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');
        expect(grandTotal).toHaveTextContent('8.00');
        userEvent.click(hotFudgeCheckbox);
        expect(grandTotal).toHaveTextContent('9.50');
    });

    test('updates properly if topping is added first', async () => {
        render(<OrderEntry />);

        // Grab screen components
        const grandTotal = screen.getByRole(
            'heading', { name: /grand total: \$/i }
        );
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: 'Vanilla' }
        );
        const hotFudgeCheckbox = await screen.findByRole(
            'checkbox', { name: 'Hot fudge' }
        );

        // Add topping then scoops and check grand total
        userEvent.click(hotFudgeCheckbox);
        expect(grandTotal).toHaveTextContent('1.50');
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5.50');
    });

    test('updates properly if an item is removed', async () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByRole(
            'heading', { name: /grand total: \$/i }
        );
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: 'Vanilla' }
        );
        const hotFudgeCheckbox = await screen.findByRole(
            'checkbox', { name: 'Hot fudge' }
        );

        // Add scoops topping, then remove topping and scoops and check grand total
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        userEvent.click(hotFudgeCheckbox);
        userEvent.click(hotFudgeCheckbox)
        expect(grandTotal).toHaveTextContent('4.00');

        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('2.00');
    });
});