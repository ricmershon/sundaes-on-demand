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

    test('Handles errors for scoops and toppings routes', async () => {
        server.resetHandlers(
            rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
                res(ctx.status(500))
            ),
            rest.get('http://localhost:3030/toppings', (req, res, ctx) => 
                res(ctx.status(500))
            )
        );

        render(<OrderEntry />);

        await waitFor(async () => {
            const alerts = await screen.findAllByRole('alert');
            expect(alerts).toHaveLength(2);
        });
    });

});