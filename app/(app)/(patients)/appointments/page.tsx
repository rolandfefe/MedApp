import PatientAppointmentFeeds from "@/components/Feeds/PatientAppointmentFeeds";
import { AppointmentsProvider } from "@/contexts/Appointments.context";
import { getCurrentPatientAppointments } from "@/lib/actions/utils.actions";

export default async function page() {
	const [{ appointments }] = await Promise.all([
		getCurrentPatientAppointments({}),
	]);

	return (
		<AppointmentsProvider
			appointmentsInit={appointments}
			fetchAction={getCurrentPatientAppointments}
		>
			<PatientAppointmentFeeds />
		</AppointmentsProvider>
	);
}
