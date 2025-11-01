import DoctorsFeed from "@/components/Feeds/DoctorsFeed";
import { PaginationProvider } from "@/contexts/Pagination.context";
import { getDoctors } from "@/lib/actions/doctor.actions";

export default async function page() {
	const [{ doctors }] = await Promise.all([getDoctors({})]);

	return (
		<PaginationProvider doctorsInit={doctors}>
			<DoctorsFeed />
		</PaginationProvider>
	);
}
