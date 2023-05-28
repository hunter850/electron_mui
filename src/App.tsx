import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AllProviders from "./contexts/AllProviders";
import Layout from "@/components/Common/Layout";
import Home from "@/components/Home";

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <AllProviders>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Routes>
                </AllProviders>
            </MemoryRouter>
        </Provider>
    );
}

export default App;
