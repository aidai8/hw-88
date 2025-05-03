import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Comment, CommentMutation} from "../../types";
import {RootState} from "../../app/store";

interface CommentsState {
    comments: Comment[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsState = {
    comments: [],
    fetchLoading: false,
    createLoading: false,
};

export const fetchComments = createAsyncThunk<Comment[], string>(
    'comments/fetchAll',
    async (postId) => {
        const response = await axiosApi.get<Comment[]>(`/comments/${postId}`);
        return response.data;
    }
);

export const createComment = createAsyncThunk<void, CommentMutation, {state: RootState}>(
    'comments/create',
    async (commentMutation, {getState}) => {
        const user = getState().users.user;

        if (!user) {
            throw new Error('User not found');
        }

        await axiosApi.post('/comments', commentMutation);
    }
);

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, {payload}) => {
                state.comments = payload;
                state.fetchLoading = false;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.createLoading = false;
            });
    },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;
export const selectCreateCommentLoading = (state: RootState) => state.comments.createLoading;