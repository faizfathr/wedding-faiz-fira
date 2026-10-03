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
    venue: "Aula Masjid Raya Mamuju",
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
    description: "Awal tahun 2024, kami kembali dipertemukan saat menjalani magang di BPS Jakarta Barat. Entah kenapa, hampir setiap kali berbicara selalu saja berakhir dengan perdebatan kecil.Namun benar kata orang, semakin sering bertemu, semakin banyak cerita yang dibagi, rasa itu bisa berubah tanpa disadari. Hingga di hari terakhir magang, kami memutuskan untuk saling mengenal satu sama lain lebih jauh.",
  },
  {
    year: "2025",
    title: "Menjaga yang Sudah Ditemukan",
    description: "Setelah resmi lulus, kami menjalani hubungan jarak jauh antara Kalimantan Barat dan Sulawesi Barat. Bukan perjalanan yang selalu mudah, tapi setiap rindu, setiap cerita, dan setiap usaha untuk saling menjaga membuat kami semakin yakin bahwa hubungan ini layak diperjuangkan.",
  },
  {
    year: "2026",
    title: "Memilih selamanya",
    description: "Februari 2026 menjadi salah satu hari paling berharga dalam perjalanan kami. Faiz bersama keluarganya datang melamar Fira. Setelah melalui perjalanan yang penuh cerita, kami menyadari bahwa yang membuat kami bertahan bukan karena semuanya selalu mudah, tetapi karena kami selalu memilih untuk saling memahami, saling mendukung, dan terus bertumbuh bersama.",
  },
];

const MEMORY_ALBUM = [
  {
    src: "/images/galleries/album-01.jpg",
    alt: "Kenangan bersama pertama",
    className: "md:col-span-4 md:row-span-5 -rotate-2",
    objectPosition: "object-center",
  },
  {
    src: "/images/galleries/album-02.jpeg",
    alt: "Kenangan perjalanan bersama",
    className: "md:col-span-3 md:row-span-4 rotate-2 md:translate-y-7",
    objectPosition: "object-center",
  },
  {
    src: "/images/galleries/album-03.jpeg",
    alt: "Kenangan hari istimewa",
    className: "md:col-span-5 md:row-span-4 -rotate-1",
    objectPosition: "object-top",
  },
  {
    src: "/images/galleries/album-04.jpeg",
    alt: "Kenangan bersama keluarga",
    className: "md:col-span-3 md:row-span-4 rotate-3 md:-translate-y-3",
    objectPosition: "object-center",
  },
  {
    src: "/images/galleries/album-05.jpeg",
    alt: "Kenangan senja bersama",
    className: "md:col-span-5 md:row-span-5 -rotate-2 md:translate-y-5",
    objectPosition: "object-center",
  },
  {
    src: "/images/galleries/album-06.jpeg",
    alt: "Kenangan perjalanan menuju pernikahan",
    className: "md:col-span-4 md:row-span-4 rotate-1",
    objectPosition: "object-top",
  },
  {
    src: "/images/galleries/album-07.jpeg",
    alt: "Kenangan sederhana bersama",
    className: "md:col-span-5 md:row-span-4 rotate-2 md:-translate-y-5",
    objectPosition: "object-center",
  },
  {
    src: "/images/galleries/album-08.jpeg",
    alt: "Kenangan menjelang hari pernikahan",
    className: "md:col-span-3 md:row-span-5 -rotate-3 md:translate-y-4",
    objectPosition: "object-center",
  },
] as const;

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

const MUSIC_URL = "https://www.youtube.com/watch?v=BqFEtDsTUrQ&list=RDBqFEtDsTUrQ&start_radio=1";

export { WEDDING, NAV_ITEMS, EVENTS, STORIES, MEMORY_ALBUM, EASE, MUSIC_URL, HANGING_PHOTOS };