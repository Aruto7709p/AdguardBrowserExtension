import browser, { Events, Runtime } from 'webextension-polyfill';
import { MessageType, Message, ExtractedMessage } from '../common/constants';

type MessageListener<T> = (message: T, sender: Runtime.MessageSender) => unknown;

export class MessageHandler {
    private messageListeners = new Map();

    constructor() {
        this.handleMessage = this.handleMessage.bind(this);
    }

    public init() {
        (browser.runtime.onMessage as Events.Event<MessageListener<Message>>).addListener(this.handleMessage);
    }

    public addListener<T extends MessageType>(type: T, listener: MessageListener<ExtractedMessage<T>>) {
        if (this.messageListeners.has(type)) {
            throw new Error(`${type} listener has already been registered`);
        }

        this.messageListeners.set(type, listener);
    }

    private handleMessage<T extends Message>(message: T, sender: Runtime.MessageSender) {
        const listener = this.messageListeners.get(message.type) as MessageListener<T>;

        if (listener) {
            return listener(message, sender);
        }
    }
}

export const messageHandler = new MessageHandler();
