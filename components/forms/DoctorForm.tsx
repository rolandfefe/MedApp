"use client";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { useCurrent } from "@/contexts/Current.context";
import { createDoctor, updateDoctor } from "@/lib/actions/doctor.actions";
import {
	DoctorFormData,
	doctorFormSchema,
} from "@/lib/formSchemas/doctor.schema";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hospital } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToastErrCard from "../cards/ToastErrCard";
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
import getDoctorFormStepper from "../formSteppers/doctorFormStepper";
import { Separator } from "../ui/separator";

export default function DoctorForm({
	action,
}: {
	action: "Create" | "Update";
}) {
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const pathname = usePathname();
	const router = useRouter();
	const currentUser = useCurrent().currentUser as IUser;
	const doctor = useCurrent().currentDoctor as IDoctor;

	const form = useForm<DoctorFormData>({
		resolver: zodResolver(doctorFormSchema),
		// ! Fix default type errs [enums & dates]
		defaultValues: {
			bio: doctor?.bio || "",
			DOB: doctor?.DOB || "",
			gender: doctor?.gender || "",
			languages: doctor ? doctor.languages?.join(", ") : "",
			contact: doctor?.contact || {},
			credentials: {
				...doctor.credentials,
				hospitalAffiliations:
					doctor.credentials.hospitalAffiliations!.map((h) => ({
						...h,
						roles: h.roles.join(", "),
						endDate: h.endDate,
					})) || [],
				licenses: doctor.credentials.licenses!.map((l) => ({
					...l,
					type: l.type,
				})),
			},
			// credentials: doctor.credentials || {},
			specialties:
				doctor.specialties!.map((s) => ({
					...s,
					procedures: s.procedures.join(", "),
				})) || [],
		},
	});

	const submitHandler = async (data: DoctorFormData) => {
		const cleanData: IDoctor = {
			...data,
			user: currentUser.id!,
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

		if (doctor) {
			// ? Update
			startTransition(async () => {
				await updateDoctor({ ...doctor, ...cleanData });
				form.reset();
				toast.success("Doctor Profile updated.");
				setIsSuccess(true);
			});
		} else {
			// ? Create
			startTransition(async () => {
				const { id } = await createDoctor(cleanData);
				form.reset();
				toast.success(
					"Application submitted for verification🤙. \n Feedback will be notified🤗"
				);
				setIsSuccess(true);
				router.push(`/doctor/${encodeURIComponent(id!)}`);
			});
		}
	};

	const errHandler = async (err: FieldErrors<PatientFormData>) => {
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
			<div className="px-2 sticky top-0 glass-bg">
				<Heading className="text-xl md:text-2xl text-primary">
					<Hospital /> Doctor Form <Badge variant={"secondary"}>{action}</Badge>{" "}
				</Heading>
				<Separator className="mt-1 my-3" />
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
	className,
}: {
	action?: "Update" | "Create";
	children: ReactNode;
	className?: string;
}) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild className={cn("", className)}>
				{children}
			</FormPanelTrigger>

			<FormPanelContent>
				<DoctorForm action={action} />
			</FormPanelContent>
		</FormPanel>
	);
};
