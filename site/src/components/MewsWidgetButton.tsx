"use client";

import { useEffect, useRef, useState } from "react";

interface MewsDistributorApi {
  open: () => void;
  setCurrencyCode: (currencyCode: string) => void;
  setLanguageCode: (languageCode: string) => void;
}

interface MewsDistributorOptions {
  configurationIds: string[];
}

interface MewsDistributorRuntimeOptions {
  dataBaseUrl?: string;
}

interface WindowWithMews extends Window {
  Mews?: {
    Distributor: (
      options: MewsDistributorOptions,
      callback: (api: MewsDistributorApi) => void,
      runtimeOptions?: MewsDistributorRuntimeOptions,
    ) => void;
  };
}

const configurationId = process.env.NEXT_PUBLIC_MEWS_CONFIGURATION_ID ?? "";
const apiUrl =
  process.env.NEXT_PUBLIC_MEWS_API_URL ?? "https://api.mews-demo.com";
const languageCode = process.env.NEXT_PUBLIC_MEWS_LANGUAGE_CODE ?? "en-US";
const currencyCode = process.env.NEXT_PUBLIC_MEWS_CURRENCY_CODE ?? "USD";

export default function MewsWidgetButton() {
  const [isReady, setIsReady] = useState(false);
  const apiRef = useRef<MewsDistributorApi | null>(null);

  useEffect(() => {
    if (!configurationId) {
      return;
    }

    const distributor = (window as WindowWithMews).Mews?.Distributor;

    if (!distributor) {
      return;
    }

    distributor(
      { configurationIds: [configurationId] },
      (api: MewsDistributorApi) => {
        if (languageCode) {
          api.setLanguageCode(languageCode);
        }

        if (currencyCode) {
          api.setCurrencyCode(currencyCode);
        }

        apiRef.current = api;
        setIsReady(true);
      },
      apiUrl.includes("mews-demo.com") ? { dataBaseUrl: apiUrl } : undefined,
    );
  }, []);

  const enabled = Boolean(configurationId) && isReady;
  const buttonLabel = configurationId
    ? "Open Mews booking widget"
    : "Set NEXT_PUBLIC_MEWS_CONFIGURATION_ID to enable booking";
  const status = configurationId
    ? isReady
      ? "Widget ready."
      : "Mews widget script is still loading."
    : "";

  return (
    <>
      <button
        className="booking-widget__button"
        disabled={!enabled}
        onClick={() => apiRef.current?.open()}
        type="button"
      >
        {buttonLabel}
      </button>
      <p className="booking-widget__status" id="mews-widget-status">
        {status}
      </p>
    </>
  );
}
