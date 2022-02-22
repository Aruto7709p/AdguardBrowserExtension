import { createContext } from 'react';
import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';
import { messenger } from '../../services/messenger';
import { MessageType } from '../../../common/constants';

class FullscreenUserRulesStore {
    @observable settings = null;

    constructor() {
        makeObservable(this);
    }

    @action
    async getFullscreenUserRulesData() {
        const { settings } = await messenger.sendMessage(MessageType.GET_USER_RULES_EDITOR_DATA);
        runInAction(() => {
            this.settings = settings;
        });
    }

    @computed
    get appearanceTheme() {
        if (!this.settings) {
            return null;
        }

        return this.settings.values[this.settings.names.APPEARANCE_THEME];
    }
}

export const fullscreenUserRulesStore = createContext(new FullscreenUserRulesStore());
