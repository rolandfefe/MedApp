import { DoctorFormData } from "@/lib/formSchemas/doctor.schema";
import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
} from "@/types/enums";
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

export default function getDoctorFormStepper(
	form: ReturnType<typeof useForm<DoctorFormData>>,
	submitHandler: (data: DoctorFormData) => Promise<void>,
	errHandler: (err: FieldErrors<DoctorFormData>) => Promise<void>,
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
					<div className="flex items-start gap-3">
						<FormField
							control={form.control}
							name="DOB"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>DOB</FormLabel>

									<FormControl>
										<Input
											{...field}
											type="date"
											placeholder="Date of birth..."
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
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
					</div>

					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea {...field} placeholder="Your mantra...(optional)" />
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
				return (
					!!form.watch("DOB") && !!form.watch("gender") && !!form.watch("bio")
				);
			},
		},
		{
			title: "Medical licenses💳",
			body: <LicenseSection form={form} />,
			get isComplete(): boolean {
				return false;
			},
		},
		{
			title: "Contacts 🤙",
			body: (
				<section className="space-y-4">
					<div className="flex flex-col sm:flex-row sm:items-start gap-3">
						<FormField
							control={form.control}
							name="contact.officePhone"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Office Phone:</FormLabel>

									<FormControl>
										<Input {...field} placeholder="Phone number..." />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contact.mobilePhone"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Mobile Phone:</FormLabel>

									<FormControl>
										<Input {...field} placeholder="Phone number...(optional)" />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="contact.officeEmail"
						render={({ field }) => (
							<FormItem>
								<FormItem className="flex-1">
									<FormLabel>Office Email:</FormLabel>

									<FormControl>
										<Input {...field} placeholder="Office email..." />
									</FormControl>

									<FormMessage />
								</FormItem>
							</FormItem>
						)}
					/>
				</section>
			),
			get isComplete(): boolean {
				return (
					!!form.watch("contact.officePhone") &&
					!!form.watch("contact.officeEmail")
				);
			},
		},
		{
			title: "Medical Certifications 📜",
			body: <MedicalCertificationSection form={form} />,
			get isComplete(): boolean {
				return !!form.watch(`credentials.medicalCertifications`);
			},
		},
		{
			title: "Specialties🤹",
			body: <SpecialtiesSection form={form} />,
			get isComplete(): boolean {
				return !!form.watch(`specialties`);
			},
		},
		{
			title: "Board certifications 📜",
			body: <BoardCertificationSection form={form} />,
			get isComplete(): boolean {
				return !!form.watch("credentials.boardCertifications");
			},
		},
		{
			title: "Hospital affiliations🏥",
			body: <HospitalAffiliationSection form={form} />,
			get isComplete(): boolean {
				return !!form.watch(`credentials.hospitalAffiliations`);
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

const LicenseSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<DoctorFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "credentials.licenses",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Register your medical licenses here.
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							type: null,
							issuingState: "",
							status: eLicenseStatus.ACTIVE,
							licenseNumber: "",
							expirationDate: "",
						})
					}
				>
					Add license <Plus />
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
									<CreditCard size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`credentials.licenses.${i}.licenseNumber`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`credentials.licenses.${i}.licenseNumber`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>License NO.</FormLabel>

												<FormControl>
													<Input {...field} placeholder="License number..." />
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
										name={`credentials.licenses.${i}.type`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>License type</FormLabel>

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
														{Object.entries(eLicenseType).map(([k, v]) => (
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
										name={`credentials.licenses.${i}.status`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Status</FormLabel>

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
														{Object.entries(eLicenseStatus).map(([k, v]) => (
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

								<div className="flex flex-col sm:flex-row sm:items-start gap-2">
									<FormField
										control={form.control}
										name={`credentials.licenses.${i}.issuingState`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Issuing state</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Issuing state..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`credentials.licenses.${i}.expirationDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Expiration date</FormLabel>

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

const MedicalCertificationSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<DoctorFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "credentials.medicalCertifications",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Register your medical Certification here.
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							date: "",
							institution: "",
							type: eMedicalCertificationTypes.MBBS,
							name: "",
						})
					}
				>
					Add Certification <Plus />
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
									<GraduationCap size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`credentials.medicalCertifications.${i}.name`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`credentials.medicalCertifications.${i}.name`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Name:</FormLabel>

												<FormControl>
													<Input
														{...field}
														placeholder="Certification name..."
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

								<FormField
									control={form.control}
									name={`credentials.medicalCertifications.${i}.institution`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Institution:</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Issuing institution name..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex items-start gap-2">
									<FormField
										control={form.control}
										name={`credentials.medicalCertifications.${i}.type`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Type</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose type..." />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{Object.entries(eMedicalCertificationTypes).map(
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

									<FormField
										control={form.control}
										name={`credentials.medicalCertifications.${i}.date`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Date:</FormLabel>

												<FormControl>
													<Input
														{...field}
														type="date"
														placeholder="Issuing date"
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

const BoardCertificationSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<DoctorFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "credentials.boardCertifications",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Register your
				<span className="text-primary"> Board certifications </span> here.
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							boardName: "",
							certificationId: "",
							status: eCertificationStatus.ACTIVE,
							date: "",
							expirationDate: "",
						})
					}
				>
					Add certification <Plus />
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
									<Building2 size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(
											`credentials.boardCertifications.${i}.certificationId`
										)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`credentials.boardCertifications.${i}.certificationId`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Certification ID.</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Id number..." />
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
									name={`credentials.boardCertifications.${i}.boardName`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Board name.</FormLabel>

											<FormControl>
												<Input {...field} placeholder="Name..." />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`credentials.boardCertifications.${i}.status`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Status</FormLabel>

											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Choose status.." />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{Object.entries(eCertificationStatus).map(
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
								<div className="flex items-start gap-2">
									<FormField
										control={form.control}
										name={`credentials.boardCertifications.${i}.date`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Date</FormLabel>

												<FormControl>
													<Input {...field} type="date" placeholder="..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`credentials.boardCertifications.${i}.expirationDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Expiration date</FormLabel>

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

const SpecialtiesSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<DoctorFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "specialties",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				What are your areas of expertise?
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 5 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							primary: eMedicalSpecialties.Allergy,
							secondary: eMedicalSpecialties.Anesthesiology,
							procedures: "",
						})
					}
				>
					Add specialty <Plus />
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
									<ToolCase size={18} /> {i + 1}:{" "}
									<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
										{form.watch(`specialties.${i}.primary`)}
									</code>
								</h5>
								<Separator className="my-2" />
								<div className="flex flex-col sm:flex-row sm:items-start gap-2">
									<FormField
										control={form.control}
										name={`specialties.${i}.primary`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Primary:</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose specialty..." />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{Object.entries(eMedicalSpecialties).map(
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
									<FormField
										control={form.control}
										name={`specialties.${i}.secondary`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Secondary:</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose type..." />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{Object.entries(eMedicalSpecialties).map(
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

								<div className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`specialties.${i}.procedures`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Procedures:</FormLabel>

												<FormControl>
													<Textarea
														{...field}
														placeholder="Comma-separated list e.g surgery, colonoscopy, etc..."
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
		</section>
	);
};

const HospitalAffiliationSection = ({
	form,
}: {
	form: ReturnType<typeof useForm<DoctorFormData>>;
}) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "credentials.hospitalAffiliations",
	});

	return (
		<section className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Register your
				<span className="text-primary"> Affiliations </span> here.
			</p>
			{/* Only Allow 3 for now */}
			{fields.length < 3 && (
				<MyBtn
					size="sm"
					variant={"secondary"}
					onClick={() =>
						append({
							name: "",
							department: "",
							roles: "",
							startDate: "",
							endDate: "",
						})
					}
				>
					Add affiliation <Plus />
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
								<div className="flex items-center gap-x-3">
									<h5 className="font-medium flex-1 flex items-center gap-x-1">
										<Link2 size={18} /> {i + 1}:{" "}
										<code className="px-2 text-sm bg-muted rounded-lg text-primary glass-shadow">
											{form.watch(`credentials.hospitalAffiliations.${i}.name`)}
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
								<div className="flex flex-col sm:flex-row sm:items-start gap-2">
									<FormField
										control={form.control}
										name={`credentials.hospitalAffiliations.${i}.name`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Name.</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Hospital name..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`credentials.hospitalAffiliations.${i}.department`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Department.</FormLabel>

												<FormControl>
													<Input {...field} placeholder="Department name..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name={`credentials.hospitalAffiliations.${i}.roles`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Roles.</FormLabel>

											<FormControl>
												<Textarea
													{...field}
													placeholder="Comma-separated list eg: Clerking, Triage, etc..."
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex items-start gap-2">
									<FormField
										control={form.control}
										name={`credentials.hospitalAffiliations.${i}.startDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Start date</FormLabel>

												<FormControl>
													<Input {...field} type="date" placeholder="..." />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`credentials.hospitalAffiliations.${i}.endDate`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>End date(opt)</FormLabel>

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
