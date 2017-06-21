import {
    IAccountSummaryDetails,
    IAccountNotifications
} from './AccountInterfaces';

export const AccountSummaryDetailsData: IAccountSummaryDetails = {
    ProfilePictureUri: "http://www.zrytech.com/nopshop/content/images/thumbs/0000216_IMG_0039.JPG_100.jpeg",
    ProfileName: "Insert name here",
    ProfileBio: "静夜思床前明月光，疑是地上霜。举头望明月，低头思故乡。  什么鬼"
};

export const AccountNotifications: IAccountNotifications = {
    Payments: 3,
    Deliveries: 2,
    Reviews: 0,
    Returns: 0,
    All: 5
};