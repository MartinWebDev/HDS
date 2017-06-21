import { IServiceCall, ServiceCall } from './ServiceCall';
import { ICategory, Category } from './ClientData/Category';
import { ICategoryTwoList, CategoryTwoList } from './ClientData/categoryList/CategoryTwolist';

import { ServiceConfig } from './Config/ServiceConfig';

export interface ICategoryService {
    GetCategories(): Promise<ICategory[]>;
    GetCategoriesByParentId(catId?: number): Promise<ICategoryTwoList[]>;   // This was the problem. The interface didn't
                                                                            // have the parameter. I was surprised that 
                                                                            // TypeScript didn't tell us that :)
}

export class CategoryService implements ICategoryService {
    async GetCategories (): Promise<ICategory[]> {
        try {
            let service: IServiceCall = new ServiceCall();

            let result = await service.WithUri(ServiceConfig.GetCategoryList)
            .WithMethod("GET")
            .Fetch();

            let resultJson = await result.json();

            return resultJson.data;
        }
        catch (ex) {
            throw ex;
        }
    }
    //for categorytwo
     async GetCategoriesByParentId (catId?: number): Promise<ICategoryTwoList[]> {
        try {
            if(typeof catId=="undefined"){
                catId=0;
            }
            let service: IServiceCall = new ServiceCall();

            let result = await service.WithUri(ServiceConfig.GetCategoryTwoListDetail)
            .WithMethod("POST")
            .WithBody({
                Category:catId, 
                pageIndex: 1, 
                pageSize: 10
             })
            .Fetch();

            let resultJson = await result.json();

            return resultJson.data;
        }
        catch (ex) {
            throw ex;
        }
    }
}
