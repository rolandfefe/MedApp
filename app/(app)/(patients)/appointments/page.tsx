import PatientAppointmentFeeds from "@/components/Feeds/PatientAppointmentFeeds";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentPatient,
	getCurrentPatientAppointments,
} from "@/lib/actions/utils.actions";

export default async function page() {
	const [appointments, currentPatient, { doctors }] = await Promise.all([
		getCurrentPatientAppointments(),
		getCurrentPatient(),
		getDoctors({ limit: 0 }),
	]);

	return (
		<div className="sm:p-3">
			<PatientAppointmentFeeds
				appointments={appointments}
				doctors={doctors}
				currentPatient={currentPatient}
			/>
		</div>
	);
}
