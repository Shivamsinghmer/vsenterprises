"use client";;
import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function LazyImage({
    alt,
    src,
    ratio,
    fallback,
    inView = false,
    className,
    containerClassName
}) {
	const ref = React.useRef(null);
	const imgRef = React.useRef(null);
	const isInView = useInView(ref, { once: true });

	const [imgSrc, setImgSrc] = React.useState(inView ? undefined : src);
	const [isLoading, setIsLoading] = React.useState(true);

	const handleError = () => {
		if (fallback) {
			setImgSrc(fallback);
		}
		setIsLoading(false);
	};

	const handleLoad = React.useCallback(() => {
		setIsLoading(false);
	}, []);

	// Load image only when inView
	React.useEffect(() => {
		if (inView && isInView && !imgSrc) {
			setImgSrc(src);
		}
	}, [inView, isInView, src, imgSrc]);

	// Handle cached images instantly
	React.useEffect(() => {
		if (imgRef.current?.complete) {
			handleLoad();
		}
	}, [handleLoad]);

	return (
        <AspectRatio
            className={cn(
                "relative size-full overflow-hidden border bg-accent/30",
                containerClassName
            )}
            ratio={ratio}
            ref={ref}>
            {imgSrc && (
				// biome-ignore lint/correctness/useImageSize: dynamic image size
				(<img
                    alt={alt}
                    className={cn(
                        "size-full object-cover transition-opacity duration-500",
                        isLoading ? "opacity-0" : "opacity-100",
                        className
                    )}
                    decoding="async"
                    fetchPriority={inView ? "high" : "low"}
                    loading="lazy"
                    onError={handleError}
                    onLoad={handleLoad}
                    ref={imgRef}
                    // Changed from "img" to "presentation" since it's decorative
                    role="presentation"
                    src={imgSrc} />)
			)}
        </AspectRatio>
    );
}
