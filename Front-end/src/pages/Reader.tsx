import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { mangaData } from '@/data/manga';


interface HistoryItem {
  id: string;
  title: string;
  chapter: number;
  cover: string;
  lastRead: number;
}

export const addToHistory = (item: HistoryItem) => {
  try {
    const raw = localStorage.getItem('mp_history');
    const history: HistoryItem[] = raw ? JSON.parse(raw) : [];

    // نحيدو القديم إذا كان نفس المانجا
    const filtered = history.filter(h => !(h.id === item.id && h.chapter === item.chapter));

    const updatedHistory = [{ ...item, lastRead: Date.now() }, ...filtered];
    localStorage.setItem('mp_history', JSON.stringify(updatedHistory));
  } catch {}
};

const Reader: React.FC = () => {
  const { mangaId, chapterNumber } = useParams<{ mangaId: string; chapterNumber: string }>();
  const { translation } = useApp();
  const navigate = useNavigate();
  
  const manga = mangaId ? mangaData[mangaId] : null;
  const currentChapterNumber = parseInt(chapterNumber || '0');
  const currentChapterIndex = manga?.chapters.findIndex(ch => ch.number === currentChapterNumber) ?? -1;
  const currentChapter = currentChapterIndex >= 0 ? manga?.chapters[currentChapterIndex] : null;

  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (currentChapter) {
      // Generate placeholder pages
      const pageUrls = Array.from({ length: currentChapter.pages }, (_, i) => 
        `https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=${encodeURIComponent(manga?.title || '')}+-+صفحة+${i + 1}`
      );
      setPages(pageUrls);

      // سجل التصفح
      addToHistory({
        id: mangaId!,
        title: manga?.title || '',
        chapter: currentChapter.number,
        cover: manga?.cover || '',
        lastRead: Date.now(),
      });
    }
  }, [currentChapter, manga?.title, manga?.cover, mangaId]);

  if (!manga || !currentChapter) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">الفصل غير موجود</h1>
          <Link to="/">
            <Button variant="outline">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasNextChapter = currentChapterIndex > 0;
  const hasPreviousChapter = currentChapterIndex < manga.chapters.length - 1;
  
  const nextChapter = hasNextChapter ? manga.chapters[currentChapterIndex - 1] : null;
  const previousChapter = hasPreviousChapter ? manga.chapters[currentChapterIndex + 1] : null;

  const handleNextChapter = () => {
    if (nextChapter) {
      navigate(`/read/${mangaId}/${nextChapter.number}`);
    }
  };

  const handlePreviousChapter = () => {
    if (previousChapter) {
      navigate(`/read/${mangaId}/${previousChapter.number}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Reader Controls */}
      <div className="bg-card p-6 rounded-lg shadow-lg mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-primary">{manga.title}</h1>
            <p className="text-muted-foreground">
              {translation.chapter} {currentChapter.number}: {currentChapter.title}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handlePreviousChapter} disabled={!hasPreviousChapter} className="min-w-[150px]">
              {translation.previousChapter}
            </Button>
            
            <Link to={`/manga/${mangaId}`}>
              <Button variant="secondary" className="min-w-[150px]">{translation.backToManga}</Button>
            </Link>
            
            <Button variant="outline" onClick={handleNextChapter} disabled={!hasNextChapter} className="min-w-[150px]">
              {translation.nextChapter}
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Pages */}
      <div className="space-y-4 animate-slide-up">
        {pages.map((pageUrl, index) => (
          <div key={index} className="text-center">
            <img
              src={pageUrl}
              alt={`صفحة ${index + 1}`}
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button variant="outline" onClick={handlePreviousChapter} disabled={!hasPreviousChapter} className="min-w-[150px]">
            {translation.previousChapter}
          </Button>
          
          <Link to={`/manga/${mangaId}`}>
            <Button variant="secondary" className="min-w-[150px]">{translation.backToManga}</Button>
          </Link>
          
          <Button variant="outline" onClick={handleNextChapter} disabled={!hasNextChapter} className="min-w-[150px]">
            {translation.nextChapter}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reader;
