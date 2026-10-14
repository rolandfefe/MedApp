"use client";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import {
	createHealthStatus,
	updateHealthStatus,
} from "@/lib/actions/healthStatus.actions";
import {
	HealthStatusFormData,
	healthStatusFormSchema,
} from "@/lib/formSchemas/healthStatus.schema";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { goeyToast } from "goey-toast";
import { Hospital } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
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
import getHealthStatusFormStepper from "../formSteppers/healthStatusFormStepper";
import { Separator } from "../ui/separator";
import { useCurrent } from "@/contexts/Current.context";

export default function HealthStatusForm({
	action,
	healthStatus,
}: {
	action: "Create" | "Update";
	healthStatus?: IHealthStatus;
}) {
	const patient = useCurrent().currentPatient!;
	const [activeStep, setActiveStep] = useState<number>(1);
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<HealthStatusFormData>({
		resolver: zodResolver(healthStatusFormSchema),
		defaultValues: {
			complaint: healthStatus?.complaint,
			symptoms: healthStatus?.symptoms,
			pain: healthStatus?.pain,
			vitals: healthStatus?.vitals,
		},
	});
	const submitHandler = async (data: HealthStatusFormData) => {
		console.log(data);

		const cleanData: IHealthStatus = {
			...data,
			pain: data.pain.map(({ aggravatingFactors, relievingFactors, ...p }) => ({
				...p,
				aggravatingFactors: aggravatingFactors?.split(", "),
				relievingFactors: relievingFactors?.split(", "),
			})),
			patient: patient.id!,
		};

		if (action === "Create") {
			startTransition(async () => {
				await createHealthStatus({ ...cleanData });
				goeyToast.success("Health status saved🫀");
				form.reset();
				setIsSuccess(true);
			});
		} else if (action === "Update" && healthStatus) {
			startTransition(async () => {
				await updateHealthStatus({ ...healthStatus, ...cleanData });
				goeyToast.success("Health status saved🫀");
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
			id: "9c247bf4",
		});
	};

	const FORM_STEPS = getHealthStatusFormStepper(
		form,
		submitHandler,
		errHandler,
		isPending
	);

	return (
		<div className="">
			<div className="px-2 sticky top-0 bg-background/40 backdrop-blur-2xl backdrop-saturate-150">
				<Heading className="text-xl md:text-2xl text-primary">
					<Hospital /> Check-up Form{" "}
					<Badge variant={"secondary"}>{action}</Badge>{" "}
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
				<div></div>
			</Form>
		</div>
	);
}

export const HealthStatusFormPanel = ({
	className,
	children,
	...props
}: { className?: string; children: ReactNode } & ComponentProps<
	typeof HealthStatusForm
>) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild className={className}>
				{children}
			</FormPanelTrigger>

			<FormPanelContent>
				<HealthStatusForm {...props} />
			</FormPanelContent>
		</FormPanel>
	);
};
