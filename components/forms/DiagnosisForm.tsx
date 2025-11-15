"use client";

import { Form } from "@/components/ui/form";
import { useConsultation } from "@/contexts/consultation.context";
import { useCurrent } from "@/contexts/Current.context";
import {
	DiagnosisFormData,
	diagnosisFormSchema,
} from "@/lib/formSchemas/diagnosis.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedEditorState } from "lexical";
import { Hospital, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useState, useTransition } from "react";
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
import getDiagnosisFormStepper, {
	ChiefComplaintSection,
	NotesSection,
} from "../formSteppers/DiagnosisFormStepper";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import {
	createDiagnosis,
	updateDiagnosis,
} from "@/lib/actions/diagnosis.actions";

export default function DiagnosisForm({
	action,
	diagnosis,
}: {
	action: "Create" | "Update";
	diagnosis?: IDiagnosis;
}) {
	const { appointment, patientHistory } = useConsultation();
	const currentDoctor = useCurrent().currentDoctor!;
	const patient = appointment.patient as IPatient;
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const [complaintEditorState, setComplaintEditorState] =
		useState<SerializedEditorState>();
	const [notesEditorState, setNotesEditorState] =
		useState<SerializedEditorState>();

	const form = useForm<DiagnosisFormData>({
		resolver: zodResolver(diagnosisFormSchema),
		defaultValues: {},
	});

	const submitHandler = (data: DiagnosisFormData) => {
		const cleanData: IDiagnosis = {
			...data,
			appointment: appointment.id!,
			patient: patient.id!,
			doctor: currentDoctor.id!,
			chiefComplaint: complaintEditorState,
			notes: notesEditorState,
			history: patientHistory.id,
		};

		console.log(data, notesEditorState, complaintEditorState);

		if (action === "Create") {
			startTransition(async () => {
				await createDiagnosis(cleanData);
				toast.success("Diagnosis created successfully🧑‍⚕️");
				form.reset();
				setIsSuccess(true);
			});
		} else if (action === "Update" && diagnosis) {
			startTransition(async () => {
				await updateDiagnosis({ ...diagnosis, ...cleanData });
				toast.success("Diagnosis updated successfully🧑‍⚕️");
				form.reset();
				setIsSuccess(true);
			});
		}
	};

	const errHandler = async (err: FieldErrors<DiagnosisFormData>) => {
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
			{ id: "cn94839k" }
		);
	};

	const FORM_STEPS = getDiagnosisFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	return (
		<div className="space-y-4">
			<div className="px-2 sticky top-0 bg-background/40 backdrop-blur-2xl backdrop-saturate-150">
				<Heading className="text-xl md:text-2xl text-primary">
					<Hospital /> Diagnosis Form
					<Badge variant={"secondary"}>{action}</Badge>{" "}
				</Heading>
				<Separator className="my-3" />
			</div>

			<section className="px-5 space-y-4">
				<ChiefComplaintSection
					setComplaintEditorState={setComplaintEditorState}
					complaintEditorState={complaintEditorState}
				/>

				<NotesSection
					setNotesEditorState={setNotesEditorState}
					notesEditorState={notesEditorState}
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
			</section>
		</div>
	);
}

export const DiagnosisFormPanel = ({
	children,
	className,
	...props
}: { children: ReactNode; className?: string } & ComponentProps<
	typeof DiagnosisForm
>) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild className={cn("", className)}>
				{children}
			</FormPanelTrigger>

			<FormPanelContent>
				<DiagnosisForm {...props} />
			</FormPanelContent>
		</FormPanel>
	);
};
