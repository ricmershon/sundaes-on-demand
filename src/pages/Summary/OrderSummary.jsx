import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = ({ setOrderPhase }) => {
    const [orderDetails] = useOrderDetails();

    const scoopsArray = Array.from(orderDetails.scoops);
    const scoopsList = scoopsArray.map(([key, value]) => (
        <li key={key}>{value} {key}</li>
    ));

    const toppingsArray = Array.from(orderDetails.toppings.keys());
    const toppingsList = toppingsArray.map((key) => (
        <li key={key}>{key}</li>
    ));

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {orderDetails.totals.scoops}</h2>
            <ul>{scoopsList}</ul>
            <h2>Toppings: {orderDetails.totals.toppings}</h2>
            <ul>{toppingsList}</ul>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
};

export default OrderSummary;