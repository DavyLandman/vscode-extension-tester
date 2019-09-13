import { AbstractElement } from "../AbstractElement";
import { TitleBar } from "../../../extester";
import { WebElement } from "selenium-webdriver";

/**
 * Page object for the windows controls part of the title bar
 */
export class WindowControls extends AbstractElement {
    constructor(bar: TitleBar = new TitleBar()) {
        super(WindowControls.locators.WindowControls.constructor, bar);
    }

    /**
     * Use the minimize window button
     */
    async minimize(): Promise<void> {
        const minButton = this.findElement(WindowControls.locators.WindowControls.minimize);
        await minButton.click();
    }

    /**
     * Use the maximize window button if the window is not maximized
     */
    async maximize(): Promise<void> {
        let maxButton: WebElement;
        try {
            maxButton = await this.findElement(WindowControls.locators.WindowControls.maximize);
            await maxButton.click();
        } catch (err) {
            console.log('Window is already maximized');
        }
    }

    /**
     * Use the restore window button if the window is maximized
     */
    async restore(): Promise<void> {
        let maxButton: WebElement;
        try {
            maxButton = await this.findElement(WindowControls.locators.WindowControls.restore);
            await maxButton.click();
        } catch (err) {
            console.log('Window is not maximized');
        }
    }

    /**
     * Use the window close button. Use at your own risk.
     */
    async close(): Promise<void> {
        const closeButton = this.findElement(WindowControls.locators.WindowControls.close);
        await closeButton.click();
    }
}