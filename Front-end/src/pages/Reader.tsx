import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";

const Reader: React.FC = () => {
  const { mangaId, chapterId } = useParams<{ mangaId: string; chapterId: string }>();
  const { translation } = useApp();
  const navigate = useNavigate();

  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevChapterId, setPrevChapterId] = useState<string | null>(null);
  const [nextChapterId, setNextChapterId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        setError(null);
        setPages([]);
        // Scroll to top when changing chapters
        try { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); } catch { window.scrollTo(0, 0); }

        const res = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
        const baseUrl = res.data.baseUrl;
        const hash = res.data.chapter.hash;
        const data = res.data.chapter.data;

        const pageUrls = data.map(
          (fileName: string) => `${baseUrl}/data/${hash}/${fileName}`
        );

        setPages(pageUrls);
      } catch (err) {
        console.error("خطأ فجلب الصفحات:", err);
        setError("ما قدرناش نجيب الصفحات 🌚");
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) fetchPages();
  }, [chapterId]);

  // Fetch manga feed to determine previous/next chapter IDs
  useEffect(() => {
    const fetchChapterNav = async () => {
      try {
        if (!mangaId || !chapterId) return;

        // Paginate through the feed (in ascending order) until we find the current chapter
        const pageSize = 100;
        let offset = 0;
        let total = Infinity;
        type Chap = { id: string; chapterNum: number | null; createdAt: string };
        let allChapters: Chap[] = [];
        let foundIndex: number = -1;
        let safetyCounter = 0;
        const seen = new Set<string>();

        while (offset < total && safetyCounter < 20 && foundIndex === -1) { // cap ~2000 items
          const res = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`, {
            params: {
              limit: pageSize,
              offset,
              'order[createdAt]': 'asc',
              contentRating: ['safe', 'suggestive', 'erotica'],
            },
          });

          const items: Array<{ id: string; attributes: { chapter: string | null; createdAt: string } } & any> = res.data?.data || [];
          total = typeof res.data?.total === 'number' ? res.data.total : items.length; // fallback
          for (const item of items) {
            if (!seen.has(item.id)) {
              seen.add(item.id);
              const chStr = item.attributes?.chapter ?? null;
              const parsed = chStr !== null && chStr !== '' && !Number.isNaN(Number(chStr)) ? Number(chStr) : null;
              allChapters.push({ id: item.id, chapterNum: parsed, createdAt: item.attributes?.createdAt ?? '' });
            }
          }

          offset += pageSize;
          safetyCounter += 1;
        }

        // Group by distinct chapter numbers (to avoid navigating between different versions of the same chapter)
        type ChapterGroup = { key: string; chapterNum: number | null; items: Chap[] };
        const groupsMap = new Map<string, ChapterGroup>();
        for (const chap of allChapters) {
          const key = chap.chapterNum !== null ? `num:${chap.chapterNum}` : `null:${chap.createdAt}`; // nulls treated uniquely by time
          if (!groupsMap.has(key)) {
            groupsMap.set(key, { key, chapterNum: chap.chapterNum, items: [] });
          }
          groupsMap.get(key)!.items.push(chap);
        }

        // Sort items within groups by createdAt
        for (const g of groupsMap.values()) {
          g.items.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        }

        // Build ordered groups: numeric chapters ascending, then null chapters by createdAt of their first item
        const groups = Array.from(groupsMap.values()).sort((a, b) => {
          if (a.chapterNum !== null && b.chapterNum !== null) {
            return a.chapterNum - b.chapterNum;
          }
          if (a.chapterNum !== null) return -1;
          if (b.chapterNum !== null) return 1;
          return a.items[0].createdAt.localeCompare(b.items[0].createdAt);
        });

        // Find the group that contains the current chapter id
        const currentGroupIndex = groups.findIndex(g => g.items.some(it => it.id === chapterId));

        if (currentGroupIndex !== -1) {
          const prevGroup = currentGroupIndex > 0 ? groups[currentGroupIndex - 1] : null;
          const nextGroup = currentGroupIndex < groups.length - 1 ? groups[currentGroupIndex + 1] : null;

          // Choose a representative id from each neighboring group (first item by createdAt)
          const prevId = prevGroup ? prevGroup.items[0].id : null;
          const nextId = nextGroup ? nextGroup.items[0].id : null;

          setPrevChapterId(prevId);
          setNextChapterId(nextId);
          console.debug('[Reader] Chapter neighbors (by chapter number groups)', {
            chapterId,
            prev: prevId,
            next: nextId,
            groupsCount: groups.length,
          });
        } else {
          console.warn('[Reader] Current chapter not found in grouped list', { chapterId, groups: groups.length });
          setPrevChapterId(null);
          setNextChapterId(null);
        }
      } catch (e) {
        console.warn('Failed to fetch chapter navigation', e);
        setPrevChapterId(null);
        setNextChapterId(null);
      }
    };

    fetchChapterNav();
  }, [mangaId, chapterId]);

  const handleNextChapter = () => {
    if (mangaId && nextChapterId && nextChapterId !== chapterId) {
      console.debug('[Reader] Navigate next', { mangaId, nextChapterId });
      navigate(`/reader/${mangaId}/${nextChapterId}`);
    }
  };

  const handlePreviousChapter = () => {
    if (mangaId && prevChapterId && prevChapterId !== chapterId) {
      console.debug('[Reader] Navigate prev', { mangaId, prevChapterId });
      navigate(`/reader/${mangaId}/${prevChapterId}`);
    }
  };

  return (
    <div key={chapterId} className="max-w-4xl mx-auto px-4 py-8">
      {/* Reader Controls */}
      <div className="bg-card p-6 rounded-lg shadow-lg mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handlePreviousChapter}
              className="min-w-[150px]"
              disabled={!prevChapterId}
            >
              <FaArrowRight />
            </Button>

            <Link to={`/manga/${mangaId}`}>
              <Button variant="secondary" className="min-w-[150px] text-[#fc4f0d]">
                {translation.backToManga}
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={handleNextChapter}
              className="min-w-[150px]"
              disabled={!nextChapterId}
            >
              <FaArrowLeft />
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Pages */}
      {loading && <p className="text-center py-8">{translation.loading}...</p>}
      {error && <p className="text-center text-destructive">{error}</p>}

      <div className="space-y-4 animate-slide-up">
        {!loading &&
          !error &&
          pages.map((pageUrl, index) => (
            <div key={index} className="text-center">
              <img
                src={pageUrl}
                alt={`صفحة ${index + 1}`}
                className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </div>
          ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            variant="outline"
            onClick={handlePreviousChapter}
            className="min-w-[150px]"
            disabled={!prevChapterId}
          >
            <FaArrowRight />
          </Button>

          <Link to={`/manga/${mangaId}`}>
            <Button variant="secondary" className="min-w-[150px] text-[#fc4f0d]">
              {translation.backToManga}
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleNextChapter}
            className="min-w-[150px]"
            disabled={!nextChapterId}
          >
            <FaArrowLeft />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reader;

