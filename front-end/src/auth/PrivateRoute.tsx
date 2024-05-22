import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Token } from "../axios";


export type Route = {
    path: string; // The path to render in the <Route /> component
    name?: string; // Determines whether to render in the menu, remove it to not render
    element: () => JSX.Element; // Element that will render for given route
    requiredRoles?: string[]
}

type PrivateRoutesProps = {
    route: Route;
}

type Props = {
    children: ReactNode;
}

const Layout = ({ children }: Props) => (
    <Box>
        {children}
    </Box>
);

export const PrivateRoutes = ({route}: PrivateRoutesProps) => {
    const authenticated = sessionStorage.getItem('token') !== null;

    const hasRoles = () =>{
        if(route.requiredRoles){
            const role = (jwtDecode(sessionStorage.getItem('token') ?? "") as unknown as Token).role;
            return route.requiredRoles.includes(role);
        }
        return true;
    }

    return (
        authenticated ? (
            hasRoles() ? (
                <Layout><Outlet /></Layout>
            ): (
                <Typography variant="h3">You do not have permission to access this page</Typography>
            )
        ) : <Navigate to="/login" />
    );
};
