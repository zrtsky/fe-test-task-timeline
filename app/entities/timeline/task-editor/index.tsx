'use client'

import { AnimatePresence, motion } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import { FC, useEffect, useRef } from 'react'
import { useClickAway, useKey } from 'react-use'

import { Task } from '@/api/timeline-data'

import { TaskForm } from './task-form'

type TimelineTaskEditorProps = {
  task?: Task
  onClose: () => void
  onSubmit: (task: Task) => void
}

// PORTALS DOESN'T WORK CORRECTLY WITH NEXT.JS 15

export const TimelineTaskEditor: FC<TimelineTaskEditorProps> = ({ task, onClose, onSubmit }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickAway(wrapperRef, onClose)
  useKey('Escape', onClose)

  useEffect(() => {
    setTimeout(
      () => {
        document.body.style.overflow = isEmpty(task) ? 'unset' : 'hidden'
      },
      isEmpty(task) ? 220 : 0,
    )
  }, [task])

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {!isEmpty(task) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex justify-end bg-black/30 backdrop-blur"
        >
          <motion.div
            ref={wrapperRef}
            initial={{ x: '100%', scale: 0.9 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: '100%', scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="py-4 pr-4"
          >
            <TaskForm onClose={onClose} onSubmit={onSubmit} task={task} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
