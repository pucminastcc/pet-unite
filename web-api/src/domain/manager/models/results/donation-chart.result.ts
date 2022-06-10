export interface DonationChartResult {
    donations: {
        month: string;
        count: number;
    }[];
    adoptions: {
        month: string;
        count: number;
    }[];
}
