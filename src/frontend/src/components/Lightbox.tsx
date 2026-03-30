import { X } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function Lightbox({
  isOpen,
  imageSrc,
  imageAlt,
  onClose,
}: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm">
      {/* Backdrop button to close */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close lightbox"
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark-card border border-white/10 text-brand-light hover:text-brand-orange hover:border-brand-orange/50 transition-all duration-200"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Image container */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
          style={{ boxShadow: "0 0 60px rgba(255,107,0,0.15)" }}
        />
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-white/30 tracking-[0.2em] uppercase select-none">
        Click outside or press Esc to close
      </p>
    </div>
  );
}
