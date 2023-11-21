import {getMockData} from "../mock/mock";

type UsersEntry = Record<string, {}>;
// e.g: { 2: { id: "2", ... }, 3: { id: "3", ... } }

type DirectoryEntry = Record<string, string[]>;
// e.g: { [userId]: phoneNumbers[] }

type NumberOccurrencesEntry = Record<string, number>;
// e.g: { [phoneNumber]: occurrences }

let users: UsersEntry = {};
let directory: DirectoryEntry = {};
let numberOccurrences: NumberOccurrencesEntry = {};

/**
 * Data Store Facade
 */
export class DataStore {
    static resetDataStore() {
        users = {};
        directory = {};
        numberOccurrences = {};
    }

    static loadMockData() {
        const mockData = getMockData();
        users = mockData.users;
        directory = mockData.directory;
        numberOccurrences = mockData.numberOccurrences;
    }

    static getAllUsers() {
        return users;
    }

    static getUserDetails(userId: string) {
        return users[userId];
    }

    static getAllDirectories() {
        return directory;
    }

    static getDirectoryOfAUser(userId: string) {
        return directory[userId];
    }

    static updateDirectoryOfAUser(userId: string, contacts: string[]) {
        directory[userId] = contacts;
    }

    static getAllNumberOccurrences() {
        return numberOccurrences;
    }

    static getNumberOccurrences(number: string) {
        return numberOccurrences[number];
    }

    static updateNumberOccurrences(number: string, counter: number) {
        if (counter === 0 && numberOccurrences[number]) {
            delete numberOccurrences[number];
        }
        numberOccurrences[number] = counter;
    }
}