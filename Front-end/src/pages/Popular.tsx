import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { mangaData } from '@/data/manga';
import MangaCard from '@/components/MangaCard';

const Popular: React.FC = () => {
  const { translation } = useApp();
  const mangas = Object.values(mangaData);
  
  // Sort by rating (simple implementation)
  const popularMangas = [...mangas].sort((a, b) => {
    const ratingA = parseFloat(a.rating.split('/')[0]);
    const ratingB = parseFloat(b.rating.split('/')[0]);
    return ratingB - ratingA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary border-b-2 border-primary pb-2 inline-block">
        {translation.popular}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-slide-up">
        {popularMangas.map((manga, index) => (
          <div key={manga.id} className="relative">
            <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground 
                          rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
              {index + 1}
            </div>
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;