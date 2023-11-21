import {UsersController} from "./controllers/users-controller";
import {DirectoryController} from "./controllers/directory-controller";
import {DataStore} from "./services/data-store";
import {getMockData} from "./mock/mock";

class TestApp {
    static userController: UsersController = new UsersController();
    static directoryController: DirectoryController = new DirectoryController();

    /**
     * Test 1
     */
    static verifyIsZiinaUserAPI() {
        DataStore.resetDataStore();
        DataStore.loadMockData();
        const testCase = {
            input: "1",
            output: true
        }

        return TestApp.userController.isZiinaUser(testCase.input) === testCase.output;
    }

    /**
     * Test 2
     */
    static verifySyncContactAPI() {
        DataStore.resetDataStore();
        const mockData = getMockData();

        const testCase = {
            input: {
                userId: "1",
                // @ts-ignore
                directory: mockData.directory[mockData.users["1"].id]
            },
            output: {
                userId: "1",
                // @ts-ignore
                directory: mockData.directory[mockData.users["1"].id]
            }
        }

        TestApp.directoryController.syncContacts(testCase.input.userId, testCase.input.directory);

        console.log("Data Store -> Directory:" , DataStore.getAllDirectories());

        const result = DataStore.getDirectoryOfAUser(testCase.output.userId).join('');
        const expected = testCase.output.directory.join('');

        return result === expected;
    }

    /**
     * Test 3 (including subtests)
     */
    static verifyProspectiveUsersAPI() {
        DataStore.loadMockData();

        const testCases = [
            {
                input: "1",
                output: [
                    { phoneNumber: '123', friendsOnZiina: 1 },
                    { phoneNumber: '234', friendsOnZiina: 2 }
                ]
            },
            {
                input: "2",
                output: []
            },
            {
                input: "3",
                output: []
            },
            {
                input: "4",
                output: [
                    { phoneNumber: '234', friendsOnZiina: 2 },
                    { phoneNumber: '345', friendsOnZiina: 1 }
                ]
            }
        ]

        console.log("Data Store -> Directory:" , DataStore.getAllDirectories());
        console.log("Data Store -> NumberOccurrences:" , DataStore.getAllNumberOccurrences());

        return testCases.every(testCase => {
            const result = JSON.stringify(TestApp.directoryController.prospectiveUsers(testCase.input));
            const expected = JSON.stringify(testCase.output);

            return result === expected;
        });
    }

    /**
     * Test 4 (including subtests)
     */
    static verifyNumberOccurrences() {
        DataStore.resetDataStore();
        console.log("Data Store -> Directory:" , DataStore.getAllDirectories());
        console.log("Data Store -> NumberOccurrences:" , DataStore.getAllNumberOccurrences());

        // add new directories of users having 50, 60 and 70 as userId
        this.directoryController.syncContacts("50", ["501", "502", "503"]);
        this.directoryController.syncContacts("60", ["501", "602", "603"]);
        this.directoryController.syncContacts("70", ["501", "701", "702", "603"]);
        // refresh userId 50's directory
        this.directoryController.syncContacts("50", ["502", "503"]);

        console.log("Data Store -> Directory:" , DataStore.getAllDirectories());
        console.log("Data Store -> NumberOccurrences:" , DataStore.getAllNumberOccurrences());

        return (
            DataStore.getNumberOccurrences("501") === 2 &&
            DataStore.getNumberOccurrences("502") === 1 &&
            DataStore.getNumberOccurrences("503") === 1 &&
            DataStore.getNumberOccurrences("602") === 1 &&
            DataStore.getNumberOccurrences("603") === 2 &&
            DataStore.getNumberOccurrences("701") === 1 &&
            DataStore.getNumberOccurrences("702") === 1
        );
    }
}

console.group("verifyIsZiinaUserAPI");
console.log(TestApp.verifyIsZiinaUserAPI() ? "Passed" : "Failed");
console.groupEnd();

console.group("verifySyncContactAPI");
console.log(TestApp.verifySyncContactAPI() ? "Passed" : "Failed");
console.groupEnd();

console.group("verifyProspectiveUsersAPI");
console.log(TestApp.verifyProspectiveUsersAPI() ? "Passed" : "Failed");
console.groupEnd();

console.group("verifyNumberOccurrences");
console.log(TestApp.verifyNumberOccurrences() ? "Passed" : "Failed");
console.groupEnd();