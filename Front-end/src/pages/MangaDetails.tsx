import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { mangaData } from '@/data/manga';

const MangaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { translation } = useApp();
  
  const manga = id ? mangaData[id] : null;

  if (!manga) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">المانجا غير موجودة</h1>
          <Link to="/">
            <Button variant="outline">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <img
            src={manga.cover}
            alt={manga.title}
            className="w-full rounded-lg shadow-lg animate-fade-in"
          />
        </div>

        <div className="md:col-span-2 animate-slide-up">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {manga.title}
          </h1>
          
          <div className="space-y-3 mb-6">
            <div className="flex">
              <span className="font-bold text-muted-foreground min-w-[100px]">
                {translation.author}
              </span>
              <span>{manga.author}</span>
            </div>
            
            <div className="flex">
              <span className="font-bold text-muted-foreground min-w-[100px]">
                {translation.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                manga.status === 'مستمر' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : manga.status === 'مكتمل'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {manga.status}
              </span>
            </div>
            
            <div className="flex">
              <span className="font-bold text-muted-foreground min-w-[100px]">
                {translation.rating}
              </span>
              <span className="text-primary font-bold">{manga.rating}</span>
            </div>
            
            <div className="flex flex-wrap items-start">
              <span className="font-bold text-muted-foreground min-w-[100px]">
                {translation.genres}
              </span>
              <div className="flex flex-wrap gap-2">
                {manga.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">{translation.description}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {manga.description}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-primary border-b-2 border-primary pb-2 inline-block">
          {translation.chapterList}
        </h2>
        
        <div className="space-y-2">
          {manga.chapters.map((chapter, index) => (
            <Link
              key={chapter.number}
              to={`/read/${manga.id}/${chapter.number}`}
              className="block"
            >
              <div className="bg-card hover:bg-primary hover:text-primary-foreground p-4 rounded-lg 
                            manga-transition border border-border hover:border-primary cursor-pointer
                            flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    {translation.chapter} {chapter.number}: {chapter.title}
                  </span>
                </div>
                <div className="text-sm opacity-75">
                  {chapter.pages} صفحة
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MangaDetails;