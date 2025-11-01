import { getDoctor } from "@/lib/actions/doctor.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const currentUser = await getCurrentUser();
	const doctor = await getCurrentDoctor();

	return <div>page</div>;
}
