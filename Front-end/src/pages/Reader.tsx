import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Reader = () => {
  const { mangaId, chapterId } = useParams<{ mangaId: string; chapterId: string }>();
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // API Mangadex يجيب صفحات الفصل
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
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) fetchPages();
  }, [chapterId]);

  if (loading) return <p className="p-4">⏳ جارٍ تحميل الفصل...</p>;

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">📖 قارئ الفصل</h1>
      {pages.length > 0 ? (
        pages.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`page-${i + 1}`}
            className="mb-4 w-full max-w-3xl rounded shadow"
          />
        ))
      ) : (
        <p>ما كايناش صفحات متاحة لهذا الفصل 🌚</p>
      )}
    </div>
  );
};

export default Reader;
