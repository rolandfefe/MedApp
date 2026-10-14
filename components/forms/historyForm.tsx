"use client";

import React, { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import {
	DoctorFormData,
	doctorFormSchema,
} from "@/lib/formSchemas/doctor.schema";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { History, Hospital, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import Heading from "../custom/Heading";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../custom/motion-stepper";
import MyBtn from "../custom/MyBtn";
import getDoctorFormStepper from "../formSteppers/doctorFormStepper";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { createDoctor, updateDoctor } from "@/lib/actions/doctor.actions";
import {
	HistoryFormData,
	historyFormSchema,
} from "@/lib/formSchemas/history.schema";
import { createHistory, updateHistory } from "@/lib/actions/history.action";
import getHistoryFormStepper from "../formSteppers/HistoryFormStepper";
import { goeyToast } from "goey-toast";
import { useCurrent } from "@/contexts/Current.context";

export default function HistoryForm({
	history,
	action,
}: {
	history?: IHistory;
	action: "Create" | "Update";
}) {
	const patient = useCurrent().currentPatient!;
	const currentUser = useCurrent().currentUser!;
	const [activeStep, setActiveStep] = useState<number>(1);
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const router = useRouter();

	console.log("form", history);

	const form = useForm<HistoryFormData>({
		resolver: zodResolver(historyFormSchema),
		defaultValues: {},
	});

	const submitHandler = async (data: HistoryFormData) => {
		const cleanData: IHistory = {
			...data,
			socialHistory: {
				...data.socialHistory,
				substanceUse: {
					...data.socialHistory?.substanceUse,
					substances: data.socialHistory?.substanceUse.substances.split(", "),
				},
			},
		};

		if (action === "Create") {
			startTransition(async () => {
				await createHistory({ ...cleanData, patient: patient.id! });

				goeyToast.success("Patient history created👍");
				form.reset();
				setIsSuccess(true);
			});
		} else if (action === "Update" && history) {
			startTransition(async () => {
				await updateHistory({ ...history, ...cleanData });
				goeyToast.success("Patient history updated🔃");
				form.reset();
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
			id: "dcwewr423",
		});
	};

	const FORM_STEPS = getHistoryFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	return (
		<div className="">
			<div className="px-2 sticky top-0 bg-background/40 backdrop-blur-2xl backdrop-saturate-150">
				<Heading className="text-xl md:text-2xl text-primary">
					<History /> History Form <Badge variant={"secondary"}>{action}</Badge>{" "}
				</Heading>
				<Separator className="my-3" />
			</div>

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
		</div>
	);
}

export const HistoryFormPanel = ({
	children,
	...props
}: { children: ReactNode } & ComponentProps<typeof HistoryForm>) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild>{children}</FormPanelTrigger>

			<FormPanelContent>
				<HistoryForm {...props} />
			</FormPanelContent>
		</FormPanel>
	);
};
