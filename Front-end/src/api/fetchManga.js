import React, { useState, useEffect } from "react";

// ================================
// 1️⃣ جلب الفصول بالعربية
export async function fetchChapters(mangaId, limit = 20) {
    const res = await fetch(
        `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=ar&limit=${limit}`
    );
    const data = await res.json();
    return data.data; // نرجعو array ديال الفصول
}

// ================================
// 2️⃣ جلب صفحات فصل معين
export async function fetchChapterPages(chapterId) {
    const res = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
    const data = await res.json();

    const urls = data.chapter.data.map(
        (filename) => `${data.baseUrl}/data/${data.chapter.hash}/${filename}.jpg`
    );
    return urls; // نرجعو array ديال روابط الصور
}

// ================================
// 3️⃣ React Component (Reader)
export default function MangaReader({ mangaId }) {
    const [chapters, setChapters] = useState([]);
    const [pages, setPages] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);

    useEffect(() => {
        async function loadChapters() {
            const data = await fetchChapters(mangaId);
            setChapters(data);
        }
        loadChapters();
    }, [mangaId]);

    const handleChapterClick = async (chapterId) => {
        const urls = await fetchChapterPages(chapterId);
        setSelectedChapter(chapterId);
        setPages(urls);
    }
}
