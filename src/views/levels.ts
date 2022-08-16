import { levels } from '../types';

export const getLevels = async (): Promise<HTMLButtonElement[]> => {
    return levels.map((level) => {
        const btn = document.createElement('button') as HTMLButtonElement;
        const span = document.createElement('span') as HTMLSpanElement;
        btn.type = 'button';
        btn.classList.add('words__level');
        btn.dataset.group = `${level.group}`;
        btn.style.backgroundColor = level.color;
        span.classList.add('words__level_item');
        span.innerText = `${level.group + 1}`;
        btn.append(span);
        return btn;
    });
};
