import { messageHandler } from './message-handler';
import { UiService } from './services/ui-service';
import { PopupService } from './services/popup-service';
import { SettingsService } from './services/settings-service';

UiService.init();
PopupService.init();
SettingsService.init();

messageHandler.init();
