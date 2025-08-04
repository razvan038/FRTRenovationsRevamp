'use client'

import React, {useRef, JSX, useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import clsx from 'clsx'


gsap.registerPlugin(ScrollTrigger)

interface RevealProps{ 
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    y?: number
    x?: number
    once?: boolean
    as?: keyof JSX.IntrinsicElements | React.ElementType
}

export default function Reveal({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    y = 20,
    x = 0,
    once = true,
    as: Tag = 'div',
}: RevealProps) {
    const ref = useRef <HTMLElement | null>(null)

    useEffect(() => {
        if(!ref.current) return

        const anim = gsap.fromTo(
            ref.current,
            {
                opacity: 0,
                y,
                x,
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                delay,
                duration,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    toggleActions: once ? 'play none none none' : 'play none none reverse',
                },
            }
        )

        return () => {
            anim.scrollTrigger?.kill()
            anim.kill()
        }
    }, [delay, duration, y, x, once])

    return(
        <Tag ref={ref} className={clsx(
            'opacity-0 transition-opacity duration-500',
            className
          )}>
            {children}
        </Tag>
    )
}