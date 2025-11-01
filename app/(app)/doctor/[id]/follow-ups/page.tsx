import { getCurrentDoctor } from "@/lib/actions/utils.actions";

export default async function page() {
	const doctor = await getCurrentDoctor();

	return <div>page</div>;
}
