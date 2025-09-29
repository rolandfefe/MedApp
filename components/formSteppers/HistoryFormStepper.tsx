import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
} from "@/types/enums";
import {
	Building2,
	CreditCard,
	GraduationCap,
	Link2,
	Loader,
	Plus,
	ToolCase,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { JSX } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import MyBtn from "../custom/MyBtn";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import { HistoryFormData } from "@/lib/formSchemas/history.schema";

export default function getHistoryFormStepper(
	form: ReturnType<typeof useForm<HistoryFormData>>,
	submitHandler: (data: HistoryFormData) => Promise<void>,
	errHandler: (err: FieldErrors<HistoryFormData>) => Promise<void>,
	isPending: boolean = false
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [];
}
