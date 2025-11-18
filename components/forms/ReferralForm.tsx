import { updateAppointment } from "@/lib/actions/appointment.actions";
import { getDoctors } from "@/lib/actions/doctor.actions";
import {
	ReferralFormData,
	referralSchema,
} from "@/lib/formSchemas/referral.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRightDash } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
	ComponentProps,
	ReactNode,
	useEffect,
	useEffectEvent,
	useState,
	useTransition,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DoctorSearchBox from "../DoctorSearchBox";
import DoctorCard from "../cards/DoctorCard";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogSubtitle,
	MorphingDialogTitle,
	MorphingDialogTrigger,
} from "../motion-primitives/morphing-dialog";
import { errHandler } from "../toastErr";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { createReferral, updateReferral } from "@/lib/actions/referral.actions";
import { useConsultation } from "@/contexts/consultation.context";

export default function ReferralForm({
	action,
	referral,
}: {
	action: "Create" | "Update";
	referral?: IReferral;
}) {
	const { appointment } = useConsultation();

	const appointmentDoctor = appointment?.doctor as IDoctor;
	const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>(
		referral ? (referral.to as IDoctor) : undefined
	);
	const [isPending, startTransition] = useTransition();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);


	const form = useForm<ReferralFormData>({
		resolver: zodResolver(referralSchema),
		defaultValues: {
			// reason: referral?.reason || "",
		},
	});

	const submitHandler = (data: ReferralFormData) => {
		if (!selectedDoctor) {
			errHandler(["Please Select Doctor you are referring the patient to!"]);
			return;
		}

		if (action === "Create" && appointment) {
			const newReferralData: Omit<IReferral, "id" | "createdAt" | "updatedAt"> =
				{
					...data,
					from: appointmentDoctor.id!,
					to: selectedDoctor.id!,
					appointment: appointment.id!,
				};

			startTransition(async () => {
				await createReferral(newReferralData);

				form.reset();
				setIsSuccess(true);
				setSelectedDoctor(undefined);
				toast.success("Referral registered.⏩");
			});
		} else if (action === "Update" && referral) {
			startTransition(async () => {
				await updateReferral({
					...referral,
					...data,
					to: selectedDoctor.id!,
				});

				form.reset();
				setIsSuccess(true);
				setSelectedDoctor(undefined);
				toast.success("Referral Updated.⏩");
			});
		}
	};

	return (
		<div>
			<section>
				<MorphingDialogSubtitle>
					Set up a one-on-one meet with a doctor👨‍⚕️
				</MorphingDialogSubtitle>
			</section>

			<Separator className="my-2" />
			<ScrollArea className="h-[85vh] sm:h-[80vh]">
				<Form {...form}>
					<section className="space-y-4 px-2">
						<FormField
							control={form.control}
							name="reason"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Reason for Referral</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											autoFocus
											placeholder="Reason for referral"
										/>
									</FormControl>
									<FormDescription>
										Provide clear reason for the referral.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-4">
							<p className="text-lg font-medium">Select Doctor</p>
							<p className="text-xs text-muted-foreground ">
								Search and select the
								<span className="text-primary font-medium"> Doctor👨‍⚕️ </span>. If
								you leave this <span className="font-medium">empty </span>, your
								Appointment will be automatically sent to{" "}
								<span className="font-medium text-primary">
									Relevant doctors🤖
								</span>
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
										<DoctorCard
											doctor={selectedDoctor}
											className={cn("w-full")}
										/>
									</motion.div>
								)}
							</AnimatePresence>

							<DoctorSearchBox
								setSelectedDoctor={setSelectedDoctor}
								selectedDoctor={selectedDoctor}
							/>
						</div>

						<MyBtn
							disabled={isPending}
							onClick={form.handleSubmit(submitHandler)}
							className="flex w-2/3 sm:w-1/2 md:w-1/3 mx-auto"
						>
							Submit
							{isPending && <Spinner />}
						</MyBtn>
					</section>
				</Form>
			</ScrollArea>
		</div>
	);
}

export const ReferralFormDialog = ({
	children,
	className,
	...props
}: {
	children: ReactNode;
	className?: string;
} & ComponentProps<typeof ReferralForm>) => {
	return (
		<MorphingDialog>
			<MorphingDialogTrigger asChild className={cn("", className)}>
				{children}
			</MorphingDialogTrigger>

			<MorphingDialogContainer>
				<MorphingDialogContent className=" sm:max-w-[80vw]  md:min-w-lg">
					<MorphingDialogTitle>
						<Heading className="text-lg sm:text-xl text-primary">
							Referral Form
							<ArrowBigRightDash />
						</Heading>
					</MorphingDialogTitle>

					<section>
						<ReferralForm {...props} />
					</section>
					<MorphingDialogClose className="text-foreground" />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	);
};
