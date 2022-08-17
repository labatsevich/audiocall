import { Word } from '../types';

export const nextWords = async (container: HTMLElement, word: Word, answers: Word[]): Promise<void> => {
    const wordContainer = document.createElement('div') as HTMLElement;
    const icon = document.createElement('button') as HTMLButtonElement;
    const audio = document.createElement('audio') as HTMLAudioElement;
    audio.src = `http://localhost:3001/${word.audio}`;
    icon.addEventListener('click', async () => await audio.play());
    icon.innerHTML = `<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`;
    const card = document.createElement('div') as HTMLDivElement;

    wordContainer.className = 'word';
    wordContainer.append(icon, audio);
    card.className = 'answers';

    card.append(
        ...answers.map((word, index) => {
            const variantLabel = document.createElement('label') as HTMLElement;
            const translateVariant = document.createElement('span') as HTMLSpanElement;
            const numVariant = document.createElement('span') as HTMLSpanElement;

            variantLabel.className = 'answers__item';
            translateVariant.innerText = word.wordTranslate;
            numVariant.innerText = `${index + 1}`;
            variantLabel.append(numVariant, translateVariant);
            return variantLabel;
        })
    );

    container.append(wordContainer, card);
};
