"use client";

import {
	RecurrencePlanFormData,
	recurrencePlanFormSchema,
} from "@/lib/formSchemas/recurrencePlan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import ToastErrCard from "../cards/ToastErrCard";
import toast from "react-hot-toast";
import { useConsultation } from "@/contexts/consultation.context";
import { createPlan, updatePlan } from "@/lib/actions/recurrencePlan.actions";

export default function RecurrenceForm() {
	const { recurrencePlan } = useConsultation();

	const [isPending, startTransition] = useTransition();

	const form = useForm<RecurrencePlanFormData>({
		resolver: zodResolver(recurrencePlanFormSchema),
		defaultValues: {},
	});

	const submitHandler = (data: RecurrencePlanFormData) => {
		const cleanData: IRecurrencePlan = {
			...data,
		};

		console.log(cleanData);

		if (recurrencePlan) {
			// Update
			startTransition(async () => {
				await updatePlan({ ...recurrencePlan, ...cleanData });
				toast.success("Plan updated 🔃");
				form.reset();
			});
		} else {
			// create
			startTransition(async () => {
				await createPlan(cleanData);

				toast.success("Plan created🗓️");
				form.reset();
			});
		}
	};

	const errHandler = async (err: FieldErrors<RecurrencePlanFormData>) => {
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
			{ id: "034802jd20" }
		);
	};

	return <div>RecurrenceForm</div>;
}
