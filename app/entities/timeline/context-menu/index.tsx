'use client'

import { Edit, Trash } from 'lucide-react'
import { FC, PropsWithChildren, use } from 'react'

import { TimelineContext } from '@/entities/timeline/contexts'
import { twConfig } from '@/shared/lib/utils'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/shared/ui'

type TimelineContextMenuProps = PropsWithChildren<{
  taskId: string
}>

const redColor = twConfig.theme.colors.red[500]

export const TimelineContextMenu: FC<TimelineContextMenuProps> = ({ children, taskId }) => {
  const { deleteTaskById, setOpenDrawerId } = use(TimelineContext)

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem inset onClick={() => setOpenDrawerId(taskId)}>
          Edit
          <ContextMenuShortcut>
            <Edit size={16} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="text-red-500" onClick={() => deleteTaskById(taskId)}>
          Delete
          <ContextMenuShortcut>
            <Trash size={16} color={redColor} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
