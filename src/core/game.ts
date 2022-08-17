/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getWordsList } from '../services/words';
import { Word } from '../types';
import { drawlevels } from '../views/levels';
import { nextWord } from '../views/next';

export default class Game {
    root: HTMLElement;
    progress: HTMLElement;
    container: HTMLElement;
    next: HTMLButtonElement;

    words: Word[] = [];
    group: number;
    current: Word | undefined;
    count: number;

    selected: string[];
    correct?: string[];
    incorrect?: string[];

    constructor(root: HTMLElement, group?: number) {
        this.root = root;
        this.container = <HTMLElement>document.createElement('div');
        this.progress = <HTMLElement>document.createElement('div');
        this.selected = [];
        this.count = 1;
        this.group = group ?? 0;
        this.container.className = 'game';
        this.next = <HTMLButtonElement>document.createElement('button');
        this.next.classList.add('game__next_word');
        this.next.innerText = `не знаю`;
        this.next.onclick = async () => this.onNext();
    }

    start = async (): Promise<void> => {
        if (!this.group) await this.showLevels();
        await this.render();
    };

    showLevels = async (): Promise<void> => {
        await this.clear(this.container);
        await drawlevels(this.container, this.onLevelSelect);
    };

    onLevelSelect = async (level: number): Promise<void> => {
        await this.clear(this.container);
        this.group = level;
        try {
            const words = await getWordsList(0, this.group);
            if (typeof words !== 'undefined') {
                this.words = words;
                this.current = await this.getRandomWord();
                const variants = await this.getRandomWords();
                this.selected?.push(this.current.id);

                await nextWord(this.container, this.current, variants);
                this.container.append(this.next);
                this.render();
            }
        } catch (Exception) {
            console.log(Exception);
        }
    };

    onNext = async (): Promise<void> => {
        if (this.count === 20) {
            alert('end of the game');
            this.next.disabled = true;
        } else this.count !== this.words.length;
        {
            this.count += 1;
            this.current = await this.getRandomWord();
            this.selected.push(this.current.id);
            const variants = await this.getRandomWords();

            await this.clear(this.container);
            await nextWord(this.container, this.current, variants);
            this.container.append(this.next);
            this.render();
        }
    };

    clear = async (container: HTMLElement): Promise<void> => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };

    render = async (): Promise<void> => {
        this.clear(this.root);
        this.root.append(this.progress, this.container);
        const answers = Array.from(this.container.querySelectorAll('.answers__item')) as HTMLElement[];
        answers.forEach((item) => item.addEventListener('click', this.onClickVariant));
    };

    onClickVariant = async (e: MouseEvent): Promise<void> => {
        const target = e.target as HTMLElement;
        if (target.innerText === this.current?.wordTranslate) target.closest('label')?.classList.add('correct');
    };

    getRandomWord = async (): Promise<Word> => {
        const filtered = this.words.filter((word) => !this.selected.includes(word.id));
        const index = Math.floor(Math.random() * (this.words.length - this.selected.length));

        return filtered[index];
    };

    getRandomWords = async (): Promise<Word[]> => {
        const arr: Word[] = [];

        while (arr.length < 3) {
            const index = Math.floor(Math.random() * (this.words.length - arr.length));
            const next = this.words[index];

            if (arr.every((item) => item.id !== next.id)) arr.push(next);
        }
        console.log(arr);
        return arr;
    };
}
