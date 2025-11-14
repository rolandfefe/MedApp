import React from 'react'

export default async function page({params}: {params: Promise<{appointmentId: string}>}) {
  const { appointmentId } = await params;
  return (
    <div>page</div>
  )
}
