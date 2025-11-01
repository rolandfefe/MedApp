import { getCurrentDoctor } from "@/lib/actions/utils.actions";

export default async function page() {
	const doctor = await getCurrentDoctor();

	console.log("doctor:", doctor);

	return <div>Doctor's Dashboard</div>;
}
