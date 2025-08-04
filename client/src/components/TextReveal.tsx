'use client'

import React, {useRef, useEffect, JSX } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface TextProps{
    text: string;
    className?: string;
    delay?: number;
    center?: boolean;
    as?: keyof JSX.IntrinsicElements | React.ElementType;
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    as: Tag = 'div',
}: TextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!containerRef.current) return;

        const el = containerRef.current

        const anim = gsap.fromTo(
            el,
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            }
        )

        return () => {
            anim.scrollTrigger?.kill()
            anim.kill()
        }
    }, [delay])

    return (
        <Tag
            ref={containerRef}
            className={clsx('opacity-0', className)}
        >
            {text}
        </Tag>
    )
}