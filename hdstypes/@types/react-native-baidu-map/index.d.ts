// China Software Cloud - Custom typescript definition file for react-native-baidu-map

declare module "react-native-baidu-map" {
    interface CurrentPositionData {
        buildingName: string;
        street: string;
        district: string;
        city: string;
        latitude: number;
        longitude: number;
        altitude: number;
        buildingId: number;
        radius: number;
        province: string;
        direction: number;
        address: string;
        countryCode: string;
        streetNumber: string;
        country: string;
        cityCode: string;
    }

    class Geolocation {
        static getCurrentPosition(): Promise<CurrentPositionData>;
    }
}