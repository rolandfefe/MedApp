"use client";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { createPatient, updatePatient } from "@/lib/actions/patient.actions";
import { updateOnBoardingStatus } from "@/lib/actions/user.actions";
import {
	PatientFormData,
	patientZodSchema,
} from "@/lib/formSchemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User2, X } from "lucide-react";
import { motion } from "motion/react";
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
import getPatientFormStepper from "../formSteppers/patientFormStepper";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { useCurrent } from "@/contexts/Current.context";
import { cn } from "@/lib/utils";
import ToastErrCard from "../cards/ToastErrCard";

export default function PatientForm({
	action = "create",
}: {
	action: "update" | "create";
}) {
	const [activeStep, setActiveStep] = useState<number>(1);
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const router = useRouter();
	const patient = useCurrent().currentPatient;
	const currentUser = useCurrent().currentUser!;

	const form = useForm<PatientFormData>({
		resolver: zodResolver(patientZodSchema),
		defaultValues: {
			DOB: patient?.DOB as string,
			gender: patient?.gender || "",
			race: patient?.race || "",
			occupation: patient?.occupation || "",
			maritalStatus: patient?.maritalStatus || "",
			languages: patient?.languages?.join(", "),
			emergencyContacts: patient?.emergencyContacts || [],
		},
	});

	const submitHandler = async (data: PatientFormData) => {
		console.log(data);

		if (action === "create") {
			startTransition(async () => {
				await createPatient({
					...data,
					user: currentUser.id!,
					languages: data.languages!.split(", "),
				});

				await updateOnBoardingStatus(true);

				form.reset();
				toast.success("Onboard successful🎉");
				router.push("/home");
				// setIsSuccess(true); // ! Coming soon.
			});
		} else if (action === "update" && patient) {
			startTransition(async () => {
				await updatePatient({
					...patient,
					...data,
					languages: data.languages?.split(", "),
				});
			});

			form.reset();
			toast.success("Update complete🔃");
		}
	};

	const errHandler = async (err: FieldErrors<PatientFormData>) => {
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
			{ id: "adiou2b947" }
		);
	};

	const FORM_STEPS = getPatientFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	if (isSuccess) {
		return;
	}

	return (
		<div className="">
			<div className="px-2 sticky top-0 bg-background/40 backdrop-blur-2xl backdrop-saturate-150">
				<Heading className="text-xl md:text-2xl text-primary">
					<User2 /> Patient Form <Badge variant={"secondary"}>{action}</Badge>{" "}
				</Heading>
			</div>

			<Separator className="my-3" />

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
				<div></div>
			</Form>
		</div>
	);
}

export function PatientFormPanel({
	children,
	action = "create",
	className,
}: {
	children: ReactNode;
	action?: "create" | "update";
	className?: string;
}) {
	return (
		<FormPanel>
			<FormPanelTrigger asChild className={cn("", className)}>
				{children}
			</FormPanelTrigger>

			<FormPanelContent>
				<PatientForm action={action} />
			</FormPanelContent>
		</FormPanel>
	);
}

const PatientFormSuccessCard = () => {
	return <motion.div></motion.div>;
};
