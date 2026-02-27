import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import Lightbox from './Lightbox';

const galleryPhotos = [
  { src: '/assets/ws 1.jpeg', caption: 'Silver Oak University Session' },
  { src: '/assets/ws 2.jpeg', caption: 'Interactive Workshop Session' },
  { src: '/assets/ws3.jpeg', caption: 'Youth Engagement Workshop' },
  { src: '/assets/ws4.jpeg', caption: 'Group Activity Session' },
  { src: '/assets/ws5.jpeg', caption: 'Experiential Learning Workshop' },
  { src: '/assets/ws6.jpeg', caption: 'Campus Workshop Session' },
  { src: '/assets/ws7.jpeg', caption: 'Leadership Bootcamp' },
  { src: '/assets/ws8.jpeg', caption: 'Team Dynamics Workshop' },
  { src: '/assets/ws9.jpeg', caption: 'Large Classroom Workshop' },
  { src: '/assets/ws10.jpeg', caption: 'Mindset Training Session' },
  { src: '/assets/ws11.jpeg', caption: 'Heartfulness Session' },
  { src: '/assets/ws12.jpeg', caption: 'Youth Empowerment Workshop' },
  { src: '/assets/ws13.jpeg', caption: 'Communication Skills Session' },
  { src: '/assets/ws14.jpeg', caption: 'Balloon Activity Bootcamp' },
  { src: '/assets/ws15.jpeg', caption: 'High-Energy Workshop' },
  { src: '/assets/ws16.jpeg', caption: 'Silver Oak HOPE Session' },
  { src: '/assets/ws17.jpeg', caption: 'Motivation & Goal Setting' },
  { src: '/assets/ws18.jpeg', caption: 'Corporate Training Session' },
  { src: '/assets/ws19.jpeg', caption: 'Youth Leadership Workshop' },
  { src: '/assets/ws20.jpeg', caption: 'Campus Engagement Event' },
  { src: '/assets/ws21.jpeg', caption: 'Experiential Activity Session' },
  { src: '/assets/ws22.jpeg', caption: 'Group Dynamics Workshop' },
  { src: '/assets/ws23.jpeg', caption: 'Closing Ceremony Session' },
  { src: '/assets/shark teens cp.jpg', caption: 'Shark Teens Campus Program' },
];

function GalleryItem({
  photo,
  index,
  onOpen,
}: {
  photo: { src: string; caption: string };
  index: number;
  onOpen: (src: string, caption: string) => void;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-30px' });
  const delay = (index % 8) * 60;

  return (
    <div
      ref={ref}
      className="relative group overflow-hidden rounded-sm cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
      onClick={() => onOpen(photo.src, photo.caption)}
      role="button"
      tabIndex={0}
      aria-label={`View full image: ${photo.caption}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(photo.src, photo.caption);
        }
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="font-body text-xs text-white/90 tracking-wide leading-tight">
          {photo.caption}
        </p>
        <p className="font-body text-[10px] text-brand-orange mt-1 tracking-[0.15em] uppercase">
          Click to view
        </p>
      </div>
      {/* Subtle border on hover */}
      <div className="absolute inset-0 border-2 border-brand-orange/0 group-hover:border-brand-orange/40 rounded-sm transition-all duration-300 pointer-events-none" />
    </div>
  );
}

export default function MediaCertifications() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-60px' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

  const openLightbox = (src: string, caption: string) => {
    setLightboxSrc(src);
    setLightboxAlt(caption);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <section id="gallery" className="bg-brand-dark-alt section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className="text-center mb-16"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="font-body text-xs text-brand-orange tracking-[0.3em] uppercase font-semibold">
              Moments That Matter
            </span>
            <h2 className="font-display text-6xl md:text-8xl text-brand-light mt-2">
              Event <span className="text-gradient-orange">Gallery</span>
            </h2>
            <p className="font-body text-brand-muted text-sm mt-4 tracking-wide">
              Click any image to view full size
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryPhotos.map((photo, i) => (
              <GalleryItem
                key={photo.src}
                photo={photo}
                index={i}
                onOpen={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={lightboxSrc}
        imageAlt={lightboxAlt}
        onClose={closeLightbox}
      />
    </>
  );
}
