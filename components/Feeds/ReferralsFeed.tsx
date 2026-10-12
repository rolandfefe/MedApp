"use client";

import { StaggerVariants } from "@/app/MotionVariants";
import { useReferrals } from "@/contexts/referrals.context";
import { AnimatePresence, motion } from "motion/react";
import ReferralCard from "../cards/ReferralCard";
import Void from "../custom/Void";
import StaggerList from "../layouts/StaggerList";

export default function ReferralsFeed() {
	const { referrals, isLoading, loadRef } = useReferrals();

	console.log("Referrals:", referrals);

	return (
		<AnimatePresence>
			<StaggerList>
				{referrals.length > 0 ? (
					referrals.map((r) => (
						<motion.div
							variants={StaggerVariants}
							transition={{ ease: "easeOut", duration: 0.5 }}
							key={r.id}
						>
							<ReferralCard.LG
								referral={r}
								key={r.id}
								className="w-full md:w-4/5 mx-auto"
							/>
						</motion.div>
					))
				) : (
					<Void msg="You have no referrals👍." />
				)}
			</StaggerList>
		</AnimatePresence>
	);
}
