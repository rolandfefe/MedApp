import { AppointmentFormData } from "@/lib/formSchemas/appointment.schema";
import { cn } from "@/lib/utils";
import { eAppointmentTypes, ePatientConsent } from "@/types/enums/enums";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Dispatch, JSX, SetStateAction } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import DoctorSearchBox from "../DoctorSearchBox";
import DoctorCard from "../cards/DoctorCard";
import MyBtn from "../custom/MyBtn";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
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

export default function getAppointmentFormStepper(
	form: ReturnType<typeof useForm<AppointmentFormData>>,
	submitHandler: (data: AppointmentFormData) => Promise<void>,
	errHandler: (err: FieldErrors<AppointmentFormData>) => Promise<void>,
	isPending: boolean = false,
	selectedConsent: ePatientConsent[],
	setSelectedConsent: Dispatch<SetStateAction<ePatientConsent[]>>,
	setSelectedDoctor: Dispatch<SetStateAction<IDoctor | undefined>>,
	selectedDoctor?: IDoctor
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
					<FormField
						control={form.control}
						name="reason"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Reason</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										placeholder="Major reason behind this appointment..."
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col sm:flex-row sm:items-center gap-2">
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="flex-1">
									{/* <FormLabel>Type:</FormLabel> */}
									<Select value={field.value} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Appointment type..." />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{Object.entries(eAppointmentTypes).map(([k, v]) => (
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
							name="isEmergency"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center gap-x-1">
										<FormLabel>Emergency</FormLabel>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												className="size-8"
											/>
										</FormControl>
									</div>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-center gap-x-2">
						<FormField
							control={form.control}
							name="startTime"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Start time</FormLabel>

									<FormControl>
										<Input
											{...field}
											// !test
											value={
												field.value instanceof Date
													? field.value.toISOString().split("T")[0]
													: field.value
											}
											type={"datetime-local"}
										/>
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
										<Input
											type={"datetime-local"}
											{...field}
											// !test
											value={
												field.value instanceof Date
													? field.value.toISOString().split("T")[0]
													: field.value
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<section>
						<h5 className="font-medium">Consent Level</h5>
						<p className="text-xs text-muted-foreground">
							Control the data your doctor has access to.(click to select)
						</p>

						<div className="mt-3 flex items-center gap-2 flex-wrap">
							{Object.entries(ePatientConsent).map(([k, v]) => {
								const isSelected = selectedConsent.find((s) => s === v);
								const selectHandler = () => {
									if (isSelected) {
										setSelectedConsent((prev) => prev.filter((c) => c != v));
									} else {
										setSelectedConsent((prev) => [...prev, v]);
									}
								};
								return (
									<Badge
										key={k}
										variant={isSelected ? "default" : "outline"}
										onClick={selectHandler}
										className="cursor-pointer"
									>
										{v}
									</Badge>
								);
							})}
						</div>
					</section>
				</section>
			),
			get isComplete(): boolean {
				return (
					!!form.watch("reason") &&
					!!form.watch("type") &&
					!!form.watch("startTime")
				);
			},
		},
		{
			title: "Select Doctor",
			body: (
				<section className="space-y-4">
					<p className="text-xs text-muted-foreground ">
						Search and select preferred{" "}
						<span className="text-primary font-medium">Doctor👨‍⚕️ </span>. If you
						leave this <span className="font-medium">empty </span>, your
						Appointment will be automatically sent to{" "}
						<span className="font-medium text-primary">Relevant doctors🤖</span>
					</p>

					<AnimatePresence>
						{selectedDoctor && (
							<motion.div
								key={selectedDoctor.id}
								layout
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 100 }}
								className="mb-3"
							>
								<DoctorCard doctor={selectedDoctor} className={cn("w-full")} />
							</motion.div>
						)}
					</AnimatePresence>

					<DoctorSearchBox
						setSelectedDoctor={setSelectedDoctor}
						selectedDoctor={selectedDoctor}
					/>
				</section>
			),
			get isComplete(): boolean {
				return !!selectedDoctor;
			},
		},
		{
			title: "Complete application✨",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-foreground">
						<span className="text-primary">All done! </span>
						Click button below to Submit your application for an appointment.
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
