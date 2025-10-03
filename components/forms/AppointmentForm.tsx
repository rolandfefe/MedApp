"use client";

import React, { ComponentProps, ReactNode, useTransition } from "react";
import {
	MorphingDialog,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogSubtitle,
	MorphingDialogTitle,
	MorphingDialogTrigger,
} from "../motion-primitives/morphing-dialog";
import { cn } from "@/lib/utils";
import { Headset } from "lucide-react";
import Heading from "../custom/Heading";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import {
	AppointmentFormData,
	appointmentFormSchema,
} from "@/lib/formSchemas/appointment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";

export default function AppointmentForm({
	action,
	appointment,
	patient,
}: {
	action: "Create" | "Update";
	appointment?: IAppointment;
	patient: IPatient;
}) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<AppointmentFormData>({
		resolver: zodResolver(appointmentFormSchema),
		defaultValues: {
			reason: appointment?.reason,
			type: appointment?.type,
			endTime: appointment?.endTime as Date,
			startTime: appointment?.startTime as Date,
		},
	});

	return (
		<div>
			<section>
				<MorphingDialogTitle className="text-primary">
					<Heading className="text-xl">
						<Headset size={23} />
						<span>New Appointment</span>
					</Heading>
				</MorphingDialogTitle>
				<MorphingDialogSubtitle>
					Set up a one-on-one meet with a doctor👨‍⚕️
				</MorphingDialogSubtitle>
			</section>
			<Separator className="my-2" />

			<Form {...form}></Form>
		</div>
	);
}

export const AppointmentPanel = ({
	children,
	className,
	...props
}: { children: ReactNode; className?: string } & ComponentProps<
	typeof AppointmentForm
>) => {
	return (
		<MorphingDialog>
			<MorphingDialogTrigger asChild className={cn("", className)}>
				{children}
			</MorphingDialogTrigger>

			<MorphingDialogContainer>
				<MorphingDialogContent>
					<AppointmentForm {...props} />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	);
};
