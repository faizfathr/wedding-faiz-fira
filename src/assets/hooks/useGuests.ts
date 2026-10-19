import {
  useEffect,
  useState,
} from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbytxJvz-K_Bjgu6h-M5AEz2_QVBpXqI-9zPfVa3XeU2hF6sUJYGrdWLmxfqO9eX7dxVYg/exec";

type RouteParams = {
  groupSlug?: string;
};

export type PersonalGuest = {
  groupSlug: string;
  guestSlug: string;
  displayName: string;
  displayGroup: string;
  greetings: string;
};

type GuestApiResponse = {
  success?: boolean;
  found?: boolean;
  guest?: PersonalGuest;
  message?: string;
};

type PersonalGuestState = {
  guest: PersonalGuest;
  loading: boolean;
  found: boolean;
};

const DEFAULT_GUEST: PersonalGuest = {
  groupSlug: "undangan-umum",
  guestSlug: "tamu-undangan",
  displayName: "",
  displayGroup: "Tamu Undangan",
  greetings: ""
};

export default function useGuest(): PersonalGuestState {
  const { groupSlug } =
    useParams<RouteParams>();

  const [searchParams] =
    useSearchParams();

  const guestSlug =
    searchParams.get("to")?.trim() ?? "";

  const [state, setState] =
    useState<PersonalGuestState>({
      guest: DEFAULT_GUEST,
      loading: true,
      found: false,
    });

  useEffect(() => {
    const normalizedGroup =
      groupSlug?.trim().toLowerCase() ?? "";

    const normalizedGuest =
      guestSlug.toLowerCase();

    if (
      !normalizedGroup ||
      !normalizedGuest
    ) {
      setState({
        guest: DEFAULT_GUEST,
        loading: false,
        found: false,
      });

      return;
    }

    const controller =
      new AbortController();

    async function loadGuest(): Promise<void> {
      try {
        setState((current) => ({
          ...current,
          loading: true,
        }));

        const query =
          new URLSearchParams({
            mode: "guest",
            group: normalizedGroup,
            to: normalizedGuest,
          });

        const response = await fetch(
          `${GOOGLE_SCRIPT_URL}?${query.toString()}`,
          {
            signal: controller.signal,
          },
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Guest lookup failed: ${GOOGLE_SCRIPT_URL}?${query.toString()}`,
              );
            }
            return response;
          });

        const result =
          (await response.json()) as GuestApiResponse;

        if (
          result.success === true &&
          result.found === true &&
          result.guest
        ) {

          setState({
            guest: result.guest,
            loading: false,
            found: true,
          });

          return;
        }

        setState({
          guest: DEFAULT_GUEST,
          loading: false,
          found: false,
        });
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Could not load invited guest:",
          error,
        );

        setState({
          guest: DEFAULT_GUEST,
          loading: false,
          found: false,
        });
      }
    }

    void loadGuest();

    return () => {
      controller.abort();
    };
  }, [groupSlug, guestSlug]);

  return state;
}