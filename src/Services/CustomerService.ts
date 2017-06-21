import { ValueStorage } from './DataStorage';
import { StorageConfig } from './Config/StorageConfig';

export interface ICustomerService {
    GetAuthToken(): Promise<string>;
    SaveAuthToken(token: string): Promise<boolean>;
    GetCustomerId(): Promise<number>;
}

export class CustomerService implements ICustomerService {
    localStorage: ValueStorage;

    constructor() {
        this.localStorage = new ValueStorage();
    }

    async GetAuthToken(): Promise<string> {
        let token: string = await this.localStorage.getValue(StorageConfig.Keys.AuthToken);

        if (token.trim().length == 0) {
            return null;
        }

        return token;
    }

    async SaveAuthToken(token: string): Promise<boolean> {
        return await this.localStorage.setValue(StorageConfig.Keys.AuthToken, token)
            .then(() => { return true; })
            .catch(() => { return false; });
    }

    async GetCustomerId(): Promise<number> {
        let custDetails: string = await this.localStorage.getValue(StorageConfig.Keys.CustomerDetails);

        let custDetailsObj = JSON.parse(custDetails);

        //return custDetailsObj.Id; // TEMP! After we have a save to save the customer details after login, we uncomment this
        // For now, we will just return a fixed value
        return 8;
    }
}
