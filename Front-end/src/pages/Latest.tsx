import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { mangaData } from '@/data/manga';
import MangaCard from '@/components/MangaCard';

const Latest: React.FC = () => {
  const { translation } = useApp();
  const mangas = Object.values(mangaData);
  
  // Sort by latest chapter (simple implementation - by first chapter number)
  const latestMangas = [...mangas].sort((a, b) => {
    const latestA = a.chapters[0]?.number || 0;
    const latestB = b.chapters[0]?.number || 0;
    return latestB - latestA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary border-b-2 border-primary pb-2 inline-block">
        {translation.latest}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-slide-up">
        {latestMangas.map((manga) => (
          <MangaCard 
            key={manga.id} 
            manga={manga} 
            showLatestChapter={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Latest;