"use client";

import { VerdictFormData } from "@/lib/formSchemas/verdict.schema";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import {
	Brain,
	NotebookTabs,
	Pill,
	PlusCircle,
	PocketKnife,
	Syringe,
	Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, JSX, SetStateAction } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { Editor } from "../blocks/editor-00/editor";
import MyBtn from "../custom/MyBtn";
import { Card, CardContent } from "../ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
import { eRouteOfAdministration } from "@/types/enums/enums";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";

export default function getVerdictFormStepper(
	form: ReturnType<typeof useForm<VerdictFormData>>,
	submitHandler: (data: VerdictFormData) => void,
	errHandler: (err: FieldErrors<VerdictFormData>) => Promise<void>,
	isPending: boolean = false
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [
		{
			title: "Procedures",
			body: <TreatmentPlanSection.Procedures form={form} />,
			get isComplete(): boolean {
				return false;
			},
		},
		{
			title: "Therapies",
			body: <TreatmentPlanSection.Therapies form={form} />,
			get isComplete(): boolean {
				return false;
			},
		},
		{
			title: "Medications",
			body: <TreatmentPlanSection.Medications form={form} />,
			get isComplete(): boolean {
				return false;
			},
		},

		{
			title: "Prognosis",
			body: (
				<section className="space-y-4">
					<FormField
						control={form.control}
						name={`prognosis.outlook`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Outlook</FormLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select outlook..." />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										<SelectItem value="excellent">Excellent</SelectItem>
										<SelectItem value="good">Good</SelectItem>
										<SelectItem value="fair">Fair</SelectItem>
										<SelectItem value="poor">Poor</SelectItem>
										<SelectItem value="guarded">Guarded</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="prognosis.estimatedRecoveryTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Estimated recovery time</FormLabel>

								<FormControl>
									<Input {...field} placeholder="Estimated recovery time...." />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
			get isComplete(): boolean {
				return false;
			},
		},
		{
			title: "Complete Diagnosis🧑‍⚕️`",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-foreground">
						<span className="text-primary">All done! </span>
						Click button below to submit your Verdict.
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
						Submit Verdict {isPending && <Spinner />}
					</MyBtn>
				</section>
			),
			get isComplete(): boolean {
				return false;
			},
		},
	];
}

export const PatientNotesSection = ({
	setNotesSerializedState,
	notesSerializedState,
}: {
	notesSerializedState?: SerializedEditorState<SerializedLexicalNode>;
	setNotesSerializedState: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
}) => {
	return (
		<div>
			<p className="text-lg font-medium inline-flex gap-x-1 items-center">
				<NotebookTabs />
				<span>Verdict Notes</span>
			</p>
			<p className="text-sm text-muted-foreground mb-3">
				Detail your verdict notes bellow.
			</p>
			<Editor
				editorSerializedState={notesSerializedState}
				onSerializedChange={setNotesSerializedState}
				className="min-h-52"
			/>
		</div>
	);
};

export const TreatmentPlanSection = ({
	setPlanSerializedState,
	planSerializedState,
}: {
	planSerializedState?: SerializedEditorState<SerializedLexicalNode>;
	setPlanSerializedState: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
}) => {
	return (
		<section>
			<p className="text-lg font-medium inline-flex gap-x-1 items-center">
				<Syringe />
				<span>Treatment Plan</span>
			</p>
			<p className="text-sm text-muted-foreground mb-3">
				Clearly detail the patient's treatment Plan bellow
			</p>

			<Editor
				editorSerializedState={planSerializedState}
				onSerializedChange={setPlanSerializedState}
				className="min-h-52"
			/>
		</section>
	);
};

TreatmentPlanSection.Procedures = ({
	form,
}: {
	form: ReturnType<typeof useForm<VerdictFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "treatmentPlan.procedures",
	});

	return (
		<section>
			<p className="text-lg font-medium inline-flex gap-x-1 items-center">
				<PocketKnife />
				<span>Procedures</span>
			</p>
			<p className="text-sm text-muted-foreground mb-3">
				List the probable procedures recommended for your patient.
			</p>

			{fields.map((field, i) => (
				<motion.div
					key={field.id}
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, x: 100 }}
					layout
				>
					<Card className="bg-popover/30 mb-4">
						<CardContent className="space-y-3">
							<div className="flex sm:items-center gap-3 flex-col sm:flex-row">
								<FormField
									control={form.control}
									name={`treatmentPlan.procedures.${i}.name`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Name</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Procedure name..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`treatmentPlan.procedures.${i}.type`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Type</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Procedure type..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex items-end gap-3 ">
								<FormField
									control={form.control}
									name={`treatmentPlan.procedures.${i}.scheduledDate`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Scheduled date:</FormLabel>
											<FormControl>
												<Input {...field} type="date" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<MyBtn
									size="icon"
									variant="outline"
									onClick={() => remove(i)}
									className="text-destructive"
								>
									<Trash2 />
								</MyBtn>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}

			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							name: "",
							type: "",
						})
					}
					className="mt-3"
				>
					Add procedure <PlusCircle />
				</MyBtn>
			)}
		</section>
	);
};

TreatmentPlanSection.Therapies = ({
	form,
}: {
	form: ReturnType<typeof useForm<VerdictFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "treatmentPlan.therapies",
	});

	return (
		<section>
			<p className="text-lg font-medium inline-flex gap-x-1 items-center">
				<Brain />
				<span>Therapies</span>
			</p>
			<p className="text-sm text-muted-foreground mb-3">
				List the probable therapies recommended for your patient.
			</p>

			{fields.map((field, i) => (
				<motion.div
					key={field.id}
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, x: 100 }}
					layout
				>
					<Card className="bg-popover/30 mb-4">
						<CardContent className="space-y-3">
							<div className="flex sm:items-center flex-col sm:flex-row gap-3">
								<FormField
									control={form.control}
									name={`treatmentPlan.therapies.${i}.name`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Name</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Therapy name..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`treatmentPlan.therapies.${i}.type`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Type</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Therapy type..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex sm:items-center flex-col sm:flex-row gap-3">
								<FormField
									control={form.control}
									name={`treatmentPlan.therapies.${i}.frequency`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Frequency</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Eg: 2 times weekly..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex-1 flex items-end gap-3">
									<FormField
										control={form.control}
										name={`treatmentPlan.therapies.${i}.duration`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Duration</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Eg: 1 month, 3 weeks, e.t.c..."
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<MyBtn
										size="icon"
										variant="outline"
										onClick={() => remove(i)}
										className="text-destructive"
									>
										<Trash2 />
									</MyBtn>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}

			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							name: "",
						})
					}
					className="mt-3"
				>
					Add therapy <PlusCircle />
				</MyBtn>
			)}
		</section>
	);
};

TreatmentPlanSection.Medications = ({
	form,
}: {
	form: ReturnType<typeof useForm<VerdictFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "treatmentPlan.medications",
	});

	return (
		<section>
			<p className="text-lg font-medium inline-flex gap-x-1 items-center">
				<Pill />
				<span>Medications</span>
			</p>
			<p className="text-sm text-muted-foreground mb-3">
				What Medications do you recommended for your patient.
			</p>

			{fields.map((field, i) => (
				<motion.div
					key={field.id}
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, x: 100 }}
					layout
				>
					<Card className="bg-popover/30 mb-4">
						<CardContent className="space-y-3">
							<div className="flex sm:items-center flex-col sm:flex-row gap-3">
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.name`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Name</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Drug name...." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.dosage`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Dosage</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Drug dosage...." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.route`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Route</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eRouteOfAdministration).map(
														([k, v]) => (
															<SelectItem key={k} value={v}>
																{v}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="space-y-4">
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.instructions`}
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Instructions</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder={"Medication instructions..."}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.sideEffects`}
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Side effects</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder={`${form.watch(
														`treatmentPlan.medications.${i}.name`
													)} Side effects...`}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.reason`}
									render={({ field }) => (
										<FormItem className="">
											<FormLabel>Reason (optional)</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder={`Reason for prescribing ${form.watch(
														`treatmentPlan.medications.${i}.name`
													)}...`}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex gap-3 items-center">
								<FormField
									control={form.control}
									name={`treatmentPlan.medications.${i}.startDate`}
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

								<div className="flex-1 flex gap-3 items-end">
									<FormField
										control={form.control}
										name={`treatmentPlan.medications.${i}.endDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>End date</FormLabel>
												<FormControl>
													<Input {...field} type="date" />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<MyBtn
										size="icon"
										variant="outline"
										onClick={() => remove(i)}
										className="text-destructive"
									>
										<Trash2 />
									</MyBtn>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}

			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							name: "",
							dosage: "",
							instructions: "",
							route: eRouteOfAdministration.ORAL,
							startDate: "",
						})
					}
					className="mt-3"
				>
					Add Medication <PlusCircle />
				</MyBtn>
			)}
		</section>
	);
};
