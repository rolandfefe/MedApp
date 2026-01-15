import VerdictsFeed from "@/components/Feeds/VerdictsFeed";
import { VerdictsProvider } from "@/contexts/Verdicts.context";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";
import { getVerdicts } from "@/lib/actions/verdict.actions";

export default async function page() {
	const currentDoctor = await getCurrentDoctor();
	const { verdicts } = await getVerdicts({ patient: currentDoctor.id });

	return (
		<VerdictsProvider verdictsInit={verdicts}>
			<VerdictsFeed />
		</VerdictsProvider>
	);
}
