import { cn } from "@/lib/utils";
import { ArrowRight, ChevronsUpDown } from "lucide-react";
import { ComponentProps } from "react";
import MyBtn from "../custom/MyBtn";
import RecurrencePlanPanel from "../panels/RecurrencePlanPanel";
import { Card, CardContent } from "../ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import AppointmentCard from "./AppointmentCard";
import DoctorCard from "./DoctorCard";
import { ConsultationProvider } from "@/contexts/consultation.context";
import PatientCard from "./patientCard";
import { useCurrent } from "@/contexts/Current.context";

export default function PlanCard({
	plan,
	className,
	...props
}: { plan: IRecurrencePlan } & ComponentProps<typeof Card>) {
	const appointment = plan.appointment as IAppointment;
	const { currentPatient } = useCurrent();

	return (
		<ConsultationProvider
			appointment={plan.appointment as IAppointment}
			recurrencePlan={plan}
			referrals={[]}
		>
			<Card {...props} className={cn("bg-transparent", className)}>
				<CardContent className="space-y-3">
					{currentPatient ? (
						<DoctorCard
							doctor={plan.supervisor as IDoctor}
							className="border-0 bg-card glass-shadow"
						/>
					) : (
						<PatientCard patient={appointment.patient as IPatient} />
					)}

					<Collapsible>
						<section className="flex items-center justify-between gap-x-3">
							<CollapsibleTrigger asChild>
								<MyBtn size={"sm"} variant={"invert"} className="py-0">
									Appointment <ChevronsUpDown />
								</MyBtn>
							</CollapsibleTrigger>

							<RecurrencePlanPanel>
								<MyBtn variant={"secondary"} size="icon" className="">
									<ArrowRight />
								</MyBtn>
							</RecurrencePlanPanel>
						</section>
						<CollapsibleContent className="py-2">
							<AppointmentCard.SM
								appointment={plan.appointment as IAppointment}
								mode="Patient"
								className="border-none glass-shadow"
							/>
						</CollapsibleContent>
					</Collapsible>

					<div className="flex items-center justify-between"></div>
				</CardContent>
			</Card>
		</ConsultationProvider>
	);
}
