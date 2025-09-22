import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// نفس الخدمة بحال MangaDetails: دالة كتجيب المانغا من API
const fetchManga = async (id: string) => {
  const res = await fetch(`/api/manga-proxy?id=${id}`);
  if (!res.ok) throw new Error('فشل تحميل البيانات');
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'لا توجد بيانات');
  return json.data;
};

const Reader: React.FC = () => {
  const { id, chapterNumber } = useParams<{ id: string; chapterNumber: string }>();
  const [manga, setManga] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !chapterNumber) return;
    setLoading(true);

    fetchManga(id)
      .then((data) => {
        setManga(data);
        const ch = data.chapters.find(
          (c: any) => c.number?.toString() === chapterNumber
        );
        setChapter(ch || null);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, chapterNumber]);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;
  if (!chapter) return <div>الفصل غير موجود</div>;

  return (
    <div className="container mx-auto p-4">
      <h1>
        الفصل {chapter.number}: {chapter.title}
      </h1>
      {chapter.pages && <p>عدد الصفحات: {chapter.pages}</p>}

      {/* Navigation */}
      <div className="flex gap-2 mt-4">
        {chapter.number > 1 && (
          <Link
            to={`/read/${id}/${chapter.number - 1}`}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            السابق
          </Link>
        )}
        {manga.chapters && chapter.number < manga.chapters.length && (
          <Link
            to={`/read/${id}/${chapter.number + 1}`}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            التالي
          </Link>
        )}
      </div>
    </div>
  );
};

export default Reader;
