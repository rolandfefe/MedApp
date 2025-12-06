import { getAppointment } from "@/lib/actions/appointment.actions";

/**
 * @Description Give full details of specific appointment
 */
export default async function page({
	params,
}: PageProps<"/doctor/[id]/appointments/[appointmentId]">) {
	const { appointmentId: id } = await params;
	const appointment = await getAppointment(id);

	console.log(appointment);

	return <div>page</div>;
}
