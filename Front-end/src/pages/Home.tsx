// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MangaCard from '@/components/MangaCard';
import { mangaData } from '@/data/manga';
import fetchChapterPages from '../api/fetchManga';
import axios from "axios";

const carouselImages = [
  '/images/bleachi.jpg',
  '/images/dmsl.jpg',
  '/images/op.jpg',
  '/images/saka.jpg',
  '/images/bl.jpg'
];

const Home: React.FC = () => {
  const { translation } = useApp();
  const mangas = Object.values(mangaData);
  const latestMangas = mangas.slice(0, 5);
  const popularMangas = mangas.slice(-5);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [mangaList, setMangaList] = useState([]);

  useEffect(()=>{

    async function getArabicManga() {
      try {
        const res = await axios.get("https://api.mangadex.org/manga", {
          params: {
            limit: 10,
            availableTranslatedLanguage: ["ar"] 
          }
        });
        
        res.data.data.forEach(manga => async () => {
          const res = await fetch(`https://api.mangadex.org/at-home/server/${manga.id}`);
    const data = await res.json();

    const urls = data.chapter.data.map(
        (filename) => `${data.baseUrl}/data/${data.chapter.hash}/${filename}.jpg`
    );
    console.log(urls); // نرجعو array ديال روابط الصور
        });
      } catch (err) {
        console.error(err);
      }
    }
    
    getArabicManga();
  }, [])

    useEffect(() => {
    const fetchArabicManga = async () => {
  const res = await axios.get("https://api.mangadex.org/manga", {
    params: { limit: 20, "availableTranslatedLanguage[]": ["ar"] }
  });

  const mangas = [];

  for (const manga of res.data.data) {
    // جبد الفصول ديال كل مانغا
    const chaptersRes = await axios.get(`https://api.mangadex.org/chapter`, {
      params: { manga: manga.id, translatedLanguage: ["ar"], limit: 1 }
    });

    if (chaptersRes.data.data.length > 0) {
      mangas.push(manga);
    }
  }

  return mangas;
};
    fetchArabicManga().then(setMangaList);
  }, []);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  fetchChapterPages("21c207e2-2710-4a62-9bfb-35f9e9e5a621")

  return (
    <div className="min-h-screen">

      {/* Top carousel */}
      <div className="w-full max-w-full mt-0" style={{ backgroundColor: '#171A1C' }}>
        <div className="relative w-full h-56 md:h-80 rounded-none overflow-hidden">
          {carouselImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`slide-${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              loading="lazy"
            />
          ))}

          {/* Dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    <div className="flex-1 flex flex-col justify-center">
      <div className="container mx-auto px-4 pt-8 pb-0">
        {/* Latest section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#FF6633' }}>
            {translation.latestChapters || 'Latest'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestMangas.map((m) => (
              <MangaCard key={m.id} manga={m}/>
            ))}
          </div>
        </section>

        {/* Popular section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#FF6633' }}>
            {translation.popularManga || 'Popular'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularMangas.map((m) => (
              <MangaCard key={m.id} manga={m} />
            ))}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Home;
