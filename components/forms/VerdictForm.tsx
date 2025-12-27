"use client";

import { Form } from "@/components/ui/form";
import { useConsultation } from "@/contexts/consultation.context";
import { createVerdict, updateVerdict } from "@/lib/actions/verdict.actions";
import {
	VerdictFormData,
	VerdictZodSchema,
} from "@/lib/formSchemas/verdict.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedEditorState } from "lexical";
import { useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToastErrCard from "../cards/ToastErrCard";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../custom/motion-stepper";
import getVerdictFormStepper, {
	PatientNotesSection,
	TreatmentPlanSection,
} from "../formSteppers/VerdictFormStepper";
import { useCurrent } from "@/contexts/Current.context";

export default function VerdictForm() {
	const { verdict, diagnosis } = useConsultation();
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const currentDoctor = useCurrent().currentDoctor!;

	const [notesSerializedState, setNotesSerializedState] = useState<
		SerializedEditorState | undefined
	>(verdict?.notes);
	const [planSerializedState, setPlanSerializedState] = useState<
		SerializedEditorState | undefined
	>(verdict?.treatmentPlan.plan);

	const [isPending, startTransition] = useTransition();

	const form = useForm<VerdictFormData>({
		resolver: zodResolver(VerdictZodSchema),
		defaultValues: {
			// ! Fix error form default values
			isConfirmed: verdict?.isConfirmed || false,
			prognosis: verdict?.prognosis || "",
			treatmentPlan: verdict?.treatmentPlan || {},
		},
	});

	const submitHandler = async (data: VerdictFormData) => {
		if (!notesSerializedState || !planSerializedState) {
			toast.custom(
				(t) => (
					<ToastErrCard t={t}>
						{!notesSerializedState && (
							<p className={"text-sm text-secondary-foreground"}>
								<span className="font-medium text-destructive">
									Verdict Notes:
								</span>
								<code>Please the verdict notes📒.</code>
							</p>
						)}
						{!planSerializedState && (
							<p className={"text-sm text-secondary-foreground"}>
								<span className="font-medium text-destructive">
									Treatment Plan:
								</span>
								<code>Please the treatment plan🩺.</code>
							</p>
						)}
					</ToastErrCard>
				),
				{ id: "c2428nc209" }
			);
			toast.error(
				"Please ensure that you detail both the 'Verdict Notes' and 'Treatment Plan'."
			);
			return;
		}

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
				await updateVerdict({
					...verdict,
					...cleanData,
					updatedBy: currentDoctor.id,
				});

				toast.success("Verdict Updated✍️");
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
