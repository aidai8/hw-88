import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {PostMutation} from "../../types";
import {RootState} from "../../app/store";

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState}>(
    'posts/create',
    async (postMutation, {getState}) => {
        const user = getState().users.user;

        if (!user) {
            throw new Error('User not found');
        }

        const formData = new FormData();
        formData.append('title', postMutation.title);

        if (postMutation.description) {
            formData.append('description', postMutation.description);
        } else {
            formData.append('description', '');
        }

        if (postMutation.image) {
            formData.append('image', postMutation.image);
        }

        await axiosApi.post('/posts', formData);
    }
);