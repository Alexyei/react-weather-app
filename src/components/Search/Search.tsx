import {AsyncPaginate} from "react-select-async-paginate";
import {useState} from "react";
import {GEO_API_URL, geoApiOptions} from "../../api";

interface SearchProps{
    onSearchChange : (data:{value:string, label:string})=>any
}

const Search = ({onSearchChange}:SearchProps)=>{
    const [search, setSearch] = useState<{value:string, label:string} | null>(null);

    const handleOnChange:any = (searchData:{value:string, label:string}) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }

    //Ищем только города в которых юольше миллиона жителей
    const loadOptions:any = (inputValue:string)=> {
        return fetch(`${GEO_API_URL}/cities?minPopulation=${100000}&namePrefix=${inputValue}&languageCode=ru`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map( (city:any)=>{
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange = {handleOnChange}
            loadOptions={loadOptions}
        />
            )

}

export default Search;
