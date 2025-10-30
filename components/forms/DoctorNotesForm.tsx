import { ComponentProps, ReactNode, useState, useTransition } from "react";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import { useForm } from "react-hook-form";
import {
	appointmentNotesFormData,
	appointmentNotesFormSchema,
} from "@/lib/formSchemas/appointment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Notebook, NotebookPen, X } from "lucide-react";
import Heading from "../custom/Heading";
import { Separator } from "../ui/separator";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import MyBtn from "../custom/MyBtn";
import { Card, CardContent } from "../ui/card";
import { getIsAppointmentDoctor } from "@/lib/utils";

export default function DoctorNotesForm({
	appointment,
	currentUser,
}: {
	appointment: IAppointment;
	currentUser: IUser;
}) {
	const doctor = appointment.doctor as IDoctor;
	const patient = appointment.patient as IPatient;
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const pathname = usePathname();
	const isAppointmentDoctor = getIsAppointmentDoctor(appointment, currentUser);

	console.log(appointment);

	const form = useForm<appointmentNotesFormData>({
		resolver: zodResolver(appointmentNotesFormSchema),
		defaultValues: {
			doctorNotes: "",
			followUpInstructions: "",
			patientNotes: "",
			// doctorNotes: appointment.doctorNotes || "",
			// followUpInstructions: appointment.followUpInstructions || "",
			// patientNotes: appointment.patientNotes || "",
		},
	});

	const submitHandler = (data: appointmentNotesFormData) => {
		if (
			isAppointmentDoctor
				? form.watch("followUpInstructions") || form.watch("doctorNotes")
				: form.watch("patientNotes")
		) {
			startTransition(async () => {
				await updateAppointment({ ...appointment, ...data });

				toast.success("Notes updated posted successfully📒");
				form.reset();
				setIsSuccess(true);
			});
		} else {
			errHandler(["Cannot submit empty notes!"]);
		}
	};

	const errHandler = async (errs: string[]) => {
		toast.custom(
			(t) => (
				<Card className="w-[95vw] sm:w-72 relative">
					<MyBtn
						size="icon"
						variant={"secondary"}
						onClick={() => toast.dismiss(t.id)}
						className="size-7 rounded-xl hover:text-destructive absolute top-2 right-2 "
					>
						<X />
					</MyBtn>
					<CardContent className="px-2 py-1">
						<Heading className="text-xl">🚨Form input error(s) </Heading>
						<Separator className="my-1" />
						<div>
							{errs.map((err, i) => (
								<p key={i} className={"text-sm text-secondary-foreground"}>
									<code>{err}</code>
								</p>
							))}
						</div>
					</CardContent>
				</Card>
			),
			{ id: "adiou2b947" }
		);
	};

	return (
		<div>
			<section>
				<Heading className="text-primary text-xl sm:text-2xl">
					<Notebook />
					Make Notes
				</Heading>
			</section>

			<Separator className="my-2" />

			<Form {...form}>
				<section className="space-y-4">
					<FormField
						control={form.control}
						name="doctorNotes"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Doctor Notes</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className="h-40"
										placeholder={
											appointment.doctorNotes
												? appointment.doctorNotes
												: "Theses are medical notes..."
										}
									/>
								</FormControl>
								<FormDescription>
									Notes will be hidden from the patient but visible to other
									Doctors.
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="followUpInstructions"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Followup instructions</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className="h-40"
										placeholder={
											appointment.followUpInstructions
												? appointment.followUpInstructions
												: `What steps should @${patient.user.username} - ${patient.user.lname} follow after this consultation?....`
										}
									/>
								</FormControl>
								<FormDescription>
									Instructions to patient :- @{patient.user.username}.
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<MyBtn
						disabled={isPending}
						size="lg"
						onClick={form.handleSubmit(submitHandler)}
						className="flex w-2/3 sm:w-1/2 md:w-1/3 mx-auto"
					>
						Post Notes
						{isPending ? <Loader className="animate-spin" /> : <NotebookPen />}
					</MyBtn>
				</section>
			</Form>
		</div>
	);
}

export const DoctorNotesFormPanel = ({
	children,
	...props
}: { children: ReactNode } & ComponentProps<typeof DoctorNotesForm>) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild>{children}</FormPanelTrigger>

			<FormPanelContent>
				<DoctorNotesForm {...props} />
			</FormPanelContent>
		</FormPanel>
	);
};
