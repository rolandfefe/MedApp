import { ArrowBigRightDash } from "lucide-react";
import React from "react";
import Heading from "../custom/Heading";
import { Separator } from "../ui/separator";
import ReferralCard from "../cards/ReferralCard";
import { AnimatePresence, motion } from "motion/react";
import Void from "../custom/Void";
import MyBtn from "../custom/MyBtn";
import { ReferralFormDialog } from "../forms/ReferralForm";

export default function ReferralsAside({
	referrals,
	appointment,
}: {
	referrals: IReferral[];
	appointment?: IAppointment;
}) {
	// const referrals = appointment.referrals;

	return (
		<div>
			<Heading className="text-xl text-primary">
				Referrals <ArrowBigRightDash />
			</Heading>

			<Separator className="my-3" />

			<AnimatePresence>
				{referrals && referrals.length > 0 ? (
					referrals.map((referral, i) => (
						<motion.div
							key={i}
							layout
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 100 }}
							className="mb-2"
						>
							<ReferralCard referral={referral} variant="sm" />
						</motion.div>
					))
				) : (
					<div>
						<Void
							msg={`This appointment has no referrals. Click button bellow to make a referral👇.`}
						/>

						<ReferralFormDialog appointment={appointment} action="Create">
							<MyBtn
								variant="secondary"
								size="lg"
								className="flex responsive-w mx-auto mt-3 text-primary"
							>
								Make referral <ArrowBigRightDash />
							</MyBtn>
						</ReferralFormDialog>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
