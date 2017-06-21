import { IProductAttributeMappings } from './ProductAttributeMappings';
import { IProductSpecificationAttributes } from './ProductSpecificationAttributes';
import { IProductBanner } from './ProductBanner';

export interface IProduct {
    Name: string;
    ShortDescription: string;
    FullDescription: string;
    Deleted: boolean;
    Price: number;
    PictureId: number;
    ImgUrl: string;
    PriceText: string;
    Banners: IProductBanner[];
    OtherHelp: any;
    ProductAttributeMappings: IProductAttributeMappings[];
    ProductSpecificationAttributes: IProductSpecificationAttributes[];
    Tags: string;
    VenderId: number;
    m_SalesCount: number;
    Favtimes: number;
    IsCollect: boolean;
    Id: number;

    CollectCount: number;
    StoreProductCount: number;
    ProductCountInCar: number;
    OldPrice: number;
    OldPriceText: string;

    DescriptionImgs: string[];
}

export class Product implements IProduct {
    Name: string;
    ShortDescription: string;
    FullDescription: string;
    Deleted: boolean;
    Price: number;
    PictureId: number;
    ImgUrl: string;
    PriceText: string;
    Banners: IProductBanner[];
    OtherHelp: any;
    ProductAttributeMappings: IProductAttributeMappings[];
    ProductSpecificationAttributes: IProductSpecificationAttributes[];
    Tags: string;
    VenderId: number;
    m_SalesCount: number;
    Favtimes: number;
    IsCollect: boolean;
    Id: number;

    CollectCount: number;
    StoreProductCount: number;
    ProductCountInCar: number;
    OldPrice: number;
    OldPriceText: string;

    DescriptionImgs: string[];
}
