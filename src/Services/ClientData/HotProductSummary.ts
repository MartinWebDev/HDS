export interface IHotProductSummary {
    Id: number;
    ProductId: number;
    PictureId: number;
    ImgUrl: string;
    Price: number;
    PriceText: string;
    ProductName: string;
    DisplayOrder: number;
}

export class HotProductSummary implements IHotProductSummary {
    Id: number;
    ProductId: number;
    PictureId: number;
    ImgUrl: string;
    Price: number;
    PriceText: string;
    ProductName: string;
    DisplayOrder: number;
}