import ReferralsFeed from "@/components/Feeds/ReferralsFeed";
import { ReferralsProvider } from "@/contexts/referrals.context";
import { getReferralsByPatient } from "@/lib/actions/referral.actions";
import { getCurrentPatient } from "@/lib/actions/utils.actions";

export default async function page() {
	const currentPatient = await getCurrentPatient();
	const { referrals } = await getReferralsByPatient({
		patient: currentPatient.id,
	});

	return (
		<ReferralsProvider
			variant="Patient"
			referralsInit={referrals}
			className="pt-3 sm:p-3"
		>
			<ReferralsFeed />
		</ReferralsProvider>
	);
}
