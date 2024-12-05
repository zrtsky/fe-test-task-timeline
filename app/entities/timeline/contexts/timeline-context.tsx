'use client'

import cloneDeep from 'lodash/cloneDeep'
import uniqBy from 'lodash/uniqBy'
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useMemo, useState } from 'react'

import { Task, TimelineData } from '@/api/timeline-data'
import { getDataFromColId } from '@/features/timeline/models/data'

interface TimelineContextProps {
  data: TimelineData[]
  setData: Dispatch<SetStateAction<TimelineData[]>>
  openDrawerId: string
  setOpenDrawerId: Dispatch<SetStateAction<string>>
  updateTaskPosition: (taskId: string, colId: string) => void
  deleteTaskById: (taskId: string) => void
  drawerTask?: Task
  updateTask: (task: Task) => void
}

export const TimelineContext = createContext<TimelineContextProps>({
  data: [],
  setData: () => {},
  openDrawerId: '',
  setOpenDrawerId: () => {},
  updateTaskPosition: () => {},
  deleteTaskById: () => {},
  updateTask: () => {},
})

type TimelineDataProps = PropsWithChildren<{
  initialData: TimelineData[]
}>

export const TimelineContextProvider: FC<TimelineDataProps> = ({ children, initialData }) => {
  const [data, setData] = useState<TimelineData[]>(initialData)
  const [openDrawerId, setOpenDrawerId] = useState<string>('')

  const updateTaskPosition = (taskId: string, colId: string) => {
    const copyData = cloneDeep(data)
    const { date, userId } = getDataFromColId(colId)

    const task = copyData
      .map((data) => data.tasks)
      .flat()
      .find((task) => task.id === taskId)
    if (!task) return

    const filteredData = copyData.map((data) => ({
      ...data,
      tasks: data.tasks.filter((singleTask) => singleTask.id !== task.id),
    }))

    const newTaskData = filteredData.map((data) => {
      if (data.userId === userId) {
        data.tasks = uniqBy([{ ...task, date: new Date(date) }, ...data.tasks], 'id')
      }

      return data
    })

    setData(newTaskData)
  }

  const deleteTaskById = (taskId: string) => {
    setData((prevData) =>
      prevData.map((data) => ({
        ...data,
        tasks: data.tasks.filter((singleTask) => singleTask.id !== taskId),
      })),
    )
  }

  const drawerTask = useMemo(() => {
    return data
      .map((data) => data.tasks)
      .flat()
      .find((task) => task.id === openDrawerId)
  }, [openDrawerId, data])

  const updateTask = (task: Task) => {
    setData((prevData) =>
      prevData.map((data) => ({
        ...data,
        tasks: data.tasks.map((singleTask) => {
          if (singleTask.id === task.id) return task

          return singleTask
        }),
      })),
    )
  }

  return (
    <TimelineContext.Provider
      value={{
        data,
        setData,
        openDrawerId,
        setOpenDrawerId,
        updateTaskPosition,
        deleteTaskById,
        drawerTask,
        updateTask,
      }}
    >
      {children}
    </TimelineContext.Provider>
  )
}
