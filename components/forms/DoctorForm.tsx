"use client";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import {
	DoctorFormData,
	doctorFormSchema,
} from "@/lib/formSchemas/doctor.schema";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hospital, X } from "lucide-react";
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

export default function DoctorForm({
	currentUser,
	action,
	doctor,
}: {
	currentUser: IUser;
	action: "Create" | "Update";
	doctor?: IDoctor;
}) {
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm<DoctorFormData>({
		resolver: zodResolver(doctorFormSchema),
		defaultValues: {
			bio: doctor?.bio,
			DOB: doctor?.DOB as string,
			gender: doctor?.gender,
			languages: doctor?.languages.join(", "),
			contact: doctor?.contact,
			// credentials: doctor?.credentials,
		},
	});

	const submitHandler = async (data: DoctorFormData) => {
		const cleanData: IDoctor = {
			...data,
			user: currentUser._id!,
			languages: data.languages!.split(", "),
			specialties: data.specialties.map(({ procedures, ...specialty }) => ({
				...specialty,
				procedures: procedures.split(", "),
			})),
			credentials: {
				...data.credentials,
				hospitalAffiliations: data.credentials.hospitalAffiliations.map(
					({ roles, ...affiliation }) => ({
						...affiliation,
						roles: roles.split(", "),
					})
				),
			},
		};

		if (action === "Create") {
			startTransition(async () => {
				const { _id } = await createDoctor(cleanData, pathname);
				form.reset();
				toast.success(
					"Application submitted for verification🤙. \n Feedback will be notified🤗"
				);
				setIsSuccess(true);
				router.push(`/doctor/${encodeURIComponent(_id!)}`);
			});
		} else if (action === "Update" && doctor) {
			startTransition(async () => {
				await updateDoctor({ ...doctor, ...cleanData }, pathname);
				form.reset();
				toast.success("Doctor Profile updated.");
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
			{ id: "adiou2b947" }
		);
	};

	const FORM_STEPS = getDoctorFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	return (
		<div className="">
			<div className="px-2 sticky top-0 bg-background/40 backdrop-blur-2xl backdrop-saturate-150">
				<Heading className="text-xl md:text-2xl text-primary">
					<Hospital /> Doctor Form <Badge variant={"secondary"}>{action}</Badge>{" "}
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

export const DoctorFormPanel = ({
	action = "Create",
	children,
	currentUser,
}: {
	action?: "Update" | "Create";
	currentUser: IUser;
	children: ReactNode;
}) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild>{children}</FormPanelTrigger>

			<FormPanelContent>
				<DoctorForm action={action} currentUser={currentUser} />
			</FormPanelContent>
		</FormPanel>
	);
};
