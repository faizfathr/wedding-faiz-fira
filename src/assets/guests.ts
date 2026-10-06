export type Guest = {
    displayName: string;
    greeting: string;
}

export const GUESTS: Record<string, Guest> = {
    "tresco": {
        displayName: "Tresco",
        greeting: "Dentan penuh kebahagian, kami mengundang teman - teman Tresco untuk hadir dan merayakan hari bahagia kami. Kehadiran kalian akan menjadi kenangan yang tak terlupakan bagi kami.",
    },
    "stritpud": {
        displayName: "Wong Stritpud",
        greeting: "Dentan penuh kebahagian, kami mengundang teman - teman Stritpud untuk hadir dan merayakan hari bahagia kami. Kehadiran kalian akan menjadi kenangan yang tak terlupakan bagi kami.",
    },
    "bonsay-bonasut": {
        displayName: "Bonsay - Bonasut",
        greeting: "Dentan penuh kebahagian, kami mengundang teman - teman Bonsay - Bonasut untuk hadir dan merayakan hari bahagia kami. Kehadiran kalian akan menjadi kenangan yang tak terlupakan bagi kami.",
    }
}

export const DEFAULT_GUEST: Guest = {
    displayName: "Tamu Undangan",
    greeting: "Dentan penuh kebahagian, kami turut mengundang Anda untuk hadir dan merayakan hari bahagia kami. Kehadiran Anda akan menjadi kenangan yang tak terlupakan bagi kami.",
}