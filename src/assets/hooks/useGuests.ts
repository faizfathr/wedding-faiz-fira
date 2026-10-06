import { useParams } from "react-router-dom";
import {
  DEFAULT_GUEST,
  GUESTS,
  type Guest,
} from "../guests";

type GuestParams = {
  guestSlug?: string;
};

export default function useGuest(): Guest {
  const { guestSlug } = useParams<GuestParams>();

  if (!guestSlug) {
    return DEFAULT_GUEST;
  }

  const normalizedSlug = decodeURIComponent(
    guestSlug,
  )
    .trim()
    .toLowerCase();

  return GUESTS[normalizedSlug] ?? DEFAULT_GUEST;
}