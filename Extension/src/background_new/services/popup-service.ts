import { MessageType } from '../../common/messages';
import { messageHandler } from '../message-handler';

import stubData from './popup-stub-data.json';

export class PopupService {
    static init() {
        messageHandler.addListener(MessageType.GET_TAB_INFO_FOR_POPUP, PopupService.getTabInfoForPopup);
    }

    // TODO: implement
    static getTabInfoForPopup() {
        return Promise.resolve(stubData);
    }
}
