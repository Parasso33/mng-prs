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

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        setError(null);

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

  const handleNextChapter = () => {
    navigate(`/read/${mangaId}/nextChapter.id`);
  };

  const handlePreviousChapter = () => {
    navigate(`/read/${mangaId}/previousChapter.id`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Reader Controls */}
      <div className="bg-card p-6 rounded-lg shadow-lg mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handlePreviousChapter}
              className="min-w-[150px]"
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
          >
            <FaArrowLeft />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reader;
