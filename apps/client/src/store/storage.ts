import storageSession from "redux-persist/lib/storage/session";
import pp from "redux-persist/lib/storage";

const createNoopStorage = () => ({
	getItem(_key: string) {
		return Promise.resolve(null);
	},
	setItem(_key: string, value: string) {
		return Promise.resolve(value);
	},
	removeItem(_key: string) {
		return Promise.resolve();
	},
});

const storage =
	typeof window !== "undefined"
		? storageSession
		: createNoopStorage();

export default storage;
