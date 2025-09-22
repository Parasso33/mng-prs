import React, { useState, useEffect } from "react";

const token = "personal-client-08685863-b7bd-413a-8d5d-8d50fe3629eb-241e4a7b"
// ================================

export async function fetchMangas(limit = 100) {
  const res = await fetch(
    `https://api.mangadex.org/manga?limit=${limit}`,{
  method: "GET",
  headers: {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json"
  }}
  );
  const data = await res.json();
  return data.data; // نرجعو array ديال الفصول
}

// 1️⃣ جلب الفصول بالعربية
export async function fetchChapters(mangaId, limit = 100) {
  const res = await fetch(
    `https://api.mangadex.org/manga?limit=${limit}`,{
  method: "GET",
  headers: {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json"
  }}
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

