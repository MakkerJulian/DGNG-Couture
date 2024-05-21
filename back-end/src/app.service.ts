import { Injectable } from '@nestjs/common';
import { AccountService } from './api/account/services/account/account.service';

@Injectable()
export class AppService {
    constructor(
        private readonly accountServie: AccountService,
    ) {
        this.seedDatabase();
    }

    async seedDatabase() {
        if ((await this.accountServie.getAccounts()).length === 0) {
            await this.accountServie.seedAccounts();
            console.log('Seeded accounts');
        }
    }
}
