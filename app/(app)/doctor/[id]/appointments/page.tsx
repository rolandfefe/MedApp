import DoctorAppointmentFeeds from "@/components/Feeds/DoctorAppointmentsFeed";
import { CurrentProvider } from "@/contexts/Current.context";
import { PaginationProvider } from "@/contexts/Pagination.context";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { getDoctor } from "@/lib/actions/doctor.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getCurrentDoctorAppointments } from "@/lib/actions/utils.actions";
import { eAppointmentStatus } from "@/types/enums/enums";

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
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

	console.log(currentUser);

	return (
		<PaginationProvider
			appointmentsInit={doctorAppointments}
			className="sm:p-3"
		>
			<DoctorAppointmentFeeds autoAppointments={autoAppointments} />
		</PaginationProvider>
	);
}
