import { format } from 'date-fns'

/**
 * Formats a date to a string in the format "weekday, day".
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDateTimeline = (date: Date): string => {
  return format(date, 'EEE, d')
}
