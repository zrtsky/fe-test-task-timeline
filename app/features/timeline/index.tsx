'use client'

import { FC, Fragment, use, useCallback } from 'react'

import { TimelineData } from '@/api/timeline-data'
import { TimelineContext } from '@/entities/timeline/contexts'
import { TimelineTaskEditor } from '@/entities/timeline/task-editor'
import { UserTask } from '@/features/timeline/entities/user-task'
import { generateColId } from '@/features/timeline/models/data'
import { UserCard } from '@/features/timeline/ui'
import { GridCol } from '@/features/timeline/ui/grid-col'

type GridRowItem = {
  label: string
  value: string
}

type TimelineDataProps = {
  gridRowItems: GridRowItem[]
}

export const TimeLine: FC<TimelineDataProps> = ({ gridRowItems }) => {
  const { data, drawerTask, setOpenDrawerId, updateTask } = use(TimelineContext)

  const totalHours = useCallback((tasks: TimelineData['tasks']) => {
    return tasks.reduce((total, task) => total + task.durationInHrs, 0)
  }, [])

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridRowItems.length + 1}, 1fr)`,
        }}
      >
        <GridCol first className="flex items-center justify-center font-semibold">
          Users
        </GridCol>
        {gridRowItems.map(({ label, value }) => (
          <GridCol key={value} className="flex items-center justify-center font-semibold">
            {label}
          </GridCol>
        ))}
        {data.map(({ userId, tasks, avatar, fullName, position }, index) => (
          <Fragment key={userId}>
            <GridCol first lastCol={index === data.length - 1} noPadding>
              <UserCard
                avatar={avatar}
                fullName={fullName}
                position={position}
                totalHours={totalHours(tasks)}
              />
            </GridCol>
            {gridRowItems.map(({ value }) => (
              <UserTask
                key={value}
                colId={generateColId(value, userId)}
                tasks={tasks}
                date={value}
                lastCol={index === data.length - 1}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <TimelineTaskEditor task={drawerTask} onClose={() => setOpenDrawerId('')} onSubmit={updateTask} />
    </>
  )
}
