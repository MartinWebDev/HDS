export interface ICategory {
    Id: number;
    Name: string;
    Description: string;
    ImgUrl: string;
}

export class Category implements ICategory {
    Id: number;
    Name: string;
    Description: string;
    ImgUrl: string;
}