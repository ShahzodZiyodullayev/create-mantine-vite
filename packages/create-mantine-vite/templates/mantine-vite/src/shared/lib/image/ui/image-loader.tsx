import React, { createContext, useContext, useState } from "react";

const ImageLoadContext = createContext<{
  total: number;
  loaded: number;
  registerImage: () => void;
  markLoaded: () => void;
}>({
  total: 0,
  loaded: 0,
  registerImage: () => {},
  markLoaded: () => {},
});

export const useImageLoad = () => useContext(ImageLoadContext);

export const ImageLoadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(0);

  const registerImage = () => setTotal(prev => prev + 1);
  const markLoaded = () => setLoaded(prev => prev + 1);

  return (
    <ImageLoadContext.Provider value={{ total, loaded, registerImage, markLoaded }}>
      {children}
    </ImageLoadContext.Provider>
  );
};
