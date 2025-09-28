"use client";

import {
	PatientFormData,
	patientZodSchema,
} from "@/lib/formSchemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import Heading from "../custom/Heading";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../custom/motion-stepper";
import MyBtn from "../custom/MyBtn";
import getPatientFormStepper from "../formSteppers/patientFormStepper";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";

export default function PatientForm({
	action = "create",
	patient,
	currentUser,
}: {
	action: "update" | "create";
	patient?: IPatient;
	currentUser: IUser;
}) {
	const [activeStep, setActiveStep] = useState<number>(1);
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const form = useForm<PatientFormData>({
		resolver: zodResolver(patientZodSchema),
		defaultValues: {
			DOB: patient?.DOB,
			gender: patient?.gender,
			race: patient?.race,
			ethnicity: patient?.ethnicity,
			occupation: patient?.occupation,
			maritalStatus: patient?.maritalStatus,
			languages: patient?.languages?.join(", "),
		},
	});

	const submitHandler = async (data: PatientFormData) => {
		console.log(data);
	};

	const errHandler = async (err: FieldErrors<PatientFormData>) => {
		console.log("err:", err);
	};

	const FORM_STEPS = getPatientFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	return (
		<div className="">
			<div>
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
