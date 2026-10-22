export type Attendance =
  | "Hadir"
  | "Tidak dapat hadir"
  | "Masih tentatif";

export type RSVPStatus =
  | "idle"
  | "saving"
  | "success"
  | "error";

export type RSVPEntry = {
  id: string;
  name: string;
  group: string;
  attendance: Attendance;
  guests: number;
  message: string;
  createdAt: string;
};

export type RSVPForm = Omit<
  RSVPEntry,
  "id" | "createdAt"
>;

export type RSVPResponse = {
  success?: boolean;
  message?: string;
};