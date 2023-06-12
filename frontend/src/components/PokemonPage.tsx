import React from 'react';
import { PokemonData } from '../types';

interface PokemonPageProps {
    data: PokemonData[];
}


const PokemonPage: React.FC<PokemonPageProps> = ({ data }) => {
    const iconUrl = (pokemon: PokemonData) => `https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.full_name}.png`

    return (
        <div className="p-2 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700">
                <thead className="bg-gray-50 sticky top-0 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Attack</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Defense</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Hit Points</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Generation</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Legendary</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Special Attack</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Special Defense</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type One</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type Two</th>
                    </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200:hover dark:text-white dark:border-gray-700 dark:divide-gray-700">
                    {data.map((pokemon) => (
                        <tr className="border-b border-gray-200 dark:border-gray-700" key={JSON.stringify(pokemon)}>
                            <td className="p-2"><img className="w-10 h-10" src={iconUrl(pokemon)} alt={pokemon.name} /></td>
                            <td className="p-2">{pokemon.name}</td>
                            <td className="p-2">{pokemon.number}</td>
                            <td className="p-2">{pokemon.attack}</td>
                            <td className="p-2">{pokemon.defense}</td>
                            <td className="p-2">{pokemon.hit_points}</td>
                            <td className="p-2">{pokemon.generation}</td>
                            <td className="p-2">{pokemon.legendary ? 'Yes' : 'No'}</td>
                            <td className="p-2">{pokemon.special_attack}</td>
                            <td className="p-2">{pokemon.special_defense}</td>
                            <td className="p-2">{pokemon.speed}</td>
                            <td className="p-2">{pokemon.total}</td>
                            <td className="p-2">{pokemon.type_one}</td>
                            <td className="p-2">{pokemon.type_two}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PokemonPage;
