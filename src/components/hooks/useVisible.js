/**
 * Documentation
  
 * @param {string}        rootMargin
 * @param {array}         threshold
 *
 *
 * @returns{boolean} isIntersecting is boolean,
 * @returns{function} setRef to pass target dom.
 */
import { useEffect, useState } from 'react'

export const useVisible = options => {
    const { threshold = 0.5, rootMargin = `0px` } = options ?? {}
    const [ref, setRef] = useState(null)
    const [isIntersecting, setIntersecting] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
                if (entry.isIntersecting)
                    setIsVisible(entry.isIntersecting)
            },
            { threshold, rootMargin },
        )

        if (ref) {
            observer.observe(ref)
        }
        return () => {
            if (ref) {
                observer.unobserve(ref)
            }
        }
    }, [ref, options])

    return [isIntersecting, setRef, isVisible]
}

export default useVisible