import { IServiceCall, ServiceCall } from './ServiceCall';

import { ServiceConfig } from './Config/ServiceConfig';

export interface IFavouriteService {
    AddProductToFavourites(customerId: number, productId: number): Promise<Boolean>;
    RemoveProductFromFavourites(customerId: number, productId: number): Promise<Boolean>;
    ToggleFavourite(customerId: number, productId: number, isFavourite: boolean): Promise<Boolean>;
}

export class FavouriteService implements IFavouriteService {
    async AddProductToFavourites(customerId: number, productId: number): Promise<Boolean> {
        let service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.AddProductToFavourites)
            .WithMethod("POST")
            .WithBody({
                ProductId: productId,
                CustomerId: customerId
            })
            .Fetch();

        let resultJson = await result.json();

        return resultJson.suc;
    }

    async RemoveProductFromFavourites(customerId: number, productId: number): Promise<Boolean> {
        let service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.RemoveProductFromFavourites)
            .WithMethod("POST")
            .WithBody({
                ProductId: productId,
                CustomerId: customerId
            })
            .Fetch();

        let resultJson = await result.json();

        return resultJson.suc;
    }

    async ToggleFavourite(customerId: number, productId: number, isFavourite: boolean): Promise<Boolean> {
        if (isFavourite) {
            return this.RemoveProductFromFavourites(customerId, productId);
        }
        else {
            return this.AddProductToFavourites(customerId, productId);
        }
    }
}