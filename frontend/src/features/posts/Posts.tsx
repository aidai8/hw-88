import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchPosts, selectPosts, selectPostsLoading} from "./postsSlice";
import Grid from "@mui/material/Grid2";
import {Typography, Card, CardContent, CardMedia, CardActionArea, Box} from "@mui/material";
import {Link} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import ArticleIcon from '@mui/icons-material/Article';


const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) {
        return <Spinner/>;
    }


    return (
        <Grid container spacing={2}>
            {posts.map(post => (
                <Grid size={{xs: 12, sm: 6, md: 4}} key={post._id}>
                    <Card sx={{height: '100%'}}>
                        <CardActionArea component={Link} to={`/posts/${post._id}`} sx={{height: '100%'}}>
                            <Box sx={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {post.image ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={post.image}
                                        alt={post.title}
                                        sx={{objectFit: 'contain'}}
                                    />
                                ) : (
                                    <ArticleIcon sx={{fontSize: 100, color: 'text.secondary'}}/>
                                )}
                            </Box>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    By: {post.user.username}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;