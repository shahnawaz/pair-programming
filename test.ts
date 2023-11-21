// phone number with country code (but cAN BE anything)
// friendsOnZiina will be >= 1
// That means if I add or remove a contact from my phone, that new list should be synced as soon as I open the app.
// isZiinaUser(string: phoneNumber): boolean


/**
 * Data Store
 */

type DataStoreEntry = Record<string, string[]>;

// TODO: Make it more advance with getter and setter
const dataStore: DataStoreEntry = {
    '1': ['123', '432']
};


/**
 * Typing
 */

type ProspectiveUser = {
    phoneNumber: string,
    friendsOnZiina: number
}


/**
 * Mobile API
 */

class ZiinaUserAPIs {
    // TODO: promisify
    syncContacts(userId: string, phoneNumbers: string[]) {
        // refresh the list everytime
        dataStore[userId] = phoneNumbers;
    }

    // prospectiveUsers will return a list of ProspectiveUser entities which consist of phone numbers in your contact list that are not on Ziina.
    async prospectiveUsers(userId: string): Promise<ProspectiveUser[]> {
        // check if userId is available in DS or not
        if (!dataStore[userId]) {
            return [];
        }

        // get the phoneNumbers against the userId
        const phoneNumbers = dataStore[userId];
        const notOnZinnaNumbers: string[] = await this.prospectiveNumbers(phoneNumbers);

        console.log('notOnZinnaNumbers: ', notOnZinnaNumbers);

        const prospectiveUsers: ProspectiveUser[] = [];
        // loop from 0 to phoneNumbers.length
        for (let pN of notOnZinnaNumbers) {
            prospectiveUsers.push({
                phoneNumber: pN,
                friendsOnZiina: this.getFriendsCountOnZiina(pN)
            })
        }

        return Promise.resolve(prospectiveUsers);
    }

    isZiinaUser(pN: string): Promise<boolean> {
        return Promise.resolve(['123'].includes(pN));
    }

    private prospectiveNumbers(phoneNumbers: string[]): Promise<string[]> {
        const notOnZinnaNumbers: string[] = [];
        // only work with phoneNumbers which are NOT on Ziina
        // loop through the list and call the endpoint against each number - if true use that

        phoneNumbers.forEach(async (pN) => {
            const isZiinaU =  await this.isZiinaUser(pN);
            if (!isZiinaU) {
                notOnZinnaNumbers.push(pN);
            }
        });

        return Promise.resolve(notOnZinnaNumbers);
    }

    getFriendsCountOnZiina(phoneNumber: string): number {
        // - Brute force: merge all phoneNumbers and count occurrence

        // Combine all phoneNumbers
        const pNList = Object.values(dataStore).reduce((pV, cV) => {
            pV.push(...cV);
            return pV;
        }, []);

        // Count the occurrence of given number
        return pNList.filter(pN => pN === phoneNumber).length;
    }
}


(async function () {
    const userController = new ZiinaUserAPIs();

    // syncContacts
    userController.syncContacts('1', ['123', '345']);
    console.log(dataStore);

    userController.syncContacts('2', ['345', '567']);
    console.log(dataStore);

    // prospectiveUsers
    const prosUsers = await userController.prospectiveUsers('2');

    console.log(prosUsers);
})();
