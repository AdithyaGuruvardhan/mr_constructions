import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 144;
const BATCH_SIZE = 30;

function getFrameUrl(index, isMobile) {
  // index is 1-based (1 to 144)
  const paddedIndex = index.toString().padStart(4, '0');
  return `/metro_to_infosys/output_frame_${paddedIndex}.webp`;
}

export default function HeroScrollVideo() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef({
    desktop: new Array(FRAME_COUNT + 1).fill(null),
    mobile: new Array(FRAME_COUNT + 1).fill(null)
  });

  const currentFrameRef = useRef(1);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Initial Check for device type to trigger load
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw logic using refs directly to avoid re-renders
  const drawFrame = (index, mobileMode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const modeKey = mobileMode ? 'mobile' : 'desktop';
    const imageArray = imagesRef.current[modeKey];

    // Find the closest loaded frame if the target isn't loaded yet
    let drawIndex = index;
    if (!imageArray[drawIndex]) {
      // search backwards for closest loaded frame
      for (let i = index; i >= 1; i--) {
        if (imageArray[i]) {
          drawIndex = i;
          break;
        }
      }
    }

    const img = imageArray[drawIndex];
    if (img) {
      // Object-fit: cover logic
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  // Preloading logic based on current device type
  useEffect(() => {
    const loadImages = async (mobileMode) => {
      const modeKey = mobileMode ? 'mobile' : 'desktop';
      const imageArray = imagesRef.current[modeKey];

      // If already started loading this mode's first frame, skip
      if (imageArray[1]) {
        // Redraw immediately when switching modes if already loaded
        drawFrame(currentFrameRef.current, mobileMode);
        return;
      }

      // 1. Load the first batch
      const loadBatch = (start, end) => {
        return new Promise((resolve) => {
          let batchLoadedCount = 0;
          const totalInBatch = end - start + 1;

          for (let i = start; i <= end; i++) {
            if (imageArray[i]) {
              batchLoadedCount++;
              if (batchLoadedCount === totalInBatch) resolve();
              continue;
            }

            const img = new Image();
            img.src = getFrameUrl(i, mobileMode);
            img.onload = () => {
              imageArray[i] = img;
              batchLoadedCount++;

              // If it's the very first frame, draw it immediately
              if (i === 1) {
                drawFrame(currentFrameRef.current, mobileMode);
              }

              if (batchLoadedCount === totalInBatch) {
                resolve();
              }
            };
            img.onerror = () => {
              batchLoadedCount++;
              if (batchLoadedCount === totalInBatch) resolve();
            }
          }
        });
      };

      // Load initial fast batch (1 to BATCH_SIZE)
      await loadBatch(1, Math.min(BATCH_SIZE, FRAME_COUNT));

      // Background load the rest sequentially
      if (FRAME_COUNT > BATCH_SIZE) {
        for (let i = BATCH_SIZE + 1; i <= FRAME_COUNT; i++) {
          if (!imageArray[i]) {
            const img = new Image();
            img.src = getFrameUrl(i, mobileMode);
            img.onload = () => {
              imageArray[i] = img;
              // If user scrolled to this frame while it was loading, draw it now
              if (currentFrameRef.current === i) {
                drawFrame(i, mobileMode);
              }
            };
          }
        }
      }
    };

    loadImages(isMobile);
  }, [isMobile]);

  // Canvas setup and resize handler
  useEffect(() => {
    const canvas = canvasRef.current;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current, isMobile);
    };

    window.addEventListener('resize', updateCanvasSize, { passive: true });
    updateCanvasSize(); // Initial sizing

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [isMobile]); // Rebind when isMobile changes so the resize draws the correct image set

  // Scroll tracking
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const scrollableDistance = containerHeight - viewportHeight;
      const scrolled = -rect.top;

      let progress = 0;
      if (scrollableDistance > 0) {
        progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      }

      const frameIndex = Math.min(FRAME_COUNT, Math.max(1, Math.floor(progress * FRAME_COUNT) + 1));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;

        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          drawFrame(frameIndex, isMobile);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial draw to place us correctly in case of a reload at scroll offset
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative w-full bg-white h-[400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between px-6 py-8 md:px-16 md:py-12">



          {/* Left aligned main content */}
          <div className="flex-grow flex flex-col justify-center items-start max-w-7xl mx-auto w-full pt-14">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-[4rem] font-medium leading-tight mb-6" style={{ color: '#f2f2f2' }}>
                Engineering Excellence.<br />Since 2005.
              </h1>
              <p className="text-lg md:text-xl max-w-lg mb-8 leading-relaxed" style={{ color: '#f2f2f2' }}>
                ISO-certified construction and engineering trusted by government and private clients. 125+ projects completed with precision.
              </p>
              <button className="px-6 py-2 rounded-lg text-lg font-medium pointer-events-auto transition-transform hover:scale-105" style={{ backgroundColor: '#ff761f', color: '#000000' }}>
                Start Your Project
              </button>
            </div>
          </div>

          {/* Bottom text */}
          <div className="w-full text-center pb-2">
            <p className="text-lg md:text-xl" style={{ color: '#f2f2f2' }}>
              Scroll
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
