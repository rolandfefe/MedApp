import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { JSX } from "react";
import { Control, FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { FormField } from "../ui/form";

export default function getPatientFormStepper<
	F extends FieldValues = FieldValues
>(
	form: UseFormReturn<F>
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [
		{
			title: "Fundamentals",
			body: (
				<section className="space-y-4">
					<FormField control={form.control} field="" />
				</section>
			),
			get isComplete(): boolean {
				return false;
			},
		},
	];
}
