import Image from "next/image";
import { Scene, type SceneName } from "@/components/art/scenes";

/**
 * The image seam. Every visual in the site goes through here: give it a photo
 * path and it renders the photo, leave the path null and it renders the
 * illustrated scene for that place. The wrapper owns the aspect ratio either
 * way, so replacing artwork with photography can never shift the layout.
 */
export function MediaFrame({
  photo,
  alt,
  scene,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  tone,
}: {
  photo: string | null;
  alt: string;
  scene: SceneName;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "dusk" | "night" | "dawn";
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photo ? (
        <Image
          src={photo}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <Scene name={scene} tone={tone} className={`h-full w-full object-cover ${imageClassName}`} />
      )}
    </div>
  );
}
