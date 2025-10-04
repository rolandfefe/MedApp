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
	id: string;
	medicationName: string;
	dosage: string;
	frequency: string;
	duration: string;
	instructions: string;
	refills: number;
	isSubstitutionAllowed: boolean;
	prescribedAt: string;
}
