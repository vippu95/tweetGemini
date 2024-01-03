import { wait } from "../../utils/wait";

export const setInputText = async (inputEl: HTMLInputElement, text: string) => {

    const elements = document.getElementsByClassName("public-DraftStyleDefault-block public-DraftStyleDefault-ltr")[0].getElementsByTagName("span");

    if (elements.length === 0) {
        return;
    }
    
    const textWrapper = elements[0];

    if (textWrapper) {
        textWrapper.focus
        textWrapper.textContent = text
        textWrapper.click
        textWrapper.dispatchEvent(new Event('input', { 'bubbles': true, 'cancelable': true }));
    }
};