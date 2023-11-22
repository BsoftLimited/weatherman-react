import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import "../assets/styles/input.scss";
import { useSearchParams } from "react-router-dom";
import { AppContext, AppContextType } from "../utils/providers";

interface InputProps{
    
}

const Input: React.FC<InputProps> = () =>{
    const [inputValue, setInputValue] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();

    const { load } = useContext(AppContext) as AppContextType;

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);

        /*if (inputValue.trim() === '') {
            setSuggestions([]);
            return;
        }

        const words = inputValue.trim().split(/\s+/);
    
        const firstWord = words[0];
        if(inputValue.includes(" ") && firstWord.length > 1){
            try {
                const response = await openWeatherAPI.get(`/data/2.5/find?q=${firstWord}&type=like&sort=population&cnt=10&appid=${import.meta.env.VITE_APIKEY}`);
                setSuggestions(response.data.list);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        {suggestions.map((city) => (
                    <label style={{ display: "block" }} key={city.id}>{city.name}</label>
                ))}
        
        */
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