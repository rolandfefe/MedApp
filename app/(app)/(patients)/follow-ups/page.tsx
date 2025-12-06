import RecurrencePlanFeed from "@/components/Feeds/RecurrencePlanFeed";
import { PlanProvider } from "@/contexts/Plan.context";
import { getPlansByPatient } from "@/lib/actions/recurrencePlan.actions";
import { getCurrentPatient } from "@/lib/actions/utils.actions";

export default async function page() {
	const currentPatient = await getCurrentPatient();
	const { plans } = await getPlansByPatient({
		patient: currentPatient.id,
	});

	return (
		<PlanProvider variant="Patient" plansInit={plans}>
			<RecurrencePlanFeed />
		</PlanProvider>
	);
}
