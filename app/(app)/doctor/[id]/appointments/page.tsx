import DoctorAppointmentFeeds from "@/components/Feeds/DoctorAppointmentsFeed";
import { AppointmentsProvider } from "@/contexts/Appointments.context";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getCurrentDoctorAppointments } from "@/lib/actions/utils.actions";
import { eAppointmentStatus } from "@/types/enums/enums";

export default async function page() {
	const [
		currentUser,
		{ appointments: doctorAppointments },
		{ appointments: autoAppointments },
	] = await Promise.all([
		getCurrentUser(),
		getCurrentDoctorAppointments(),
		getAppointments({
			doctor: undefined,
			status: eAppointmentStatus.CANCELLED,
		}),
	]);

	return (
		<AppointmentsProvider
			appointmentsInit={doctorAppointments}
			className="sm:p-3"
		>
			<DoctorAppointmentFeeds autoAppointments={autoAppointments} />
		</AppointmentsProvider>
	);
}
