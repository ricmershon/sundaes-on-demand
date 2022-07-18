import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

describe('Scoop option component', () => {

    test.only('indicates if scoop count is non-integer or out or range', () => {
        render(
            <ScoopOption name='' imagePath='' updateItemCount={jest.fn()} />
        );

        // Expect 'is-invalid' class with negative number as input
        const vanillaInput = screen.getByRole('spinbutton');
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '-1');
        expect(vanillaInput).toHaveClass('is-invalid');

        // Check decimal input
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2.5');
        expect(vanillaInput).toHaveClass('is-invalid');

        // Check input out or range
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '11');
        expect(vanillaInput).toHaveClass('is-invalid');

        // Test valid input
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '3');
        expect(vanillaInput).not.toHaveClass('is-invalid');
    })
})