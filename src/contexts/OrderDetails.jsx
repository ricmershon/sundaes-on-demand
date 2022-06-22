import {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect
} from 'react';

import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

// OrderDetails context
const OrderDetails = createContext();

/**
 * @function useOrderDetails
 * @returns OrderDetails context hook
 */
export const useOrderDetails = () => {
    const context = useContext(OrderDetails);
    if (!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider.'
        );
    };
    return context;
};

/**
 * @function calculateSubtotal
 * Returns sub total of cost of optionCounts for optionType
 * 
 * @param {string} optionType - 'scoops' or 'toppings'
 * @param {*} optionCounts - Map of item values within optionType
 * @returns {float} sub total of cost of optionCounts for optionType
 */
const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }
    return optionCount * pricePerItem[optionType]
};

/**
 * @function OrderDetailsProvider
 * 
 * @param {*} props 
 * @returns OrderDetails.Provider - context provider component
 */
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

    /**
     * @returns {Array} value - array of data and functions memoized in
     * context:
     *      {Object} optionCounts, subTotal and total
     *      {updateItemCount(itemName, newItemCount, optionType) => void}
     *          - function to update item counts
     *      {resetOrder() => void} - function to reset order
     */
    const value = useMemo(() => {

        /**
         * @function updateItemCount
         * Updates item count
         * 
         * @param {string} itemName - scoop or topping item name
         * @param {number} newItemCount - new item count
         * @param {string} optionType - 'scoops' or 'toppings'
         */
        const updateItemCount = (itemName, newItemCount, optionType) => {

            // Update map
            const { [optionType]: optionMap } = optionCounts;
            const newOptionMap = new Map(optionMap);
            newOptionMap.set(itemName, parseInt(newItemCount));
 
            // Create new object with the old optionCounts plus new map
            // then update state
            const newOptionCounts = {...optionCounts};
            newOptionCounts[optionType] = newOptionMap;
            setOptionCounts(newOptionCounts);
        }

        /**
         * @function resetOrder
         * Resets item counts for scoops and toppings.
         */
        const resetOrder = () => {
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map()
            });
        };
        
        return [{...optionCounts, totals}, updateItemCount, resetOrder];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />
};