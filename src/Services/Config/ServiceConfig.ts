/**
 * Export configuration settings which will be used for all service API calls
 */
export const ServiceConfig = {
    /** Root will be loaded directly into the service call, so only include the last URI part in your services! */
    ApiRoot: "http://www.zrytech.com/NopShop/api/" as string,

    // API for home and main tabs
    GetHotProductList: "PopularKillApi/GetPopularKillProducts" as string,
    GetFashionProductsList: "FashionApi/GetFashionProducts" as string,
    GetCategoryList: "Categories/GetCategories" as string,
    GetCategoryTwoListDetail: "Products/GetProducts" as string,

    // API for product details    
    GetProductDetails: "Products/GetProductById" as string,
    GetProductReviews: "Products/GetProductComments" as string,
    GetAttributeAndValues: "Products/GetAttributeAndValues" as string,

    // API for favourites controller
    AddProductToFavourites: "Products/CollectProduct" as string,
    RemoveProductFromFavourites: "Products/CollectProduct" as string,

    // API for shopping cart services
    AddProductToCart: "ShoppingCartItems/CreateShoppingCartItem" as string,
    GetShoppingCartItems: "ShoppingCartItems/GetShoppingCartItems" as string
}
