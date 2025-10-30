import { deleteReferral } from "@/lib/actions/referral.actions";
import { cn } from "@/lib/utils";
import { ArrowBigRightDash, Edit3, Trash2 } from "lucide-react";
import moment from "moment";
import { usePathname } from "next/navigation";
import { ComponentProps, useTransition } from "react";
import toast from "react-hot-toast";
import CopyBadge from "../custom/CopyBadge";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { ReferralFormDialog } from "../forms/ReferralForm";
import ConfirmationDialog from "../panels/ConfirmationDialog";
import { Badge } from "../ui/badge";
import { ButtonGroup } from "../ui/button-group";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import DoctorCard from "./DoctorCard";

export default function ReferralCard({
	referral,
	variant = "md",
	className,
	...props
}: {
	referral: IReferral;
	variant?: "sm" | "md" | "lg";
} & ComponentProps<typeof Card>) {
	const appointment = referral.appointment as Appointment;
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
								content={appointment.id!}
								className="text-primary sm:text-secondary-foreground"
							>
								{referral.id!}
							</CopyBadge>
						</Heading>
						<ActionBtns referral={referral} className="flex" />
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
	referral,
	...props
}: {
	referral: IReferral;
} & ComponentProps<typeof ButtonGroup>) => {
	const [isDeleting, startDeleting] = useTransition();
	const pathname = usePathname();

	const deleteHandler = async () =>
		startDeleting(async () => {
			await deleteReferral(referral.id!);
		});

	return (
		<ButtonGroup {...props}>
			<ReferralFormDialog
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
				msg={`Are you sure you want to PERMANENTLY delete referral 🆔: ${referral.id!}?`}
				successMsg={`Referral deleted.🗑️`}
			>
				<MyBtn size="icon" variant="outline" className="text-destructive">
					{isDeleting ? <Spinner /> : <Trash2 />}
				</MyBtn>
			</ConfirmationDialog>
		</ButtonGroup>
	);
};
