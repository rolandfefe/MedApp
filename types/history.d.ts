import { eSeverity, eLifeStyleStatus } from "./enums/enums";

export interface IAllergy {
	substance: string;
	reaction: string;
	severity: eSeverity;
	onsetDate: Date | string;
	lastReactionDate: Date | string;
}

export interface ISocialHistory {
	smoking: {
		status: eLifeStyleStatus;
		years?: number;
		quitDate?: Date | string;
		lastUse?: Date | string;
	};
	alcohol: {
		status: eLifeStyleStatus;
		years?: number;
		quitDate?: Date | string;
		lastUse?: Date | string;
	};
	substanceUse?: {
		substances: string[];
		status: eLifeStyleStatus;
		quitDate?: Date | string;
		lastUse?: Date | string;
	};
}
