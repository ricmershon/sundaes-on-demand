/**
 * @function formatCurrency
 * Formats number as currency (US dollars)
 * 
 * @param {number} amount 
 * @returns {string} number formatted as currency
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
};