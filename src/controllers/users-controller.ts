import {UsersService} from "../services/users-service";

export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    isZiinaUser(userId: string) {
        return this.usersService.isZiinaUser(userId);
    }
}