import { rest } from 'msw';

import { render, screen } from '../../../test-utils/testing-library-utils';
// eslint-disable-next-line jest/no-mocks-import
import { server } from '../../../__mocks__/server';
import OrderConfirmation from '../OrderConfirmation';

describe('OrderConfirmation component', () => {

    test('correctly receives error response from server', async () => {
        server.resetHandlers(
            rest.post('http://localhost:3030/order', (_req, res, ctx) => 
                res(ctx.status(500))
            )
        );

        render(<OrderConfirmation setOrderPhase={jest.fn()} />);

        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(
            'An unexpected error ocurred. Please try again later.'
        );
    });

});