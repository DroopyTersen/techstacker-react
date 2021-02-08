import { cachify } from "../common/cache";
import useAsyncData from "./useAsyncData";

var _previewLink = async function (linkUrl): Promise<LinkPreview> {
  if (!linkUrl) return { url: "" };
  const API_KEY = "5dfdb5c52d4bb8f14179f61cad1a80133387187c01092";
  let apiUrl = `https://api.linkpreview.net/?key=${API_KEY}&q=${linkUrl}`;
  let resp = await fetch(apiUrl);
  if (!resp.ok) {
    let error = await resp.text();
    throw new Error("Unable to preview link:" + error);
  }
  return resp.json();
};

const CACHE_DURATION = 1000 * 60 * 60 * 40;

export const previewLink = cachify(_previewLink, {
  getCacheKey: (...args) => "LinkPreview-" + JSON.stringify(args),
  location: sessionStorage,
  duration: CACHE_DURATION,
}) as (url: string) => Promise<LinkPreview>;

export interface LinkPreview {
  title?: string;
  url: string;
  description?: string;
  image?: string;
}

export default function useLinkPreview(linkUrl: string) {
  let { data, isLoading, error } = useAsyncData<LinkPreview>(previewLink, [linkUrl], {
    url: linkUrl,
  });

  return data;
}
