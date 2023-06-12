import { PokemonData } from './types';

const BASE_URL = 'http://localhost:8080';

export const fetchPokemonData = async (pageParam: number, pageSize: number, asc: boolean, typeFilter?: string): Promise<PokemonData[]> => {
    // we call the default 
    let url = `${BASE_URL}/pokemon?page=${pageParam}&pageSize=${pageSize}&asc=${asc}`;
    if (typeFilter) {
        url += `&typeFilter=${typeFilter}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    // return as pokemon data
    const data: PokemonData[] = await response.json();
    return data;
};

export const fetchPokemonCount = async (typeFilter?: string): Promise<number> => {
    let url = `${BASE_URL}/pokemon/count`;
    if (typeFilter) {
        url += `?typeFilter=${typeFilter}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data: number = await response.json();
    return data;
};

export const fetchPokemonTypes = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/pokemon/types`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data: string[] = await response.json();
    return data;
};


export async function fetchIconUrl(name: string): Promise<string> {
    const response = await fetch(`${BASE_URL}/icon/${name}`);
    if (!response.ok) {
        throw new Error('Problem fetching icon URL');
    }
    const url: string = await response.text();
    return url;
}
