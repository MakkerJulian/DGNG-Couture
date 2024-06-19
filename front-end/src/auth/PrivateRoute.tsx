import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Token } from "../axios";
import { useJwt } from "react-jwt";


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
    const token = sessionStorage.getItem('token');
    const { isExpired, decodedToken } = useJwt(token ?? "");
    const decoded = decodedToken as Token;

    const appId = import.meta.env.VITE_APP_BACKENDID ?? "";

    const authenticated = token && !isExpired && decoded.appId === appId;

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
