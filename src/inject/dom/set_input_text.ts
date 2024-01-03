import { wait } from "../../utils/wait";

export const setInputText = async (inputEl: HTMLInputElement | null, text: string) => {

    const classNameToSelect = "public-DraftStyleDefault-block public-DraftStyleDefault-ltr";

    const element = document.getElementsByClassName(classNameToSelect)[0] as HTMLElement | undefined;

    if (element) {
        element.textContent = text;
        element.click();

        const inputEvent = new Event("input", { bubbles: true });
        element.dispatchEvent(inputEvent);
    } else {
        console.error("Element with class name", classNameToSelect, "not found");
    }
};