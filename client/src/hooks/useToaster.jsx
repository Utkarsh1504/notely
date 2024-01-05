/* eslint-disable react/prop-types */
import { useContext, createContext } from 'react';
import { Toaster , toast } from 'react-hot-toast';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={toast}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </ToastContext.Provider>
  );
};
