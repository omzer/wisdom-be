import { db } from '../index.ts';

export const signupUser = async ({ query }: any) => {
    return db.models.User.create({ name: query.name, password: query.password });
};
