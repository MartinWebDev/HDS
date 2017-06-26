export interface IShoppingCartVendor {
    VendorId: number,
    VendorName: string,
    TotalMoney: number,
    TotalMoneyText: string,
    Qty: number,
    CarItems: IShoppingCartItem[],
    Ids: string
}

export interface IShoppingCartItem {
    VendorId: number,
    Id: number,
    CustomerEnteredPrice: number,
    Amount: string,
    CustomerEnteredPriceText: string,
    Quantity: number,
    ProductId: number,
    CustomerId: number,
    AttributesXml: string,
    AttributesSelected: string,
    VendorName: string,
    PictureId: number,
    ImgUrl: string,
    ProductName: string,
    ShortDescription: string
}
