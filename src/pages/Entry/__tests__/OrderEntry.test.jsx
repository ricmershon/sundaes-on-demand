import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import {
    waitFor,
    render,
    screen
} from '../../../test-utils/testing-library-utils';

// eslint-disable-next-line jest/no-mocks-import
import { server } from '../../../__mocks__/server';
import OrderEntry from '../OrderEntry';

describe('OrderEntry component', () => {

    test('handles errors for scoops and toppings routes', async () => {
        server.resetHandlers(
            rest.get('http://localhost:3030/scoops', (_req, res, ctx) =>
                res(ctx.status(500))
            ),
            rest.get('http://localhost:3030/toppings', (_req, res, ctx) => 
                res(ctx.status(500))
            )
        );

        render(<OrderEntry setOrderPhase={jest.fn()} />);

        await waitFor(async () => {
            const alerts = await screen.findAllByRole('alert');
            expect(alerts).toHaveLength(2);
        });
    });

    test('disables order button if no scoops ordered', async () => {
        render(<OrderEntry setOrderPhase={jest.fn()} />);

        // Order button starts disabled
        const orderButton = screen.getByRole(
            'button', { name: /order sundae/i }
        );
        expect(orderButton).toBeDisabled();

        // Add scoop and expect order button to be enabled
        const vanillaInput = await screen.findByRole(
            'spinbutton', { name: /vanilla/i }
        );
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(orderButton).toBeEnabled();

        // Remove scoops and expect order button to be disabled
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '0');
        expect(orderButton).toBeDisabled();
    });

});