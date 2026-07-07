import { createContext, useContext, useState } from "react";

type NetworkContextType = {
  onlineStatus: boolean;
  setOnlineStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const NetworkContext = createContext<NetworkContextType | null>(null);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [onlineStatus, setOnlineStatus] = useState(true);

  return (
    <NetworkContext.Provider value={{ onlineStatus, setOnlineStatus }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const ctx = useContext(NetworkContext);

  if (!ctx) {
    throw new Error("Wrap app with NetworkProvider");
  }

  return ctx;
}