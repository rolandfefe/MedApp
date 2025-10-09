import { IReferral } from "@/types/appointment";
import React, { ComponentProps, useTransition } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import CopyBadge from "../custom/CopyBadge";
import { Separator } from "../ui/separator";
import { ButtonGroup } from "../ui/button-group";
import MyBtn from "../custom/MyBtn";
import { ArrowBigRightDash, Edit3, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import { ReferralFormDialog } from "../forms/ReferralForm";
import DoctorCard from "./DoctorCard";
import moment from "moment";
import Heading from "../custom/Heading";

export default function ReferralCard({
	referral,
	appointment,
	variant = "md",
	className,
	...props
}: {
	referral: IReferral;
	appointment: IAppointment;
	variant?: "sm" | "md" | "lg";
} & ComponentProps<typeof Card>) {
	console.log(referral);

	if (variant === "sm") {
		return (
			<Card {...props} className={cn("bg-muted/60 border-none", className)}>
				<CardContent>
					<div className="flex items-center gap-x-3 justify-between">
						<Heading className="flex items-center gap-x-1">
							<span className="text-primary">Referred </span>
							<CopyBadge variant={"secondary"} content={appointment._id!}>
								{referral._id!}
							</CopyBadge>
							<ArrowBigRightDash className="text-primary" />
						</Heading>
						<ActionBtns
							appointment={appointment}
							referral={referral}
							className="hidden sm:flex"
						/>
					</div>
					<Separator className="my-2" />

					<section className="space-y-4">
						<div>
							<p className="text-sm font-medium mb-1">From: </p>

							<DoctorCard doctor={referral.from as IDoctor} />
						</div>
						<div>
							<p className="text-sm font-medium mb-1">To: </p>

							<DoctorCard doctor={referral.to as IDoctor} />
						</div>

						<div className="p-2 text-sm rounded-xl bg-popover text-popover-foreground">
							<p>{referral.reason}</p>

							<p className="text-xs mt-2 text-end">
								{moment(referral.createdAt).format("")}
							</p>
						</div>
					</section>
					<section className="flex items-center justify-between"></section>
				</CardContent>
			</Card>
		);
	} else if (variant === "md") {
		return (
			<Card {...props} className={cn("", className)}>
				<CardContent>{referral.reason}</CardContent>
			</Card>
		);
	} else if (variant === "lg") {
		return (
			<Card {...props} className={cn("", className)}>
				<CardContent>{referral.reason}</CardContent>
			</Card>
		);
	}
}

const ActionBtns = ({
	appointment,
	referral,
	...props
}: {
	appointment: IAppointment;
	referral: IReferral;
} & ComponentProps<typeof ButtonGroup>) => {
	const [isDeleting, startDeleting] = useTransition();

	const deleteHandler = () => {
		const cleanData: IAppointment = {
			...appointment,
			referrals: appointment.referrals?.filter((r) => r._id !== referral._id),
		};

		startDeleting(async () => {
			await updateAppointment(cleanData);
			toast.success("Referral deleted.🗑️");
		});
	};

	return (
		<ButtonGroup {...props}>
			<ReferralFormDialog
				appointment={appointment}
				action="Update"
				referral={referral}
				className="rounded-e-none"
			>
				<MyBtn size="icon" variant="outline" className="rounded-e-none">
					<Edit3 />
				</MyBtn>
			</ReferralFormDialog>

			<MyBtn
				size="icon"
				variant="outline"
				onClick={deleteHandler}
				className="text-destructive"
			>
				{isDeleting ? <Spinner /> : <Trash2 />}
			</MyBtn>
		</ButtonGroup>
	);
};
