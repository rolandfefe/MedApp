import ReferralsFeed from "@/components/Feeds/ReferralsFeed";
import { ReferralsProvider } from "@/contexts/referrals.context";
import { getReferrals } from "@/lib/actions/referral.actions";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";

export default async function page() {
	const doctor = await getCurrentDoctor();

	// ? Both sent and received
	const { referrals } = await getReferrals({ from: doctor.id, to: doctor.id });

	return (
		<ReferralsProvider variant="Doctor" referralsInit={referrals}>
			<ReferralsFeed />
		</ReferralsProvider>
	);
}
