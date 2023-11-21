import {DataStore} from "./data-store";

export class UsersService {
    // Time Complexity: O(1)
    isZiinaUser(userId: string) {
        const userDetails = DataStore.getUserDetails(userId); // O(1)

        return !!userDetails;
    }
}