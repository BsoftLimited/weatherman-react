import { FaSearch } from "react-icons/fa";
import { apiKey, openWeatherAPI } from "../utils";
import { useState } from "react";

interface InputProps{
    
}

const Input: React.FC<InputProps> = () =>{
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);

        if (inputValue.trim() === '') {
            setSuggestions([]);
            return;
        }

        const words = inputValue.trim().split(/\s+/);
    
        const firstWord = words[0];
        if(inputValue.includes(" ") && firstWord.length > 1){
            try {
                const response = await openWeatherAPI.get(`/data/2.5/find?q=${firstWord}&type=like&sort=population&cnt=10&appid=${apiKey}`);
                setSuggestions(response.data.list);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
    };

    return (
        <div>
            <form className="input-form">
                <div className="input-icon"><FaSearch color="white"/></div>
                <input className="input" type="text" name="q" placeholder="search location" value={inputValue} onChange={handleInputChange}/>
            </form>
            <div>
                {suggestions.map((city) => (
                    <label style={{ display: "block" }} key={city.id}>{city.name}</label>
                ))}
            </div>
        </div>
    );
}

export default Input;