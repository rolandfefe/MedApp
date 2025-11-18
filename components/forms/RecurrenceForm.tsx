"use client";

import {
	RecurrencePlanFormData,
	recurrencePlanFormSchema,
} from "@/lib/formSchemas/recurrencePlan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
	Dispatch,
	SetStateAction,
	useState,
	useTransition,
} from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import ToastErrCard from "../cards/ToastErrCard";
import toast from "react-hot-toast";
import { useConsultation } from "@/contexts/consultation.context";
import { createPlan, updatePlan } from "@/lib/actions/recurrencePlan.actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { eRecurrenceFrequency, eWeekDays } from "@/types/enums/enums";
import { Input } from "../ui/input";
import { CalendarCheck } from "lucide-react";
import { Spinner } from "../ui/spinner";
import MyBtn from "../custom/MyBtn";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

// ! Configure how handle Non-appointment docs.

export default function RecurrenceForm() {
	const { recurrencePlan, appointment } = useConsultation();
	const doctor = appointment.doctor as IDoctor;

	const [isPending, startTransition] = useTransition();
	const [weekDays, setWeekDays] = useState<eWeekDays[]>([]);

	const form = useForm<RecurrencePlanFormData>({
		resolver: zodResolver(recurrencePlanFormSchema),
		defaultValues: {},
	});

	const submitHandler = (data: RecurrencePlanFormData) => {
		const cleanData: IRecurrencePlan = {
			...data,
			supervisor: doctor.id,
			appointment: appointment.id,
			weekDays,
			exceptions: data.exceptions.trim().split(", "),
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

	return (
		<Form {...form}>
			<section className="space-y-4">
				<div className="flex sm:items-center flex-col sm:flex-row gap-3">
					<FormField
						control={form.control}
						name="frequency"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Frequency</FormLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Choose frequency..." />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										{Object.entries(eRecurrenceFrequency).map(([k, v]) => (
											<SelectItem key={k} value={v}>
												{v}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="interval"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Interval</FormLabel>
								<FormControl>
									<Input {...field} type="number" min={1} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center flex-row gap-3">
					<FormField
						control={form.control}
						name="startDate"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Start Date</FormLabel>

								<FormControl>
									<Input {...field} type="date" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endDate"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>End Date</FormLabel>

								<FormControl>
									<Input {...field} type="date" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center flex-row gap-3">
					<FormField
						control={form.control}
						name="startTime"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Start time</FormLabel>

								<FormControl>
									<Input {...field} type="time" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endTime"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>End time</FormLabel>

								<FormControl>
									<Input {...field} type="time" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<RecurrenceForm.WeekDaysField
					weekDays={weekDays}
					setWeekDays={setWeekDays}
				/>

				<FormField
					control={form.control}
					name="exceptions"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Exceptions</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className="h-40"
									placeholder="Detail exceptions days/conditions (comma-separated) when Patient can skip appointment..."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</section>

			<MyBtn
				disabled={isPending}
				size="lg"
				className="flex mx-auto mt-5"
				onClick={form.handleSubmit(submitHandler, errHandler)}
			>
				Set Plan {isPending ? <Spinner /> : <CalendarCheck />}
			</MyBtn>
		</Form>
	);
}

RecurrenceForm.WeekDaysField = ({
	weekDays,
	setWeekDays,
}: {
	weekDays: eWeekDays[];
	setWeekDays: Dispatch<SetStateAction<eWeekDays[]>>;
}) => {
	const clickHandler = async (isSelected: boolean, day: eWeekDays) => {
		setWeekDays((prev) => {
			if (isSelected) {
				return prev.filter((d) => d == day);
			} else {
				return [...prev, day];
			}
		});
	};

	return (
		<section className="space-y-4">
			<div>
				<p className="text-lg font-medium">Week Days</p>
				<p className="text-sm text-muted-foreground">
					Select preferred days for patient's attendance.
				</p>
			</div>
			<div className="flex items-center flex-wrap gap-2">
				{Object.values(eWeekDays).map((v, i) => {
					const isSelected = !!weekDays.find((d) => d === v);

					return (
						<Badge
							variant={isSelected ? "default" : "secondary"}
							key={i}
							onClick={() => clickHandler(isSelected, v)}
							className="cursor-pointer"
						>
							{v}
						</Badge>
					);
				})}
			</div>
		</section>
	);
};
