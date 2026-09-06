import { Sparkles, ShieldCheck } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div className="shrink-0 relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-[#120436] via-[#23085a] to-[#3b1282] text-white pt-6 pb-12 px-5 shadow-xl">
      {/* Background glow & ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

      {/* Golden ribbon / confetti accents */}
      <div className="absolute top-4 right-1/3 w-3 h-1 bg-yellow-400/80 rounded-full rotate-45 animate-pulse" />
      <div className="absolute top-12 right-12 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
      <div className="absolute bottom-16 right-2 w-3 h-1.5 bg-yellow-400/70 rounded-full -rotate-12" />

      <div className="relative z-10 flex items-center justify-between">
        {/* Left column: Text content */}
        <div className="flex-1 pr-2">
          {/* Badge: NO-COST EMIs */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-semibold tracking-wide uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>NO-COST EMIs</span>
          </div>

          {/* Heading */}
          <h1 className="text-[20px] xs:text-[22px] sm:text-[24px] font-extrabold leading-[1.18] tracking-tight text-white mb-2">
            Shop today,<br />
            <span className="italic font-normal font-serif text-purple-100">Pay later using</span><br />
            Mutual funds.
          </h1>

          {/* Subtext */}
          <p className="text-[11px] text-purple-200/90 leading-relaxed font-normal">
            No credit score required. No interest.<br />
            Backed by your investments.
          </p>
        </div>

        {/* Right column: 3D Composition illustration */}
        <div className="w-[36%] shrink-0 relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[120px] sm:max-w-[135px]">
            {/* Visual asset container with soft vignette blend */}
            <img
              src="/assets/1fi_hero_illustration.jpg"
              alt="1Fi Zero Cost EMI Shopping"
              className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10 filter contrast-105"
            />
            {/* Floating gold ribbon badge */}
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a064b] text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>100% Zero Cost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
