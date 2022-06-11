import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

describe('Total Updates functionality', () => {

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