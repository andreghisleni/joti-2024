import { NextRequest, NextResponse } from 'next/server'

import { serverClient } from '@/lib/trpc/server'

export async function POST(request: NextRequest) {
  const data = await request.json()

  console.log('data', data)

  await serverClient.createJotiMember(data)

  return NextResponse.json({ message: 'Hello, world!' })
}
