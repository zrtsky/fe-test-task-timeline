import { isSameDay } from 'date-fns'
import { DragEvent, FC, use } from 'react'
import { useBoolean } from 'react-use'
import { twMerge } from 'tailwind-merge'

import { TimelineData } from '@/api/timeline-data'
import { TimelineContext } from '@/entities/timeline/contexts'
import { GridCol } from '@/features/timeline/ui/grid-col'

import { TaskCard } from './task-card'

type UserTaskProps = {
  colId: string
  tasks: TimelineData['tasks']
  date: string
  lastCol: boolean
}

const TASK_ID_IDENTIFICATOR = 'taskId'

export const UserTask: FC<UserTaskProps> = ({ date, tasks, lastCol, colId }) => {
  const [isHovered, setIsHovered] = useBoolean(false)
  const { updateTaskPosition } = use(TimelineContext)
  const filteredTasks = tasks.filter((task) => isSameDay(new Date(task.date), new Date(date)))

  const handleDragStart = (ev: DragEvent<HTMLDivElement>, taskId: string) => {
    ev.dataTransfer.setData(TASK_ID_IDENTIFICATOR, taskId)
  }

  const handleOnDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    setIsHovered(false)

    const taskId = ev.dataTransfer.getData(TASK_ID_IDENTIFICATOR)
    const nearestColId = document
      .elementFromPoint(ev.clientX, ev.clientY)
      ?.closest('[data-col-id]')
      ?.getAttribute('data-col-id')

    if (!nearestColId || !taskId) return

    updateTaskPosition(taskId, nearestColId)
  }

  return (
    <GridCol
      lastCol={lastCol}
      data-col-id={colId}
      className={twMerge(
        'flex flex-col gap-4 transition-colors duration-300',
        isHovered && 'bg-gray-200 dark:bg-gray-700',
      )}
      onDragLeave={() => setIsHovered(false)}
      onDrop={handleOnDrop}
      onDragOver={(ev) => {
        ev.preventDefault()
        setIsHovered(true)
      }}
    >
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} onDragStart={handleDragStart} {...task} />
      ))}
    </GridCol>
  )
}
