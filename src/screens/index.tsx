import { Route, Routes, HashRouter } from "react-router-dom";
import Main from "./main";
import Error from "./error";

const App = () =>{
    return (
        <HashRouter basename="/">
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="*" element={ <Error /> } />
            </Routes>
          </HashRouter>
    );
}

export default App;