import { faker } from '@faker-js/faker'

export type Task = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  price: number
  durationInHrs: number
  date: Date
}

export type TaskStatus = Task['status']

const createTimelineData = () => ({
  userId: faker.string.uuid(),
  username: faker.internet.username(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  position: faker.person.jobTitle(),
  birthdate: faker.date.birthdate(),
  registeredAt: faker.date.past(),
  tasks: faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 1, max: 4 }),
      description: faker.lorem.paragraph({ min: 5, max: 15 }),
      status: faker.helpers.arrayElement(['todo', 'in-progress', 'done']),
      price: faker.number.int({ min: 10, max: 1000 }), // $10-$1000
      durationInHrs: faker.number.int({ min: 1, max: 8 }), // 1-8 hours
      date: faker.date.between({
        from: new Date(),
        to: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days
      }),
    }),
    {
      count: faker.number.int({ min: 1, max: 3 }),
    },
  ) as Task[],
})

export type TimelineData = ReturnType<typeof createTimelineData>

export const timelineData = faker.helpers.multiple(createTimelineData, {
  count: 15,
})
