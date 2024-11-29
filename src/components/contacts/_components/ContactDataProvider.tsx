import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface ContactDataContextType {
  state: ContactProps;
  dispatch: React.Dispatch<Action>;
}

const ContactDataContext = createContext<ContactDataContextType | undefined>(undefined);

interface ContactDataProviderProps {
  children: ReactNode;
}
interface ContactProps {
  selectedChracter: number;
}

interface Action {
  type: 'SET_SELECTED_CHARACTER';
  payload: number;
}

const contactReducer = (state: ContactProps, action: Action): ContactProps => {
  switch (action.type) {
    case 'SET_SELECTED_CHARACTER':
      return {
        ...state,
        selectedChracter: action.payload as number,
      };
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContactData = () => {
  const context = useContext(ContactDataContext);
  if (!context) {
    throw new Error('useContactData error, wrap <ContactProvider>');
  }
  const { state, dispatch } = context;

  const setCharacter = (id: number) => {
    dispatch({ type: 'SET_SELECTED_CHARACTER', payload: id });
  }

  return {
    selectedChracter: state.selectedChracter,
    setCharacter: setCharacter,
  }
}

export const ContactDataProvider = ({ children }: ContactDataProviderProps) => {

  const [state, dispatch] = useReducer(contactReducer, {
    selectedChracter: 0,
  })


  return (
    <ContactDataContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactDataContext.Provider>
  );
};
