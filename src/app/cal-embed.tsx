"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CalEmbed() {
  useEffect(() => {
    void (async function () {
      const cal = await getCalApi();
      cal("floatingButton", { calLink: "juliusm" });
      cal("ui", {
        styles: {
          branding: { brandColor: "#282524" },
        },
      });
    })();
  }, []);
  return null;
}
