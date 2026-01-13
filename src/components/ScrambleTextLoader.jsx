import React, { useRef, useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ScrambleTextLoader = () => {
    const { progress } = useProgress();
    const loaderRef = useRef(null);
    const textRef = useRef(null);
    const [currentText, setCurrentText] = useState("Loading");

    const texts = ["Loading", "Fetching Model", "Warming GPU", "Almost There"];

    useGSAP(() => {
        // Create a timeline for text scrambling effect
        const tl = gsap.timeline({ repeat: -1 });

        texts.forEach((text, index) => {
            tl.to({}, {
                duration: 1.5,
                onComplete: () => setCurrentText(text)
            });
        });
    }, []);

    useEffect(() => {
        if (progress === 100) {
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    document.body.style.overflow = "auto";
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

    return (
        <div
            ref={loaderRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                transition: 'opacity 0.8s ease-out'
            }}
        >
            {/* Animated dots */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: '8px',
                            height: '8px',
                            background: '#ffffff',
                            borderRadius: '50%',
                            animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
                        }}
                    />
                ))}
            </div>

            {/* Scrambling text */}
            <div
                ref={textRef}
                style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '1px'
                }}
            >
                {currentText}
            </div>

            {/* Progress percentage */}
            <div
                style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '2rem',
                    fontFamily: 'Arial, sans-serif'
                }}
            >
                {Math.round(progress)}%
            </div>

            {/* Progress bar */}
            <div
                style={{
                    width: '250px',
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                        width: `${progress}%`,
                        transition: 'width 0.3s ease-out',
                        boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
};

export default ScrambleTextLoader;