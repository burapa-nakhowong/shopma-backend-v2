import * as bcrypt from 'bcryptjs';
import prisma from '../config/db';


export const register = async (data: {
    username: string;
    password: string;
}) => {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            username: data.username,
            password: hashed,
            
        },
    });

    return user;
};


export const login = async (data: {
    email: string;
    password: string;
}) => {

    return {};
};