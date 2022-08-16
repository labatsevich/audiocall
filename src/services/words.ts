import { Word } from '../types';

export const wordsList = async (page = 0, group: number): Promise<Word[] | unknown> => {
    const response = await fetch(`http://localhost:3001/words?page=${page}&group=${group}`);
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
};
