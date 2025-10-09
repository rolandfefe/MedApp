import { DoctorFormData } from "@/lib/formSchemas/doctor.schema";
import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
} from "@/types/enums/enums";
import {
	Building2,
	CreditCard,
	GraduationCap,
	Link2,
	Loader,
	Plus,
	ToolCase,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { JSX } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import MyBtn from "../custom/MyBtn";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import { DiagnosisFormData } from "@/lib/formSchemas/diagnosis.schema";

export default function getDiagnosisFormStepper(
	form: ReturnType<typeof useForm<DiagnosisFormData>>,
	submitHandler: (data: DiagnosisFormData) => void,
	errHandler: (err: FieldErrors<DiagnosisFormData>) => Promise<void>,
	isPending: boolean = false
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [
		{
			title: "Complete application✨",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-foreground">
						<span className="text-primary">All done! </span>
						Click button below to submit your application for review.
					</p>

					<Image
						src="/assets/verify-data.svg"
						alt="Verify"
						width={999}
						height={999}
						priority
						className="w-[90vw] sm:w-2/3 md:w-1/2 mx-auto "
					/>
					<MyBtn
						disabled={isPending}
						onClick={form.handleSubmit(submitHandler, errHandler)}
						className="flex w-fit mx-auto"
					>
						Submit {isPending && <Loader className="animate-spin" />}
					</MyBtn>
				</section>
			),
			get isComplete(): boolean {
				return false;
			},
		},
	];
}
