import Reveal from '@/components/ui/Reveal';
import { WHY_CHOOSE_US } from '@/constants';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative scroll-mt-16 overflow-hidden bg-[#061226] py-24 sm:py-32">
      <div className="radial-grid absolute inset-0 opacity-60" />
      <div className="container relative">
        <Reveal>
          <p className="eyebrow">Why customers choose us</p>
          <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="section-title max-w-2xl">A ride you can actually plan around.</h2>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
              No vague promises. Just clear details, comfortable vehicles and a real person to talk to when you need one.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((promise, index) => (
            <Reveal key={promise.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs font-bold tracking-[0.18em] text-cyan-200">0{index + 1}</p>
                <h3 className="mt-3 font-[Manrope] text-xl font-semibold tracking-[-0.03em] text-white">{promise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{promise.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
