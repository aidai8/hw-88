import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOnePost, selectOnePostLoading, selectPost} from "./postsSlice";
import Grid from "@mui/material/Grid2";
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, TextField, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import {selectUser} from "../users/usersSlice";
import {createComment, selectCreateCommentLoading, selectComments, selectCommentsLoading, fetchComments} from "../comments/commentsSlice";
import {useState} from "react";
import ArticleIcon from '@mui/icons-material/Article';
import dayjs from "dayjs";

const FullPost = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectPost);
    const comments = useAppSelector(selectComments);
    const postLoading = useAppSelector(selectOnePostLoading);
    const commentsLoading = useAppSelector(selectCommentsLoading);
    const createCommentLoading = useAppSelector(selectCreateCommentLoading);
    const user = useAppSelector(selectUser);
    const [text, setText] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePost(id));
            dispatch(fetchComments(id));
        }
    }, [dispatch, id]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !text.trim()) return;

        await dispatch(createComment({post: id, text}));
        setText('');
        if (id) {
            dispatch(fetchComments(id));
        }
    };

    if (postLoading || !post) {
        return <Spinner/>;
    }


    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12}}>
                <Card>
                    <Box sx={{display: 'flex', justifyContent: 'center', p: 2}}>
                        {post.image ? (
                            <CardMedia
                                component="img"
                                height="300"
                                image={post.image}
                                alt={post.title}
                                sx={{objectFit: 'contain'}}
                            />
                        ) : (
                            <ArticleIcon sx={{fontSize: 100, color: 'text.secondary'}}/>
                        )}
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            By: {post.user.username} | {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                        {post.description && (
                            <Typography variant="body1" sx={{mt: 2}}>
                                {post.description}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>

            {user && (
                <Grid size={{xs: 12}}>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{xs: 12, md: 9}}>
                                <TextField
                                    fullWidth
                                    label="Add a comment"
                                    variant="outlined"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid size={{xs: 12, md: 3}}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={createCommentLoading}
                                >
                                    {createCommentLoading ? <CircularProgress size={24}/> : 'Post Comment'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            )}

            <Grid size={{xs: 12}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    Comments
                </Typography>
                {commentsLoading ? (
                    <Spinner/>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <Card key={comment._id} sx={{mb: 2}}>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {comment.user.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                                    {dayjs(comment.datetime).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                                <Typography variant="body1">
                                    {comment.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary">
                        No comments yet.
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default FullPost;