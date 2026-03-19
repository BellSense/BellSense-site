import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row items-center gap-12">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[#e5322d] text-xs font-bold uppercase tracking-widest mb-4">No junk reps.</p>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-5 leading-[1.05]">
              The sensor{' '}
              <span className="relative inline-block text-[#e5322d]">
                doesn&apos;t lie.
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#e5322d] rounded-full opacity-40" />
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af] mb-8 leading-relaxed max-w-lg">
              BellSense measures every rep. There&apos;s nowhere to hide — and that&apos;s exactly the point.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link
                href="/buy"
                className="inline-block bg-[#e5322d] text-white px-7 py-3.5 rounded-lg font-bold text-base hover:bg-[#cc2d28] transition-colors"
              >
                Get BellSense →
              </Link>
              <a
                href="#how-it-works"
                className="inline-block border border-white/20 text-[#9ca3af] px-7 py-3.5 rounded-lg font-medium text-base hover:border-white/40 hover:text-white transition-colors"
              >
                See how it works ↓
              </a>
            </div>
          </div>
          <div className="shrink-0 w-[240px] sm:w-[280px]">
            <div className="relative w-full" style={{ height: '520px' }}>
              <Image
                src="/screenshots/main-picture.png"
                alt="BellSense active workout tracking screen"
                fill
                priority
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-sm font-bold mb-5 text-[#9ca3af] uppercase tracking-wide">
                The problem
              </h2>
              <ul className="space-y-4">
                {[
                  'Most people are just moving weight — going through the motions',
                  'Junk reps accumulate fatigue without building real output',
                  'Without honest feedback, you can\'t tell the difference',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[#f0f0f0]">
                    <span className="text-[#e5322d] font-bold mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#e5322d]/10 border border-[#e5322d]/30 rounded-xl p-8 flex flex-col justify-center">
              <h2 className="text-sm font-bold mb-4 text-[#e5322d] uppercase tracking-wide">
                The solution
              </h2>
              <p className="text-xl font-semibold leading-snug">
                BellSense won&apos;t let you cheat anymore. Every rep is measured. Every session is scored. The bell doesn&apos;t know you went through the motions — BellSense does.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Mount the sensor',
                body: 'Attach BellSense to the kettlebell beneath the handle.',
              },
              {
                step: '2',
                title: 'Start the app',
                body: 'Pick your exercise and connect over Bluetooth.',
              },
              {
                step: '3',
                title: 'See your data',
                body: 'Rep counts, power, and fatigue trends — live and post-session.',
              },
            ].map((s) => (
              <div key={s.step} className="relative pl-4 pt-2">
                <div className="absolute top-0 left-0 text-[7rem] font-extrabold leading-none text-white/[0.04] select-none pointer-events-none">
                  {s.step}
                </div>
                <div className="relative">
                  <div className="text-[#e5322d] font-bold text-xs uppercase tracking-widest mb-2">Step {s.step}</div>
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center">
            What you get
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Rep Counting',
                body: 'Only real reps count. If it didn\'t move with intent, it doesn\'t register.',
                image: '/screenshots/main-picture.png',
                imageAlt: 'BellSense live workout tracking screen',
              },
              {
                title: 'Velocity & Power',
                body: 'See exactly how explosive each rep is and watch what happens to power as fatigue sets in.',
                image: '/screenshots/velocity-power.png',
                imageAlt: 'Power by round chart and rep metrics scatter plot',
              },
              {
                title: 'Junk Rep Detection',
                body: 'Know when your output has degraded enough that more reps aren\'t building — they\'re just burning.',
                image: '/screenshots/junk-rep.png',
                imageAlt: 'Session summary highlighting velocity drop detection',
              },
              {
                title: 'Session Score',
                body: 'The honest number. Not a summary — an accountability score. Quality, intention, and consistency in one figure.',
                image: '/screenshots/session-score.png',
                imageAlt: 'Session score gauge showing 76/100 in the Training Zone',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <div className="relative h-72 bg-black">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-lg font-semibold mb-4">
            <span>The bell doesn&apos;t lie.</span>
            <span className="text-[#e5322d] hidden sm:inline">·</span>
            <span>BellSense keeps you honest.</span>
          </div>
          <p className="text-[#9ca3af] text-sm">
            Testimonials coming as early users share their experience.
          </p>
        </div>
      </section>

      {/* Who it's for — mindset framing */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-center">
            Who it&apos;s for
          </h2>
          <p className="text-[#9ca3af] text-center mb-10 max-w-xl mx-auto">
            Not a demographic. An attitude.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Tired of junk volume',
                body: 'You\'ve done the high-rep grind. You know the difference between accumulated fatigue and real output. You want to train less and get more.',
              },
              {
                title: 'Want to understand why',
                body: 'You don\'t just want to move weight — you want to know if it\'s working. Objective data over gut feel, every session.',
              },
              {
                title: 'Ready to be held accountable',
                body: 'You\'re not looking for encouragement. You\'re looking for an honest mirror. BellSense won\'t tell you what you want to hear.',
              },
              {
                title: 'Wants real coaching',
                body: 'Not a cheerleader. Not a streak counter. Objective, actionable data on every rep — because that\'s what actually moves the needle.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA section */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-8">
            One Sensor. Lifetime Access.
          </h2>
          <Link
            href="/buy"
            className="inline-block bg-[#e5322d] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#cc2d28] transition-colors"
          >
            Get BellSense →
          </Link>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-[#9ca3af] text-sm uppercase tracking-widest mb-4 font-medium">
            Make every rep matter.
          </p>
          <Link
            href="/buy"
            className="inline-block bg-[#e5322d] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#cc2d28] transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  )
}
