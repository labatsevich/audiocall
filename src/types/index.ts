export type GameLevel = {
    group: number;
    color: string;
};

export type Word = {
    id: string;
    group: number;
    page: 0;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
};

export type TSelectHandler = (level: number) => Promise<void>;

export const levels: GameLevel[] = [
    {
        group: 0,
        color: 'rgb(242, 105, 92)',
    },
    {
        group: 1,
        color: 'rgb(242, 166, 99)',
    },
    {
        group: 2,
        color: 'rgb(250, 170, 186)',
    },
    {
        group: 3,
        color: 'rgb(136, 191, 176)',
    },
    {
        group: 4,
        color: 'rgb(96, 164, 191)',
    },
    {
        group: 5,
        color: 'rgb(89, 72, 77)',
    },
];
