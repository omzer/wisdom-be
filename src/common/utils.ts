export const JWTConfigs = { name: 'jwt', secret: process.env.JWT_SECRET as string };

export const onBeforeMiddleware = async ({ set, headers, jwt, request }: any) => {
    const { pathname } = new URL(request.url);
    const token = headers.authorization?.replace('Bearer ', '');
    const user = await jwt.verify(token);

    // Users with invalid tokens will be kicked
    if (!user && !['/user/sign-up', '/user/login'].includes(pathname)) {
        return (set.status = 401);
    }

    // Setting valid user id for valid users
    set.userId = user.uid;
};
