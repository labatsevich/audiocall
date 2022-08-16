/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { wordsList } from '../services/words';
import { Word } from '../types';
import { getLevels } from '../views/levels';

export default class Game {
    container: HTMLElement;
    root: HTMLElement;

    constructor(root: HTMLElement) {
        this.container = <HTMLElement>document.createElement('div');
        this.container.className = 'game';
        this.root = root;
    }

    start = async (): Promise<void> => {
        await this.showLevels();
        await this.render();
    };

    showLevels = async (): Promise<void> => {
        const levels = await getLevels();
        levels.forEach((level) =>
            level.addEventListener('click', () => {
                this.selectLevel(+level.dataset.group!);
            })
        );
        this.container.append(...levels);
    };

    selectLevel = async (level: number): Promise<void> => {
        try {
            const words = await wordsList(0, level);
            if (typeof words !== 'undefined') {
                this.render(words);
            }
        } catch (error) {
            console.log(error);
        }
    };

    render = async (words?: Word[]): Promise<void> => {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
        console.log(words?.slice(0, 5));
        this.root.append(this.container);
    };
}
