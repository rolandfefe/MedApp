import DiagnosisForm from "@/components/forms/DiagnosisForm";
import DiagnosisSection from "@/components/Sections/DiagnosisSection";
import { getDiagnosis } from "@/lib/actions/diagnosis.actions";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";

export default async function page({
	params,
}: {
	params: Promise<{ appointmentId: string }>;
}) {
	const { appointmentId } = await params;

	const [currentDoctor, diagnosis] = await Promise.all([
		getCurrentDoctor(),
		getDiagnosis({ appointment: appointmentId }),
	]);

	console.log("Diagnosis:", diagnosis);

	return (
		<div className="mt-10">
			{diagnosis ? (
				<DiagnosisSection diagnosis={diagnosis} />
			) : (
				<DiagnosisForm action="Create" />
			)}

			{/* <ConsultationGuideBtn  /> */}
			{/* <LinkBtn link={{ href: `/consultation/${appointmentId}/verdict` }}>
				Verdict <ArrowRightCircle />
			</LinkBtn> */}
		</div>
	);
}
