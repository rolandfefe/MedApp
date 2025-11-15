"use client";

import { Form } from "@/components/ui/form";
import { useConsultation } from "@/contexts/consultation.context";
import {
	VerdictFormData,
	VerdictZodSchema,
} from "@/lib/formSchemas/verdict.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedEditorState } from "lexical";
import { X } from "lucide-react";
import { useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../custom/Heading";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../custom/motion-stepper";
import MyBtn from "../custom/MyBtn";
import getVerdictFormStepper, {
	PatientNotesSection,
	TreatmentPlanSection,
} from "../formSteppers/VerdictFormStepper";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import ToastErrCard from "../cards/ToastErrCard";
import { createVerdict, updateVerdict } from "@/lib/actions/verdict.actions";

export default function VerdictForm() {
	const { verdict, diagnosis } = useConsultation();
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const [notesSerializedState, setNotesSerializedState] =
		useState<SerializedEditorState>();
	const [planSerializedState, setPlanSerializedState] =
		useState<SerializedEditorState>();
	const [isPending, startTransition] = useTransition();

	const form = useForm<VerdictFormData>({
		resolver: zodResolver(VerdictZodSchema),
		defaultValues: {
			// ! Fix error form default values
			// isConfirmed: verdict?.isConfirmed!,
			// prognosis: verdict?.prognosis!,
			// treatmentPlan: verdict?.treatmentPlan!,
		},
	});

	const submitHandler = async (data: VerdictFormData) => {
		const cleanData: IVerdict = {
			...data,
			notes: notesSerializedState,
			treatmentPlan: {
				plan: planSerializedState,
				...data.treatmentPlan,
			},
			diagnosis: diagnosis!.id,
		};
		console.log(cleanData);

		if (verdict) {
			// ? Update

			startTransition(async () => {
				await updateVerdict({ ...verdict, ...cleanData });

				toast("Verdict Updated✍️")
				form.reset();
				setIsSuccess(true);
			});
		} else {
			// ? Create
			startTransition(async () => {
				await createVerdict(cleanData);

				toast.success("Verdict Created");
				// ! Add real-time notification to Patient
				form.reset();
				setIsSuccess(true);
			});
		}
	};

	const errHandler = async (err: FieldErrors<VerdictFormData>) => {
		console.log("err: ", err);
		toast.custom(
			(t) => (
				<ToastErrCard t={t}>
					{Object.entries(err).map(([k, v]) => (
						<p key={k} className={"text-sm text-secondary-foreground"}>
							<span className="font-medium text-destructive">{k}: </span>
							<code>{v.message}</code>
						</p>
					))}
				</ToastErrCard>
			),
			{ id: "cn94839k" }
		);
	};

	const FORM_STEPS = getVerdictFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	return (
		<div className="space-y-3">
			<PatientNotesSection
				setNotesSerializedState={setNotesSerializedState}
				notesSerializedState={notesSerializedState}
			/>

			{/* <Separator className="my-4" /> */}

			<TreatmentPlanSection
				form={form}
				setPlanSerializedState={setPlanSerializedState}
				planSerializedState={planSerializedState}
			/>

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
