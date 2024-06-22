import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Country } from "./pages/Country.tsx";
import { Admin } from "./pages/Admin.tsx";
import { City } from "./pages/City.tsx";

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
        requiredRoles: ["sales","research","admin"]
    },
    {
        name: "country",
        path: "/country",
        element: Country,
    },
    {
        name: "admin",
        path: "/admin",
        element: Admin,
        requiredRoles: ["admin"]
    },
    {
        name: "city",
        path: "/city",
        element: City,
    }
];