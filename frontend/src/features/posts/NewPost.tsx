import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import FileInput from "../../components/UI/FileInput/FileInput";
import {selectCreatePostLoading} from "./postsSlice";
import {createPost} from "./postsThunks";


const NewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreatePostLoading);
    const [state, setState] = useState({
        title: '',
        description: '',
        image: null as File | null,
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Submitting post:', {
            title: state.title,
            description: state.description,
            hasImage: !!state.image
        });

        if (!state.title) {
            alert('Title is required!');
            return;
        }

        if (!state.description.trim() && !state.image) {
            alert('Either description or image is required!');
            return;
        }

        try {
            await dispatch(createPost({
                title: state.title,
                description: state.description,
                image: state.image
            })).unwrap();

            navigate('/');
        } catch (e) {
            console.error('Failed to create post:', e);
            alert('Failed to create post!');
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState(prev => ({
            ...prev,
            [name]: files?.[0] || null
        }));
    };

    return (
        <Card sx={{mt: 2}}>
            <CardContent>
                <form onSubmit={submitFormHandler}>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12}}>
                            <Typography variant="h5">
                                New post
                            </Typography>
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={state.title}
                                onChange={inputChangeHandler}
                                required
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={state.description}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <FileInput
                                label="Image"
                                name="image"
                                onChange={fileInputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Post'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewPost;