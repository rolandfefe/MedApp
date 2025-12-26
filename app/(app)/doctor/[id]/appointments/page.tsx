import DoctorAppointmentFeeds from "@/components/Feeds/DoctorAppointmentsFeed";
import { AppointmentsProvider } from "@/contexts/Appointments.context";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { getCurrentDoctorAppointments } from "@/lib/actions/utils.actions";
import { eAppointmentStatus } from "@/types/enums/enums";

export default async function page() {
	const [
		{ appointments: doctorAppointments },
		{ appointments: autoAppointments },
	] = await Promise.all([
		getCurrentDoctorAppointments({}),
		getAppointments({
			doctor: undefined,
			status: eAppointmentStatus.CANCELLED,
		}),
	]);

	return (
		<AppointmentsProvider
			appointmentsInit={doctorAppointments}
			fetchAction={getCurrentDoctorAppointments}
			className="sm:p3"
		>
			<DoctorAppointmentFeeds autoAppointments={autoAppointments} />
		</AppointmentsProvider>
	);
}
