import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Country } from "./pages/Country.tsx";

interface Route {
    path: string;
    name: string;
    element: () => JSX.Element;
    requiredRoles?: string[];
}

export const routes: Route[] = [
    {
        name: "login",
        path: "/",
        element: Login,
    },
    {
        name: "home",
        path: "/home",
        element: Home,
        requiredRoles: ["sales","research"]
    },
    {
        name: "country",
        path: "/country",
        element: Country,
    }
];