import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Token } from "../axios";
import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";


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

export const PrivateRoutes = ({ route }: PrivateRoutesProps) => {
    const token = sessionStorage.getItem('token') as string;
    const decodedToken = jwtDecode(token) as Token;
    const isExpired = useJwt(token).isExpired;
    const backendID = import.meta.env.VITE_APP_BACKENDID as string;
    const authenticated = token && !isExpired && decodedToken.appId === backendID;

    const hasRoles = () => {
        if (!decodedToken) return false;
        if (route.requiredRoles) {
            const role = (decodedToken as Token).role;
            return route.requiredRoles.includes(role);
        }
        return true;
    }

    return (
        authenticated ? (
            hasRoles() ? (
                <Layout><Outlet /></Layout>
            ) : (
                <Typography variant="h3">You do not have permission to access this page</Typography>
            )
        ) : <Navigate to="/" />
    );
};
