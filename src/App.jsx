import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderEntry from './pages/Entry/OrderEntry';
import OrderSummary from './pages/Summary/OrderSummary';
import OrderConfirmation from './pages/Confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';

const App = () => {
    // 'inProgress', 'review' or 'completed'
    const [orderPhase, setOrderPhase] = useState('inProgress');
    let PhaseComponent;

    switch (orderPhase) {
        case 'inProgress':
            PhaseComponent = OrderEntry;
            break;
        case 'review':
            PhaseComponent = OrderSummary;
            break;
        case 'completed':
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