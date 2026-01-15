"use client";

import { usePlans } from "@/contexts/Plan.context";
import Void from "../custom/Void";
import PlanCard from "../cards/PlanCard";
import { Variants, motion, stagger } from "motion/react";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const motionVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

// todo Automatically Alert on those whose dates are due.
export default function RecurrencePlanFeed() {
	const { plans } = usePlans();
	const { state: sidebarState } = useSidebar();

	console.log("Pat plans: ", plans);

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
			// className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap pt-3"
			className={cn(
				"space-y-3 pt-3",
				sidebarState == "expanded" ? "lg:px-10" : "lg:px-20"
			)}
		>
			{plans.length > 0 ? (
				plans.map((p) => (
					<motion.div
						key={p.id}
						variants={motionVariants}
						layout
						className={cn(
							"flex-1 basis-full",
							sidebarState == "expanded" ? "sm:basis-full md:basis-[45%]" : ""
						)}
					>
						<PlanCard plan={p} />
					</motion.div>
				))
			) : (
				<Void msg="You have no follow-up plans" />
			)}
		</motion.div>
	);
}
