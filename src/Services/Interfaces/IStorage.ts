// TODO: Can't remember how to make this work
export interface IStorage {
    saveValueWithKey(key: string, value: any): void;
    getValueByKey(key: string): any;

    saveValueWithKeyAsync(key: string, value: any): Promise<void>;
    getValueByKeyAsync(key: string): Promise<any>;
}