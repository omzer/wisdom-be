import { db } from '../index.ts';

const generateToken = async ({ user, jwt }: any) => ({ accessToken: `Bearer ${await jwt.sign({ uid: user.toJSON().id })}` });

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
    return await generateToken({ user, jwt });
};

export const loginUser = async ({ query, set, jwt }: any) => {
    const { username, password } = query;
    const user = await db.models.User.findOne({ where: { username, password } });

    if (!user) {
        set.status = 404;
        return { message: 'No such user in the DB' };
    }

    return await generateToken({ user, jwt });
};
