import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3030/scoops', (_req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '/images/chocolate.png' },
                { name: 'Vanilla', imagePath: '/images/vanilla.png' }
            ])
        );
    }),

    rest.get('http://localhost:3030/toppings', (_req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
                { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
                { 
                    name: 'Peanut butter cups',
                    imagePath: '/images/peanut-butter-cups.png'
                }
            ])
        );
    }),

    rest.post('http://localhost:3030/order', (_req, res, ctx) => {
        return res(ctx.json({ orderNumber: 1234567890 }));
    })
];