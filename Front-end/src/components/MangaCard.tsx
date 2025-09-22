import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import type { Manga } from '@/types/manga';

interface MangaCardProps {
  manga: Manga;
  showLatestChapter?: boolean;
}

const SESSION_USER_KEY = 'mp_user';
const GLOBAL_FAV_KEY = 'mp_favorites';

const getFavKey = (): string => {
  try {
    const raw = sessionStorage.getItem(SESSION_USER_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.email) return `mp_favs_${u.email}`;
    }
  } catch {
    /* ignore */
  }
  return GLOBAL_FAV_KEY;
};

const readFavs = (): string[] => {
  try {
    const key = getFavKey();
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeFavs = (ids: string[]) => {
  try {
    const key = getFavKey();
    localStorage.setItem(key, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('mp:favs:changed'));
  } catch {}
};

const MangaCard: React.FC<MangaCardProps> = ({ manga, showLatestChapter = false }) => {
  const latestChapter = manga.chapters?.[0] ?? null;
  const [isFav, setIsFav] = useState<boolean>(false);
  const { toast } = useToast();
  const { isLoggedIn } = useApp();
  const userLoggedIn = Boolean(isLoggedIn || sessionStorage.getItem(SESSION_USER_KEY));

  useEffect(() => {
    const favs = readFavs();
    setIsFav(favs.includes(manga.id));
  }, [manga.id]);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!manga.id) return;

    const favs = readFavs();
    const exists = favs.includes(manga.id);
    const next = exists ? favs.filter((id) => id !== manga.id) : [...favs, manga.id];
    writeFavs(next);
    setIsFav(!exists);

    if (!exists) {
      toast?.({ title: 'تمت الإضافة إلى المفضلة !' });
    } else {
      toast?.({ title: 'تمت الإزالة من المفضلة' });
    }
  };

  return (
    <Link to={manga.id} className="block">
 <div className="manga-card group h-[400px] flex flex-col">
  <div className="relative overflow-hidden h-64">
    <img
  src={manga.cover || '/images/placeholder.jpg'}
  alt={manga.title}
  className="w-full h-full object-cover manga-transition group-hover:scale-105"
/>

  </div>

  <div className="p-4 flex-1 flex flex-col justify-between">
    <h3 className="font-bold text-lg mb-2 truncate">{manga.title}</h3>
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{manga.author}</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        manga.status === 'مستمر'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : manga.status === 'مكتمل'
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>{manga.status}</span>
    </div>
    {showLatestChapter && latestChapter && (
      <div className="mt-2 text-sm text-muted-foreground truncate">
        الفصل {latestChapter.number}: {latestChapter.title}
      </div>
    )}
  </div>
</div>

    </Link>
  );
};

export default MangaCard;
