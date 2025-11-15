"use client";

import { useConsultation } from "@/contexts/consultation.context";
import VerdictForm from "../forms/VerdictForm";

export default function VerdictSection() {
	const { appointment, verdict } = useConsultation();

	if (!verdict) return <VerdictForm />;

	return <div>VerdictSection</div>;
}
