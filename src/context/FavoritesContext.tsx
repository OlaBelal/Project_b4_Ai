import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteTour {
  id: number;
  title: string;
  image: string;
  companyName: string;
  price: number;
  location: string;
}

interface FavoritesContextType {
  favorites: FavoriteTour[];
  toggleFavorite: (tour: FavoriteTour) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteTour[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (tour: FavoriteTour) => {
    setFavorites(prev => 
      prev.some(fav => fav.id === tour.id)
        ? prev.filter(fav => fav.id !== tour.id)
        : [...prev, tour]
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);