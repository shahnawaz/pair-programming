import {DataStore} from "./data-store";
import {ProspectiveUser} from "../types";
import {UsersService} from "./users-service";

export class DirectoryService {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    // Time Complexity: O(M + N)
    syncContacts(userId: string, newDirectory: string[]) {
        // Thinking: Business Logic
        // get directory[] using userId
        //    update userId with directory[] inside Directory
        //    compare newNumbers and oldNumbers
        // loop each existingDirectory
        //    subtract occurrence or remove (if 0) from NumberOccurrences
        // loop each newDirectory
        //    add as phoneNumber, occurrence++ inside NumberOccurrences

        const existingDirectory = DataStore.getDirectoryOfAUser(userId); // O(1)
        DataStore.updateDirectoryOfAUser(userId, newDirectory); // O(1)

        if (existingDirectory && existingDirectory.length) { // O(M)
            for (let pNumber of existingDirectory) {
                this.decrementOccurrence(pNumber);
            }
        }

        for (let pNumber of newDirectory) { // O(N)
            this.incrementOccurrence(pNumber);
        }
    }

    private incrementOccurrence(pNumber: string) {
        const currentCount = DataStore.getNumberOccurrences(pNumber);
        DataStore.updateNumberOccurrences(pNumber, (currentCount || 0) + 1);
    }

    // Decrement (or remove) occurrence
    private decrementOccurrence(pNumber: string) {
        const currentCount = DataStore.getNumberOccurrences(pNumber);
        if (currentCount) {
            DataStore.updateNumberOccurrences(pNumber, currentCount - 1);
        }
    }

    // Time Complexity: O(N)
    prospectiveUsers(userId: string): ProspectiveUser[] {
        // Thinking: Business Logic
        // get directory[] of the userId from Directory
        //     loop each number and identify numbersNOTonZiina
        // for each number which is not a Ziina customer numbersNOTonZiina
        // -> count the number of occurrences they have on Ziina

        const userDirectory = DataStore.getDirectoryOfAUser(userId); // O(1)

        if (!userDirectory || userDirectory.length === 0) {
            return [];
        }

        const prospectiveNumbers: string[] = [];
        const prospectiveUsers: ProspectiveUser[] = [];

        for (let pNumber of userDirectory) { // O(N)
            const isZiinaUser = this.usersService.isZiinaUser(pNumber); // O(1)
            if (!isZiinaUser) {
                prospectiveNumbers.push(pNumber);
            }
        }

        for (let pNumber of prospectiveNumbers) { // O(N)
            const occurrences = DataStore.getNumberOccurrences(pNumber); // O(1)
            prospectiveUsers.push({
                phoneNumber: pNumber,
                friendsOnZiina: occurrences
            })
        }

        return prospectiveUsers;
    }
}