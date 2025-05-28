import { useEffect, useRef } from "preact/hooks";

export default function ScrollBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    const animate = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (boxRef.current) {
        gsap.fromTo(
          boxRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: boxRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    animate();
  }, []);

  return (
    <div
      ref={boxRef}
      className="w-[200px] h-[200px] mx-auto mt-[100vh] bg-green-400 text-white text-xl flex items-center justify-center"
    >
      ScrollBox
    </div>
  );
}
