import { IServiceCall, ServiceCall } from './ServiceCall';
import { IProduct, Product } from './ClientData/Product';
import { IHotProductSummary, HotProductSummary } from './ClientData/HotProductSummary';
import { IFashionProductSummary, FashionProductSummary } from './ClientData/FashionProductSummary';
import { IReview, Review } from './ClientData/Review';
import { IProductAttributeMappings } from './ClientData/ProductAttributeMappings';

import { ServiceConfig } from './Config/ServiceConfig';

export interface IProductService {
    GetProducts(): Promise<IProduct[]>;
    GetHotProducts(): Promise<IHotProductSummary[]>;
    GetFashionProducts(): Promise<IFashionProductSummary[]>;
    GetProductDetails(productId: number, customerId: number): Promise<IProduct>;
    GetProductAttributes(productId: number): Promise<IProductAttributeMappings[]>;
    GetProductReviews(productId: number, rating: number, pageIndex: number, pageSize: number): Promise<IReview[]>;
}

export class ProductService implements IProductService {
    async GetProducts(): Promise<IProduct[]> {
        let service: IServiceCall = new ServiceCall();

        let result = await service.WithUri("http://www.zrytech.com/NopShop/api/Products/GetProducts")
            .WithMethod("POST")
            .WithBody({
                orderBy: 1,
                pageIndex: 1,
                pageSize: 10
            })
            .Fetch();

        let resultJson = await result.json();

        // TODO: Change this, this doesn't need to return a compiled object
        return resultJson.data.map((product: any) => {
            let p: IProduct = new Product();

            p.Banners = product.Banners;

            return p;
        });
    }

    async GetHotProducts(): Promise<IHotProductSummary[]> {
        try {
            let service: IServiceCall = new ServiceCall();

            let result = await service.WithUri(ServiceConfig.GetHotProductList)
                .WithMethod("POST")
                .Fetch();

            let resultJson = await result.json();

            return resultJson.data;
        }
        catch (ex) {
            throw ex;
        }
    }

    async GetFashionProducts(): Promise<IFashionProductSummary[]> {
        try {
            let service: IServiceCall = new ServiceCall();

            let result = await service.WithUri(ServiceConfig.GetFashionProductsList)
                .WithMethod("POST")
                .Fetch();

            let resultJson = await result.json();

            return resultJson.data;
        }
        catch (ex) {
            throw ex;
        }
    }

    async GetProductDetails(productId: number, customerId: number): Promise<IProduct> {
        let service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.GetProductDetails)
            .WithMethod("POST")
            .WithBody({
                Id: productId,
                CustomerId: customerId
            })
            .Fetch();

        let resultJson = await result.json();

        return resultJson.data;
    }

    async GetProductAttributes(productId: number): Promise<IProductAttributeMappings[]> {
        let service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.GetAttributeAndValues)
            .WithMethod("POST")
            .WithBody({
                Id: productId
            })
            .Fetch();

        let resultJson = await result.json();

        return resultJson.data;
    }

    async GetProductReviews(productId: number, rating: number, pageIndex: number, pageSize: number): Promise<IReview[]> {
        let service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.GetProductReviews)
            .WithMethod("POST")
            .WithBody({
                ProductId: productId,
                Rating: rating,
                pageIndex: pageIndex,
                pageSize: pageSize
            })
            .Fetch();

        let resultJson = await result.json();

        return resultJson.data;
    }
}
