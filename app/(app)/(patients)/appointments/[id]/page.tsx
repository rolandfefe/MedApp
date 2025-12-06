import { getAppointment } from "@/lib/actions/appointment.actions";

export default async function page({
	params,
}: PageProps<"/appointments/[id]">) {
	const { id } = await params;
	const appointment = await getAppointment(id);

	console.log(appointment);

	return <div>page</div>;
}
