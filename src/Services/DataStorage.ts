import { AsyncStorage } from 'react-native';

export class ValueStorage {
    async setValue(key: string, value: string): Promise<void> {
        try {
            return await AsyncStorage.setItem(key, value);
        }
        catch (err) {
            throw err;
        }
    }

    async getValue(key: string): Promise<string> {
        let value = await AsyncStorage.getItem(key);

        return value;
    }
}
