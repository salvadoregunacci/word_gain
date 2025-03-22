import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
