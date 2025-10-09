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
import { Badge } from "../ui/badge";
import ConfirmationDialog from "../panels/ConfirmationDialog";

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
			<Card {...props} className={cn("bg-muted/60 border", className)}>
				<CardContent>
					<div className="flex items-center gap-x-3 justify-between">
						<Heading className="flex items-center gap-x-1">
							<span className="text-primary hidden sm:inline">Referred </span>
							<CopyBadge
								variant={"secondary"}
								content={appointment._id!}
								className="text-primary sm:text-secondary-foreground"
							>
								{referral._id!}
							</CopyBadge>
						</Heading>
						<ActionBtns
							appointment={appointment}
							referral={referral}
							className="flex"
						/>
					</div>
					<Separator className="my-2" />

					<section className="flex flex-col sm:flex-row gap-2 items-center mb-3">
						<DoctorCard
							doctor={referral.from as IDoctor}
							variant="xs"
							className="flex-1"
						/>
						<ArrowBigRightDash className="rotate-90 sm:rotate-0 text-primary" />
						<DoctorCard
							doctor={referral.to as IDoctor}
							variant="xs"
							className="flex-1"
						/>
					</section>
					<div className="p-2 text-sm rounded-xl glass-bg text-popover-foreground">
						<p>{referral.reason}</p>

						<p className="text-xs mt-2 text-muted-foreground flex items-center justify-between  ">
							<Badge variant="secondary">{referral.status}</Badge>
							<span className="">
								{moment(referral.createdAt).format("Do MMM - h:mma")}
							</span>
						</p>
					</div>

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

	const deleteHandler = async () => {
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

			<ConfirmationDialog
				action={deleteHandler}
				msg={`Are you sure you want to PERMANENTLY delete referral 🆔: ${referral._id!}?`}
				successMsg={`Referral of 🆔: ${referral._id!} Deleted🗑️.`}
			>
				<MyBtn
					size="icon"
					variant="outline"
					className="text-destructive"
				>
					{isDeleting ? <Spinner /> : <Trash2 />}
				</MyBtn>
			</ConfirmationDialog>
		</ButtonGroup>
	);
};
