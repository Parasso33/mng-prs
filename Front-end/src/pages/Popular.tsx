import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MangaCard from '@/components/MangaCard';

const Popular: React.FC = () => {
  const { translation } = useApp();
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          'https://api.mangadex.org/manga?limit=20&order[followedCount]=desc&includes[]=cover_art'
        );
        const data = await res.json();

        const mappedManga = data.data.map((m: any) => {
          const title = m.attributes.title.en || Object.values(m.attributes.title)[0];
          const rating = m.attributes.rating?.bayesian || '0';
          const cover = m.relationships.find((r: any) => r.type === 'cover_art');
          const coverUrl = cover
            ? `https://uploads.mangadex.org/covers/${m.id}/${cover.attributes.fileName}.256.jpg`
            : '';

          return {
            id: m.id,
            title,
            rating,
            cover: coverUrl,
          };
        });

        setMangas(mappedManga);
      } catch (err) {
        console.error('Error fetching popular mangas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 text-primary border-b-2 border-primary pb-2 inline-block">
        {translation.popular}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mangas.map((manga, index) => (
            <div key={manga.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-3 -left-3 bg-primary text-white 
                              rounded-full w-8 h-8 flex items-center 
                              justify-center text-sm font-bold z-20">
                {index + 1}
              </div>

              {/* Manga Card */}
              <MangaCard manga={manga} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popular;
