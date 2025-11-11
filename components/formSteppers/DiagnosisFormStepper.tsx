"use client";

import { DiagnosisFormData } from "@/lib/formSchemas/diagnosis.schema";
import { Loader, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import MyBtn from "../custom/MyBtn";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { Editor } from "../blocks/editor-00/editor";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import PatientHistorySection from "../PatientHistorySection";
import { useConsultation } from "@/contexts/consultation.context";
import { Card, CardContent } from "../ui/card";
import { motion } from "motion/react";
import { eConfidenceLevel, eLaterality, eSeverity } from "@/types/enums/enums";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
// import { Editor } from "../blocks/editor-00/editor";

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
			title: "Essentials",
			body: <EssentialsHistorySection form={form} />,
			get isComplete(): boolean {
				return false;
			},
		},

		{
			title: "Differential Diagnosis",
			body: <DifferentialDiagnosis form={form} />,
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

const EssentialsHistorySection = ({
	form,
}: {
	form: ReturnType<typeof useForm<DiagnosisFormData>>;
}) => {
	const { patientHistory } = useConsultation();

	return (
		<section className="space-y-3">
			<FormField
				control={form.control}
				name="templateUsed"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Diagnostic Template</FormLabel>
						<FormControl>
							<Input {...field} placeholder="Template used..." />
						</FormControl>
					</FormItem>
				)}
			/>
			<div className="flex items-center gap-x-3">
				<FormField
					control={form.control}
					name="onsetDate"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Onset date:</FormLabel>
							<FormControl>
								<Input {...field} type="date" />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dateResolved"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Date resolved (optional):</FormLabel>
							<FormControl>
								<Input {...field} type="date" />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="space-y-3">
				<p className="font-medium text-sm">Patient Data</p>

				<div className="flex items-center gap-x-3 ">
					<FormPanel>
						<FormPanelTrigger asChild>
							<MyBtn size={"sm"}>Current History</MyBtn>
						</FormPanelTrigger>
						<FormPanelContent>
							<PatientHistorySection history={patientHistory} />
						</FormPanelContent>
					</FormPanel>
					<MyBtn size={"sm"} variant={"secondary"} className="text-primary">
						Take new History
					</MyBtn>
				</div>
				<div className="flex items-center gap-x-3 ">
					<MyBtn size={"sm"}>Current Health status</MyBtn>
					<MyBtn size={"sm"} variant={"secondary"} className="text-primary">
						Take health status
					</MyBtn>
				</div>
			</div>
		</section>
	);
};

export const ChiefComplaintSection = ({
	setComplaintEditorState,
	complaintEditorState,
}: {
	complaintEditorState?: SerializedEditorState<SerializedLexicalNode>;
	setComplaintEditorState: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
}) => {
	return (
		<section>
			<div className="leading-tight mb-3">
				<p className="font-medium">Chief complaint:</p>
				<p className="text-xs text-muted-foreground">
					What are the major complaints presented by the patient?
				</p>
			</div>

			<Editor
				editorSerializedState={complaintEditorState}
				onSerializedChange={(v) => setComplaintEditorState(v)}
				className="min-h-52"
			/>
		</section>
	);
};

export const NotesSection = ({
	setNotesEditorState,
	notesEditorState,
}: {
	notesEditorState?: SerializedEditorState<SerializedLexicalNode>;
	setNotesEditorState: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
}) => {
	return (
		<section>
			<div className="leading-tight mb-4">
				<p className="font-medium">Additional Notes:</p>
				<p className="text-xs text-muted-foreground">
					Include relevant diagnostic notes here.
				</p>
			</div>

			<Editor
				editorSerializedState={notesEditorState}
				onSerializedChange={(v) => setNotesEditorState(v)}
				className="min-h-52"
			/>
		</section>
	);
};

const DifferentialDiagnosis = ({
	form,
}: {
	form: ReturnType<typeof useForm<DiagnosisFormData>>;
}) => {
	const { append, fields, remove } = useFieldArray({
		control: form.control,
		name: "differentialDiagnosis",
	});

	return (
		<section>
			<p className="text-sm text-muted-foreground">
				Detail the differential diagnoses below
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
							<div className="flex flex-col sm:flex-row  sm:item-center gap-3">
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.condition`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Condition</FormLabel>
											<FormControl>
												<Input {...field} placeholder="condition name..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.icd10Code`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>ICD10Code</FormLabel>
											<FormControl>
												<Input {...field} placeholder="use correct format..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name={`differentialDiagnosis.${i}.reasoning`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Reasoning</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Explain your reasoning behind this..."
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className="flex items-center gap-3 items-">
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.confidence`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Confidence</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Confidence level" />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eConfidenceLevel).map(([k, v]) => (
														<SelectItem key={k} value={v}>
															{v}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.severity`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Severity</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Confidence level" />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eSeverity).map(([k, v]) => (
														<SelectItem key={k} value={v}>
															{v}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>

							<div className="flex items-center gap-3 items-">
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.laterality`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Laterality</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Confidence level" />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eLaterality).map(([k, v]) => (
														<SelectItem key={k} value={v}>
															{v}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.stage`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Stage</FormLabel>

											<FormControl>
												<Input {...field} placeholder="stage of condition..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex items-center gap-3 items-">
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.dateConfirmed`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Date Confirmed</FormLabel>
											<FormControl>
												<Input {...field} type="date" />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`differentialDiagnosis.${i}.isPrimary`}
									render={({ field }) => (
										<FormItem>
											<div>
												<FormLabel>Primary</FormLabel>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														className="size-8"
													/>
												</FormControl>
											</div>
										</FormItem>
									)}
								/>

								<MyBtn
									size="icon"
									variant={"outline"}
									onClick={() => remove(i)}
									className="hover:text-destructive"
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
							condition: "",
							confidence: eConfidenceLevel.MEDIUM,
							isPrimary: false,
							dateConfirmed: "",
							severity: eSeverity.MILD,
						})
					}
					className="mt-3"
				>
					Add differential <PlusCircle />
				</MyBtn>
			)}
		</section>
	);
};
