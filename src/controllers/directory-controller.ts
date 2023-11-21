import {DirectoryService} from "../services/directory-service";
import {ProspectiveUser} from "../types";

export class DirectoryController {
    private directoryService: DirectoryService;

    constructor() {
        this.directoryService = new DirectoryService();
    }

    syncContacts(userId: string, newDirectory: string[]) {
        this.directoryService.syncContacts(userId, newDirectory);
        return true;
    }

    prospectiveUsers(userId: string) {
        const propUsers: ProspectiveUser[] = this.directoryService.prospectiveUsers(userId);
        return propUsers;
    }
}