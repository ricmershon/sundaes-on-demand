import { Button } from 'react-bootstrap';

import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { ORDER_PHASE } from '../../constants';

const  OrderEntry = ({ setOrderPhase }) => {
    const [orderDetails] = useOrderDetails();

    return (
        <div>
            <h1>Design you Sundae!</h1>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
            <Button onClick={() => setOrderPhase(ORDER_PHASE.REVIEW)}>
                Order Sundae!
            </Button>
        </div>
    );
}

export default OrderEntry;