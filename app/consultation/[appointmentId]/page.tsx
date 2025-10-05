import { getAppointment } from "@/lib/actions/appointment.actions";
import React from "react";

export default async function page({
	params,
}: {
	params: Promise<{ appointmentId: string }>;
}) {
	const { appointmentId } = await params;

	const appointment = await getAppointment({
		_id: decodeURIComponent(appointmentId),
	});


  
	return <div>page</div>;
}
