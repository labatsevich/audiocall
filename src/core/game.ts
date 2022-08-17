/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { wordsList } from '../services/words';
import { Word } from '../types';
import { drawlevels } from '../views/levels';
import { nextWords } from '../views/next';

export default class Game {
    root: HTMLElement;
    container: HTMLElement;
    words: Word[] = [];
    group: number;
    next: HTMLButtonElement;
    count: number;

    constructor(root: HTMLElement) {
        this.root = root;
        this.container = <HTMLElement>document.createElement('div');
        this.count = 0;
        this.group = 0;
        this.container.className = 'game';
        this.next = <HTMLButtonElement>document.createElement('button');
        this.next.classList.add('game__next_word');
        this.next.innerText = `i dont know`;
        this.next.onclick = async () => this.onNext();
    }

    start = async (): Promise<void> => {
        await this.showLevels();
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
            const words = await wordsList(0, this.group);
            if (typeof words !== 'undefined') {
                this.words = words;
                const word = this.words[this.count];
                await nextWords(this.container, word, this.words.slice(this.count, this.count + 4));
                this.container.append(this.next);
                this.render();
            }
        } catch (Exception) {
            console.log(Exception);
        }
    };

    onNext = async (): Promise<void> => {
        this.count += 1;
        const word = this.words[this.count];
        await this.clear(this.container);
        await nextWords(this.container, word, this.words.slice(this.count + 1, this.count + 5));
        this.container.append(this.next);
        this.render();
    };

    clear = async (container: HTMLElement): Promise<void> => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };

    render = async (): Promise<void> => {
        this.clear(this.root);
        this.root.append(this.container);
    };
}
