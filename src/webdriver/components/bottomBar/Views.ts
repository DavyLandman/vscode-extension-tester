import { Key } from "selenium-webdriver";
import { BottomBarPanel } from "../../../extester";
import { TextView, ChannelView } from "./AbstractViews";
import { AbstractElement } from "../AbstractElement";
import * as clipboard from 'clipboardy';
import { Workbench } from "../../../extester";

/**
 * Output view of the bottom panel
 */
export class OutputView extends TextView {
    constructor(panel: BottomBarPanel = new BottomBarPanel()) {
        super(OutputView.locators.OutputView.constructor, panel);
        this.actionsLabel = OutputView.locators.OutputView.actionsLabel;
    }
}

/**
 * Debug Console view on the bottom panel
 * Functionality TBD on request
 */
export class DebugConsoleView extends AbstractElement {
    constructor(panel: BottomBarPanel = new BottomBarPanel()) {
        super(DebugConsoleView.locators.DebugConsoleView.constructor, panel);
    }
}

/**
 * Terminal view on the bottom panel
 */
export class TerminalView extends ChannelView {
    constructor(panel: BottomBarPanel = new BottomBarPanel()) {
        super(TerminalView.locators.TerminalView.constructor, panel);
        this.actionsLabel = TerminalView.locators.TerminalView.actionsLabel;
    }

    /**
     * Execute command in the internal terminal
     * @param command text of the command
     */
    async executeCommand(command: string): Promise<void> {
        const input = await this.findElement(TerminalView.locators.TerminalView.textArea);
        await input.sendKeys(command, Key.ENTER);
    }
    
    /**
     * Get all text from the internal terminal
     * Beware, no formatting.
     */
    async getText(): Promise<string> {
        const workbench = new Workbench();
        await workbench.executeCommand('terminal select all');
        await workbench.getDriver().sleep(500);
        await workbench.executeCommand('terminal copy selection');
        return clipboard.readSync();
    }

    /**
     * Destroy the currently open terminal
     */
    async killTerminal(): Promise<void> {
        await this.enclosingItem.findElement(TerminalView.locators.BottomBarViews.actionsContainer(this.actionsLabel))
            .findElement(TerminalView.locators.TerminalView.killTerminal).click();
    }

    /**
     * Initiate new terminal creation
     */
    async newTerminal(): Promise<void> {
        await this.enclosingItem.findElement(TerminalView.locators.BottomBarViews.actionsContainer(this.actionsLabel))
            .findElement(TerminalView.locators.TerminalView.newTerminal).click();
    }
}