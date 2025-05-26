import React, { forwardRef, useState, useEffect, useCallback, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, MoreHorizontal } from 'lucide-react'
import { cn } from '../../lib/utils'

const carouselVariants = cva(
  "relative overflow-hidden rounded-xl",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700",
        elevated: "bg-white border border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-700",
        glass: "bg-white/10 backdrop-blur-md border border-white/20",
        neon: "bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25",
        premium: "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 dark:from-purple-950 dark:to-pink-950 dark:border-purple-800",
        minimal: "bg-transparent border-none shadow-none",
      },
      size: {
        sm: "h-48",
        default: "h-64",
        lg: "h-80",
        xl: "h-96",
        "2xl": "h-[32rem]",
        auto: "h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const carouselItemVariants = cva(
  "flex-shrink-0 w-full h-full relative",
  {
    variants: {
      effect: {
        slide: "",
        fade: "absolute inset-0",
        scale: "absolute inset-0",
        cube: "absolute inset-0",
        flip: "absolute inset-0",
      },
    },
    defaultVariants: {
      effect: "slide",
    },
  }
)

export interface CarouselItem {
  id: string | number
  content?: React.ReactNode
  title?: string
  description?: string
  image?: string
  href?: string
  onClick?: () => void
}

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  loop?: boolean
  showDots?: boolean
  showArrows?: boolean
  showPlayPause?: boolean
  effect?: 'slide' | 'fade' | 'scale' | 'cube' | 'flip'
  slidesToShow?: number
  slidesToScroll?: number
  centerMode?: boolean
  infinite?: boolean
  pauseOnHover?: boolean
  swipeable?: boolean
  responsive?: Array<{
    breakpoint: number
    settings: {
      slidesToShow?: number
      slidesToScroll?: number
    }
  }>
  onSlideChange?: (index: number) => void
  onItemClick?: (item: CarouselItem, index: number) => void
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    className, 
    variant, 
    size,
    items = [],
    autoPlay = false,
    autoPlayInterval = 3000,
    loop = true,
    showDots = true,
    showArrows = true,
    showPlayPause = false,
    effect = 'slide',
    slidesToShow = 1,
    slidesToScroll = 1,
    centerMode = false,
    infinite = true,
    pauseOnHover = true,
    swipeable = true,
    responsive = [],
    onSlideChange,
    onItemClick,
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [isPaused, setIsPaused] = useState(false)
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval>>()

    // Responsive settings
    const [currentSlidesToShow, setCurrentSlidesToShow] = useState(slidesToShow)
    const [currentSlidesToScroll, setCurrentSlidesToScroll] = useState(slidesToScroll)

    // Update responsive settings
    useEffect(() => {
      const updateResponsiveSettings = () => {
        const width = window.innerWidth
        let newSlidesToShow = slidesToShow
        let newSlidesToScroll = slidesToScroll

        for (const breakpoint of responsive) {
          if (width <= breakpoint.breakpoint) {
            newSlidesToShow = breakpoint.settings.slidesToShow || slidesToShow
            newSlidesToScroll = breakpoint.settings.slidesToScroll || slidesToScroll
            break
          }
        }

        setCurrentSlidesToShow(newSlidesToShow)
        setCurrentSlidesToScroll(newSlidesToScroll)
      }

      updateResponsiveSettings()
      window.addEventListener('resize', updateResponsiveSettings)
      return () => window.removeEventListener('resize', updateResponsiveSettings)
    }, [slidesToShow, slidesToScroll, responsive])

    // Auto-play functionality
    useEffect(() => {
      if (isPlaying && !isPaused && items.length > 1) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex(prev => {
            const next = prev + currentSlidesToScroll
            if (next >= items.length) {
              return loop || infinite ? 0 : prev
            }
            return next
          })
        }, autoPlayInterval)
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, [isPlaying, isPaused, items.length, currentSlidesToScroll, loop, infinite, autoPlayInterval])

    // Update drag constraints
    useEffect(() => {
      if (containerRef.current && effect === 'slide') {
        const containerWidth = containerRef.current.offsetWidth
        const totalWidth = (items.length * containerWidth) / currentSlidesToShow
        setDragConstraints({
          left: -(totalWidth - containerWidth),
          right: 0
        })
      }
    }, [items.length, currentSlidesToShow, effect])

    const goToSlide = useCallback((index: number) => {
      if (items.length === 0) return
      
      let newIndex = index

      if (infinite || loop) {
        // 無限ループの場合、インデックスを正規化
        if (index < 0) {
          newIndex = items.length - 1
        } else if (index >= items.length) {
          newIndex = 0
        } else {
          newIndex = index
        }
      } else {
        // 通常の場合、範囲内に制限
        const maxIndex = Math.max(0, items.length - currentSlidesToShow)
        newIndex = Math.max(0, Math.min(index, maxIndex))
      }

      setCurrentIndex(newIndex)
      onSlideChange?.(newIndex)
    }, [items.length, currentSlidesToShow, infinite, loop, onSlideChange])

    const nextSlide = useCallback(() => {
      goToSlide(currentIndex + currentSlidesToScroll)
    }, [currentIndex, currentSlidesToScroll, goToSlide])

    const prevSlide = useCallback(() => {
      goToSlide(currentIndex - currentSlidesToScroll)
    }, [currentIndex, currentSlidesToScroll, goToSlide])

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!swipeable) return

      const threshold = 50
      const velocity = info.velocity.x

      if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
        if (info.offset.x > 0 || velocity > 0) {
          prevSlide()
        } else {
          nextSlide()
        }
      }
    }

    const handleMouseEnter = () => {
      if (pauseOnHover) {
        setIsPaused(true)
      }
    }

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        setIsPaused(false)
      }
    }

    const togglePlayPause = () => {
      setIsPlaying(!isPlaying)
    }

    const getSlideTransform = () => {
      if (effect === 'slide') {
        const translateX = -(currentIndex * (100 / currentSlidesToShow))
        return `translateX(${translateX}%)`
      }
      return 'translateX(0)'
    }

    const getItemWidth = () => {
      if (centerMode && currentSlidesToShow > 1) {
        return `${100 / (currentSlidesToShow + 0.5)}%`
      }
      return `${100 / currentSlidesToShow}%`
    }

    const renderSlideContent = (item: CarouselItem, index: number) => {
      const isActive = effect !== 'slide' ? index === currentIndex : true
      const isVisible = effect === 'slide' || index === currentIndex

      if (!isVisible && effect !== 'slide') return null

      const slideVariants = {
        slide: {},
        fade: {
          initial: { opacity: 0 },
          animate: { opacity: isActive ? 1 : 0 },
          exit: { opacity: 0 }
        },
        scale: {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: isActive ? 1 : 0, 
            scale: isActive ? 1 : 0.8 
          },
          exit: { opacity: 0, scale: 0.8 }
        },
        cube: {
          initial: { rotateY: 90, opacity: 0 },
          animate: { 
            rotateY: isActive ? 0 : 90, 
            opacity: isActive ? 1 : 0 
          },
          exit: { rotateY: -90, opacity: 0 }
        },
        flip: {
          initial: { rotateX: 90, opacity: 0 },
          animate: { 
            rotateX: isActive ? 0 : 90, 
            opacity: isActive ? 1 : 0 
          },
          exit: { rotateX: -90, opacity: 0 }
        }
      }

      return (
        <motion.div
          key={item.id}
          className={cn(
            carouselItemVariants({ effect }),
            effect === 'slide' && "inline-block"
          )}
          style={effect === 'slide' ? { width: getItemWidth() } : {}}
          variants={slideVariants[effect]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          onClick={() => {
            if (item.onClick) {
              item.onClick()
            } else if (onItemClick) {
              onItemClick(item, index)
            }
          }}
        >
          {item.image ? (
            <div className="relative w-full h-full">
              <img
                src={item.image}
                alt={item.title || `Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {(item.title || item.description) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    {item.title && (
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-sm opacity-90">{item.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6">
              {item.content}
            </div>
          )}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(carouselVariants({ variant, size, className }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Main carousel container */}
        <div ref={containerRef} className="relative w-full h-full">
          {effect === 'slide' ? (
            <motion.div
              className="flex h-full"
              style={{ transform: getSlideTransform() }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              drag={swipeable ? "x" : false}
              dragConstraints={dragConstraints}
              onDragEnd={handleDragEnd}
              dragElastic={0.1}
            >
              {items.map((item, index) => renderSlideContent(item, index))}
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {renderSlideContent(items[currentIndex], currentIndex)}
            </AnimatePresence>
          )}
        </div>

        {/* Navigation arrows */}
        {showArrows && items.length > 1 && (
          <>
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-200 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              disabled={!infinite && !loop && currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-200 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              disabled={!infinite && !loop && currentIndex >= items.length - currentSlidesToShow}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}

        {/* Play/Pause button */}
        {showPlayPause && autoPlay && (
          <motion.button
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-200 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </motion.button>
        )}

        {/* Dots indicator */}
        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {Array.from({ length: Math.ceil(items.length / currentSlidesToShow) }).map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  Math.floor(currentIndex / currentSlidesToShow) === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index * currentSlidesToShow)}
              />
            ))}
          </div>
        )}

        {/* Neon glow effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/5 rounded-xl blur-xl pointer-events-none" />
        )}
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

// Carousel with thumbnails
export interface ThumbnailCarouselProps extends CarouselProps {
  showThumbnails?: boolean
  thumbnailPosition?: 'bottom' | 'right' | 'left'
  thumbnailSize?: 'sm' | 'md' | 'lg'
}

export const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  showThumbnails = true,
  thumbnailPosition = 'bottom',
  thumbnailSize = 'md',
  items,
  ...carouselProps
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const thumbnailSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index)
    carouselProps.onSlideChange?.(index)
  }

  const containerClass = cn(
    "flex",
    thumbnailPosition === 'bottom' && "flex-col",
    thumbnailPosition === 'right' && "flex-row",
    thumbnailPosition === 'left' && "flex-row-reverse"
  )

  return (
    <div className={containerClass}>
      <div className="flex-1">
        <Carousel
          {...carouselProps}
          items={items}
          onSlideChange={handleSlideChange}
          showDots={false}
        />
      </div>
      
      {showThumbnails && (
        <div className={cn(
          "flex gap-2 p-4",
          thumbnailPosition === 'bottom' && "justify-center",
          thumbnailPosition === 'right' && "flex-col",
          thumbnailPosition === 'left' && "flex-col"
        )}>
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              className={cn(
                thumbnailSizes[thumbnailSize],
                "rounded-lg overflow-hidden border-2 transition-all duration-200",
                index === currentIndex
                  ? "border-blue-500 opacity-100"
                  : "border-gray-200 opacity-60 hover:opacity-80"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSlideChange(index)}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

// 3D Carousel Component
export interface Carousel3DProps extends Omit<CarouselProps, 'effect'> {
  perspective?: number
  rotateY?: number
  depth?: number
}

export const Carousel3D: React.FC<Carousel3DProps> = ({
  items,
  perspective = 1000,
  rotateY = 45,
  depth = 200,
  ...carouselProps
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const getItemTransform = (index: number) => {
    const angle = ((index - currentIndex) * 360) / items.length
    const translateZ = index === currentIndex ? depth : 0
    return `rotateY(${angle}deg) translateZ(${translateZ}px)`
  }

  return (
    <div 
      className="relative w-full h-96"
      style={{ perspective: `${perspective}px` }}
    >
      <div className="relative w-full h-full preserve-3d">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute inset-0 w-full h-full cursor-pointer"
            style={{
              transform: getItemTransform(index),
              transformStyle: 'preserve-3d'
            }}
            animate={{
              rotateY: ((index - currentIndex) * 360) / items.length,
              translateZ: index === currentIndex ? depth : 0,
              scale: index === currentIndex ? 1 : 0.8,
              opacity: Math.abs(index - currentIndex) <= 2 ? 1 : 0.3
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6">
                  {item.content}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              index === currentIndex ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export { Carousel } 