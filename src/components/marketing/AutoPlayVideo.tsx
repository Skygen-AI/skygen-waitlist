"use client";
import React from "react";

type AutoPlayVideoProps = {
  poster?: string;
  className?: string;
  webmSrc?: string;
  mp4Src?: string;
};

export default function AutoPlayVideo({ poster, className, webmSrc, mp4Src }: AutoPlayVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const tryPlay = React.useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const p = el.play();
    if (p && typeof p.then === "function") {
      p.catch(() => {
        // ignore autoplay blocking; will retry on canplay
      });
    }
  }, []);

  React.useEffect(() => {
    tryPlay();
    const el = videoRef.current;
    if (!el) return;
    const onCanPlay = () => tryPlay();
    const onLoaded = () => tryPlay();
    el.addEventListener("canplay", onCanPlay);
    el.addEventListener("loadedmetadata", onLoaded);
    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [tryPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      controlsList="nodownload noplaybackrate nofullscreen"
      disablePictureInPicture
      // @ts-expect-error vendor attr for iOS
      webkit-playsinline="true"
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      {mp4Src && <source src={mp4Src} type="video/mp4" />}    
    </video>
  );
}


