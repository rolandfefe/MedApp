"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { ArrowRightCircle } from "lucide-react";
import { Editor } from "../blocks/editor-00/editor";
import LinkBtn from "../btns/LinkBtn";
import DoctorCard from "../cards/DoctorCard";
import PatientCard from "../cards/patientCard";
import DiagnosisForm from "../forms/DiagnosisForm";
import { Separator } from "../ui/separator";

export default function DiagnosisSection() {
	const { appointment, diagnosis } = useConsultation();
	// console.log("Diagnosis:",diagnosis);

	if (!diagnosis) return <DiagnosisForm />;

	const doctor = appointment.doctor as IDoctor;
	const patient = appointment.patient as IPatient;

	return (
		<div className="space-y-4 mb-5">
			<div className="flex flex-col sm:flex-row items-center-center justify-between">
				<DoctorCard doctor={doctor} className="w-fit" />
				<PatientCard patient={patient} />
			</div>
			<section>
				<p className="tex-lg font-medium">Chief Complaint</p>
				<Editor.Renderer editorSerializedState={diagnosis.chiefComplaint!} />
			</section>

			{diagnosis.notes && (
				<section>
					<p className="tex-lg font-medium">Notes ✍️</p>

					<Editor.Renderer editorSerializedState={diagnosis.notes} />
				</section>
			)}

			<Separator className="my-5" />

			<section>
				<LinkBtn
					link={{ href: `/consultation/${appointment.id}/verdict` }}
					size="lg"
					variant={"primary-outline"}
					className=" w-30 h-14 flex ml-auto	text-lg"
				>
					<p>Verdict</p>
					<ArrowRightCircle size={26} />
				</LinkBtn>
			</section>
		</div>
	);
}
