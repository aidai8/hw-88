import {User} from "../../../types";
import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {unsetUser} from "../../../features/users/usersSlice.ts";
import {logout} from "../../../features/users/usersThunks.ts";
import {toast} from "react-toastify";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    };

    const handleClose = () => {
      setUserOptionsEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
        handleClose();
        toast.success("Logout successfully");
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.username}!
            </Button>
            <Menu
                keepMounted
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Button component={NavLink} to='/posts/new' onClick={handleClose}>New Post</Button>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;