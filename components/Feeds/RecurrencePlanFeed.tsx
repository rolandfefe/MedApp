"use client";

import { StaggerVariants } from "@/app/MotionVariants";
import { usePlans } from "@/contexts/Plan.context";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import PlanCard from "../cards/PlanCard";
import Void from "../custom/Void";
import StaggerList from "../layouts/StaggerList";
import { useSidebar } from "../ui/sidebar";

// todo Automatically Alert on those whose dates are due.
export default function RecurrencePlanFeed() {
	const { plans } = usePlans();
	const { state: sidebarState } = useSidebar();

	console.log("Pat plans: ", plans);

	return (
		<StaggerList
			className={cn(
				"space-y-3 pt-3",
				sidebarState == "expanded" ? "lg:px-10" : "lg:px-20"
			)}
		>
			{plans.length > 0 ? (
				plans.map((p) => (
					<motion.div
						key={p.id}
						variants={StaggerVariants}
						transition={{ ease: "easeOut", duration: 0.5 }}
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
		</StaggerList>
	);
}
