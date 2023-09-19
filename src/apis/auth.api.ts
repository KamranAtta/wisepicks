import { doPost } from '../utils/request';

export const loginUser = async (body: object) => {
    try {
        const response = await doPost('/auth/login', body);
        return response?.data;
    } catch (err) {
        err;
    }
};