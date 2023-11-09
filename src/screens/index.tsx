import { Route, Routes, HashRouter, BrowserRouter } from "react-router-dom";
import Main from "./main";
import Error from "./error";

const App = () =>{
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
}

export default App;