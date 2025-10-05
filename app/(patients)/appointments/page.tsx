import PatientAppointmentFeeds from "@/components/Feeds/PatientAppointmentFeeds";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentPatient,
	getCurrentPatientAppointments,
} from "@/lib/actions/utils.actions";

export default async function page() {
	const appointments = await getCurrentPatientAppointments();
	const currentPatient = await getCurrentPatient();
	const doctors = await getDoctors();

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
