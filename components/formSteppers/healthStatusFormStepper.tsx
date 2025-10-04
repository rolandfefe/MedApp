import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
	ePainType,
	eTenScale,
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
import { HealthStatusFormData } from "@/lib/formSchemas/healthStatus.schema";

export default function getHealthStatusFormStepper(
	form: ReturnType<typeof useForm<HealthStatusFormData>>,
	submitHandler: (data: HealthStatusFormData) => Promise<void>,
	errHandler: (err: FieldErrors<HealthStatusFormData>) => Promise<void>,
	isPending: boolean = false
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [
		{
			title: "Chief Complaint😢",
			body: (
				<section className="space-y-4">
					<p className="text-xs sm:text-sm text-muted-foreground">
						This is the <span className="text-primary">major guide</span> for
						your doctor
					</p>
					<FormField
						control={form.control}
						name="complaint"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Complaint</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										placeholder="Describe extensively how you feel..."
										className="h-40"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
			get isComplete(): boolean {
				return !!form.watch("complaint");
			},
		},
		{
			title: "Vitals",
			body: (
				<section className="space-y-4">
					<div className="flex flex-col sm:flex-row sm:items-start gap-3">
						<FormField
							control={form.control}
							name="vitals.bloodPressure"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Blood Pressure (sys/dia)</FormLabel>

									<FormControl>
										<Input
											{...field}
											placeholder="Bp in (Systole/Diastole) format"
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="vitals.heartRate"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Heart Rate(BpM)</FormLabel>

									<FormControl>
										<Input
											{...field}
											placeholder="Heart rate in Beats per minutes"
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="vitals.respiratoryRate"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Respiratory rate</FormLabel>

								<FormControl>
									<Input {...field} placeholder="Respiratory rate" />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-col sm:flex-row sm:items-start gap-3">
						<FormField
							control={form.control}
							name="vitals.oxygenSaturation"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Oxygen Saturation</FormLabel>

									<FormControl>
										<Input
											{...field}
											placeholder="Oxygen concentration levels..."
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="vitals.temperature"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Body temperature</FormLabel>

									<FormControl>
										<Input
											{...field}
											placeholder="Temp in degrees Celsius..."
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="vitals.bmi"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Body Mass Index </FormLabel>

								<FormControl>
									<Input {...field} placeholder="BMI in kg/m2..." />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col sm:flex-row sm:items-start gap-3">
						<FormField
							control={form.control}
							name="vitals.weight"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Weight (Kg)</FormLabel>

									<FormControl>
										<Input {...field} placeholder="wseight in (Kg)..." />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="vitals.height"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Height (M)</FormLabel>

									<FormControl>
										<Input {...field} placeholder="Height in Meters(m)..." />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
			),
			get isComplete(): boolean {
				return !!form.watch("vitals");
			},
		},
		{
			title: "Symptoms",
			body: <SymptomsSection form={form} />,
			get isComplete(): boolean {
				return !!form.watch("symptoms");
			},
		},
		{
			title: "Pain",
			body: <PainSection form={form} />,
			get isComplete(): boolean {
				return !!form.watch("pain");
			},
		},

		{
			title: "All Done🤗",
			body: (
				<section className="space-y-4">
					<p className="text-sm text-muted-foreground">
						<span className="text-primary">All done! </span>
						Click button below to your Health status.
					</p>

					<Image
						src="/assets/wheel-chair.svg"
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
						Save {isPending && <Loader className="animate-spin" />}
					</MyBtn>
				</section>
			),
			get isComplete(): boolean {
				return false;
			},
		},
	];
}

const SymptomsSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<HealthStatusFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "symptoms",
	});

	return (
		<section className="space-y-4 relative">
			<p className="text-sm text-muted-foreground">
				Tell me how u feel. Any fever or coughs?
			</p>
			{/* Only Allow 3 for now */}

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
									{/* <Star size={18} /> */}
									😷{i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{`${form
											.watch(`symptoms.${i}.description`)
											.substring(0, 15)}...`}
									</code>
								</h5>
								<Separator className="my-2" />

								<FormField
									control={form.control}
									name={`symptoms.${i}.description`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Description</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="describe a symptom..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex items-start gap-2">
									<FormField
										control={form.control}
										name={`symptoms.${i}.severity`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Severity(0-10)</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select Scale..." />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{Object.entries(eTenScale).map(([k, v]) => (
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
										name={`symptoms.${i}.duration`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Duration</FormLabel>

												<FormControl>
													<Input {...field} placeholder="How long..." />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`symptoms.${i}.onset`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Onset</FormLabel>

												<FormControl>
													<Input
														type={"date"}
														{...field}
														placeholder="start date..."
													/>
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
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							description: "",
							// onset: new Date(), // ! test
							onset: "",
							severity: eTenScale.ZERO,
							duration: "",
						})
					}
					className="absolute -bottom-12"
				>
					Add symptom <Plus />
				</MyBtn>
			)}
		</section>
	);
};

const PainSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<HealthStatusFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "pain",
	});

	return (
		<section className="space-y-4 relative">
			<p className="text-sm text-muted-foreground">
				Tell me about any pain you feel.
			</p>
			{/* Only Allow 3 for now */}

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
									{/* <CreditCard size={18} /> */}
									🥵{i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`pain.${i}.location`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`pain.${i}.location`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Location</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Pain location..." />
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
								<div className="flex items-start gap-2">
									<FormField
										control={form.control}
										name={`pain.${i}.type`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Type</FormLabel>

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
														{Object.entries(ePainType).map(([k, v]) => (
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
										name={`pain.${i}.intensity`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Intensity (0-10)</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose intensity" />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{Object.entries(eTenScale).map(([k, v]) => (
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
									name={`pain.${i}.aggravatingFactors`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Aggravating factors</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="Factors intensify the pain?(comma-separated)..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`pain.${i}.relievingFactors`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Relieving Factors</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="Factors that reduce the pain(comma-separated)..."
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
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							location: "",
							intensity: eTenScale.ZERO,
							type: ePainType.ACHING,
							aggravatingFactors: "",
							relievingFactors: "",
						})
					}
					className="absolute -bottom-12"
				>
					Add pain <Plus />
				</MyBtn>
			)}
		</section>
	);
};
