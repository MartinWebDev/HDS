export interface IReview {
    CustomerName: string;
    CommentDate: string;
    CommentDateText: string;
    Content: string;
    Rating: number;
    PicIds: string;
    ImgUrls: string;
    HeadImg: string;

    GetDateFromString(): Date; // Convert 2017-05-24T08:40:32.053 to JS Date object
}

export class Review implements IReview {
    CustomerName: string;
    CommentDate: string;
    CommentDateText: string;
    Content: string;
    Rating: number;
    PicIds: string;
    ImgUrls: string;
    HeadImg: string;

    GetDateFromString(): Date {
        return null; // TODO: Implement this logic later. Less important for now. Might be needed when comparing dates
    }
}