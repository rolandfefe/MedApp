import RecurrencePlanFeed from "@/components/Feeds/RecurrencePlanFeed";
import { PlanProvider } from "@/contexts/Plan.context";
import { getPlans } from "@/lib/actions/recurrencePlan.actions";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";

export default async function page() {
	const doctor = await getCurrentDoctor();
	const { plans } = await getPlans({ supervisor: doctor.id });

	return (
		<PlanProvider variant="Doctor" plansInit={plans}>
			<RecurrencePlanFeed />
		</PlanProvider>
	);
}
