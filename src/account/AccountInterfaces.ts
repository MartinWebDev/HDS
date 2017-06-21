export interface IAccountSummaryDetails {
    ProfilePictureUri: string;
    ProfileName: string;
    ProfileBio: string;
}

export interface IAccountNotifications {
    Payments: number;
    Deliveries: number;
    Reviews: number;
    Returns: number;
    All: number;
}