import { levels } from '../types';

export default class Game {
    container: HTMLElement;
    root: HTMLElement;
    constructor(root: HTMLElement) {
        this.container = <HTMLElement>document.createElement('div');
        this.container.className = 'game';
        this.root = root;
    }

    start = async (): Promise<void> => {
        await this.selectLevel();
        await this.render();
    };

    selectLevel = async (): Promise<void> => {
        this.container.append(
            ...levels.map((level) => {
                const btn = document.createElement('button') as HTMLButtonElement;
                const span = document.createElement('span') as HTMLSpanElement;
                btn.type = 'button';
                btn.classList.add('words__level');
                btn.style.backgroundColor = level.color;
                span.classList.add(`words__level_${level.group}`);
                span.innerText = `${level.group}`;
                btn.addEventListener('click', async (): Promise<void> => this.chooseLevel(level.group));
                btn.append(span);
                return btn;
            })
        );
    };

    chooseLevel = async (level: number): Promise<void> => {
        const response = await fetch(`http://localhost:3001/words?group=${level}`);
        if (response.ok) {
            console.log(await response.json());
        } else {
            throw new Error(response.statusText);
        }
    };

    render = async (): Promise<void> => {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
        this.root.append(this.container);
    };
}
