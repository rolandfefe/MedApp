"use client";

import { useConsultation } from "@/contexts/consultation.context";
import {
	ArrowLeftCircle,
	ArrowRightCircle,
	BadgeAlert,
	Calendar1,
	CalendarCheck,
	CalendarCheck2,
	Cog,
	Edit3,
	GitCommit,
	MessageSquareText,
	Microscope,
	PencilRuler,
	Pill,
	ShieldCheck,
	UserCog,
} from "lucide-react";
import { Editor } from "../blocks/editor-00/editor";
import LinkBtn from "../btns/LinkBtn";
import DoctorCard from "../cards/DoctorCard";
import PatientCard from "../cards/patientCard";
import DiagnosisForm from "../forms/DiagnosisForm";
import { Separator } from "../ui/separator";
import DifferentialCard from "../cards/DifferentialCard";
import { Variants, motion, stagger } from "motion/react";
import moment from "moment";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	Activity,
	Dispatch,
	SetStateAction,
	useState,
	useTransition,
} from "react";
import MyBtn from "../custom/MyBtn";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";
import { updateDiagnosis } from "@/lib/actions/diagnosis.actions";
import { useCurrent } from "@/contexts/Current.context";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

const motionVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

export default function DiagnosisSection() {
	const { appointment, diagnosis } = useConsultation();
	const [tab, setTab] = useState<"PRESENT" | "EDIT">("PRESENT");

	if (!diagnosis) return <DiagnosisForm />;

	return (
		<>
			<Activity mode={tab === "PRESENT" ? "visible" : "hidden"}>
				<DiagnosisSection.Present />
			</Activity>
			<Activity mode={tab === "EDIT" ? "visible" : "hidden"}>
				<DiagnosisSection.EditForm />
			</Activity>

			<DiagnosisSection.Actions tab={tab} setTab={setTab} />
			{/* <Separator className="my-5" /> */}

			<motion.section
				variants={motionVariants}
				layout
				className="mb-3 flex items-center gap-x-3 justify-between"
			>
				<LinkBtn
					link={{ href: `/consultation/${appointment.id}` }}
					size="lg"
					variant={"primary-outline"}
					className=" w-30 h-14 text-lg"
				>
					<ArrowLeftCircle />
					Chat
					{/* <MessageSquareText /> */}
				</LinkBtn>
				<LinkBtn
					link={{ href: `/consultation/${appointment.id}/verdict` }}
					size="lg"
					variant={"primary-outline"}
					className=" w-30 h-14 text-lg"
				>
					Verdict
					<ArrowRightCircle size={26} />
				</LinkBtn>
			</motion.section>
		</>
	);
}

DiagnosisSection.Actions = ({
	setTab,
	tab,
}: {
	tab: "EDIT" | "PRESENT";
	setTab: Dispatch<SetStateAction<"EDIT" | "PRESENT">>;
}) => {
	const { diagnosis } = useConsultation();

	const currentDoctor = useCurrent().currentDoctor;

	const [isConfirming, startConfirming] = useTransition();
	const [isReviewing, startReviewing] = useTransition();

	if (!diagnosis || !currentDoctor) return;

	const confirmHandler = () => {
		startConfirming(async () => {
			await updateDiagnosis({
				...diagnosis,
				dateConfirmed: new Date().toDateString(),
				confirmedBy: currentDoctor.id!,
			});

			toast.success(`Diagnosis confirmed by @Dr.${currentDoctor.user.fname}👍`);
		});
	};

	const reviewMedicationsHandler = () => {
		startReviewing(async () => {
			await updateDiagnosis({
				...diagnosis,
				medicationsReviewed: true,
			});

			toast.success(
				`Medications reviewed by @Dr.${currentDoctor.user.fname}👍`
			);
		});
	};
	return (
		<ButtonGroup className="mx-auto">
			<MyBtn
				variant="secondary"
				onClick={() => setTab((prev) => (prev === "EDIT" ? "PRESENT" : "EDIT"))}
				className={cn(tab === "EDIT" && "text-primary")}
			>
				<Edit3 />
				<span className="hidden sm:inline">Edit</span>
			</MyBtn>
			<ButtonGroupSeparator />
			<MyBtn
				variant="secondary"
				disabled={isConfirming}
				onClick={confirmHandler}
			>
				{isConfirming ? <Spinner /> : <ShieldCheck />} Confirm
			</MyBtn>
			<ButtonGroupSeparator />
			<MyBtn
				variant="secondary"
				disabled={isReviewing}
				onClick={reviewMedicationsHandler}
			>
				{isReviewing ? <Spinner /> : <Pill />} Review Medications
			</MyBtn>
		</ButtonGroup>
	);
};

DiagnosisSection.Present = () => {
	const { appointment, diagnosis } = useConsultation();

	if (!diagnosis) return;

	const doctor = appointment.doctor as IDoctor;
	const patient = appointment.patient as IPatient;

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
			className="space-y-6 mb-5"
		>
			<motion.section
				variants={motionVariants}
				layout
				className="flex flex-col sm:flex-row items-center-center justify-between gap-3"
			>
				<DoctorCard doctor={doctor} className="" />
				<PatientCard patient={patient} className="bg-transparent" />
			</motion.section>

			<motion.section variants={motionVariants} layout className="space-y-2">
				<p className="tex-lg font-medium flex items-center gap-x-1 text-primary">
					<BadgeAlert />
					<span>Chief Complaint:</span>
				</p>
				<Editor.Renderer editorSerializedState={diagnosis.chiefComplaint!} />
			</motion.section>

			{diagnosis.notes && (
				<motion.section variants={motionVariants} layout>
					<p className="tex-lg font-medium">Notes ✍️</p>

					<Editor.Renderer editorSerializedState={diagnosis.notes} />
				</motion.section>
			)}

			<motion.section variants={motionVariants} layout className="space-y-2">
				<p className="tex-lg font-medium flex items-center gap-x-1 text-primary">
					<Microscope />
					<span>Differential Diagnosis:</span>
				</p>

				<div className="space-y-3">
					{diagnosis.differentialDiagnosis!.map((d) => (
						<DifferentialCard key={d.id} differential={d} />
					))}
				</div>
			</motion.section>

			<motion.section variants={motionVariants} layout className="space-y-2">
				<p className="tex-lg font-medium flex items-center gap-x-1 text-primary">
					<motion.span
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
					>
						<Cog />
					</motion.span>
					<span>Meta Data:</span>
				</p>
				<DiagnosisSection.Meta className="border-2 p-2 rounded-xl" />
			</motion.section>
		</motion.div>
	);
};

DiagnosisSection.Meta = ({ className }: { className?: string }) => {
	const { diagnosis } = useConsultation();
	const isSmScreen = useMediaQuery("(width <= 640px)");

	if (!diagnosis) return;

	console.log(diagnosis.confirmedBy);

	return (
		<div
			className={cn(
				"flex flex-wrap sm:items-center gap-3 flex-col sm:flex-row justify-between",
				className
			)}
		>
			<section className="space-y-1">
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<Calendar1 size={15} />
						<span>Onset date:</span>
					</p>

					<p className="text-sm font-medium line-clamp-1">
						{moment(diagnosis.onsetDate).format("Do-MMM-YYYY")}
					</p>
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<CalendarCheck2 size={15} />
						<span>Resolved on:</span>
					</p>

					{diagnosis.dateResolved ? (
						<p className="text-sm font-medium">
							{moment(diagnosis.dateResolved).format("Do-MMM-YYYY")}
						</p>
					) : (
						<Badge
							variant={"outline"}
							className={cn("text-xs font-medium text-muted-foreground")}
						>
							Pending
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<Pill size={15} />
						<span>Medications:</span>
					</p>

					<Badge
						variant={"secondary"}
						className={cn(
							"text-xs font-medium",
							diagnosis.medicationsReviewed
								? "text-green-600"
								: "text-destructive"
						)}
					>
						{diagnosis.medicationsReviewed ? "Reviewed" : "Not Reviewed"}
					</Badge>
				</div>
			</section>

			<Separator orientation={isSmScreen ? "horizontal" : "vertical"} />

			<section className="space-y-1">
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<PencilRuler size={15} />
						<span>Template:</span>
					</p>

					{diagnosis.templateUsed ? (
						<p className="text-sm font-medium">{diagnosis.templateUsed}</p>
					) : (
						<Badge
							variant={"outline"}
							className={cn("text-xs font-medium text-muted-foreground")}
						>
							Not specified
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<GitCommit size={15} />
						<span>Status:</span>
					</p>

					<Badge variant={"secondary"} className={cn("text-xs font-medium")}>
						{diagnosis.status}
					</Badge>
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<UserCog size={15} />
						<span>Confirmed by:</span>
					</p>

					{diagnosis.confirmedBy ? (
						<DoctorCard.Tag doctor={diagnosis.confirmedBy as IDoctor} />
					) : (
						<Badge
							variant={"outline"}
							className={cn("text-xs font-medium text-muted-foreground")}
						>
							Pending
						</Badge>
					)}
				</div>
			</section>

			<Separator orientation={isSmScreen ? "horizontal" : "vertical"} />

			<section className="space-y-1">
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<CalendarCheck size={15} />
						<span>Confirmed on:</span>
					</p>

					{diagnosis.dateConfirmed ? (
						<p className="text-sm font-medium">
							{moment(diagnosis.dateConfirmed).format("Do-MMM-YYYY")}
						</p>
					) : (
						<Badge
							variant={"outline"}
							className={cn("text-xs font-medium text-muted-foreground")}
						>
							Pending
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<UserCog size={15} />
						<span>Updated by:</span>
					</p>

					{diagnosis.updatedBy ? (
						<DoctorCard.Tag doctor={diagnosis.updatedBy as IDoctor} />
					) : (
						<Badge
							variant={"secondary"}
							className={cn("text-xs font-medium text-green-600")}
						>
							Original
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<Edit3 size={15} />
						<span>Updated At:</span>
					</p>

					{diagnosis.updatedBy ? (
						<p className="text-sm font-medium">
							{moment(diagnosis.updatedAt).format("Do-MMM-YYYY")}
						</p>
					) : (
						<Badge
							variant={"secondary"}
							className={cn("text-xs font-medium text-green-600")}
						>
							Original
						</Badge>
					)}
				</div>
			</section>
		</div>
	);
};

DiagnosisSection.EditForm = () => {
	return <DiagnosisForm />;
};
