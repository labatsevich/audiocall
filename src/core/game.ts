import { wordsList } from '../services/words';
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
        await this.displayLevels();
        await this.render();
    };

    displayLevels = async (): Promise<void> => {
        const levels = await getLevels();
        levels.forEach((level) =>
            level.addEventListener('click', () => {
                console.log(level);
            })
        );
        this.container.append(...levels);
    };

    chooseLevel = async (level: number): Promise<void> => {
        try {
            const words = await wordsList(0, level);
            console.log(words);
        } catch (error) {
            console.log(error);
        }
    };

    render = async (): Promise<void> => {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
        this.root.append(this.container);
    };
}
