import browser from 'webextension-polyfill';
import { messageHandler } from '../message-handler';
import { MessageType } from '../../common/messages';
import { TabsApi } from '../extension-api/tabs';

export class UiService {
    static baseUrl = browser.runtime.getURL('/');

    static settingsUrl = UiService.getExtensionPageUrl('options.html');

    static filteringLogUrl = UiService.getExtensionPageUrl('filtering-log.html');

    static init() {
        messageHandler.addListener(MessageType.OPEN_SETTINGS_TAB, UiService.openSettingsTab);
        messageHandler.addListener(MessageType.OPEN_FILTERING_LOG, UiService.openFilteringLog);
        messageHandler.addListener(MessageType.OPEN_ABUSE_TAB, UiService.openAbuseTab);
        messageHandler.addListener(MessageType.OPEN_SITE_REPORT_TAB, UiService.openSiteReportTab);
        messageHandler.addListener(MessageType.OPEN_ASSISTANT, UiService.openAssistant);
    }

    // listeners

    static async openSettingsTab(): Promise<void> {
        const settingTab = await TabsApi.findOne({ url: UiService.settingsUrl });

        if (settingTab) {
            await TabsApi.focus(settingTab);
        } else {
            await browser.tabs.create({ url: UiService.settingsUrl });
        }
    }

    static async openFilteringLog(): Promise<void> {
        const filteringLogTab = await TabsApi.findOne({ url: UiService.filteringLogUrl });

        if (filteringLogTab) {
            await TabsApi.focus(filteringLogTab);
        } else {
            await browser.windows.create({ url: UiService.filteringLogUrl, type: 'popup' });
        }
    }

    // TODO: implement
    static async openAbuseTab(): Promise<void> {
        // eslint-disable-next-line max-len
        await browser.tabs.create({ url: 'https://reports.adguard.com/ru/new_issue.html?product_type=Ext&product_version=4.0.126&browser=Chrome&url=https%3A%2F%2Fexample.org&filters=10.1.2.3&stealth.enabled=false&browsing_security.enabled=false' });
    }

    // TODO: implement
    static async openSiteReportTab(): Promise<void> {
        await browser.tabs.create({ url: 'https://reports.adguard.com/ru/example.org/report.html' });
    }

    // TODO: implement
    static openAssistant(): Promise<void> {
        return Promise.resolve();
    }

    // helpers

    static getExtensionPageUrl(path: string) {
        return `${UiService.baseUrl}pages/${path}`;
    }
}
