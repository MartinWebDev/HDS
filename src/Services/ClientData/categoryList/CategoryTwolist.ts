//定义接口
export interface ICategoryTwoList {
    Id: number;
    Name: string;
    PriceText: string;
    ImgUrl: string;
    m_SalesCount: string;
}
//接口的类
export class CategoryTwoList implements ICategoryTwoList {
    Id: number;
    Name: string;
    PriceText: string;
    ImgUrl: string;
    m_SalesCount: string;
}