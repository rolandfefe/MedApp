import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	ArrowUpRightFromCircleIcon,
	Calendar1,
	Globe2,
	HandCoins,
	Languages,
	PhoneCall,
	User,
	UserCircle,
	Users,
} from "lucide-react";
import moment from "moment";
import { Variants, motion, stagger } from "motion/react";
import { ComponentProps } from "react";
import CallBtn from "../btns/CallBtn";
import PatientCard from "../cards/patientCard";
import CopyBadge from "../custom/CopyBadge";
import {
	DynamicPanel,
	DynamicPanelContent,
	DynamicPanelTrigger,
} from "../custom/DynamicPanel";
import Heading from "../custom/Heading";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

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

export default function PatientProfilePanel({
	patient,
	children,
	className,
	...props
}: {
	patient: IPatient;
} & ComponentProps<typeof DynamicPanelTrigger>) {
	const emergencyContacts = patient.emergencyContacts!;

	return (
		<DynamicPanel>
			<DynamicPanelTrigger {...props} className={cn("", className)}>
				{children}
			</DynamicPanelTrigger>

			<DynamicPanelContent className="sm:flex gap-1 sm:items-start p-0 overflow-hidden min-h-[94vh]! sm:min-h-[70vh]! sm:min-w-[75vw]! md:min-w-[70vw]! lg:min-w-[60vw]!">
				<PatientProfilePanel.InfoAside
					patient={patient}
					className="h-fit w-[97%] rounded-lg sm:rounded-r-none mx-auto sm:h-[75vh] sm:w-56"
				/>

				<div className="flex-1 p-2">
					<div>
						<Heading className="sm:text-lg font-medium text-primary justify-center">
							<UserCircle />
							Patient Profile
						</Heading>
						<Separator className="mt-1 mb-3" />
					</div>

					<ScrollArea className="h-[52vh] sm:h-[66vh]">
						<motion.div
							variants={motionVariants}
							initial="hidden"
							animate="visible"
							transition={{
								delayChildren: stagger(0.3),
							}}
							className={cn("space-y-4")}
						>
							<motion.div
								variants={motionVariants}
								layout
								className="space-y-2"
							>
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<Calendar1 size={18} />
									<span>Date of birth:</span>
								</p>
								<p className="font-mono">
									{moment(patient.DOB).format("Do-MM-YYYY")}
								</p>
								<Separator />
							</motion.div>
							<motion.div
								variants={motionVariants}
								layout
								className="space-y-2"
							>
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<ArrowUpRightFromCircleIcon size={18} />
									<span>Gender:</span>
								</p>
								<p className="font-mono">{patient.gender}</p>
								<Separator />
							</motion.div>
							<motion.div
								variants={motionVariants}
								layout
								className="space-y-2"
							>
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<Languages size={18} />
									<span>Languages:</span>
								</p>
								<p className="font-mono">{patient.languages?.join(", ")}</p>
								<Separator />
							</motion.div>
							<motion.div
								variants={motionVariants}
								layout
								className="space-y-2"
							>
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<Users size={18} />
									<span>Marital Status:</span>
								</p>
								<p className="font-mono">{patient.maritalStatus}</p>
								<Separator />
							</motion.div>
							<motion.div
								variants={motionVariants}
								layout
								className="space-y-2"
							>
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<HandCoins size={18} />
									<span>Occupation:</span>
								</p>
								<p className="font-mono capitalize">{patient.occupation}</p>
								<Separator />
							</motion.div>
							<motion.div
								variants={motionVariants}
								layout
								className="space-y-2"
							>
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<Globe2 size={18} />
									<span>Race:</span>
								</p>
								<p className="font-mono">{patient.race}</p>
								<Separator />
							</motion.div>

							{/* Contacts */}
							<motion.section
								variants={motionVariants}
								transition={{ delayChildren: stagger(0.3) }}
								layout
								className="space-y-2"
							>
								<motion.div variants={motionVariants} layout>
									<Heading className="font-medium text-primary text-lg">
										<PhoneCall />
										<span>Emergency contacts:</span>
									</Heading>
								</motion.div>

								{emergencyContacts.map((c) => (
									<motion.div
										key={c.id}
										variants={motionVariants}
										layout
										className="space-y-3 relative"
									>
										<div className="flex item-center gap-x-1">
											<Heading className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
												<User size={18} />
												<span>{c.name}</span>
											</Heading>
											~
											<Badge variant={"primary-luminous"}>
												{c.relationship}
											</Badge>
										</div>

										<CopyBadge
											variant="secondary"
											className="textprimary font-mono text-base"
											content={c.phone}
										/>
										<Separator />

										<Badge variant="outline" className="absolute top-1 right-1">
											Priority - {c.priority}
										</Badge>

										<CallBtn
											contact={c.phone}
											className="absolute bottom-1 right-1"
										/>
									</motion.div>
								))}
							</motion.section>
						</motion.div>
					</ScrollArea>
				</div>
			</DynamicPanelContent>
		</DynamicPanel>
	);
}

PatientProfilePanel.InfoAside = ({
	patient,
	className,
}: {
	patient: IPatient;
	className?: string;
}) => {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<div className={cn("relative bg-secondary glass-shadow p2", className)}>
			<section>
				<PatientCard.MD patient={patient} className="shadow-none border-0" />
			</section>
		</div>
	);
};
