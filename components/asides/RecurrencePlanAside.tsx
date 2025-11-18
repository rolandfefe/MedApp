"use client";

import { useConsultation } from "@/contexts/consultation.context";
import RecurrenceForm from "../forms/RecurrenceForm";

export default function RecurrencePlanAside() {
	const { recurrencePlan } = useConsultation();

	if (!recurrencePlan) return <RecurrenceForm />;

	return <div>RecurrencePlanAside</div>;
}
