"use client"

import { ComponentType, HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react"

type ElementType = keyof JSX.IntrinsicElements | ComponentType<any>

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  as?: ElementType
  delay?: number
  once?: boolean
}

export function Reveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once])

  const Tag = Component as any

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{
        ...(rest.style || {}),
        //@ts-ignore css variable
        "--reveal-delay": `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
