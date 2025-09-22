import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mangaData } from '@/data/manga';

const MangaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const manga = id ? mangaData[id] : null;

  if (!manga) return <div>المانغا غير موجودة</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{manga.title}</h1>
      <p>{manga.author}</p>
      <img src={manga.cover} alt={manga.title} className="w-64 rounded" />

      <h2 className="text-xl mt-4">الفصول</h2>
      <ul>
        {manga.chapters.map((chapter) => (
          <li key={chapter.number}>
            <Link to={`/read/${manga.id}/${chapter.number}`}>
              الفصل {chapter.number}: {chapter.title} ({chapter.pages} صفحة)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaDetails;
