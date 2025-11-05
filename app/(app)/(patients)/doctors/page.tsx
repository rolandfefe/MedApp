import DoctorsFeed from "@/components/Feeds/DoctorsFeed";
import { DoctorsProvider } from "@/contexts/Doctors.context";
import { getDoctors } from "@/lib/actions/doctor.actions";

export default async function page() {
	const [{ doctors }] = await Promise.all([getDoctors({})]);

	return (
		<DoctorsProvider doctorsInit={doctors}>
			<DoctorsFeed />
		</DoctorsProvider>
	);
}
