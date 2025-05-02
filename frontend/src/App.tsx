import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";


const App = () => {
    // const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        {/*<Route path="/" element={<Posts/>}/>*/}
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        {/*<Route path="/posts/:id" element={<FullPost/>}/>*/}

                        {/*<Route path="/posts/new" element={*/}
                        {/*    <ProtectedRoute isAllowed={Boolean(user)}><NewPost/></ProtectedRoute>*/}
                        {/*}/>*/}

                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
