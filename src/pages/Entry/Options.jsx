import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
// import AlertBanner from '../common/AlertBanner';
// import { pricePerItem } from '../../constants';
// import { useOrderDetails } from '../../contexts/OrderDetails';

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.log(error))
    }, [optionType]);

    // if (error) {
    //     return <AlertBanner />
    // };

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return (
        <div>
            <Row>{optionItems}</Row>
        </div>
    )
};

export default Options; 