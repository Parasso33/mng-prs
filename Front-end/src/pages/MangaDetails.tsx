import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchMangaDetails, fetchChapters } from '@/api/fetchManga';
import { toast } from '@/components/ui/use-toast';
import type { Manga } from '@/types/manga';

type Props = {
  initialChapters?: any[]; // optional chapters provided by parent
};

const MangaDetails: React.FC<Props> = ({ initialChapters }) => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<any[]>(initialChapters || []);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadManga = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const details = await fetchMangaDetails(id);
        setManga(details);

        // If parent provided chapters, don't re-fetch
        if (!initialChapters) {
          const chaps = await fetchChapters(id);
          setChapters(chaps || []);
        } else {
          setChapters(initialChapters || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadManga();
    // only re-run when id changes or initialChapters reference changes
  }, [id, initialChapters]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-[#FC4E0D]">Loading...</div>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#FC4E0D] mb-4">Manga not found</h1>
          <Link to="/">
            <button className="px-4 py-2 border border-[#FC4E0D] text-[#FC4E0D] rounded">Go home</button>
          </Link>
        </div>
      </div>
    );
  }

  // helper to normalize chapter fields
  const mapChapter = (c: any, idx: number) => {
    const number = c?.attributes?.chapter ?? c.chapter ?? c.number ?? idx + 1;
    const title = c?.attributes?.title ?? c.title ?? `Chapter ${number}`;
    const pages = c?.attributes?.pages ?? c.pages ?? c.pageCount ?? '-';
    const publishAt = c?.attributes?.publishAt ?? c.publishAt ?? c.publishedAt ?? null;
    const key = c.id ?? `${manga.id}-${number}`;
    return { number, title, pages, publishAt, key };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <img
            src={manga.cover}
            alt={manga.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-[#FC4E0D] mb-4">{manga.title}</h1>

          <div className="space-y-3 mb-6 text-[#111]">
            <div className="flex">
              <span className="font-bold text-gray-500 min-w-[140px]">Author(s)</span>
              <span>{Array.isArray((manga as any).authors) ? (manga as any).authors.join(', ') : (manga as any).authors ?? 'Unknown'}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-500 min-w-[140px]">Artist(s)</span>
              <span>{Array.isArray((manga as any).artists) ? (manga as any).artists.join(', ') : (manga as any).artists ?? 'Unknown'}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-500 min-w-[140px]">Status</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#FFF3E8] text-[#6b2e00]">
                {(manga as any).status ?? 'Unknown'}
              </span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-500 min-w-[140px]">Rating</span>
              <span className="text-[#FC4E0D] font-bold">{(manga as any).rating ?? '—'}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-500 min-w-[140px]">Year</span>
              <span>{(manga as any).year ?? '—'}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-500 min-w-[140px]">Demographic</span>
              <span>{(manga as any).publicationDemographic ?? '—'}</span>
            </div>

            <div className="flex flex-wrap items-start">
              <span className="font-bold text-gray-500 min-w-[140px]">Genres / Tags</span>
              <div className="flex flex-wrap gap-2">
                {(((manga as any).genres) || (manga as any).tags || []).map((g: string, i: number) => (
                  <span key={i} className="bg-[#FC4E0D] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {((manga as any).altTitles || []).length > 0 && (
              <div className="flex">
                <span className="font-bold text-gray-500 min-w-[140px]">Alt Titles</span>
                <span>{(manga as any).altTitles.map((at: any) => Object.values(at)[0]).join(', ')}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-[#FC4E0D]">Description</h3>
            <p className="text-gray-700 leading-relaxed">{manga.description}</p>
            <div className="mt-3 text-sm text-gray-500">
              <div>Content Rating: {(manga as any).contentRating ?? '—'}</div>
              <div>Last updated: {(manga as any).updatedAt ? new Date((manga as any).updatedAt).toLocaleString() : '—'}</div>
              <div>Chapters (fetched): {chapters.length || ((manga as any).chapters && (manga as any).chapters.length) || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#FC4E0D] border-b-2 border-[#FC4E0D] pb-2 inline-block">Chapters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(chapters.length ? chapters : (manga as any).chapters || []).map((c: any, idx: number) => {
            const chap = mapChapter(c, idx);

            const handleOpenChapter = async () => {
              // if chapter object has an id, navigate directly
              const chapterId = c?.id;
              if (chapterId) {
                navigate(`/reader/${manga.id}/${chapterId}`);
                return;
              }

              // otherwise try to resolve by refetching chapters
              try {
                setResolving(chap.key);
                const fetched = await fetchChapters(manga.id);
                const found = (fetched || []).find((f: any) => {
                  const num = f?.attributes?.chapter ?? f.chapter ?? f.number;
                  return f.id === c?.id || String(num) === String(chap.number);
                });
                if (found && found.id) {
                  navigate(`/reader/${manga.id}/${found.id}`);
                } else {
                  // fallback: navigate to reader with chap.key (may fail server-side)
                  console.warn('Chapter id not found for', chap.number, 'fetched:', fetched?.length);
                  toast({ title: 'Unable to resolve chapter', description: `Could not find chapter id for chapter ${chap.number}.`, variant: 'destructive' });
                }
              } catch (err) {
                console.error('Error resolving chapter id', err);
                toast({ title: 'Error', description: 'Error resolving chapter id', variant: 'destructive' });
              } finally {
                setResolving(null);
              }
            };

            return (
              <div key={chap.key} className="block">
                <div onClick={handleOpenChapter} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleOpenChapter(); }}
                  className="p-4 rounded-lg border border-[#FC4E0D] bg-[#FFF7F3] hover:bg-[#FC4E0D] hover:text-white transition cursor-pointer flex flex-col justify-between h-full">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Chapter {chap.number}</div>
                    <h3 className="text-lg font-medium mb-2">{chap.title}</h3>
                    {chap.publishAt && (
                      <div className="text-xs text-gray-500">{new Date(chap.publishAt).toLocaleDateString()}</div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm opacity-90">{chap.pages} pages</span>
                    <span className="inline-block px-3 py-1 bg-[#FC4E0D] text-white text-sm rounded">{resolving === chap.key ? 'Resolving...' : 'Read'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MangaDetails;
