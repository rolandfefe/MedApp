"use client";

import { useReferrals } from "@/contexts/referrals.context";

export default function ReferralsFeed() {
	const { referrals, isLoading, loadRef } = useReferrals();

	console.log("Referrals:", referrals);

	return <div>ReferralsFeed</div>;
}
