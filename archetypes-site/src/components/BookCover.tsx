// Typographic 3D book mockup in the cover's style. Drop a real cover at
// public/cover.jpg and pass `src` to show it instead.
import Image from "next/image";

export default function BookCover({ src }: { src?: string }) {
  return (
    <div className="relative mx-auto w-[240px] sm:w-[300px] [perspective:1400px]">
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(214,173,94,0.35),transparent_65%)] blur-2xl" />
      <div className="relative [transform:rotateY(-14deg)] [transform-style:preserve-3d]">
        {/* Page edges */}
        <div className="absolute top-[6px] -right-[10px] h-[calc(100%-12px)] w-[14px] bg-[repeating-linear-gradient(90deg,#efe5d4_0,#efe5d4_1px,#cfc2aa_2px)] rounded-r-sm [transform:rotateY(60deg)] origin-left" />
        <div className="relative aspect-[2/3] rounded-r-md rounded-l-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_4px_0_8px_rgba(0,0,0,0.5)] bg-[radial-gradient(ellipse_at_50%_20%,#3a2a17_0%,#120d08_60%,#0a0705_100%)] border border-[#2b2014]">
          {src ? (
            <Image src={src} alt="The 30 Archetypes of Women — cover" fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center px-5 pt-8 pb-6 text-center">
              <div className="font-display leading-[0.95]">
                <span className="text-gold text-[22px] sm:text-[26px] font-bold">THE </span>
                <span className="text-gold text-[48px] sm:text-[60px] font-bold">30</span>
              </div>
              <div className="font-display text-rose text-[30px] sm:text-[38px] font-bold leading-none tracking-tight">
                ARCHETYPES
              </div>
              <div className="font-display text-gold leading-none mt-1">
                <span className="text-[18px] sm:text-[22px] font-bold">OF </span>
                <span className="text-[34px] sm:text-[42px] font-bold">WOMEN</span>
              </div>
              <div className="rule w-full mt-3 text-[8px]">◆</div>
              <div className="text-[7px] sm:text-[8.5px] tracking-[0.28em] text-cream mt-2">
                THE HIDDEN MAP OF FEMININE DYNAMICS
              </div>
              <div className="flex-1 w-full mt-4 mb-4 rounded-md frame-gold flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(234,177,168,0.25),transparent_60%)]">
                <span className="font-display text-gold text-[56px] sm:text-[72px] leading-none">♛</span>
              </div>
              <div className="font-condensed text-cream text-[13px] sm:text-[16px] tracking-[0.12em] leading-tight">
                DISCOVER YOUR ARCHETYPE
              </div>
              <div className="font-condensed text-rose text-[11px] sm:text-[13px] tracking-[0.12em]">
                AND UNLOCK YOUR FEMININE POWER
              </div>
            </div>
          )}
          {/* Spine shading */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
