import DoctorsFeed from "@/components/Feeds/DoctorsFeed";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getCurrentPatient } from "@/lib/actions/utils.actions";
import React from "react";

export default async function page() {
	const doctors = await getDoctors();
	const currentPatient = await getCurrentPatient();
	return (
		<div>
			<DoctorsFeed doctors={doctors} currentPatient={currentPatient} />
		</div>
	);
}
