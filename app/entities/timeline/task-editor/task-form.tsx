import { zodResolver } from '@hookform/resolvers/zod'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Task, TaskStatus } from '@/api/timeline-data'
import { taskEditSchema } from '@/entities/timeline/task-editor/models/validators'
import { Button, Card, CardContent, CardFooter, CardHeader, Input, Label } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { Textarea } from '@/shared/ui/textarea'

type TaskFormProps = {
  task: Task
  onSubmit: (task: Task) => void
  onClose: () => void
}

export const TaskForm: FC<TaskFormProps> = ({ onClose, onSubmit, task }) => {
  const values = pick(task, ['title', 'status', 'durationInHrs', 'price', 'description'])
  type Inputs = typeof values

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: values,
    resolver: zodResolver(taskEditSchema),
  })
  const fields = watch()
  const isSameValues = isEqual(fields, values)

  const submit: SubmitHandler<Inputs> = (data) => {
    if (isSameValues) return
    onSubmit({ ...task, ...data })
    onClose()
  }

  return (
    <form className="h-full max-w-[33vw]" onSubmit={handleSubmit(submit)}>
      <Card className="grid size-full grid-rows-[auto,1fr,auto]">
        <CardHeader>
          <h2 className="text-2xl font-bold">Task Editor</h2>
          <p className="text-xs opacity-80">
            Here you can edit the task details. Please, be careful with the changes.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <Input {...register('title')} label="Title" errorText={errors.title?.message} />
          <Textarea
            {...register('description')}
            label="Description"
            maxRows={10}
            errorText={errors.description?.message}
          />
          <Input
            {...register('price', { valueAsNumber: true })}
            type="number"
            label="Price"
            errorText={errors.price?.message}
          />
          <Input
            {...register('durationInHrs', { valueAsNumber: true })}
            type="number"
            label="Duration in Hrs"
            errorText={errors.durationInHrs?.message}
          />
          <div>
            <p className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-300">Status</p>
            <RadioGroup
              onValueChange={(newValue) => setValue('status', newValue as TaskStatus)}
              defaultValue={values.status}
              className="flex flex-wrap gap-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="todo" id="todo" />
                <Label htmlFor="todo" className="cursor-pointer">
                  To do
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-progress" id="in-progress" />
                <Label htmlFor="in-progress" className="cursor-pointer">
                  In Progress
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="done" id="done" />
                <Label htmlFor="done" className="cursor-pointer">
                  Done
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={isSameValues}>
            Save
          </Button>
          <Button type="button" className="flex-1" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
