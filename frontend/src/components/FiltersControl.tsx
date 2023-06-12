import { useQuery } from "react-query";
import { fetchPokemonTypes } from "../api";

const FiltersControl: React.FC<{ sortOrder: boolean; setSortOrder: (order: boolean) => void; typeFilter: string; setTypeFilter: (type: string) => void; }> = ({ sortOrder, setSortOrder, typeFilter, setTypeFilter }) => {
    const { data: types } = useQuery('pokemonTypes', fetchPokemonTypes);
    return (
        <div>
            <button onClick={() => setSortOrder(!sortOrder)} className="p-2 m-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700"
            >Toggle Sort Order</button>
            {
                types ? (
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="p-2 m-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700">
                        <option value="">No filter</option>
                        {types.map((type) => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                ) : null
            }
        </div>
    );
};

export default FiltersControl;