import { getDoctor } from "@/lib/actions/doctor.actions";
import React from "react";

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const doctor = await getDoctor({ id: decodeURIComponent(id) });

	console.log("doctor:", doctor);

	return <div>Doctor's Dashboard</div>;
}
