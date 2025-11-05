import PatientAppointmentFeeds from "@/components/Feeds/PatientAppointmentFeeds";
import { AppointmentsProvider } from "@/contexts/Appointments.context";
import { DoctorsProvider } from "@/contexts/Doctors.context";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getCurrentPatientAppointments } from "@/lib/actions/utils.actions";

export default async function page() {
	const [{ appointments }, { doctors }] = await Promise.all([
		getCurrentPatientAppointments(),
		getDoctors({ limit: 0 }),
	]);

	return (
		<AppointmentsProvider appointmentsInit={appointments}>
			<DoctorsProvider doctorsInit={doctors}>
				<PatientAppointmentFeeds />
			</DoctorsProvider>
		</AppointmentsProvider>
	);
}
