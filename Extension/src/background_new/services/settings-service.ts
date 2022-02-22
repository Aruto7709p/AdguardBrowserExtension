import { MessageType } from '../../common/messages';
import { messageHandler } from '../message-handler';

import stubData from './settings-stub-data.json';

export class SettingsService {
    static init() {
        messageHandler.addListener(MessageType.GET_OPTIONS_DATA, SettingsService.getOptionsData);
    }

    // TODO: implement
    static getOptionsData() {
        return Promise.resolve(stubData);
    }
}
