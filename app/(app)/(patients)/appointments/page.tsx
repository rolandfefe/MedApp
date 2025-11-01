import PatientAppointmentFeeds from "@/components/Feeds/PatientAppointmentFeeds";
import { PaginationProvider } from "@/contexts/Pagination.context";
import { getDoctors } from "@/lib/actions/doctor.actions";
import {
	getCurrentPatientAppointments
} from "@/lib/actions/utils.actions";

export default async function page() {
	const [{ appointments }, { doctors }] = await Promise.all([
		getCurrentPatientAppointments(),
		getDoctors({ limit: 0 }),
	]);

	return (
		<PaginationProvider appointmentsInit={appointments} doctorsInit={doctors}>
			<PatientAppointmentFeeds />
		</PaginationProvider>
	);
}
