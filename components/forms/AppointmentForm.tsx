"use client";

import {
	AppointmentFormData,
	useAppointmentForm,
} from "@/lib/formSchemas/appointment.schema";
import { cn } from "@/lib/utils";
import { ePatientConsent } from "@/types/enums/enums";
import { Headset } from "lucide-react";
import { ComponentProps, ReactNode, useState, useTransition } from "react";
import Heading from "../custom/Heading";
import getAppointmentFormStepper from "../formSteppers/AppointmentFormStepper";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";

import { useCurrent } from "@/contexts/Current.context";
import {
	createAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import { createReminder } from "@/lib/actions/reminder.actions";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { goeyToast, gooeyToast } from "goey-toast";
import { FieldErrors } from "react-hook-form";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
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

		if (action === "Create") {
			startTransition(async () => {
				const { id } = await createAppointment({ ...cleanData });
				gooeyToast.success(
					"Appointment Placed. \n You notified once it's confirmed."
				);
				setIsSuccess(true);

				// TODO might make it seem slower
				await createReminder({
					user: patient.user.id,
					time: data.startTime!,
					reminderLabel: `Appointment with Dr.${selectedDoctor?.user.fname}.`,
					description: data.reason,
					variant: "Appointment",
					itemId: id,
				});
			});
		} else if (action === "Update" && appointment) {
			startTransition(async () => {
				await updateAppointment({ ...appointment, ...cleanData });
				gooeyToast.success("Appointment Updated.");
				// form.reset();
				setIsSuccess(true);
			});
		}
	};

	const errHandler = async (err: FieldErrors<PatientFormData>) => {
		console.log("err: ", err);
		goeyToast.error("Form input error(s)", {
			icon: "🚨",
			description: (
				<div>
					{Object.entries(err).map(([k, v]) => (
						<p key={k} className={"text-sm text-secondary-foreground"}>
							<span className="font-medium text-destructive">{k}: </span>
							<code>{v.message}</code>
						</p>
					))}
				</div>
			),
			id: "9c247bf4",
		});
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
				<p className="text-primary">
					<Heading className="text-xl">
						<Headset size={23} />
						<span>New Appointment</span>
					</Heading>
				</p>
				<p>Set up a one-on-one meet with a doctor👨‍⚕️</p>
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
		<FormPanel>
			<FormPanelTrigger asChild className={cn("", className)}>
				{children}
			</FormPanelTrigger>
			<FormPanelContent>
				<AppointmentForm {...props} />
			</FormPanelContent>
		</FormPanel>
	);
};
