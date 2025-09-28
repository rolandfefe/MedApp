"use client";

import {
	PatientFormData,
	patientZodSchema,
} from "@/lib/formSchemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, User2, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
import { createPatient, updatePatient } from "@/lib/actions/patient.actions";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { updateOnBoardingStatus } from "@/lib/actions/user.actions";

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
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<PatientFormData>({
		resolver: zodResolver(patientZodSchema),
		defaultValues: {
			DOB: patient?.DOB as string,
			gender: patient?.gender,
			race: patient?.race,
			occupation: patient?.occupation,
			maritalStatus: patient?.maritalStatus,
			languages: patient?.languages?.join(", "),
		},
	});

	const submitHandler = async (data: PatientFormData) => {
		console.log(data);

		if (action === "create") {
			startTransition(async () => {
				await createPatient(
					{
						...data,
						user: currentUser._id!,
						languages: data.languages?.split(", "),
					},
					pathname
				);

				await updateOnBoardingStatus(true);

				toast.success("Onboard successful🎉");
				router.push("/home");
				// setIsSuccess(true); // ! Coming soon.
			});
		} else if (action === "update" && patient) {
			startTransition(async () => {
				await updatePatient(
					{
						...patient,
						...data,
						languages: data.languages?.split(", "),
					},
					pathname
				);
			});
			toast.success("Update complete🔃");
		}
	};

	const errHandler = async (err: FieldErrors<PatientFormData>) => {
		console.log("err:", err);

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

const PatientFormSuccessCard = () => {
	return <motion.div></motion.div>;
};
