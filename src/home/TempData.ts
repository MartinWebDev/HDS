import {
    IMainPromotionItem, 
    ICategoryPromotionArea, 
    INearbyStore
} from './HomeInterfaces';

import { IBannerImage } from '../GlobalComponents/GlobalInterfaces';

export const BannerImages: IBannerImage[] = [
    {
        Id: 1, 
        ImgUri: "http://www.zrytech.com/nopshop/File/Banners/1_20170511202712.jpg", 
        LinkUri: ""
    }, 
    {
        Id: 2, 
        ImgUri: "http://www.zrytech.com/nopshop/File/Banners/1_20170511202732.jpg", 
        LinkUri: ""
    }, 
    {
        Id: 3, 
        ImgUri: "http://www.zrytech.com/nopshop/File/Banners/1_20170511202753.jpg", 
        LinkUri: ""
    }
];

export const MainPromotionItem: IMainPromotionItem = {
    ImgUri: "http://www.zrytech.com/nopshop/content/images/thumbs/0000812_IMG_0317.JPG.jpeg", 
    LinkUri: "", 
    LinkText: "点击查看"
};

export const CategoryPromotionItems: ICategoryPromotionArea = {
    Columns: [
        {
            Rows: [
                {
                    Id: 1, 
                    ImgUri: "http://www.zrytech.com/NopShop/Mobile/Content/imgs/kou7hong.png", 
                    LinkUri: ""
                }
            ]
        }, 
        {
            Rows: [
                {
                    Id: 2, 
                    ImgUri: "http://www.zrytech.com/NopShop/Mobile/Content/imgs/hor-img.png", 
                    LinkUri: ""
                }, 
                {
                    Id: 3, 
                    ImgUri: "http://www.zrytech.com/NopShop/Mobile/Content/imgs/fengge.png", 
                    LinkUri: ""
                }
            ]
        }
    ]
};

export const NearbyStoreList: INearbyStore[] = [
    {
        Id: 1, 
        ImgUrl: "http://www.zrytech.com/nopshop/content/images/thumbs/0000856.jpeg", 
        StoreDetailsLeft: "理发店", 
        StoreDetailsRight: "洗发，修剪", 
        StoreDetailsArea: "(洪山区)", 
        Popularity: 9, 
        Comments: 16, 
        Address: "光谷大道"
    }, 
    {
        Id: 2, 
        ImgUrl: "http://www.zrytech.com/nopshop/content/images/thumbs/0000861.jpeg", 
        StoreDetailsLeft: "新店铺4", 
        StoreDetailsRight: "剪发", 
        StoreDetailsArea: "(洪山区)", 
        Popularity: 12, 
        Comments: 7, 
        Address: "农轩路"
    }
];