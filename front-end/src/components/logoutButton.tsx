import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
    const authenticated = sessionStorage.getItem('token') !== null;
    const navigate = useNavigate();

    const logOut = () => {
        sessionStorage.clear();
        navigate("/");
    }

    if (authenticated) {
        return (
            <Button className="customButton" onClick={logOut}>Log out</Button>
        );
    }
}