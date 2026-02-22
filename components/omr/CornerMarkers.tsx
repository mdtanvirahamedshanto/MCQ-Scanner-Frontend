"use client";

/**
 * Corner markers for OMR sheet alignment detection.
 * Each corner has a unique pattern so the scanner can determine orientation.
 */

export function MarkerTopLeft({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="40" height="40" fill="black" />
            <rect x="8" y="8" width="24" height="24" fill="white" />
            <rect x="14" y="14" width="12" height="12" fill="black" />
        </svg>
    );
}

export function MarkerTopRight({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="40" height="15" fill="black" />
            <rect x="25" y="0" width="15" height="40" fill="black" />
            <rect x="0" y="25" width="15" height="15" fill="black" />
            <circle cx="20" cy="20" r="6" fill="black" />
        </svg>
    );
}

export function MarkerBottomLeft({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="15" height="40" fill="black" />
            <rect x="0" y="25" width="40" height="15" fill="black" />
            <rect x="25" y="0" width="15" height="15" fill="black" />
            <circle cx="20" cy="20" r="6" fill="black" />
        </svg>
    );
}

export function MarkerBottomRight({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="40" height="40" fill="black" />
            <rect x="4" y="4" width="32" height="32" fill="white" />
            <rect x="10" y="10" width="20" height="20" fill="black" />
            <rect x="15" y="15" width="10" height="10" fill="white" />
        </svg>
    );
}
