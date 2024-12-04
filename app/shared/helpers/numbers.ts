/**
 * Formats a number as a dollar amount, removing trailing .00 if the value is a whole number.
 *
 * @param {number} value - The number to format.
 * @returns {string} The formatted dollar amount.
 */
export const formatDollar = (value: number): string => {
  const formattedValue = Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formattedValue.replace(/\.00$/, '')
}
