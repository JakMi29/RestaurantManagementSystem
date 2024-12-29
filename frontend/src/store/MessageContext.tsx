import { createContext, useState, ReactNode } from 'react';
import { MessageMode } from '../constants/MessageMode';

interface MessageContextType {
  message: string | undefined;
  mode: MessageMode | undefined;
  showMessage: (messageText: string, mode: MessageMode, callback?: (confirmed:boolean) => void) => void;
  hideMessage: () => void;
  confirmCallback: ((confirm: boolean) => void) | undefined;
}

const MessageContext = createContext<MessageContextType>({
  message: undefined,
  mode: undefined,
  showMessage: () => { },
  hideMessage: () => { },
  confirmCallback: undefined,
});

export const MessageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<MessageMode | undefined>(undefined);
  const [confirmCallback, setConfirmCallback] = useState<((confirm: boolean) => void) | undefined>(undefined);

  const showMessage = (messageText: string, mode: MessageMode, callback?: (confirm: boolean) => void) => {
    setMessage(messageText);
    setMode(mode);
    setConfirmCallback(() => callback || (() => { }));
  };

  const hideMessage = () => {
    setMessage(undefined);
    setConfirmCallback(undefined);
    setMode(undefined);
  };

  const messageCtx: MessageContextType = {
    message,
    mode,
    showMessage,
    hideMessage,
    confirmCallback,
  };

  return (
    <MessageContext.Provider value={messageCtx}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
