import DoctorsFeed from "@/components/Feeds/DoctorsFeed";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getCurrentPatient } from "@/lib/actions/utils.actions";
import React from "react";

export default async function page() {
	const [currentPatient, { doctors }] = await Promise.all([
		getCurrentPatient(),
		getDoctors({}),
	]);

	return (
		<div>
			<DoctorsFeed doctors={doctors} currentPatient={currentPatient} />
		</div>
	);
}
