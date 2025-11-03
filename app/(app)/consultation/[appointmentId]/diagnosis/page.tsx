import ConsultationGuideBtn from "@/components/btns/ConsultationGuideBtn";
import LinkBtn from "@/components/btns/LinkBtn";
import DiagnosisForm from "@/components/forms/DiagnosisForm";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";
import { ArrowRightCircle } from "lucide-react";

export default async function page({
	params,
}: {
	params: Promise<{ appointmentId: string }>;
}) {
	const { appointmentId } = await params;
	const [currentDoctor] = await Promise.all([getCurrentDoctor()]);

	return (
		<div className="mt-10">
			<DiagnosisForm action="Create" />

			<ConsultationGuideBtn  />
			<LinkBtn link={{ href: `/consultation/${appointmentId}/verdict` }}>
				Verdict <ArrowRightCircle />
			</LinkBtn>
		</div>
	);
}
