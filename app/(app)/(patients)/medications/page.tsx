import VerdictsFeed from "@/components/Feeds/VerdictsFeed";
import { VerdictsProvider } from "@/contexts/Verdicts.context";
import { getCurrentPatient } from "@/lib/actions/utils.actions";
import { getVerdicts } from "@/lib/actions/verdict.actions";

export default async function page() {
	const currentPatient = await getCurrentPatient();
	const { verdicts } = await getVerdicts({ patient: currentPatient.id });

	return (
		<VerdictsProvider verdictsInit={verdicts}>
			<VerdictsFeed />
		</VerdictsProvider>
	);
}
