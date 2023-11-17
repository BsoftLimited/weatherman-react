import { BrowserRouter } from "react-router-dom";
import Main from "./main";
import AppProvider from "../utils/providers";

const App = () =>{
    return (
        <BrowserRouter>
            <AppProvider>
                <Main />
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;