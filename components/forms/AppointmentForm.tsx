"use client";

import {
	AppointmentFormData,
	appointmentFormSchema,
} from "@/lib/formSchemas/appointment.schema";
import { cn } from "@/lib/utils";
import { ePatientConsent } from "@/types/enums/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Headset, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import getAppointmentFormStepper from "../formSteppers/AppointmentFormStepper";
import {
	MorphingDialog,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogSubtitle,
	MorphingDialogTitle,
	MorphingDialogTrigger,
} from "../motion-primitives/morphing-dialog";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";

import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { FieldErrors } from "react-hook-form";
import toast from "react-hot-toast";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../custom/motion-stepper";
import { ShineBorder } from "../ui/shine-border";
import { ScrollArea } from "../ui/scroll-area";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";

export default function AppointmentForm({
	action,
	appointment,
	patient,
	doctors,
}: {
	action: "Create" | "Update";
	appointment?: IAppointment;
	patient: IPatient;
	doctors: IDoctor[];
}) {
	const [isPending, startTransition] = useTransition();
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [selectedConsent, setSelectedConsent] = useState<ePatientConsent[]>([
		ePatientConsent.HEALTH_STATUSES,
	]);
	const [selectedDoctor, setSelectedDoctor] = useState<IDoctor>();
	const pathname = usePathname();

	console.log("selected Doc:", selectedDoctor);

	const form = useForm<AppointmentFormData>({
		resolver: zodResolver(appointmentFormSchema),
		defaultValues: {
			reason: appointment?.reason,
			type: appointment?.type,
			endTime: appointment?.endTime as Date,
			startTime: appointment?.startTime as Date,
		},
	});

	const submitHandler = async (data: AppointmentFormData) => {
		const cleanData: IAppointment = {
			...data,
			consentLevels: selectedConsent,
			doctor: selectedDoctor,
			patient: patient._id!,
		};
		console.log(data);

		if (action === "Create") {
			startTransition(async () => {
				await createAppointment({ ...cleanData }, pathname);
				toast.success(
					"Appointment Placed. \n You notified once it's confirmed."
				);

				// form.reset()
				setIsSuccess(true);
			});
		} else if (action === "Update" && appointment) {
			startTransition(async () => {
				await updateAppointment({ ...appointment, ...cleanData }, pathname);
				toast.success("Appointment Updated.");
				// form.reset();
				setIsSuccess(true);
			});
		}
	};

	const errHandler = async (err: FieldErrors<PatientFormData>) => {
		console.log("err: ", err);
		toast.custom(
			(t) => (
				<Card className="w-[95vw] sm:w-72 relative">
					<MyBtn
						size="icon"
						variant={"secondary"}
						onClick={() => toast.dismiss(t.id)}
						className="size-7 rounded-xl hover:text-destructive absolute top-2 right-2 "
					>
						<X />
					</MyBtn>
					<CardContent className="px-2 py-1">
						<Heading className="text-xl">🚨Form input error(s) </Heading>
						<Separator className="my-1" />
						<div>
							{Object.entries(err).map(([k, v]) => (
								<p key={k} className={"text-sm text-secondary-foreground"}>
									<span className="font-medium text-destructive">{k}: </span>
									<code>{v.message}</code>
								</p>
							))}
						</div>
					</CardContent>
				</Card>
			),
			{ id: "9c247bf4" }
		);
	};

	const FORM_STEPS = getAppointmentFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending,
		selectedConsent,
		setSelectedConsent,
		setSelectedDoctor,
		doctors,
		selectedDoctor
	);

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

			<ScrollArea className="h-[85vh] sm:h-[80vh]">
				<Form {...form}>
					<Stepper>
						{FORM_STEPS.map(({ title, body, isComplete }, i) => (
							<Step key={i}>
								<StepperTrigger
									i={i + 1}
									activeStep={activeStep}
									setActiveStep={setActiveStep}
									isComplete={isComplete}
								>
									{title}
								</StepperTrigger>

								<StepperContent
									activeStep={activeStep}
									setActiveStep={setActiveStep}
									i={i + 1}
								>
									{body}
								</StepperContent>
							</Step>
						))}
					</Stepper>
				</Form>
			</ScrollArea>
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
			<MorphingDialogTrigger
				shortcutKey="p"
				asChild
				className={cn("", className)}
			>
				{children}
			</MorphingDialogTrigger>

			<MorphingDialogContainer>
				<MorphingDialogContent className=" sm:max-w-[80vw]  md:min-w-lg">
					<AppointmentForm {...props} />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	);
};
