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
            <Button style={{position: 'absolute', right: '20px', margin:'15px', zIndex: 1002, backgroundColor: '#a60000', color:'white'}} onClick={logOut}>Log out</Button>
        );
    }
}