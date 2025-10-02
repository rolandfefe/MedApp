import Heading from "@/components/custom/Heading";
import MyBtn from "@/components/custom/MyBtn";
import { logoFont } from "@/app/fonts";
import OnboardingNav from "@/components/layouts/OnboardingNav";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { Hospital, User, UserPlus2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { PatientFormPanel } from "@/components/forms/patientForm";
import { DoctorFormPanel } from "@/components/forms/DoctorForm";

export default async function page() {
	const currentUser = await getCurrentUser();

	console.log("User:", currentUser);

	return (
		<div className="space-y-3 p-3">
			<OnboardingNav className="mb-10" />

			<section className="flex flex-col sm:flex-row items-start gap-3 sm:px-10 md:px-20">
				<Image
					src={"/assets/welcome.svg"}
					alt="hero-img"
					height={999}
					width={999}
					priority
					className="w-[95%] sm:w-1/3 md:w-1/2 mx-auto sm:mx-0"
				/>
				<div className="space-y-3">
					<Heading className="text-3xl">
						Hello,{" "}
						<span className={` ${logoFont.className} text-primary`}>
							{currentUser.fname}
						</span>
						👋
					</Heading>

					<div>
						<p>
							This is were you can set up all your details as a Patient or a
							doctor.
						</p>
						<p>Accuracy of data is crucial.</p>

						<p>Select your type of registration below.</p>
					</div>

					<div className="flex items-center px-2 gap-2">
						<PatientFormPanel currentUser={currentUser}>
							<MyBtn
								variant="secondary"
								size="lg"
								className="flex-1 text-primary"
							>
								<UserPlus2 />
								Patient
							</MyBtn>
						</PatientFormPanel>

						<DoctorFormPanel currentUser={currentUser}>
							<MyBtn size="lg" className="flex-1">
								<Hospital /> Doctor
							</MyBtn>
						</DoctorFormPanel>
					</div>
				</div>
			</section>
		</div>
	);
}
