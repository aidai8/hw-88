import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Post, PostMutation} from "../../types";
import {RootState} from "../../app/store";

interface PostsState {
    posts: Post[];
    post: Post | null;
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    post: null,
    fetchLoading: false,
    fetchOneLoading: false,
    createLoading: false,
};

export const fetchPosts = createAsyncThunk<Post[]>(
    'posts/fetchAll',
    async () => {
        const response = await axiosApi.get<Post[]>('/posts');
        return response.data;
    }
);

export const fetchOnePost = createAsyncThunk<Post, string>(
    'posts/fetchOne',
    async (id) => {
        const response = await axiosApi.get<Post>(`/posts/${id}`);
        return response.data;
    }
);

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
        }

        if (postMutation.image) {
            formData.append('image', postMutation.image);
        }

        await axiosApi.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, {payload}) => {
                state.posts = payload;
                state.fetchLoading = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchOnePost.pending, (state) => {
                state.fetchOneLoading = true;
            })
            .addCase(fetchOnePost.fulfilled, (state, {payload}) => {
                state.post = payload;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOnePost.rejected, (state) => {
                state.fetchOneLoading = false;
            })

            .addCase(createPost.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createPost.rejected, (state) => {
                state.createLoading = false;
            });
    },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectOnePostLoading = (state: RootState) => state.posts.fetchOneLoading;
export const selectCreatePostLoading = (state: RootState) => state.posts.createLoading;