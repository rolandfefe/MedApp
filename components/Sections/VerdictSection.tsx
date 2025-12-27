"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { useCurrent } from "@/contexts/Current.context";
import { deleteVerdict, updateVerdict } from "@/lib/actions/verdict.actions";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	CheckCircle2,
	CheckCircle2Icon,
	Clock10,
	Cog,
	Edit3,
	GitCommit,
	NotebookTabs,
	Syringe,
	Trash2,
	UserCog,
	XCircle,
} from "lucide-react";
import moment from "moment";
import { Variants, motion, stagger } from "motion/react";
import {
	Activity,
	Dispatch,
	SetStateAction,
	useState,
	useTransition,
} from "react";
import toast from "react-hot-toast";
import { Editor } from "../blocks/editor-00/editor";
import DoctorCard from "../cards/DoctorCard";
import MedicationCard from "../cards/MedicationCard";
import ProcedureCard from "../cards/ProcedureCard";
import TherapyCard from "../cards/TherapyCard";
import MyBtn from "../custom/MyBtn";
import Void from "../custom/Void";
import VerdictForm from "../forms/VerdictForm";
import ConfirmationDialog from "../panels/ConfirmationDialog";
import { Badge } from "../ui/badge";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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

export default function VerdictSection() {
	const { verdict } = useConsultation();
	const [tab, setTab] = useState<"MAIN" | "EDIT">("MAIN");

	if (!verdict) return <VerdictForm />;

	console.log(verdict);

	return (
		<>
			<Activity mode={tab === "MAIN" ? "visible" : "hidden"}>
				<VerdictSection.Main />
			</Activity>
			<Activity mode={tab === "EDIT" ? "visible" : "hidden"}>
				<VerdictForm />
			</Activity>

			<VerdictSection.Actions setTab={setTab} tab={tab} />
		</>
	);
}

VerdictSection.Main = () => {
	const { appointment, verdict } = useConsultation();

	if (!verdict) return;

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{
				delayChildren: stagger(0.3),
			}}
			className="space-y-7 mb-3"
		>
			<motion.section variants={motionVariants} layout>
				<p className="text-lg font-medium inline-flex gap-x-1 items-center text-primary">
					<NotebookTabs />
					<span>Verdict Notes</span>
				</p>

				<Editor.Renderer editorSerializedState={verdict.notes} />
			</motion.section>

			<motion.section variants={motionVariants} layout className="">
				<p className="text-lg font-medium inline-flex gap-x-1 items-center text-primary">
					<Syringe />
					<span>Treatment Plan</span>
				</p>
				<Editor.Renderer editorSerializedState={verdict.treatmentPlan.plan} />
			</motion.section>

			<motion.section variants={motionVariants} layout>
				<VerdictSection.Plans />
			</motion.section>

			<motion.section variants={motionVariants} layout className="space-y-3">
				<p className="tex-lg font-medium flex items-center gap-x-1 text-primary">
					<motion.span
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
					>
						<Cog />
					</motion.span>
					<span>Meta Data:</span>
				</p>
				<VerdictSection.Meta className="border-2 p-2 rounded-xl" />
			</motion.section>
		</motion.div>
	);
};

VerdictSection.Plans = () => {
	const { verdict } = useConsultation();

	const medications = verdict?.treatmentPlan.medications ?? [];
	const therapies = verdict?.treatmentPlan.therapies ?? [];
	const procedures = verdict?.treatmentPlan.procedures ?? [];

	return (
		<Tabs defaultValue="Medications">
			<TabsList className="flex mx-auto rounded-xl">
				<TabsTrigger value="Medications">Medications</TabsTrigger>
				<TabsTrigger value="Therapies">Therapies</TabsTrigger>
				<TabsTrigger value="Procedures">Procedures</TabsTrigger>
			</TabsList>

			<TabsContent value="Medications">
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="space-y-2"
				>
					{medications.length > 0 ? (
						medications.map((m) => (
							<motion.div variants={motionVariants} key={m.id} layout>
								<MedicationCard medication={m} />
							</motion.div>
						))
					) : (
						<Void msg="No Medications prescribed💊" />
					)}
				</motion.section>
			</TabsContent>
			<TabsContent value="Procedures">
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2"
				>
					{procedures.length > 0 ? (
						procedures.map((p) => (
							<motion.div
								variants={motionVariants}
								key={p.id}
								layout
								className="flex-1"
							>
								<ProcedureCard procedure={p} />
							</motion.div>
						))
					) : (
						<Void msg="No procedure prescribed🏃‍♀️" />
					)}
				</motion.section>
			</TabsContent>
			<TabsContent value="Therapies">
				<motion.section
					variants={motionVariants}
					initial="hidden"
					animate="visible"
					transition={{
						delayChildren: stagger(0.3),
					}}
					className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2"
				>
					{therapies.length > 0 ? (
						therapies.map((t) => (
							<motion.div
								variants={motionVariants}
								key={t.id}
								layout
								className="flex-1"
							>
								<TherapyCard therapy={t} />
							</motion.div>
						))
					) : (
						<Void msg="No therapies prescribed🧘" />
					)}
				</motion.section>
			</TabsContent>
		</Tabs>
	);
};

VerdictSection.Actions = ({
	tab,
	setTab,
}: {
	tab: "EDIT" | "MAIN";
	setTab: Dispatch<SetStateAction<"EDIT" | "MAIN">>;
}) => {
	const { verdict } = useConsultation();

	const [isConfirming, startConfirming] = useTransition();
	const currentDoctor = useCurrent().currentDoctor;

	if (!currentDoctor || !verdict) return;

	const confirmHandler = () => {
		startConfirming(async () => {
			if (verdict.isConfirmed) {
				// ? Reject
				await updateVerdict({
					...verdict,
					isConfirmed: false,
					confirmedBy: undefined,
				});

				toast.success(`Verdict Rejected by @Dr.${currentDoctor.user.fname}`);
			} else {
				// ? confirm
				await updateVerdict({
					...verdict,
					isConfirmed: true,
					confirmedBy: currentDoctor.id,
				});

				toast.success(`Verdict Confirmed by @Dr.${currentDoctor.user.fname}`);
			}
		});
	};

	const deleteHandler = async () => await deleteVerdict(verdict.id);

	return (
		<div className="flex items-center justify-center gap-x-2 my-3">
			<ButtonGroup className="">
				<MyBtn
					size="lg"
					variant={tab === "MAIN" ? "secondary" : "primary-outline"}
					onClick={() => setTab((prev) => (prev === "EDIT" ? "MAIN" : "EDIT"))}
					className="flex mx-auto"
				>
					<Edit3 />
					Edit
				</MyBtn>
				<ButtonGroupSeparator />
				<MyBtn
					size="lg"
					variant={"invert"}
					disabled={isConfirming}
					onClick={confirmHandler}
					className={cn(
						"flex mx-auto",
						verdict.isConfirmed && "text-destructive!"
					)}
				>
					{isConfirming ? (
						<Spinner />
					) : verdict.isConfirmed ? (
						<XCircle />
					) : (
						<CheckCircle2 />
					)}
					{verdict.isConfirmed ? "Reject" : "Confirm"}
				</MyBtn>
			</ButtonGroup>
			<ConfirmationDialog
				action={deleteHandler}
				msg="Are you sure you want to PERMANENTLY delete this Verdict?"
				successMsg="Verdict deleted🗑️"
			>
				<MyBtn variant={"destructive-outline"} className="size-10">
					<Trash2 />
				</MyBtn>
			</ConfirmationDialog>
		</div>
	);
};

VerdictSection.Meta = ({ className }: { className?: string }) => {
	const { verdict } = useConsultation();
	const isSmScreen = useMediaQuery("(width <= 640px)");

	if (!verdict) return;

	return (
		<div
			className={cn(
				"flex flex-wrap sm:items-start gap-3 flex-col sm:flex-row justify-between",
				className
			)}
		>
			<section className="space-y-1">
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<Clock10 size={15} />
						<span>Recovery Time(estimate):</span>
					</p>

					{verdict?.prognosis?.estimatedRecoveryTime ? (
						<p className="text-sm font-medium">
							{verdict?.prognosis.estimatedRecoveryTime}
						</p>
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
						<span>Outlook:</span>
					</p>

					<Badge variant={"secondary"} className={cn("text-xs font-medium")}>
						{verdict?.prognosis?.outlook}
					</Badge>
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<UserCog size={15} />
						<span>Validated by:</span>
					</p>

					{verdict.confirmedBy ? (
						<DoctorCard.Tag doctor={verdict.confirmedBy as IDoctor} />
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
						<CheckCircle2Icon size={15} />
						<span>Confirmation:</span>
					</p>

					<Badge
						variant={verdict.isConfirmed ? "primary-luminous" : "secondary"}
						className={cn(
							"text-xs font-medium",
							verdict.isConfirmed || "text-destructive"
						)}
					>
						{verdict.isConfirmed ? "Confirmed" : "Not confirmed"}
					</Badge>
				</div>
				<div className="flex items-center gap-x-2 font-mono">
					<p className="flex items-center gap-x-1 text-xs text-muted-foreground">
						<UserCog size={15} />
						<span>Updated by:</span>
					</p>

					{verdict.updatedBy ? (
						<DoctorCard.Tag doctor={verdict.updatedBy as IDoctor} />
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

					{verdict.updatedBy ? (
						<p className="text-sm font-medium">
							{moment(verdict.updatedAt).format("Do-MMM-YYYY")}
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
