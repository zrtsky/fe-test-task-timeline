import { timelineData } from '@/api/timeline-data'
import { TimelineContextProvider } from '@/entities/timeline/contexts/timeline-context'
import { TimeLine } from '@/features/timeline'
import { currentWeekGridRows } from '@/features/timeline/models/data'
import { Welcome } from '@/widgets/home'

export const revalidate = 3600

export default function Home() {
  return (
    <div className="mt-8">
      <Welcome />
      <TimelineContextProvider initialData={timelineData}>
        <TimeLine gridRowItems={currentWeekGridRows} />
      </TimelineContextProvider>
    </div>
  )
}
