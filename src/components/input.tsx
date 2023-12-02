import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import "../assets/styles/input.scss";
import { useSearchParams } from "react-router-dom";
import { AppContext, AppContextType } from "../utils/providers";


const Input: React.FC = () =>{
    const [inputValue, setInputValue] = useState('');
    let [,setSearchParams] = useSearchParams();

    const { load } = useContext(AppContext) as AppContextType;

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        setSearchParams({ q: inputValue });
        load(inputValue);
    }

    return (
        <div style={{ flex: 1 }}>
            <form className="input-form" onSubmit={submit}>
                <div className="input-icon"><FaSearch color="white"/></div>
                <input className="input" type="text" name="q" placeholder="search location" value={inputValue} onChange={handleInputChange}/>
            </form>
        </div>
    );
}

export default Input;