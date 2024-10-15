import { Metadata } from 'next'

import { Bt } from './bt'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const revalidate = 30

export default function DashboardPage() {
  return (
    <div className="px-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid grid-cols-6 gap-4">
        {/* <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalTicket />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalDeliveredTicket />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalMembers />
          </Suspense>
        </div> */}

        <Bt />
      </div>
    </div>
  )
}
