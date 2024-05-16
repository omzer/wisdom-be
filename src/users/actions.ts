import { db } from '../index.ts';

export const signupUser = async ({ query, jwt }: any) => {
    const user = await db.models.User.create({ username: query.username, password: query.password });
    const token = await jwt.sign({ uid: user.toJSON().id });
    console.log(token);
    return user;
};
