import DashboardCard from "@/components/cards/DashboardCard";
import Heading from "@/components/custom/Heading";
import DoctorDashboardMainSection from "@/components/Sections/DoctorDashboardMainSection";
import { Separator } from "@/components/ui/separator";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { getArticles } from "@/lib/actions/article.actions";
import { getPlans } from "@/lib/actions/recurrencePlan.actions";
import { getReferrals } from "@/lib/actions/referral.actions";
import {
	getCurrentDoctor,
	getCurrentDoctorAppointments,
} from "@/lib/actions/utils.actions";
import Image from "next/image";

export default async function page() {
	const doctor = await getCurrentDoctor();

	const [{ appointments }, { referrals }, { articles }, { plans }] =
		await Promise.all([
			getCurrentDoctorAppointments({ limit: 0 }),
			getReferrals({ from: doctor.id, to: doctor.id, limit: 0 }),
			getArticles({ limit: 0 }),
			getPlans({ supervisor: doctor.id, limit: 0 }),
		]);

	return (
		<div className="space-y-4">
			<section className="flex flex-col sm:flex-row gap-3">
				<div className="flex-1 sm:flex-[.5] border">
					<Image
						src="/assets/doctor-heart.svg"
						alt="doctor-heart"
						width={999}
						height={999}
						priority
						className="w-full"
					/>
				</div>

				<div className="flex-1">
					<Heading className="text-xl sm:text-3xl md:text-4xl">
						Hello, <span className="text-primary">Dr.{doctor.user.fname}</span>
						👋
					</Heading>

					<div>
						<p>
							Welcome to the Doctor's DashBoard. Hear you can make quick actions
							and get quick info
						</p>
					</div>
				</div>
			</section>

			<Separator className={"mh-3"} />

			<DoctorDashboardMainSection
				doctor={doctor}
				stats={{
					appointmentsN: appointments.length,
					referralsN: referrals.length,
					articlesN: articles.length,
					followupsN: plans.length,
				}}
			/>
		</div>
	);
}
