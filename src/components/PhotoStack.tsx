import { useEffect, useRef } from "preact/hooks";

export default function PhotoStack() {
  const photosRef = useRef<HTMLDivElement[]>([]);
  const gsapRef = useRef<any>(null); // guardar la referencia a gsap para reutilizarla

  // Cargar GSAP una vez
  useEffect(() => {
    const loadGSAP = async () => {
      gsapRef.current = (await import("gsap")).default;
    };
    loadGSAP();
  }, []);

  const animatePhotos = () => {
    if (!gsapRef.current) return;

    photosRef.current.forEach((el, i) => {
      if (el) {
        gsapRef.current.to(el, {
          y: -50 + Math.random() * 100,
          x: -50 + Math.random() * 100,
          rotate: -20 + Math.random() * 40,
          scale: 1 + Math.random() * 0.3,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    });
  };

  const images = [
    { src: "https://picsum.photos/200/300?random=1", align: "justify-start" },
    { src: "https://picsum.photos/200/300?random=2", align: "justify-center" },
    { src: "https://picsum.photos/200/300?random=3", align: "justify-end" },
    { src: "https://picsum.photos/200/300?random=4", align: "justify-center" },
    { src: "https://picsum.photos/200/300?random=5", align: "justify-start" },
  ];

  return (
    <div className="relative bg-black overflow-hidden">
      <div className="sticky top-1/2 transform -translate-y-1/2 z-10 flex justify-center">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg text-center text-xl">
          <p>Esta card es fija</p>
          <button
            onClick={animatePhotos}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Animar Fotos
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => (photosRef.current[i] = el!)}
            className={`flex ${img.align}`}
          >
            <img
              src={img.src}
              alt={`Foto ${i + 1}`}
              className="w-[150px] h-[225px] object-cover rounded-md shadow-xl border-4 border-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
