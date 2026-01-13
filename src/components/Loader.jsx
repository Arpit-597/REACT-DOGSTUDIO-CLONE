import React, { useRef, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = () => {
    const { progress } = useProgress();
    const loaderRef = useRef(null);
    const percentRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // Rotate the percentage number continuously
        gsap.to(percentRef.current, {
            rotate: 360,
            repeat: -1,
            ease: "linear",
            duration: 2
        });

        // Animate the circular progress
        gsap.to(circleRef.current, {
            rotation: 360,
            repeat: -1,
            ease: "linear",
            duration: 1.5
        });
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Fade out loader smoothly
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
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

    // Disable scroll while loading
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
            {/* Main circular loader */}
            <div
                ref={circleRef}
                style={{
                    width: '120px',
                    height: '120px',
                    border: '3px solid rgba(255, 255, 255, 0.1)',
                    borderTop: '3px solid #ffffff',
                    borderRadius: '50%',
                    position: 'relative',
                    marginBottom: '2rem'
                }}
            />

            {/* Percentage text */}
            <div style={{ textAlign: 'center' }}>
                <div
                    ref={percentRef}
                    style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.5rem',
                        fontFamily: 'Arial, sans-serif'
                    }}
                >
                    {Math.round(progress)}%
                </div>

                <div
                    ref={textRef}
                    style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '0.5px'
                    }}
                >
                    LOADING DOG STUDIO
                </div>
            </div>

            {/* Progress bar */}
            <div
                style={{
                    width: '200px',
                    height: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1px',
                    marginTop: '2rem',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        background: '#ffffff',
                        width: `${progress}%`,
                        transition: 'width 0.3s ease-out'
                    }}
                />
            </div>
        </div>
    );
};

export default Loader;
