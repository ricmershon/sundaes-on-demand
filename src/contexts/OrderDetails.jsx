import {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect
} from 'react';

import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

// Custom hook to check if inside a provider
export const useOrderDetails = () => {
    const context = useContext(OrderDetails);
    if (!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider.'
        );
    };

    return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType]
};

export const OrderDetailsProvider = (props) => {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });
    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    });

    // Update totals when optionCounts change
    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;

        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        const updateItemCount = (itemName, newItemCount, optionType) => {

            // Get option Map and make copy
            const { [optionType]: optionMap } = optionCounts;
            const newOptionMap = new Map(optionMap);
 
            // Update copied Map
            newOptionMap.set(itemName, parseInt(newItemCount));
 
            // create new object with the old optionCounts plus new map
            const newOptionCounts = {...optionCounts};
            newOptionCounts[optionType] = newOptionMap;
 
            // update state
            setOptionCounts(newOptionCounts);
        }

        // Returns:
        // - getter: object containing option couunts, subtotals and total
        // - setter: updateItemCount
        return [{...optionCounts, totals}, updateItemCount];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />
};