import api from './api';
import { Post } from '../models/Post';
import { User } from '../models/User';

export const getPosts = async (): Promise<Post[] | null> => {
    const localStorageData = localStorage.getItem('user');
    if (localStorageData !== null) {
        const currentuser = JSON.parse(localStorageData) as User;
        const response = await api.get<Post[]>('/users/' + currentuser.id + '/posts?_sort=id&_order=desc');
        return response.data;
    }
    return null;
};


export const getPost = async (id: number): Promise<Post | null> => {
    const response = await api.get<Post>(`/posts/${id}`);
    if (response.status == 200) {
        return response.data;

    } else {
        return null;
    }
};

export const postPost = async (post: Post): Promise<Post | null> => {
    const response = await api.post<Post>('/posts', post);
    return response.data;
};

export const putPost = async (id: number, post: Post): Promise<Post | null> => {
    const response = await api.patch<Post>(`/posts/${id}`, post);
    return response.data;
   
};

export const deletePost = async (id: number) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
    
};