import Image from 'next/image'
import { FC } from 'react'

type UserCardProps = {
  fullName: string
  avatar: string
  totalHours: number
  position: string
}

export const UserCard: FC<UserCardProps> = ({ avatar, fullName, totalHours, position }) => {
  return (
    <div className="flex h-full min-w-80 items-center gap-1 bg-gray-200/80 px-4 py-3 dark:bg-gray-900/80">
      <Image src={avatar} width={32} height={32} alt={fullName} className="size-8 rounded-full" />
      <div className="ml-2 text-wrap">
        <p className="line-clamp-2 font-semibold">{fullName}</p>
        <p className="line-clamp-1 text-xs opacity-70">{position}</p>
        <p className="text-sm text-blue-600">
          <span className="font-bold">{totalHours}</span> hour(s)
        </p>
      </div>
    </div>
  )
}
