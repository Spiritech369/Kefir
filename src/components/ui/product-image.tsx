"use client";

import { Milk } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#fffdf8_0%,#e3eadf_48%,#cbd8ca_100%)] ${className}`}
    >
      {!failed ? (
        <Image
          alt={alt}
          className="object-cover transition duration-500 hover:scale-[1.025]"
          fill
          onError={() => setFailed(true)}
          priority={priority}
          sizes={sizes}
          src={src}
          // The generated WebP files are already compressed. This also keeps the
          // local preview independent from Cloudflare's optional IMAGES binding.
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-leaf-dark">
          <div>
            <Milk aria-hidden="true" className="mx-auto mb-3 opacity-70" size={40} />
            <p className="text-sm font-semibold">Imagen pendiente de reemplazo</p>
          </div>
        </div>
      )}
    </div>
  );
}
