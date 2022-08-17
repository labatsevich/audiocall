import { levels, TSelectHandler } from '../types';

export const drawlevels = async (container: HTMLElement, hadler: TSelectHandler): Promise<void> => {
    const heading = document.createElement('h3') as HTMLElement;
    const levelsWrapper = document.createElement('div');

    heading.innerText = 'Select the level';
    heading.className = 'game__heading';
    levelsWrapper.className = 'game__levels';
    levelsWrapper.append(
        ...levels.map((level) => {
            const btn = document.createElement('button') as HTMLButtonElement;
            const span = document.createElement('span') as HTMLSpanElement;
            btn.type = 'button';
            btn.classList.add('words__level');
            btn.dataset.group = `${level.group}`;
            btn.style.backgroundColor = level.color;
            span.classList.add('words__level_item');
            span.innerText = `${level.group + 1}`;
            btn.onclick = () => {
                hadler(level.group);
            };
            btn.append(span);
            return btn;
        })
    );

    container.append(heading, levelsWrapper);
};
