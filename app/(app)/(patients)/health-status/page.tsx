import Heading from "@/components/custom/Heading";
import HealthStatusDashboard from "@/components/HealthStatusDashboard";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentPatient,
	getCurrentPatientHealStatuses,
} from "@/lib/actions/utils.actions";
import Image from "next/image";

export default async function page() {
	const currentUser = await getCurrentUser();
	const statuses = (await getCurrentPatientHealStatuses()) as IHealthStatus[];
	const patient = await getCurrentPatient();

	console.log("statuses: ", statuses);

	return (
		<div className="space-y-3">
			<section className="flex flex-col sm:flex-row sm:items-start gap-3">
				<Image
					src={"/assets/doctor-heart.svg"}
					alt="doctors"
					width={999}
					height={999}
					priority
					className="w-[70vw] sm:w-1/2 md:w-1/3  mx-auto sm:mx-0"
				/>

				<div className="space-y-2">
					<Heading className="text-2xl sm:text-3xl">
						<span>Health</span>
						<span className="text-primary">Status 🩺</span>
					</Heading>

					<div className="text-xs sm:text-sm space-y-2">
						<p>
							👉 Detail your medical information and **vitals** (e.g., heart
							rate, BP).
						</p>
						<p>
							👉 **ACTION REQUIRED:** You must **refresh your health status
							every week**.
						</p>
						<p>👉 This data is visible to your Doctors during appointments.</p>
						<p>👉 Maintain accuracy for the best experience and care.</p>
					</div>
				</div>
			</section>
			<section className="border rounded-xl p-3">
				<HealthStatusDashboard healthStatuses={statuses} patient={patient} />
			</section>
		</div>
	);
}
