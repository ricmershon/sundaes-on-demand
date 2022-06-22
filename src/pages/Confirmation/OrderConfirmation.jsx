import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';
import { ORDER_PHASE } from '../../constants';

const OrderConfirmation = ({ setOrderPhase }) => {
    const [,, resetOrder] = useOrderDetails();
    const [error, setError] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios
            .post('http://localhost:3030/order')
            .then((response) => setOrderNumber(response.data.orderNumber))
            .catch(() => setError(true))
    }, []);

    /**
     * @function handleClick
     * Resets order and sets order phase to IN_PROGRESS
     */
    const handleClick = () => {
        resetOrder();
        setOrderPhase(ORDER_PHASE.IN_PROGRESS);
    };

    if (error) {
        return <AlertBanner />
    };

    if (orderNumber) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}.</p>
                <p style={{ fontSize: '25%' }}>Nothing will happen now.</p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
        );
    } else {
        return <div>Loading</div>
    };
};

export default OrderConfirmation;