import { Manga } from '@/types/manga';

// Using uploaded images
const attackTitanCover = 'https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg';
const onePieceCover = 'https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_.jpg';
const soloLevelingCover = 'https://www.bdfugue.com/media/catalog/product/cache/0d950bd4d3aaddc02a824ea154d9c41e/9/7/9782382882559_1_75.webp';
const demonSlayerCover = 'https://casablanca.megarama.ma/public/films/affiches/342_456/0598p10250016575ce74.jpg';
const blueLockCover = 'https://images.epagine.fr/254/9782811650254_1_75.jpg';
const narutoCover = 'https://m.media-amazon.com/images/M/MV5BNTk3MDA1ZjAtNTRhYS00YzNiLTgwOGEtYWRmYTQ3NjA0NTAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg';
const hunterCover = 'https://www.nautiljon.com/images/anime/00/98/hunter_x_hunter_2011_2089.webp';
const bleachCover = 'https://www.nautiljon.com/images/anime/00/61/bleach_sennen_kessen-hen_9416.webp';
const dbzCover = 'https://i.redd.it/0ro9ciopz7ra1.jpg';
const towerCover = 'https://upload.wikimedia.org/wikipedia/en/a/a5/Tower_of_God_season_2_poster.jpg';
const sakamotoCover = 'https://m.arabseed.show/wp-content/uploads/2025/07/Sakamoto-Days-2-scaled.webp';

export const mangaData: Record<string, Manga> = {
  'attack-titan': {
    id: 'attack-titan',
    title: 'هجوم العمالقة',
    titleEn: 'Attack on Titan',
    author: 'هاجيمي إيساياما',
    status: 'مكتمل',
    genres: ['أكشن', 'دراما', 'خيال'],
    rating: '9.0/10',
    description: 'في عالم حيث تهدد العمالقة الإنسانية، ينضم إيرين ييغر إلى فيلق الاستطلاع للقتال ضد هذه الوحوش الغامضة واكتشاف الحقيقة وراء وجودها.',
    cover: attackTitanCover,
    chapters: [
      { number: 139, title: 'نحو الشجرة على ذلك التل', pages: 45 },
      { number: 138, title: 'زمن طويل', pages: 43 },
      { number: 137, title: 'العمالقة', pages: 41 },
      { number: 136, title: 'عبر السماء', pages: 39 }
    ],
    type: 'manga'
  },
  
  'one-piece': {
    id: 'one-piece',
    title: 'ون بيس',
    titleEn: 'One Piece',
    author: 'إييتشيرو أودا',
    status: 'مستمر',
    genres: ['مغامرة', 'كوميدي', 'أكشن'],
    rating: '9.2/10',
    description: 'مونكي دي لوفي، شاب ذو قوى مطاطية، يسافر مع طاقمه من القراصنة بحثاً عن الكنز الأسطوري المعروف باسم "ون بيس".',
    cover: onePieceCover,
    chapters: [
      { number: 1098, title: 'ولد في هذا العالم', pages: 17 },
      { number: 1097, title: 'جيني', pages: 19 },
      { number: 1096, title: 'كوماتشي', pages: 18 },
      { number: 1095, title: 'عالم صالح للعيش', pages: 16 }
    ],
    type: 'manga'
  },
  'solo-leveling': {
    id: 'solo-leveling',
    title: 'سولو ليفلنج',
    titleEn: 'Solo Leveling',
    author: 'تشوغونغ',
    status: 'مكتمل',
    genres: ['أكشن', 'خيال', 'مغامرة'],
    rating: '8.9/10',
    description: 'في عالم حيث ظهرت بوابات تحتوي على وحوش، يصبح سونغ جين وو، أضعف الصيادين، أقوى محارب بمفرده.',
    cover: soloLevelingCover,
    chapters: [
      { number: 179, title: 'النهاية', pages: 23 },
      { number: 178, title: 'المعركة الأخيرة', pages: 21 },
      { number: 177, title: 'الملك الظل', pages: 19 },
      { number: 176, title: 'القوة الحقيقية', pages: 20 }
    ],
    type: 'manhwa'
  },
  'demon-slayer': {
    id: 'demon-slayer',
    title: 'قاتل الشياطين',
    titleEn: 'Demon Slayer',
    author: 'كويوهارو غوتوغي',
    status: 'مكتمل',
    genres: ['أكشن', 'خارق للطبيعة', 'شونين'],
    rating: '8.7/10',
    description: 'تانجيرو كاماو، فتى يصبح قاتل شياطين للانتقام لعائلته وعلاج أخته التي تحولت إلى شيطان.',
    cover: demonSlayerCover,
    chapters: [
      { number: 205, title: 'الحياة تتألق', pages: 23 },
      { number: 204, title: 'عد', pages: 21 },
      { number: 203, title: 'عد إلى البيت', pages: 19 },
      { number: 202, title: 'أقوى من أي شيطان', pages: 20 }
    ],
    type: 'manga'
  },
  'blue-lock': {
    id: 'blue-lock',
    title: 'Blue Lock',
    titleEn: 'Blue Lock',
    author: 'Muneyuki Kaneshiro',
    status: 'مستمر',
    genres: ['رياضي', 'شونين', 'تشويق'],
    rating: '8.5/10',
    description: 'بعد خروج اليابان من كأس العالم، تبدأ الحكومة مشروعاً ثورياً للعثور على أعظم مهاجم أناني: "Blue Lock".',
    cover: blueLockCover,
    chapters: [
      { number: 270, title: 'إصرار إيساجي', pages: 18 },
      { number: 269, title: 'المواجهة الكبرى', pages: 19 },
      { number: 268, title: 'الهدف الحاسم', pages: 17 }
    ],
    type: 'manga'
  },
  'naruto': {
    id: 'naruto',
    title: 'ناروتو',
    titleEn: 'Naruto',
    author: 'ماساشي كيشيموتو',
    status: 'مكتمل',
    genres: ['أكشن', 'مغامرة', 'شونين'],
    rating: '8.7/10',
    description: 'ناروتو أوزوماكي، نينجا شاب يسعى للحصول على الاعتراف من أقرانه ويحلم بأن يصبح هوكاجي، زعيم قريته.',
    cover: narutoCover,
    chapters: [
      { number: 700, title: 'الجيل القادم', pages: 45 },
      { number: 699, title: 'ناروتو وساسكي', pages: 43 },
      { number: 698, title: 'ناروتو وساسكي 4', pages: 41 },
      { number: 697, title: 'ناروتو وساسكي 3', pages: 39 }
    ],
    type: 'manga'
  },

  'hunter-x-hunter': {
  id: 'hunter-x-hunter',
  title: 'القناص',
  titleEn: 'Hunter x Hunter',
  author: 'يوشيرو توغاشي',
  status: 'مستمر',
  genres: ['أكشن', 'مغامرة', 'شونين', 'فانتازيا'],
  rating: '9.0/10',
  description: 'غون فريكس، فتى صغير يسعى لأن يصبح صيادًا محترفًا مثل والده، ويخوض مغامرات مليئة بالتحديات مع أصدقائه كيلوا، كورابيكا، وليوريو.',
  cover: hunterCover,
  chapters: [
    { number: 390, title: 'التوازن', pages: 25 },
    { number: 389, title: 'غريزة', pages: 23 },
    { number: 388, title: 'انتصار صغير', pages: 21 },
    { number: 387, title: 'الموعد', pages: 22 }
  ],
  type: 'manga'
},

'bleach': {
  id: 'bleach',
  title: 'بليتش',
  titleEn: 'Bleach',
  author: 'تيتي كوبو',
  status: 'مكتمل',
  genres: ['أكشن', 'شونين', 'خارق للطبيعة'],
  rating: '8.2/10',
  description: 'إيتشيغو كوروساكي، مراهق يكتسب قوى الشينيغامي ويحارب الأرواح الشريرة لحماية البشر وعالم الأرواح.',
  cover: bleachCover,
  chapters: [
    { number: 686, title: 'موت بديل شينيغامي', pages: 30 },
    { number: 685, title: 'الموت الحقيقي', pages: 28 },
    { number: 684, title: 'العدو الأخير 2', pages: 26 },
    { number: 683, title: 'العدو الأخير 1', pages: 24 }
  ],
  type: 'manga'
},

'dbz': {
  id: 'dbz',
  title: 'دراغون بول Z',
  titleEn: 'Dragon Ball Z',
  author: 'أكيرا تورياما',
  status: 'مكتمل',
  genres: ['أكشن', 'مغامرة', 'شونين', 'فانتازيا'],
  rating: '9.1/10',
  description: 'غوكو وأصدقاؤه يدافعون عن الأرض ضد أعداء أقوياء، من السايانز إلى فريزا، سيل، وماجين بو.',
  cover: dbzCover,
  chapters: [
    { number: 325, title: 'وداعًا، دراغون وورلد', pages: 45 },
    { number: 324, title: 'النهاية!', pages: 43 },
    { number: 323, title: 'روح موحدة', pages: 41 },
    { number: 322, title: 'انفجار كامي-ساما', pages: 39 }
  ],
  type: 'manga'

},

'towerofgod': {
    id: 'towerofgod',
    title: 'برج الإله',
    titleEn: 'The Tower of God',
    author: 'SIU',
    status: 'مستمر',
    genres: ['أكشن', 'فانتازيا', 'مغامرة'],
    rating: '9.1/10',
    description: 'يبدأ الطفل “بام” رحلته في البرج حيث كل طابق يمثل تحديًا جديدًا، بحثًا عن صديقته راشيل.',
    cover: towerCover,
    chapters: [
      { number: 523, title: 'الباب الأول', pages: 40 },
      { number: 522, title: 'اختبار الطابق', pages: 38 },
      { number: 521, title: 'اللقاء', pages: 42 }
    ],
    type: 'manhwa'
  },

  'sakamotodays': {
  id: 'sakamotodays',
  title: 'أيام ساكاموتو',
  titleEn: 'Sakamoto Days',
  author: 'Yuto Suzuki',
  status: 'مستمر',
  genres: ['أكشن', 'كوميديا', 'شونين'],
  rating: '8.7/10',
  description: 'ساكاموتو، القاتل الأسطوري السابق، كيعيش حياة هادئة كمالك لمتجر صغير. ولكن ماضيه مازال كيتبعه وكيجرّو لمواجهات خطيرة ملي كيتعرض أقرباؤه للخطر.',
  cover: sakamotoCover, 
  chapters: [
    { number: 171, title: 'المواجهة', pages: 20 },
    { number: 170, title: 'خطة الاختطاف', pages: 21 },
    { number: 169, title: 'عودة الماضي', pages: 19 }
  ],
  type: 'manga'
}

}
