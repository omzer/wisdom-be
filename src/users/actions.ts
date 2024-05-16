import { db } from '../index.ts';

export const signupUser = async ({ query, jwt, set }: any) => {
    const [user, created] = await db.models.User.findOrCreate({
        where: { username: query.username },
        defaults: { username: query.username, password: query.password },
    });

    if (!created) {
        set.status = 403;
        return { message: 'User already exists in the DB' };
    }

    set.status = 201;
    return { accessToken: `Bearer ${await jwt.sign({ uid: user.toJSON().id })}` };
};
