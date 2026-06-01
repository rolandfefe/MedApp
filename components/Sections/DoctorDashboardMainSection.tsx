"use client";

import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import DashboardCard from "../cards/DashboardCard";
import { AnimatePresence, motion, stagger, Variants } from "motion/react";
import ArticleForm from "../forms/ArticleForm";

const VARIANTS: Variants = {
	hidden: {
		scale: 0.2,
		opacity: 0,
	},
	visible: {
		scale: 1,
		opacity: 1,
	},
};

export default function DoctorDashboardMainSection({
	doctor,
	stats,
}: {
	doctor: IDoctor;
	stats: {
		appointmentsN: number;
		referralsN: number;
		followupsN: number;
		articlesN: number;
	};
} & ComponentProps<"section">) {
	const router = useRouter();

	return (
		<motion.section
			variants={VARIANTS}
			initial="hidden"
			animate="visible"
			transition={{
				delayChildren: stagger(0.2),
				ease: "easeInOut",
			}}
			className="flex items-center flex-wrap gap-3"
		>
			<ArticleForm.Trigger className="fixed bottom-3 right-3 z-50" />

			<AnimatePresence>
				<motion.div
					variants={VARIANTS}
					className="flex-1 basis-[60%] md:basis-[24%]"
				>
					<DashboardCard
						imageSrc="/assets/medical-care.svg"
						icon="headset"
						title="Appointments"
						n={stats.appointmentsN}
						onClick={() => router.push(`/doctor/${doctor.id}/appointments`)}
					/>
				</motion.div>

				<motion.div
					variants={VARIANTS}
					className="flex-1 basis-[40%] md:basis-[24%]"
				>
					<DashboardCard
						imageSrc="/assets/medical-care.svg"
						icon="arrow-big-right"
						title="Referrals"
						n={stats.referralsN}
						onClick={() => router.push(`/doctor/${doctor.id}/referrals`)}
					/>
				</motion.div>

				<motion.div
					variants={VARIANTS}
					className="flex-1 basis-[30%] md:basis-[24%]"
				>
					<DashboardCard
						imageSrc="/assets/medical-care.svg"
						icon="notebook-tabs"
						title="Articles"
						n={stats.articlesN}
						onClick={() => router.push(`/doctor/${doctor.id}/articles`)}
					/>
				</motion.div>

				<motion.div
					variants={VARIANTS}
					className="flex-1 basis-[70%] md:basis-[24%]"
				>
					<DashboardCard
						imageSrc="/assets/medical-care.svg"
						icon="arrow-down-right-from-circle"
						title="Follow-ups"
						n={stats.appointmentsN}
						onClick={() => router.push(`/doctor/${doctor.id}/follow-ups`)}
					/>
				</motion.div>
			</AnimatePresence>
		</motion.section>
	);
}
