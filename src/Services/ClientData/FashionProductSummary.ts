export interface IFashionProductSummary {
    Id: number;
    ProductId: number;
    ProductName: string;
    BannerPictureId: number;
    DisplayOrder: number;
    BannerImgUrl: string; 
    BannerUrl: string; 
}

export class FashionProductSummary implements IFashionProductSummary {
    Id: number;
    ProductId: number;
    ProductName: string;
    BannerPictureId: number;
    DisplayOrder: number;
    BannerImgUrl: string; 
    BannerUrl: string; 
}