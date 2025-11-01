import { getCurrentUser } from "@/lib/actions/user.actions";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";

export default async function page() {
	const currentUser = await getCurrentUser();
	const doctor = await getCurrentDoctor();

	return <div>page</div>;
}
