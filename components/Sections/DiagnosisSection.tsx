"use client";

import { ArrowRightCircle } from "lucide-react";
import { Editor } from "../blocks/editor-00/editor";
import DoctorCard from "../cards/DoctorCard";
import PatientCard from "../cards/patientCard";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useConsultation } from "@/contexts/consultation.context";
import LinkBtn from "../btns/LinkBtn";

export default function DiagnosisSection({
	diagnosis,
}: {
	diagnosis: IDiagnosis;
}) {
	// console.log("Diagnosis:",diagnosis);
	const doctor = diagnosis.doctor as IDoctor;
	const patient = diagnosis.appointment.patient as IPatient;

	const { appointment } = useConsultation();
	console.log("patient:", patient);

	return (
		<div className="space-y-4 mb-5">
			<div className="flex flex-col sm:flex-row items-center-center justify-between">
				<DoctorCard.SM doctor={doctor} className="w-fit" />
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
