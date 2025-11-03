import { DiagnosisFormData } from "@/lib/formSchemas/diagnosis.schema";
import {
	Loader
} from "lucide-react";
import Image from "next/image";
import { JSX } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import MyBtn from "../custom/MyBtn";

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
			title: "Notes",
			body: (
				<section>
					Really cool editor
				</section>
			),
			get isComplete(): boolean {
				return false;
			},
		},
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
