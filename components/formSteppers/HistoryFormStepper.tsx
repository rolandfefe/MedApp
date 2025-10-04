"use client";

import {
	eAllergySeverity,
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eLifeStyleStatus,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
} from "@/types/enums/enums";
import {
	Bed,
	BottleWine,
	Bug,
	Building2,
	Calendar,
	Cigarette,
	CreditCard,
	GraduationCap,
	Link2,
	Loader,
	Plus,
	ToolCase,
	Trash2,
	TreeDeciduous,
	Users,
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import { HistoryFormData } from "@/lib/formSchemas/history.schema";
import { FormPanelContent } from "../custom/form-panel";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function getHistoryFormStepper(
	form: ReturnType<typeof useForm<HistoryFormData>>,
	submitHandler: (data: HistoryFormData) => Promise<void>,
	errHandler: (err: FieldErrors<HistoryFormData>) => Promise<void>,
	isPending: boolean = false
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [
		{
			title: "Disease history 😷",
			body: <DiseaseHistorySection form={form} />,
			get isComplete(): boolean {
				return (
					!!form.watch(`diseaseHistory.${1}.name`) &&
					!!form.watch(`diseaseHistory.${1}.resolved`)
				);
			},
		},
		{
			title: "Surgical history🔪",
			body: <SurgeryHistorySection form={form} />,
			get isComplete(): boolean {
				return (
					!!form.watch(`surgicalHistory.${1}.procedure`) &&
					!!form.watch(`surgicalHistory.${1}.date`) &&
					!!form.watch(`surgicalHistory.${1}.facility`)
				);
			},
		},
		{
			title: "Family history👨‍👩‍👧‍👧",
			body: <FamilyHistorySection form={form} />,
			get isComplete(): boolean {
				return (
					!!form.watch(`familyHistory.${1}.condition`) &&
					!!form.watch(`familyHistory.${1}.relation`)
				);
			},
		},
		{
			title: "Allergies🤧",
			body: <AllergyHistory form={form} />,
			get isComplete(): boolean {
				return (
					!!form.watch(`allergies.${1}.substance`) &&
					!!form.watch(`allergies.${1}.severity`) &&
					!!form.watch(`allergies.${1}.reaction`)
				);
			},
		},
		{
			title: "Social history",
			body: <SocialHistorySection form={form} />,
			get isComplete(): boolean {
				return !!form.watch(`socialHistory`);
			},
		},
		{
			title: "Life style🕺",
			body: (
				<section className="space-y-4">
					<p className="text-xs text-muted-foreground">
						Have any extra details?
					</p>

					<FormField
						control={form.control}
						name="diet"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Diet</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										placeholder="How does your diet look like?..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="exercise"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Exercise /physical activity</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										placeholder="Describe your physical activity habits..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="notes"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Extra Notes </FormLabel>

								<FormControl>
									<Textarea
										{...field}
										placeholder="Any helpful extra details to add?..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
			get isComplete(): boolean {
				return !!form.watch(`socialHistory`);
			},
		},

		{
			title: "Finally✨",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-foreground">
						<span className="text-primary">All done! </span>
						Click button below to save your patient history.
					</p>

					<Image
						src="/assets/saving-notes.svg"
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

const SocialHistorySection = ({
	form,
}: {
	form: ReturnType<typeof useForm<HistoryFormData>>;
}) => {
	return (
		<section className="space-y-4">
			<p className="text-xs sm:text-sm text-muted-foreground">
				Use the tabs to navigate sub-sections
			</p>
			<Tabs defaultValue="Alcohol">
				<TabsList className="flex w-fit mx-auto">
					<TabsTrigger value="Alcohol" className="flex items-center gap-x-1">
						<BottleWine size={18} />
						<span>Alcohol</span>
					</TabsTrigger>
					<TabsTrigger value="Smoking" className="flex items-center gap-x-1">
						<Cigarette size={18} />
						<span>Smoking</span>
					</TabsTrigger>
					<TabsTrigger value="Substance" className="flex items-center gap-x-1">
						<TreeDeciduous size={18} />
						<span>Substance</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="Alcohol">
					{/* Alcohol Card */}
					<Card className="bg-transparent">
						<CardContent className="space-y-4">
							<CardHeader>
								<CardTitle>Alcohol 🍾</CardTitle>
							</CardHeader>
							<Separator />
							<div className="flex sm:items-start flex-col sm:flex-row gap-3">
								<FormField
									control={form.control}
									name="socialHistory.alcohol.status"
									render={({ field }) => (
										<FormItem className={"flex-1"}>
											<FormLabel>Status</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select status.." />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eLifeStyleStatus).map(([k, v]) => (
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
									name="socialHistory.alcohol.years"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Years</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="number"
													min={0}
													placeholder="Number of years"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-row gap-3">
								<FormField
									control={form.control}
									name="socialHistory.alcohol.lastUse"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Last Use (opt)</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Last use date"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="socialHistory.alcohol.quitDate"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Quit date (opt)</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Last use date"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="Smoking">
					{/* Smoking Card */}
					<Card className="bg-transparent">
						<CardContent className="space-y-4">
							<CardHeader>
								<CardTitle>Smoking 🚬</CardTitle>
							</CardHeader>
							<Separator />

							<div className="flex sm:items-start flex-col sm:flex-row gap-3">
								<FormField
									control={form.control}
									name="socialHistory.smoking.status"
									render={({ field }) => (
										<FormItem className={"flex-1"}>
											<FormLabel>Status</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select status.." />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eLifeStyleStatus).map(([k, v]) => (
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
									name="socialHistory.smoking.years"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Years</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="number"
													min={0}
													placeholder="Number of years"
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-row gap-3">
								<FormField
									control={form.control}
									name="socialHistory.smoking.lastUse"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Last Use (opt)</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Last use date"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="socialHistory.smoking.quitDate"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Quit date (opt)</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Last use date"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="Substance">
					{/* substance Card */}
					<Card className="bg-transparent">
						<CardContent className="space-y-4">
							<CardHeader>
								<CardTitle>Substance 🌿</CardTitle>
							</CardHeader>
							<Separator />
							<FormField
								control={form.control}
								name="socialHistory.substanceUse.substances"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Substances</FormLabel>

										<FormControl>
											<Textarea
												{...field}
												placeholder="Comma-separated list eg: Tibacco, Nicotine,...etc"
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="socialHistory.substanceUse.status"
								render={({ field }) => (
									<FormItem className={"flex-1"}>
										<FormLabel>Status</FormLabel>

										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select status.." />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{Object.entries(eLifeStyleStatus).map(([k, v]) => (
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

							<div className="flex flex-row gap-3">
								<FormField
									control={form.control}
									name="socialHistory.substanceUse.lastUse"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Last Use (opt)</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Last use date"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="socialHistory.substanceUse.quitDate"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Quit date (opt)</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Last use date"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>

		// <ScrollBar orientation="horizontal" />
		// </ScrollArea>
	);
};

const DiseaseHistorySection = ({
	form,
}: {
	form: ReturnType<typeof useForm<HistoryFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "diseaseHistory",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Register past disease🦠 conditions here.
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							name: "",
							diagnosisDate: "",
							resolved: false,
							resolutionDate: "",
						})
					}
				>
					Add Condition <Plus />
				</MyBtn>
			)}
			<div className="space-y-2">
				{fields.map((field, i) => (
					<motion.div
						key={field.id}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: 100 }}
						layout
					>
						<Card className="bg-popover/30">
							<CardContent className="space-y-3">
								{/* .flex. */}
								<h5 className="font-medium flex items-center gap-x-1">
									<Bug size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`diseaseHistory.${i}.name`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`diseaseHistory.${i}.name`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Name</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Condition name..." />
												</FormControl>

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

								<FormField
									control={form.control}
									name={`diseaseHistory.${i}.diagnosisDate`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Diagnosis date</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Diagnosis name..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex items-end gap-4">
									<FormField
										control={form.control}
										name={`diseaseHistory.${i}.resolved`}
										render={({ field }) => (
											<FormItem className="flex items-center gap-x-2">
												<FormLabel>Resolved</FormLabel>

												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														className="size-8"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`diseaseHistory.${i}.resolutionDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Resolution date</FormLabel>

												<FormControl>
													<Input
														type="date"
														{...field}
														placeholder="Placeholder..."
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
};

const SurgeryHistorySection = ({
	form,
}: {
	form: ReturnType<typeof useForm<HistoryFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "surgicalHistory",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Register your past surgical procedures here.
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							procedure: "",
							date: "",
							facility: "",
						})
					}
				>
					Add Procedure <Plus />
				</MyBtn>
			)}
			<div className="space-y-2">
				{fields.map((field, i) => (
					<motion.div
						key={field.id}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: 100 }}
						layout
					>
						<Card className="bg-popover/30">
							<CardContent className="space-y-3">
								{/* .flex. */}
								<h5 className="font-medium flex items-center gap-x-1">
									<Bed size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`surgicalHistory.${i}.procedure`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`surgicalHistory.${i}.procedure`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Procedure</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Procedure name..." />
												</FormControl>

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

								<FormField
									control={form.control}
									name={`surgicalHistory.${i}.facility`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Facility</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Facility name..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`surgicalHistory.${i}.date`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Date</FormLabel>

											<FormControl>
												<Input
													{...field}
													type="date"
													placeholder="Date of surgery..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
};

const FamilyHistorySection = ({
	form,
}: {
	form: ReturnType<typeof useForm<HistoryFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "familyHistory",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Are there any conditions that run in your family?
			</p>
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							condition: "",
							relation: "",
							notes: "",
						})
					}
				>
					Add conditions <Plus />
				</MyBtn>
			)}
			<div className="space-y-2">
				{fields.map((field, i) => (
					<motion.div
						key={field.id}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: 100 }}
						layout
					>
						<Card className="bg-popover/30">
							<CardContent className="space-y-3">
								<h5 className="font-medium flex items-center gap-x-1">
									<Users size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`familyHistory.${i}.condition`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`familyHistory.${i}.condition`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Condition</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Condition name..." />
												</FormControl>

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
								<FormField
									control={form.control}
									name={`familyHistory.${i}.relation`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Relation</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Relation..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`familyHistory.${i}.notes`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Notes</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="Any extra notes(optional)..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
};

const AllergyHistory = ({
	form,
}: {
	form: ReturnType<typeof useForm<HistoryFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "allergies",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				What substances you are allergic to?
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							substance: "",
							reaction: "",
							severity: eAllergySeverity.MODERATE,
							onsetDate: "",
							lastReactionDate: "",
						})
					}
				>
					Add allergy <Plus />
				</MyBtn>
			)}
			<div className="space-y-2">
				{fields.map((field, i) => (
					<motion.div
						key={field.id}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: 100 }}
						layout
					>
						<Card className="bg-popover/30">
							<CardContent className="space-y-3">
								<div className="flex items-center gap-x-3 justify-between">
									<h5 className="flex-1 font-medium flex items-center gap-x-1">
										{/* <Calendar size={18} /> */}
										<span>🤧</span>
										{i + 1}:{" "}
										<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
											{form.watch(`allergies.${i}.substance`)}
										</code>
									</h5>

									<MyBtn
										size="icon"
										variant="secondary"
										onClick={() => remove(i)}
										className="text-destructive"
									>
										<Trash2 />
									</MyBtn>
								</div>
								<Separator className="my-2" />
								<div className="flex flex-col sm:flex-row sm:items-start gap-3">
									<FormField
										control={form.control}
										name={`allergies.${i}.substance`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Substance.</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Substance name..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`allergies.${i}.severity`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Severity</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose type" />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{Object.entries(eAllergySeverity).map(([k, v]) => (
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
									name={`allergies.${i}.reaction`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Reaction</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="Describe your body reaction..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex flex-row items-start gap-2">
									<FormField
										control={form.control}
										name={`allergies.${i}.onsetDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Onset</FormLabel>

												<FormControl>
													<Input {...field} type="date" placeholder="..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`allergies.${i}.lastReactionDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Last reaction</FormLabel>

												<FormControl>
													<Input {...field} type="date" placeholder="..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
};
