import axios from 'axios';
import { User } from '../models/User';

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
};


export const getUser = async (email: string, username: string): Promise<User | null> => {
    const response = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users?email=${email}`);
    if (response.data[0]?.username == username) {
        return response.data[0];
    } else {
        return null;
    }
};
