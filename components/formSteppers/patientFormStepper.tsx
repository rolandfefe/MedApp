"use client";

import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { eGender, eMaritalStatus, eRating } from "@/types/enums";
import { Loader, Plus, Trash2 } from "lucide-react";
import { JSX, useState } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import Heading from "../custom/Heading";
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
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export default function getPatientFormStepper(
	form: ReturnType<typeof useForm<PatientFormData>>,
	submitHandler: (data: PatientFormData) => Promise<void>,
	errHandler: (err: FieldErrors<PatientFormData>) => Promise<void>,
	isPending: boolean = false
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
						name="DOB"
						render={({ field }) => (
							<FormItem>
								<FormLabel>DOB</FormLabel>

								<FormControl>
									<Input
										type="date"
										placeholder="Date of birth..."
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex items-start gap-3">
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Gender</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select gender" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{Object.entries(eGender).map(([k, v]) => (
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
							name="maritalStatus"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Marital status</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{Object.entries(eMaritalStatus).map(([k, v]) => (
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
					</div>

					<FormField
						control={form.control}
						name="race"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Race</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Race...(optional)" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
			get isComplete(): boolean {
				return !!form.watch("gender") && !!form.watch("DOB");
			},
		},

		{
			title: "Relational",
			body: (
				<section className="space-y-4">
					<FormField
						control={form.control}
						name="occupation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Occupation</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Occupation..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="languages"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Languages</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Comma-separated list eg: (English, Swahili, etc...)"
									/>
									{/* <Input {...field} placeholder="Occupation..." /> */}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
			get isComplete(): boolean {
				return !!form.watch("occupation") && !!form.watch("languages");
			},
		},

		{
			title: "Emergency Contacts",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-fore">
						These contacts will be used in emergencies.
					</p>

					<EmergencyFormField form={form} />
				</section>
			),
			get isComplete(): boolean {
				return !!form.watch("emergencyContacts");
			},
		},

		{
			title: "Complete🥳",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-foreground">
						<span className="text-primary">All done! </span>
						Click button below to submit.
					</p>
					<Image
						src="/assets/complete.svg"
						alt="complete"
						width={999}
						height={999}
						className="w-full sm:w-2/3 md:w-1/2 mx-auto "
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

const EmergencyFormField = ({
	form,
}: {
	form: ReturnType<typeof useForm<PatientFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "emergencyContacts",
	});

	return (
		<div>
			{fields.length < 3 && (
				<MyBtn
					variant={"secondary"}
					size="sm"
					onClick={() =>
						append({
							name: "",
							phone: "",
							priority: eRating.ONE,
							relationship: "",
						})
					}
					className="mb-3"
				>
					Add Contact <Plus />
				</MyBtn>
			)}

			<div className="space-y-2">
				{/* <AnimatePresence> */}
				{fields.map((field, i) => (
					<motion.div
						key={field.id}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: 100 }}
						layout
						className="relative border p-2 pt-3 rounded-xl space-y-2"
					>
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<FormField
								control={form.control}
								name={`emergencyContacts.${i}.name`}
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Name</FormLabel>

										<FormControl>
											<Input {...field} placeholder="User's name..." />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`emergencyContacts.${i}.relationship`}
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Relationship</FormLabel>

										<FormControl>
											<Input {...field} placeholder="Relationship..." />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name={`emergencyContacts.${i}.phone`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>

									<FormControl>
										<Input {...field} placeholder="Phone number..." />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-end gap-2">
							<FormField
								control={form.control}
								name={`emergencyContacts.${i}.priority`}
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Priority</FormLabel>

										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Choose priority" />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{Object.entries(eRating).map(([k, v]) => (
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
							<MyBtn
								size="icon"
								variant="secondary"
								onClick={() => remove(i)}
								className="text-destructive"
							>
								<Trash2 />
							</MyBtn>
						</div>
					</motion.div>
				))}
				{/* </AnimatePresence> */}
			</div>
		</div>
	);
};
