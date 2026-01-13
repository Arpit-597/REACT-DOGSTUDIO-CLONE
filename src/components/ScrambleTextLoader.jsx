import React, { useRef, useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const loadingTexts = [
    "Initializing",
    "Loading Assets",
    "Fetching Dog Model",
    "Processing Textures",
    "Warming GPU",
    "Almost Ready"
];

const ScrambleTextLoader = () => {
    const { progress } = useProgress();
    const loaderRef = useRef(null);
    const textRef = useRef(null);
    const [currentText, setCurrentText] = useState("Initializing");

    const texts = loadingTexts;

    useEffect(() => {
        let textIndex = 0;
        const interval = setInterval(() => {
            textIndex = (textIndex + 1) % texts.length;
            setCurrentText(texts[textIndex]);
        }, 1200); // Change text every 1.2 seconds

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        // Add a subtle pulse effect to the progress text
        gsap.to(textRef.current, {
            scale: 1.02,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            duration: 2
        });
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Fade out loader smoothly with a slight delay
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.5,
                onComplete: () => {
                    // Enable scroll after loading
                    document.body.style.overflow = "auto";
                    // Hide loader completely
                    if (loaderRef.current) {
                        loaderRef.current.style.display = "none";
                    }
                }
            });
        }
    }, [progress]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // Determine display text based on progress
    const displayText = progress === 100 ? "Complete!" : currentText;

    return (
        <div
            ref={loaderRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                transition: 'opacity 1.2s ease-out'
            }}
        >
            {/* Animated dots with staggered animation */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '3rem' }}>
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: '6px',
                            height: '6px',
                            background: '#ffffff',
                            borderRadius: '50%',
                            animation: `bounce 1.4s ease-in-out ${i * 0.1}s infinite both`
                        }}
                    />
                ))}
            </div>

            {/* Dynamic text with fade effect */}
            <div
                ref={textRef}
                style={{
                    fontSize: '28px',
                    fontWeight: '400',
                    color: '#ffffff',
                    marginBottom: '1.5rem',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {displayText}
            </div>

            {/* Progress percentage with enhanced styling */}
            <div
                style={{
                    fontSize: '48px',
                    fontWeight: '300',
                    color: '#ffffff',
                    marginBottom: '2rem',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '2px'
                }}
            >
                {Math.round(progress)}%
            </div>

            {/* Enhanced progress bar */}
            <div
                style={{
                    width: '280px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                        width: `${progress}%`,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 0 20px rgba(255,255,255,0.3)',
                        borderRadius: '2px'
                    }}
                />

                {/* Subtle glow effect */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                        animation: 'shine 2s ease-in-out infinite'
                    }}
                />
            </div>

            {/* Loading hint */}
            <div
                style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '2rem',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '0.5px',
                    textAlign: 'center'
                }}
            >
                Loading Dog Studio Experience
            </div>

            <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </div>
    );
};

export default ScrambleTextLoader;