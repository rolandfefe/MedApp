import Heading from "@/components/custom/Heading";
import MyBtn from "@/components/custom/MyBtn";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PatientFormData } from "@/lib/formSchemas/patient.schema";
import { clsx, type ClassValue } from "clsx";
import { X } from "lucide-react";
import { FieldErrors } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
