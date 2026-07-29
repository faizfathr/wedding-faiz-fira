import { Home, Users, CalendarDays, ScrollText, Images, MessageCircleHeart, Gift } from "lucide-react";

type NavItem = { label: string; target: string; icon: React.ComponentType<{ className?: string }> };
type EventItem = { title: string; time: string; description: string };
type StoryItem = { year: string; title: string; description: string };

const WEDDING = {
  groom: {
    firstName: "Faiz",
    fullName: "Faiz Fathur Rahman",
    parents: "Putra dari Bapak Safari Hamzah dan Ibu Leli Zuhairiah",
    origin: "Keluarga Kalimantan Barat",
  },
  bride: {
    firstName: "Fira",
    fullName: "Mutmagfira M",
    parents: "Putri dari Bapak Maamun Ali dan Ibu Haryati",
    origin: "Keluarga Sulawesi Barat",
  },
  isoDate: "2026-11-16T09:00:00+07:00",
  displayDate: "Sabtu, 16 November 2026",
  venue: "Masjid Raya Suada",
  address: "Jl. A.P. Pettarani, Kabupaten Mamuju",
  mapsUrl: "https://www.google.com/maps/place/Masjid+Raya+Suada+-+Mamuju/@-2.6750856,118.8858592,17z/data=!3m1!4b1!4m6!3m5!1s0x2d92d9b47a147161:0x7177e0b4de6e3d7e!8m2!3d-2.675091!4d118.8884341!16s%2Fg%2F12mq2trll?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
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
    title: "Akad Nikah",
    time: "09.00 – 10.00 WITA",
    description: "Prosesi pernikahan dan doa bersama keluarga.",
  },
  {
    title: "Resepsi",
    time: "11.00 WITA – Selesai",
    description: "Ramahi tamah dan jamuan bersama para tamu.",
  },
];

const STORIES: StoryItem[] = [
  {
    year: "2021",
    title: "Pertama Bertemu",
    description: "Percakapan sederhana membawa kami pada pertemanan yang hangat.",
  },
  {
    year: "2024",
    title: "Menjalin Komitmen",
    description: "Kami belajar bertumbuh, saling mendukung, dan menyatukan dua keluarga.",
  },
  {
    year: "2026",
    title: "Menuju Hari Bahagia",
    description: "Dengan restu keluarga, kami siap memulai perjalanan baru bersama.",
  },
];

const GALLERY = [
  { title: "Pertemuan", caption: "Sebuah awal yang sederhana", gradient: "from-[#b6a17b] to-[#5d4935]" },
  { title: "Keluarga", caption: "Dua rumah, satu tujuan", gradient: "from-[#8d6b4b] to-[#3e3025]" },
  { title: "Janji", caption: "Melangkah bersama", gradient: "from-[#c0a978] to-[#6d523b]" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export { WEDDING, NAV_ITEMS, EVENTS, STORIES, GALLERY, EASE };