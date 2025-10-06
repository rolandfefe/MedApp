import DoctorAppointmentFeeds from "@/components/Feeds/DoctorAppointmentsFeed";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { getDoctor } from "@/lib/actions/doctor.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { eAppointmentStatus } from "@/types/enums/enums";

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const doctor = await getDoctor({ id: decodeURIComponent(id) });
	const currentUser = await getCurrentUser();
	const doctorAppointments = await getAppointments({ doctorId: doctor._id });
	const autoAppointments = await getAppointments({
		doctorId: undefined,
		status: eAppointmentStatus.CANCELLED,
	});

	console.log(doctor.user, currentUser);

	return (
		<div className="sm:p-3">
			<DoctorAppointmentFeeds
				appointments={doctorAppointments}
				currentDoctor={doctor}
				autoAppointments={autoAppointments}
			/>
		</div>
	);
}
