"use client";

import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";
import { BadgeAlert, Check, ChevronLeft, ChevronRight } from "lucide-react";
import MyBtn from "./MyBtn";

export function Stepper({ children }: { children: ReactNode }) {
	return <div className="space-y-2">{children}</div>;
}

export function Step({ children}: { children: ReactNode;}) {
	return <motion.div layout>{children}</motion.div>;
}

export function StepperTrigger({
	children,
	i,
	activeStep,
	setActiveStep,
	isComplete = false,
}: {
	children: ReactNode;
	i: number;
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
	isComplete?: boolean;
}) {
	return (
		<motion.div
			layout
			onClick={() => setActiveStep(i)}
			className="flex items-center gap-x-3 cursor-pointer "
		>
			<MyBtn
				size="icon"
				variant={activeStep === i ? "default" : "primary-outline"}
				className="border-2"
			>
				{activeStep > i ? isComplete ? <Check /> : <BadgeAlert /> : i}
			</MyBtn>
			<div className={cn("font-medium", activeStep == i && "text-primary")}>
				{children}
			</div>
		</motion.div>
	);
}

export function StepperContent({
	children,
	i,
	activeStep,
	setActiveStep,
}: {
	children: ReactNode;
	i: number;
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<motion.div
			initial={{ height: "2rem", opacity: 0 }}
			animate={{ height: "auto", opacity: 1 }}
			className="p-2 pl-5 ml-4 border-l-2 border-primary"
		>
			<AnimatePresence>
				{activeStep === i && (
					<motion.div>
						<div>{children}</div>

						<div className="flex items-center justify-end mt-3 gap-x-2 ">
							<MyBtn
								disabled={i == 1}
								size="icon"
								variant="secondary"
								onClick={() => setActiveStep(i - 1)}
							>
								<ChevronLeft />
							</MyBtn>
							<MyBtn size="icon" onClick={() => setActiveStep(i + 1)}>
								<ChevronRight />
							</MyBtn>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
