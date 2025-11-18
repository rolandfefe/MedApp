"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { Clock3, UserCircle } from "lucide-react";
import moment from "moment";
import { Variants, motion, stagger } from "motion/react";
import DoctorCard from "../cards/DoctorCard";
import RecurrenceForm from "../forms/RecurrenceForm";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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

export default function RecurrencePlanAside() {
	const { recurrencePlan } = useConsultation();

	if (!recurrencePlan) return <RecurrenceForm />;

	console.log(recurrencePlan);
	return (
		<motion.div
			variants={motionVariants}
			initial={"hidden"}
			animate={"visible"}
			transition={{
				delayChildren: stagger(0.3),
				delay: 1,
			}}
			className="space-y-4"
		>
			<motion.section variants={motionVariants} layout>
				<p className="mb-3 text-lg font-medium flex items-center gap-x-2">
					<UserCircle /> Supervisor :
				</p>
				<DoctorCard doctor={recurrencePlan.supervisor as IDoctor} />
			</motion.section>

			<motion.section
				variants={motionVariants}
				layout
				className="p-3 rounded-xl bg-popover space-y-3"
			>
				<p className="text-lg font-medium flex items-center gap-x-2">
					<Clock3 /> Time :
				</p>
				<Separator className="mt-2 mb-4" />

				<div className="flex items-center gap-2 flex-wrap">
					{recurrencePlan.weekDays.map((day) => (
						<Badge variant="secondary" className="text-primary" key={day}>
							{day}
						</Badge>
					))}
				</div>

				<div className="flex items-center gap-x-2">
					<div className="flex-1">
						<p className="font-medium text-muted-foreground">Start :</p>

						<p>
							<span className="text-sm">
								{moment(recurrencePlan.startDate).format("MMM")}
							</span>{" "}
							<span className="text-xl">
								{moment(recurrencePlan.startDate).format("Do")}
							</span>
						</p>
					</div>
					<div className="flex-1">
						<p className="font-medium text-muted-foreground">End :</p>

						<p>
							<span className="text-sm">
								{moment(recurrencePlan.endDate).format("MMM")}
							</span>{" "}
							<span className="text-xl">
								{moment(recurrencePlan.endDate).format("Do")}
							</span>
						</p>
					</div>
				</div>
				<div className="flex items-center gap-x-2">
					<div className="flex-1">
						<p className="font-medium text-muted-foreground">Start time :</p>
						<p>
							<span className="text-xl">{recurrencePlan.startTime}</span>
						</p>
					</div>
					<div className="flex-1">
						<p className="font-medium text-muted-foreground">End time :</p>
						<p>
							<span className="text-xl">{recurrencePlan.endTime}</span>
						</p>
					</div>
				</div>
			</motion.section>

			{recurrencePlan.exceptions?.length! > 0 && (
				<motion.section
					variants={motionVariants}
					layout
					className="border rounded-xl p-3"
				>
					<p className="text-lg font-medium flex items-center gap-x-2">
						<Clock3 /> Exceptions :
					</p>
					<Separator className="mt-2 mb-4" />
					<div className="flex items-center flex-wap gap-3">
						{recurrencePlan.exceptions?.map((e) => (
							<Badge variant="secondary" key={e} className="">
								{e}
							</Badge>
						))}
					</div>
				</motion.section>
			)}
		</motion.div>
	);
}
