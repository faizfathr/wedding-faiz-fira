import { Home, Users, CalendarDays, ScrollText, Images, MessageCircleHeart, Gift } from "lucide-react";

type NavItem = { label: string; target: string; icon: React.ComponentType<{ className?: string }> };
type EventItem = { title: string; time: string; description: string; region: string; venue: string; date: string; address: string; mapsUrl: string };
type StoryItem = { year: string; title: string; description: string };

const WEDDING = {
  groom: {
    firstName: "Faiz",
    fullName: "Faiz Fathur Rahman",
    parents: "Putra Pertama dari Bapak Safari Hamzah dan Ibu Leli Zuhairiah",
    origin: "Keluarga Kalimantan Barat",
    photo: "../images/Groom.jpeg",
  },
  bride: {
    firstName: "Fira",
    fullName: "Mutmagfira M",
    parents: "Putri Terakhir dari Bapak Ma'amun Ali dan Ibu Hasnawati",
    origin: "Keluarga Sulawesi Barat",
    photo: "../images/Bride.jpeg",
  },
  isoDate: "2026-11-16T09:00:00+07:00",
  displayDate: "Sabtu, 16 November 2026",
  bankAccounts: [
    {
      bank: "Bank Syariah Indonesia",
      shortBank: "BSI",
      accountNumber: "7222134859",
      accountName: "Mutmagfira M",
    },
    {
      bank: "Shopeepay",
      shortBank: "Shopeepay",
      accountNumber: "082290544859",
      accountName: "Mutmagfira M",
    },
  ],
  giftAddress: "Jl. Yos Sudarso No. 19, Singkawang, Kalimantan Barat",
};


const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", target: "home", icon: Home },
  { label: "Mempelai", target: "couple", icon: Users },
  { label: "Acara", target: "events", icon: CalendarDays },
  { label: "Cerita", target: "story", icon: ScrollText },
  { label: "Galeri", target: "gallery", icon: Images },
  { label: "Hadiah", target: "gift", icon: Gift },
  { label: "RSVP", target: "rsvp", icon: MessageCircleHeart },
];

const EVENTS: EventItem[] = [
  {
    region: "Sulawesi Barat",
    title: "Akad Nikah & Resepsi",
    time: "09.00 – 16.00 WITA",
    description: "Prosesi pernikahan dan acara resepsi.",
    venue: "Masjid Raya Suada",
    date: "2026-11-16T09:00:00+07:00",
    address: "Jl. A.P. Pettarani, Kabupaten Mamuju",
    mapsUrl: "https://maps.app.goo.gl/WEt1DZC83VtEsyzG7",
  },
  {
    region: "Kalimantan Barat",
    title: "Resepsi",
    time: "11.00 – 16.00 WIB",
    description: "Ramahi tamah dan jamuan bersama para tamu.",
    venue: "Rumah Adat Meyalu",
    date: "2026-11-28T11:00:00+07:00",
    address: "Jl. Alianyang, Melayu, Kec. Singkawang Barat, Kota Singkawang",
    mapsUrl: "https://maps.app.goo.gl/d1cMhRYdoQVz2npP6"
  },
];

const STORIES: StoryItem[] = [
  {
    year: "2022",
    title: "Berawal dari Sebuah Pertemuan",
    description: "Kami dipertemukan di Politeknik Statistika STIS. Ada di tempat yang sama, bertemu setiap saat, tetapi belum pernah benar-benar saling mengenal. Saat itu kami sedang sibuk menyelesaikan semester akhir perkuliahan, jadi hubungan kami tidak lebih dari sekadar teman biasa.",
  },
  {
    year: "2024",
    title: "Semesta Punya Cara",
    description: "Awal tahun 2024, kami kembali dipertemukan saat menjalani magang di BPS Jakarta Barat. Entah kenapa, hampir setiap kali berbicara selalu saja berakhir dengan perdebatan kecil. Fira bahkan pernah berpikir" + " 'Kok ada ya orang senyebelin ini?'" + " Tapi ternyata benar kata orang, semakin sering bertemu, semakin banyak cerita yang dibagi, rasa itu bisa berubah tanpa disadari. Yang awalnya hanya kesal, perlahan berubah menjadi nyaman. Hingga di hari terakhir magang, kami memutuskan untuk saling mengenal satu sama lain lebih jauh.",
  },
  {
    year: "2025",
    title: "Menjaga yang Sudah Ditemukan",
    description: "Setelah resmi lulus, kami menjalani hubungan jarak jauh antara Kalimantan Barat dan Sulawesi Barat. Bukan perjalanan yang selalu mudah, tapi setiap rindu, setiap cerita, dan setiap usaha untuk saling menjaga membuat kami semakin yakin bahwa hubungan ini layak diperjuangkan. Di penghujung tahun, Faiz datang ke Sulawesi untuk bertemu keluarga Fira dan menyampaikan niat baiknya untuk melangkah ke jenjang yang lebih serius.",
  },
  {
    year: "2026",
    title: "Memilih selamanya",
    description: "Februari 2026 menjadi salah satu hari paling berharga dalam perjalanan kami. Faiz bersama keluarganya datang melamar Fira. Setelah melalui perjalanan yang penuh cerita, kami menyadari bahwa yang membuat kami bertahan bukan karena semuanya selalu mudah, tetapi karena kami selalu memilih untuk saling memahami, saling mendukung, dan terus bertumbuh bersama.",
  },
];

const GALLERY = [
  {
    title: "Pertemuan",
    caption: "Sebuah awal yang sederhana",
    gradient: "from-theme-accent to-theme-primary",
    photoUrl: "../images/gallery-1.jpg",
    mapsUrl: "https://www.google.com/maps/place/Masjid+Raya+Suada+-+Mamuju/@-2.6750856,118.8858592,17z/data=!3m1!4b1!4m6!3m5!1s0x2d92d9b47a147161:0x7177e0b4de6e3d7e!8m2!3d-2.675091!4d118.8884341!16s%2Fg%2F12mq2trll?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "Keluarga",
    caption: "Dua rumah, satu tujuan",
    gradient: "from-theme-surface-elevated to-theme-primary-dark",
    photoUrl: "../images/gallery-2.jpeg",
  },
  {
    title: "Janji",
    caption: "Melangkah bersama",
    gradient: "from-theme-primary to-theme-primary-dark",
    photoUrl: "../images/gallery-3.jpeg",
  },
];

const HANGING_PHOTOS = [
  {
    src: "/images/hanging-1.jpeg",
    alt: "kenangan-1",
    rotation: "-rotate-3",
  },
  {
    src: "/images/hanging-2.jpeg",
    alt: "kenangan-2",
    rotation: "rotate-2",
  },
  {
    src: "/images/hanging-3.jpeg",
    alt: "kenangan-3",
    rotation: "-rotate-2",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const MUSIC_URL = "https://res.cloudinary.com/dxjv0gq1k/video/upload/v1697030915/2026-11-16_09-00-00_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_mzq3xj.mp3";

export { WEDDING, NAV_ITEMS, EVENTS, STORIES, GALLERY, EASE, MUSIC_URL, HANGING_PHOTOS };