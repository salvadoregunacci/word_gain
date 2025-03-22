import {createBrowserRouter, Navigate,} from "react-router-dom";
import App from "./App.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import ListsPage from "./pages/ListsPage.tsx";
import ChallengePage from "./pages/ChallengePage.tsx";
import NewListPage from "./pages/NewListPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/categories" replace/>,
            },
            {
                path: "categories",
                element: <CategoriesPage/>,
            },
            {
                path: "lists",
                element: <ListsPage/>,
            },
            {
                path: "challange",
                element: <ChallengePage/>,
            },
            {
                path: "new_list",
                element: <NewListPage/>,
            },
        ],
    },
]);
