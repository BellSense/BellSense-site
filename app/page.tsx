import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row items-center gap-12">
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Turn Your Kettlebell Into a{' '}
              <span className="text-[#e5322d]">Smart Training System</span>
            </h1>
            <p className="text-lg text-[#9ca3af] mb-8 leading-relaxed max-w-lg">
              Track every rep, measure power, and see your performance improve in real time.
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
                src="/screenshots/main.png"
                alt="BellSense active workout tracking screen"
                fill
                priority
                className="object-cover rounded-2xl"
                style={{ objectPosition: 'center 35%' }}
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
              <h2 className="text-lg font-bold mb-5 text-[#9ca3af] uppercase tracking-wide text-sm">
                The problem
              </h2>
              <ul className="space-y-4">
                {[
                  "You don't know if your swings are improving",
                  'You lose power across sets without realizing',
                  'No feedback = wasted training',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[#f0f0f0]">
                    <span className="text-[#e5322d] font-bold mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#e5322d]/10 border border-[#e5322d]/30 rounded-xl p-8 flex flex-col justify-center">
              <h2 className="text-lg font-bold mb-4 text-[#e5322d] uppercase tracking-wide text-sm">
                The solution
              </h2>
              <p className="text-xl font-semibold leading-snug">
                BellSense gives you objective feedback on every rep — automatically.
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
                body: 'Clip the sensor to your kettlebell handle.',
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
              <div key={s.step} className="flex gap-4">
                <div className="w-8 h-8 bg-[#e5322d] rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
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
                image: '/screenshots/main.png',
                position: 'center 35%',
                title: 'Rep Counting',
                body: 'Near-zero false positives. Counts only real reps.',
              },
              {
                image: '/screenshots/analytics.png',
                position: 'center 60%',
                title: 'Velocity & Power',
                body: 'See how explosive each rep is and whether power holds across sets.',
              },
              {
                image: '/screenshots/results.png',
                position: 'center 55%',
                title: 'Fatigue Tracking',
                body: 'Know exactly when performance drops off — before it costs you a set.',
              },
              {
                image: '/screenshots/programs.png',
                position: 'center 55%',
                title: 'Session Score',
                body: 'One number that reflects your workout quality, every session.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-5 items-start"
              >
                <div className="relative shrink-0 w-[90px] rounded-lg overflow-hidden" style={{ height: '196px' }}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: card.position }}
                  />
                </div>
                <div className="pt-1">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-lg font-semibold mb-4">
            <span>Built for serious training</span>
            <span className="text-[#e5322d] hidden sm:inline">·</span>
            <span>Designed by lifters, not influencers</span>
          </div>
          <p className="text-[#9ca3af] text-sm">
            Testimonials coming as early users share their experience.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center">
            Who it&apos;s for
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Strength athletes',
                body: 'Track velocity, power, and fatigue to know when to push and when to back off.',
              },
              {
                title: 'Tactical / military',
                body: 'Objective performance data for high-rep kettlebell work. No guessing.',
              },
              {
                title: 'General fitness',
                body: 'Real performance data every session — not just feel and rep counts.',
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
          <h2 className="text-3xl font-extrabold tracking-tight mb-3">
            One sensor. Lifetime access.
          </h2>
          <p className="text-[#9ca3af] mb-8">Hardware + full iOS app. No subscription.</p>
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
            Train with data. Perform with intent.
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
