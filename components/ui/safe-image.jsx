"use client";
import React, { useState } from "react";
import { Package } from "lucide-react";

export function SafeImage({ src, alt, className }) {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
                <Package className="w-8 h-8 text-gray-300" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt || "Product image"}
            className={className}
            onError={() => setError(true)}
        />
    );
}
