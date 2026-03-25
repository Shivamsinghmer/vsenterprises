//@ts-nocheck
"use client";
import { useCallback, useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

import { Button } from "@/components/ui/button"

// ─────────────────────────────────────────────
//  MAIN CAROUSEL
// ─────────────────────────────────────────────

const Carousel = (props) => {
  const {
    slides = [],
    options,
    thumbnails = [],
    thumbPosition = "bottom",
    showArrows = false,
    showProgress = true,
    showDots = true,
    showPlay = true,
    showCounter = false,
    keyboardNavigation = false,
    lightbox = false,
    transition = "slide",
    autoplayDelay = 3000,
    captions = [],
    className = "",
  } = props

  const progressNode = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    // fade mode uses a CSS trick; Embla doesn't support it natively but we
    // layer opacity via CSS class toggling driven by selectedIndex
  }, autoplayDelay > 0
    ? [Autoplay({ playOnInit: true, delay: autoplayDelay })]
    : [])

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  // ── Thumbnail sync ──
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  useEffect(() => {
    if (!emblaApi || !thumbEmblaApi) return
    emblaApi.on("select", () => {
      thumbEmblaApi.scrollTo(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi, thumbEmblaApi])

  // ── Keyboard navigation ──
  useEffect(() => {
    if (!keyboardNavigation || !emblaApi) return
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") emblaApi.scrollPrev()
      if (e.key === "ArrowRight") emblaApi.scrollNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey);
  }, [keyboardNavigation, emblaApi])

  // ── Lightbox close on Escape ──
  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox])

  const handleSlideClick = (index) => {
    if (!lightbox) return
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // ── Vertical thumbnail layout helper ──
  const isVerticalThumb =
    thumbnails && (thumbPosition === "left" || thumbPosition === "right")

  return (
    <div className={`flex relative w-full h-full ${isVerticalThumb ? "flex-row gap-3" : "flex-col"} ${className}`}>
      {/* ── Left Thumbnails ── */}
      {thumbnails && thumbPosition === "left" && (
        <ThumbStrip
          emblaRef={thumbEmblaRef}
          thumbnails={thumbnails}
          selectedIndex={selectedIndex}
          onDotButtonClick={onDotButtonClick}
          onAutoplayButtonClick={onAutoplayButtonClick}
          direction="vertical" />
      )}
      <div className="min-w-0 flex-1 h-full">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div
            className={`flex h-full touch-pan-y touch-pinch-zoom ${transition === "fade" ? "relative" : "mr-3 ml-auto"
              }`}>
            {slides.map((slideContent, index) => (
              <div
                key={index}
                onClick={() => handleSlideClick(index)}
                className={` h-full ${transition === "fade"
                  ? `absolute inset-0 transition-opacity duration-700 ${index === selectedIndex
                    ? "relative opacity-100"
                    : "absolute opacity-0"
                  }`
                  : "flex-[0_0_100%] transform-gpu pl-3"
                  } ${lightbox ? "cursor-zoom-in" : ""} `}>
                {slideContent}
              </div>
            ))}
          </div>
        </div>

        {/* ── Caption ── */}
        {captions && captions[selectedIndex] && (
          <p
            className="text-muted-foreground mt-2 px-4 text-center text-sm italic transition-all duration-300">
            {captions[selectedIndex]}
          </p>
        )}

        {/* ── Bottom Thumbnails ── */}
        {thumbnails && thumbPosition === "bottom" && (
          <ThumbStrip
            emblaRef={thumbEmblaRef}
            thumbnails={thumbnails}
            selectedIndex={selectedIndex}
            onDotButtonClick={onDotButtonClick}
            onAutoplayButtonClick={onAutoplayButtonClick}
            direction="horizontal" />
        )}

        {/* ── Controls Row ── */}
        <div className="mx-auto mt-7 flex max-w-100 items-center justify-center gap-3">
          {/* Arrows (left side) */}
          {showArrows && (
            <div className="flex items-center gap-1">
              <PrevButton
                onClick={() => onAutoplayButtonClick(() => onPrevButtonClick())}
                disabled={prevBtnDisabled} />
              <NextButton
                onClick={() => onAutoplayButtonClick(() => onNextButtonClick())}
                disabled={nextBtnDisabled} />
            </div>
          )}

          {/* Dots */}
          {showDots && (
            <div className="flex w-full justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() =>
                    onAutoplayButtonClick(() => onDotButtonClick(index))
                  }
                  className={`border-border h-3 w-3 rounded-full border-2 transition-colors duration-200 ${index === selectedIndex
                    ? "bg-foreground"
                    : "hover:bg-muted bg-transparent"
                    }`} />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          {showCounter && (
            <span
              className="text-muted-foreground w-full text-xs font-medium text-nowrap tabular-nums">
              {selectedIndex + 1} / {scrollSnaps.length}
            </span>
          )}

          {/* Progress Bar */}
          {showProgress && autoplayDelay > 0 && (
            <div
              className={`border-border bg-background relative h-2 w-full justify-center overflow-hidden rounded-sm border-2 transition-opacity duration-300 ease-in-out ${showAutoplayProgress ? "opacity-100" : "opacity-0"
                }`}>
              <div
                className="bg-foreground absolute top-0 bottom-0 -left-full w-full animate-[autoplay-progress_linear_1] [animation-play-state:running]"
                ref={progressNode}
                style={{
                  animationPlayState: showAutoplayProgress
                    ? "running"
                    : "paused",
                }} />
            </div>
          )}

          {showPlay && autoplayDelay > 0 && (
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={toggleAutoplay}
              type="button">
              {autoplayIsPlaying ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
            </Button>
          )}
        </div>
      </div>
      {/* ── Right Thumbnails ── */}
      {thumbnails && thumbPosition === "right" && (
        <ThumbStrip
          emblaRef={thumbEmblaRef}
          thumbnails={thumbnails}
          selectedIndex={selectedIndex}
          onDotButtonClick={onDotButtonClick}
          onAutoplayButtonClick={onAutoplayButtonClick}
          direction="vertical" />
      )}
      {/* ── Lightbox Overlay ── */}
      {lightbox && lightboxOpen && (
        <Lightbox
          slides={slides}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}

const ThumbStrip = ({
  emblaRef,
  thumbnails,
  selectedIndex,
  onDotButtonClick,
  onAutoplayButtonClick,
  direction,
}) => {
  return (
    <div
      className={`flex h-full items-center justify-center overflow-hidden ${direction === "vertical" ? "w-20 flex-col" : "mt-3 h-full w-full"
        }`}
      ref={emblaRef}>
      <div
        className={`flex gap-2 ${direction === "vertical" ? "flex-col" : "flex-row"
          }`}>
        {thumbnails?.map((thumb, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onAutoplayButtonClick(() => onDotButtonClick(index))}
            className={`flex-shrink-0 overflow-hidden rounded-md border-2 object-cover transition-all duration-200 ${direction === "vertical" ? "h-auto w-16" : "h-12 w-auto"
              } ${index === selectedIndex
                ? "scale-105 border opacity-100"
                : "border opacity-20 hover:opacity-80"
              }`}>
            {thumb}
          </button>
        ))}
      </div>
    </div>
  );
}

const Lightbox = ({
  slides,
  initialIndex,
  onClose,
}) => {
  const [current, setCurrent] = useState(initialIndex)

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey);
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}>
      <button
        type="button"
        className="absolute top-4 right-4 text-white transition-colors hover:text-gray-300"
        onClick={onClose}>
        <X size={32} />
      </button>
      <button
        type="button"
        className="absolute left-4 text-white transition-colors hover:text-gray-300"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}>
        <ChevronLeft size={40} />
      </button>
      <div
        className="max-h-[85vh] w-full max-w-4xl px-16"
        onClick={(e) => e.stopPropagation()}>
        {slides[current]}
      </div>
      <button
        type="button"
        className="absolute right-4 text-white transition-colors hover:text-gray-300"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}>
        <ChevronRight size={40} />
      </button>
      <span className="absolute bottom-4 text-sm text-white/60 tabular-nums">
        {current + 1} / {slides.length}
      </span>
    </div>
  );
}

export const useDotButton = emblaApi => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onDotButtonClick = useCallback((index) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }, [emblaApi])

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return { selectedIndex, scrollSnaps, onDotButtonClick }
}

export const DotButton = (props) => {
  const { children, ...restProps } = props
  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
}

export const useAutoplayProgress = (emblaApi, progressNode) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false)
  const animationName = useRef("")
  const timeoutId = useRef(0)
  const rafId = useRef(0)

  const startProgress = useCallback((timeUntilNext) => {
    const node = progressNode.current
    if (!node) return
    if (timeUntilNext === null) return

    if (!animationName.current) {
      const style = window.getComputedStyle(node)
      animationName.current = style.animationName
    }

    node.style.animationName = "none"
    node.style.transform = "translate3d(0,0,0)"

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current
        node.style.animationDuration = `${timeUntilNext}ms`
      }, 0)
    })

    setShowAutoplayProgress(true)
  }, [])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false))
  }, [emblaApi])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current)
      clearTimeout(timeoutId.current)
    };
  }, [])

  return { showAutoplayProgress }
}

export const useAutoplay = emblaApi => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

  const onAutoplayButtonClick = useCallback((callback) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop
    resetOrStop()
    callback()
  }, [emblaApi])

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    setAutoplayIsPlaying(autoplay.isPlaying())
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()))
  }, [emblaApi])

  return { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick }
}

export const usePrevNextButtons = emblaApi => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props
  return (
    <Button type="button" {...restProps}>
      <ChevronLeft />
      {children}
    </Button>
  );
}

export const NextButton = (props) => {
  const { children, ...restProps } = props
  return (
    <Button className="" type="button" {...restProps}>
      <ChevronRight />
      {children}
    </Button>
  );
}

export { Carousel }
