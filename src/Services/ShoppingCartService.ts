import { IServiceCall, ServiceCall } from './ServiceCall';

import { ServiceConfig } from './Config/ServiceConfig';
import { AttributeConversionService } from './AttributeConversionService';

import { ISelectedProductAttributes } from './Interfaces/ISelectedProductAttributes';
import { IProductAttributeMappings, IProductAttributeMappingsValue } from './ClientData/ProductAttributeMappings';
import { IShoppingCartVendor, IShoppingCartItem } from './ClientData/ShoppingCart';

export interface IShoppingCartService {
    AddProductToCart(pId: number, cId: number, qty: number, activeAttr: ISelectedProductAttributes[], pAttr: IProductAttributeMappings[], buy: boolean): Promise<boolean>;
    GetShoppingCartItems(cId: number): Promise<IShoppingCartVendor[]>;
}

export class ShoppingCartService implements IShoppingCartService {
    async AddProductToCart(pId: number, cId: number, qty: number, activeAttr: ISelectedProductAttributes[], pAttr: IProductAttributeMappings[], buy: boolean): Promise<boolean> {
        let attr: string;

        // Convert selected attributes list to what the server expects.
        if (activeAttr.length > 0) {
            attr = AttributeConversionService.ConvertFromObjectToString(activeAttr, pAttr);
        }
        else {
            attr = null;
        }

        var service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.AddProductToCart)
            .WithMethod("POST")
            .WithBody({
                ProductId: pId,
                customerId: cId,
                Qty: qty,
                AttributesXml: attr,
                IsBuy: buy
            })
            .Fetch();

        if (result.ok) {
            return true;
        }
        else {
            return false;
        }
    }

    async GetShoppingCartItems(cId: number): Promise<IShoppingCartVendor[]> {
        var service: IServiceCall = new ServiceCall();

        let result = await service.WithUri(ServiceConfig.GetShoppingCartItems)
            .WithMethod("POST")
            .WithBody({
                CustomerId: cId,
                UserId: cId
            })
            .Fetch();

        let resultJson = await result.json();

        return resultJson.data;
    }
}
