import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  setId: Dispatch<SetStateAction<string>>;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <ModalContext.Provider value={{ open, setOpen, id, setId }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("The modal context needs to be consumed inside a provider");
  }
  return context;
};
