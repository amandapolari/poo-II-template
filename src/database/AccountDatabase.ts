import { TAccountDB } from '../types';
import { BaseDatabase } from './BaseDatabase';

export class AccountDatabase extends BaseDatabase {
    public static TABLE_ACCOUNTS = 'accounts';

    public async findAccounts(q: string | undefined) {
        let accountsDB;

        if (q) {
            const result: TAccountDB[] = await BaseDatabase.connection(
                AccountDatabase.TABLE_ACCOUNTS
            ).where('name', 'LIKE', `%${q}%`);

            accountsDB = result;
        } else {
            const result: TAccountDB[] = await BaseDatabase.connection(
                AccountDatabase.TABLE_ACCOUNTS
            );

            accountsDB = result;
        }

        return accountsDB;
    }

    public async findAccountById(id: string): Promise<TAccountDB> {
        const [accountDB]: TAccountDB[] = await BaseDatabase.connection(
            AccountDatabase.TABLE_ACCOUNTS
        ).where({ id });

        return accountDB;
    }

    public async insertAccount(newAccountDB: TAccountDB): Promise<void> {
        await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).insert(
            newAccountDB
        );
    }

    public async updateBalance(id: string, value: number): Promise<void> {
        await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS)
            .update({ balance: value })
            .where({ id });
    }
}
