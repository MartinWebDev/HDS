export interface IMainPromotionItem {
    ImgUri: string;
    LinkUri: string;
    LinkText: string;
}

export interface ICategoryPromotionArea {
    Columns: ICategoryPromotionAreaColumn[];
}

export interface ICategoryPromotionAreaColumn {
    Rows: ICategoryPromotionAreaRow[];
}

export interface ICategoryPromotionAreaRow {
    Id: number;
    ImgUri: string;
    LinkUri: string;
}

export interface INearbyStore {
    Id: number;
    ImgUrl: string;
    StoreDetailsLeft: string;
    StoreDetailsRight: string;
    StoreDetailsArea: string;
    Popularity: number;
    Comments: number;
    Address: string;
}