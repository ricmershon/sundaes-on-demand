import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

describe('Options component', () => {
    test('Displays image for each scoop option from the server', async () => {
        render(<Options optionType='scoops' />);

        // Find images
        const scoopImages = await screen.findAllByRole(
            'img',
            { name: /scoop$/i }
        );
        expect(scoopImages).toHaveLength(2);

        // Confirm alt text of images
        const altText = scoopImages.map((element) => element.alt);
        expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
    }); 

    test('Displays image for each topping from the server', async () => {
        render(<Options optionType='toppings' />);

        // Find images
        const toppingImages = await screen.findAllByRole(
            'img',
            { name: /topping$/i }
        );
        expect(toppingImages).toHaveLength(3);

        // Confirm alt text of images
        const altText = toppingImages.map((element) => element.alt);
        expect(altText).toEqual([
            'M&Ms topping',
            'Hot fudge topping',
            'Peanut butter cups topping'
        ]);
    })

    test('Does not update total if scoops input is invalid', async () => {
        render(<Options optionType='scoops' />);

        const vanillaInput = await screen.findByRole(
            'spinbutton',
            { name: /vanilla/i }
        );
        
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '-1');

        // Confirm scoops subtotal didn't update
        const scoopsTotal = screen.getByText('Scoops total: $0.00');
        expect(scoopsTotal).toBeInTheDocument();
    });
})