import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import type { Manga } from '@/types/manga';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'mp_user';
const GLOBAL_FAV_KEY = 'mp_favorites';

const getFavKeyForUser = (): string => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.email) return `mp_favs_${u.email}`;
    }
  } catch {}
  return GLOBAL_FAV_KEY;
};

const readFavIds = (): string[] => {
  try {
    const raw = localStorage.getItem(getFavKeyForUser());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeFavIds = (ids: string[]) => {
  try {
    localStorage.setItem(getFavKeyForUser(), JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('mp:favs:changed'));
  } catch {}
};

const MangaCard: React.FC<{ manga: Manga }> = ({ manga }) => {
  const [isFav, setIsFav] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    setUserLogged(Boolean(raw));

    const favs = readFavIds();
    setIsFav(favs.includes(manga.id));
  }, [manga.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // باش الكليك على الزر ما يديكش لل details
    if (!userLogged) return;
    const favs = readFavIds();
    const next = isFav ? favs.filter((id) => id !== manga.id) : [...favs, manga.id];
    writeFavIds(next);
    setIsFav(!isFav);
  };

  return (
    <Link to={`/manga/${manga.id}`}>
      <div className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">
        {/* Cover image */}
        <img
          src={manga.cover || '/images/placeholder.jpg'}
          alt={manga.title}
          className="w-full h-64 object-cover"
        />

        {/* Overlay for hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2">
          <span className="text-white font-semibold text-sm">{manga.title}</span>
        </div>

        {/* Favorite button */}
        {userLogged && (
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full shadow transition ${
              isFav ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            title={isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
          >
            <Heart className={isFav ? 'fill-current' : ''} />
          </button>
        )}
      </div>
    </Link>
  );
};

export default MangaCard;
