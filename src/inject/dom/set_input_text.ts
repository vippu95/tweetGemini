import { wait } from "../../utils/wait";

export const setInputText = async (inputEl: HTMLInputElement | null, text: string) => {

    const classNameToSelect = "public-DraftStyleDefault-block public-DraftStyleDefault-ltr";

    // Use querySelector to get the first matching element and ensure type safety
    const element = document.getElementsByClassName(classNameToSelect)[0] as HTMLElement | undefined;

    // Check for null before accessing properties
    if (element) {
        element.textContent = text;
        element.click();

        // Create the input event with type safety
        const inputEvent = new Event("input", { bubbles: true });
        element.dispatchEvent(inputEvent);
    } else {
        console.error("Element with class name", classNameToSelect, "not found");
    }
};