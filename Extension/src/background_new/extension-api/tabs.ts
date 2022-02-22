import browser, { Tabs } from 'webextension-polyfill';

/**
 * Helper class for browser.tabs API
 */
export class TabsApi {
    static async findOne(queryInfo: Tabs.QueryQueryInfoType): Promise<Tabs.Tab | null> {
        const matchedTabs = await browser.tabs.query(queryInfo);

        if (matchedTabs.length > 0) {
            return matchedTabs[0];
        }

        return null;
    }

    static async focus(tab: Tabs.Tab): Promise<void> {
        const { id, windowId } = tab;

        await browser.tabs.update(id, { active: true });
        await browser.windows.update(windowId, { focused: true });
    }
}
