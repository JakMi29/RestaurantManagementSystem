import { createContext, useState } from 'react';
const MessageContext = createContext({
  message: '',
  mode:'',
  showMessage: () => {},
  hideMessage: () => {},
  confirmCallback: null,
});

// eslint-disable-next-line react/prop-types
export function MessageContextProvider({ children }) {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('');
  const [confirmCallback, setConfirmCallback] = useState(null);

  function showMessage(messageText,mode, callback) {
    setMessage(messageText);
    setMode(mode);
    setConfirmCallback(() => callback || (() => {}));
  }

  function hideMessage() {
    setMessage('');
    setConfirmCallback(null);
  }

  const messageCtx = {
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
}

export default MessageContext;