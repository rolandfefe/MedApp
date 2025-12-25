"use client";

import { useReferrals } from "@/contexts/referrals.context";
import { AnimatePresence, motion, Variants } from "motion/react";
import ReferralCard from "../cards/ReferralCard";
import Void from "../custom/Void";

const feedVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: 30,
	},
};

export default function ReferralsFeed() {
	const { referrals, isLoading, loadRef } = useReferrals();

	console.log("Referrals:", referrals);

	return (
		<AnimatePresence>
			<motion.div
				variants={feedVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				// className="flex items-center gap-3 flex-wrap"
			>
				{referrals.length > 0 ? (
					referrals.map((r) => (
						// <motion.div variants={feedVariants} key={r.id}>
						<ReferralCard.LG
							referral={r}
							key={r.id}
							className="w-full md:w-4/5 mx-auto"
						/>
						// </motion.div>
					))
				) : (
					<Void msg="You have no referrals👍." />
				)}
			</motion.div>
		</AnimatePresence>
	);
}
