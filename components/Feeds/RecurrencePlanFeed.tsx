"use client";

import { useAppointments } from "@/contexts/Appointments.context";
import { usePlans } from "@/contexts/Plan.context";

export default function RecurrencePlanFeed() {
	const { plans } = usePlans();

	console.log("Pat plans: ", plans);

	return <div>RecurrencePlanFeed</div>;
}
