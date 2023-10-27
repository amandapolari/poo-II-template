import { TUserDB } from '../types';
import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = 'users';

    public async findUsers(q: string | undefined) {
        let usersDB;

        if (q) {
            const result: TUserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            ).where('name', 'LIKE', `%${q}%`);

            usersDB = result;
        } else {
            const result: TUserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            );

            usersDB = result;
        }

        return usersDB;
    }

    public async findUserById(id: string): Promise<TUserDB> {
        const [userDB]: TUserDB[] = await BaseDatabase.connection(
            UserDatabase.TABLE_USERS
        ).where({ id });

        return userDB;
    }

    public async insertUser(newUserDB: TUserDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(
            newUserDB
        );
    }
}
