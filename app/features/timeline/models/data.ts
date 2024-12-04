import { addDays } from 'date-fns'

import { formatDateTimeline } from '@/shared/helpers/dates'

const date = new Date()

export const currentWeekGridRows = [
  {
    label: formatDateTimeline(date),
    value: date.toISOString(),
  },
  {
    label: formatDateTimeline(addDays(date, 1)),
    value: addDays(date, 1).toISOString(),
  },
  {
    label: formatDateTimeline(addDays(date, 2)),
    value: addDays(date, 2).toISOString(),
  },
  {
    label: formatDateTimeline(addDays(date, 3)),
    value: addDays(date, 3).toISOString(),
  },
  {
    label: formatDateTimeline(addDays(date, 4)),
    value: addDays(date, 4).toISOString(),
  },
  {
    label: formatDateTimeline(addDays(date, 5)),
    value: addDays(date, 5).toISOString(),
  },
  {
    label: formatDateTimeline(addDays(date, 6)),
    value: addDays(date, 6).toISOString(),
  },
]

/**
 * Generates a unique column ID by concatenating the date and user ID.
 *
 * @param {string} date - The date string.
 * @param {string} userId - The user ID string.
 * @returns {string} The generated column ID.
 */
export const generateColId = (date: string, userId: string): string => date + '_' + userId

/**
 * Extracts the date and user ID from a column ID.
 *
 * @param {string} id - The column ID string.
 * @returns {{ date: string, userId: string }} An object containing the extracted date and user ID.
 */
export const getDataFromColId = (id: string): { date: string; userId: string } => {
  const [date, userId] = id.split('_')

  return { date, userId }
}
