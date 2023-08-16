import axios from 'axios';
import { Post } from '../models/Post';
import { User } from '../models/User';

export const getPosts = async (): Promise<Post[] | null> => {
    const localStorageData = localStorage.getItem('user');
    if (localStorageData !== null) {
        const currentuser = JSON.parse(localStorageData) as User;
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/users/' + currentuser.id + '/posts');
        return response.data;
    }
    return null;
};


export const getPost = async (id: number): Promise<Post | null> => {
    const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
    if (response.status == 200) {
        return response.data;

    } else {
        return null;
    }
};

export const postPost = async (post: Post) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
};

export const putPost = async (id: number, post: Post) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts?id=${id}`, post);
   
};

export const deletePost = async (id: number) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
    
};