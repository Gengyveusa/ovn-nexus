"use client";

import { useEffect, useState, type AnchorHTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import { campaignLink, currentCampaign } from "@/lib/campaign-attribution";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  placement: string;
};

/** Static tagged href works without JS; hydration adds page and invitation context. */
export function CampaignLink({ href, placement, onClick, onAuxClick, ...props }: Props) {
  const pathname = usePathname() || "/";
  const [taggedHref, setTaggedHref] = useState(() => campaignLink(href, placement, pathname));
  const resolve = () => campaignLink(href, placement, window.location.pathname, currentCampaign());
  useEffect(() => {
    setTaggedHref(resolve());
    // Context is deliberately read from the browser rather than a Suspense query hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, placement, pathname]);
  return <a {...props} href={taggedHref}
    onClick={event => { event.currentTarget.href = resolve(); onClick?.(event); }}
    onAuxClick={event => { event.currentTarget.href = resolve(); onAuxClick?.(event); }} />;
}

export function CaptureCampaign() {
  const pathname = usePathname();
  useEffect(() => { currentCampaign(); }, [pathname]);
  return null;
}
