import { useContext } from 'react';
import { ErrorMessageContextData } from '../../state-management/ErrorMessageContextData';


export const useErrorMessage = () => {
  const context = useContext(ErrorMessageContextData);
  return context;
}
