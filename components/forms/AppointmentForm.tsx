"use client";

import {
	AppointmentFormData,
	appointmentFormSchema,
	useAppointmentForm,
} from "@/lib/formSchemas/appointment.schema";
import { cn } from "@/lib/utils";
import { ePatientConsent } from "@/types/enums/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Headset } from "lucide-react";
import { ComponentProps, ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Heading from "../custom/Heading";
import getAppointmentFormStepper from "../formSteppers/AppointmentFormStepper";
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogSubtitle,
	MorphingDialogTitle,
	MorphingDialogTrigger,
} from "../motion-primitives/morphing-dialog";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";

import { useCurrent } from "@/contexts/Current.context";
import {
	createAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { FieldErrors } from "react-hook-form";
import toast from "react-hot-toast";
import ToastErrCard from "../cards/ToastErrCard";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../custom/motion-stepper";
import { ScrollArea } from "../ui/scroll-area";

export default function AppointmentForm({
	action,
	appointment,
}: {
	action: "Create" | "Update";
	appointment?: IAppointment;
}) {
	const patient = useCurrent().currentPatient as IPatient;

	const [isPending, startTransition] = useTransition();
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [selectedConsent, setSelectedConsent] = useState<
		IAppointment["consentLevels"]
	>([ePatientConsent.HEALTH_STATUSES]);
	const [selectedDoctor, setSelectedDoctor] = useState<IDoctor>();

	// console.log("selected Doc:", selectedDoctor);

	const form = useAppointmentForm(appointment);

	const submitHandler = async (data: AppointmentFormData) => {
		const cleanData: IAppointment = {
			...data,
			consentLevels: selectedConsent,
			doctor: selectedDoctor?.id,
			patient: patient.id!,
		};
		console.log(data);

		if (action === "Create") {
			startTransition(async () => {
				await createAppointment({ ...cleanData });
				toast.success(
					"Appointment Placed. \n You notified once it's confirmed."
				);

				// form.reset()
				setIsSuccess(true);
			});
		} else if (action === "Update" && appointment) {
			startTransition(async () => {
				await updateAppointment({ ...appointment, ...cleanData });
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
				<ToastErrCard t={t}>
					<div>
						{Object.entries(err).map(([k, v]) => (
							<p key={k} className={"text-sm text-secondary-foreground"}>
								<span className="font-medium text-destructive">{k}: </span>
								<code>{v.message}</code>
							</p>
						))}
					</div>
				</ToastErrCard>
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
				<MorphingDialogContent className=" sm:max-w-[80vw]  md:min-w-lg lg:min-w-md">
					<AppointmentForm {...props} />
					<MorphingDialogClose className="text-foreground" />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	);
};
