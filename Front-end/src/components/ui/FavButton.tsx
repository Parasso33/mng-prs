import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'mp_user';

const getFavKeyForUser = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.email) return `mp_favs_${u.email}`;
    }
  } catch {}
  return 'mp_favorites';
};

const FavButton: React.FC<{ mangaId: string }> = ({ mangaId }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(getFavKeyForUser());
    const favs = raw ? JSON.parse(raw) : [];
    setIsFav(favs.includes(mangaId));
  }, [mangaId]);

  const toggleFav = () => {
    const raw = localStorage.getItem(getFavKeyForUser());
    const favs: string[] = raw ? JSON.parse(raw) : [];

    let next: string[];
    if (favs.includes(mangaId)) {
      next = favs.filter(id => id !== mangaId);
      setIsFav(false);
    } else {
      next = [...favs, mangaId];
      setIsFav(true);
    }

    localStorage.setItem(getFavKeyForUser(), JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('mp:favs:changed'));
  };

  return (
    <button
      onClick={toggleFav}
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isFav ? 'bg-red-500' : 'bg-gray-400'}`}
    >
    </button>
  );
};

export default FavButton;
