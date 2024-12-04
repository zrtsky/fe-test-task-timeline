'use client'

import { motion } from 'framer-motion'
import { CircleDollarSign, Clock } from 'lucide-react'
import { DragEvent, FC, use, useMemo } from 'react'

import { TimelineData } from '@/api/timeline-data'
import { TimelineContextMenu } from '@/entities/timeline/context-menu'
import { TimelineContext } from '@/entities/timeline/contexts'
import { formatDollar } from '@/shared/helpers/numbers'
import { Card, CardContent, CardHeader } from '@/shared/ui'

type TaskCardProps = {
  onDragStart: (e: DragEvent<HTMLDivElement>, taskId: string) => void
} & TimelineData['tasks'][number]

export const TaskCard: FC<TaskCardProps> = ({ title, status, durationInHrs, price, id, onDragStart }) => {
  const { setOpenDrawerId } = use(TimelineContext)
  const cardVariant = useMemo(() => {
    if (status === 'done') return 'success'
    if (status === 'in-progress') return 'warning'
    if (status === 'todo') return 'info'
  }, [status])

  return (
    <TimelineContextMenu taskId={id}>
      <motion.div
        layout
        layoutId={id}
        data-task-id={id}
        className="w-full"
        draggable
        onDragStart={(ev) => onDragStart(ev as unknown as DragEvent<HTMLDivElement>, id)}
        onDoubleClick={() => setOpenDrawerId(id)}
      >
        <Card className="w-full cursor-grab select-none active:cursor-grabbing" variant={cardVariant}>
          <CardHeader>
            <h3 className="line-clamp-2 font-semibold">{title}</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="flex items-center gap-x-1">
                <Clock size={16} />
                <p className="text-xs font-semibold">{durationInHrs} hr(s)</p>
              </div>
              <div className="flex items-center gap-x-1">
                <CircleDollarSign size={16} />
                <p className="text-xs font-semibold">{formatDollar(price)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TimelineContextMenu>
  )
}
