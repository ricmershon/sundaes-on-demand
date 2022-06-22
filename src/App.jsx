import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderEntry from './pages/Entry/OrderEntry';
import OrderSummary from './pages/Summary/OrderSummary';
import OrderConfirmation from './pages/Confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { ORDER_PHASE } from './constants';

const App = () => {
    const [orderPhase, setOrderPhase] = useState('IN_PROGRESS');
    let PhaseComponent;

    switch (orderPhase) {
        case ORDER_PHASE.IN_PROGRESS:
            PhaseComponent = OrderEntry;
            break;
        case ORDER_PHASE.REVIEW:
            PhaseComponent = OrderSummary;
            break;
        case ORDER_PHASE.COMPLETED:
            PhaseComponent = OrderConfirmation;
            break;
        default:
            break;
    }

    return (
        <OrderDetailsProvider>
            <Container>
                <PhaseComponent setOrderPhase={setOrderPhase} />
            </Container>
        </OrderDetailsProvider>
    );
};

export default App;