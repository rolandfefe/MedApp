import { ePaymentMethods, ePaymentStatus } from "./enums/currencies.enum";

export interface IPaymentInfo {
	amount: number;
	currency: eCurrencies;
	status: ePaymentStatus;
	paymentMethod: ePaymentMethods;
	insuranceClaimId?: string;
	receiptUrl?: string;
	paidAt: Date;
}

interface IPrescription {
	medicationName: string;
	dosage: string;
	frequency: string;
	duration: string;
	instructions: string;
	refills: number;
	isSubstitutionAllowed: boolean;
	prescribedAt: string;
}

export interface IReferral {
	from: string | IDoctor;
	to: string | IDoctor;
	reason: string;
}
