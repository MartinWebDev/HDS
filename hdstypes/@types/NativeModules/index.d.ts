// This custom definition file allows for extensions which are built into the NativeModules component be available to intellisense
declare module "NativeModules" {
    class RNImageToBase64 {
        static getBase64String(uri: string, callback: (err: any, base64: string) => {}) : void;
    }
}