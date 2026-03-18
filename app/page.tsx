import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm text-[#9ca3af] mb-8">
          <span className="w-2 h-2 bg-[#e5322d] rounded-full" />
          Real-time kettlebell feedback
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Train smarter.<br />
          <span className="text-[#e5322d]">Not just harder.</span>
        </h1>
        <p className="text-xl text-[#9ca3af] max-w-xl mx-auto mb-10 leading-relaxed">
          BellSense mounts to your kettlebell and counts every rep — with zero false positives — while scoring your power, consistency, and fatigue in real time.
        </p>
        <Link
          href="/buy"
          className="inline-block bg-[#e5322d] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#cc2d28] transition-colors"
        >
          Get BellSense →
        </Link>
      </section>

      {/* Value props */}
      <section className="py-16 grid sm:grid-cols-3 gap-6">
        {[
          { title: 'Zero false positives', body: 'Counts only real reps. No phantom counts mid-set.' },
          { title: 'Per-rep quality', body: 'Power, velocity retention, and consistency scored every rep.' },
          { title: 'Hardware-grade accuracy', body: '208 Hz IMU mounted on the bell — not your wrist.' },
        ].map((p) => (
          <div key={p.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2">{p.title}</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="py-16">
        <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Mount the sensor', body: 'Clip BellSense to your kettlebell handle. Takes 5 seconds.' },
            { step: '2', title: 'Start the app', body: 'Select your exercise, connect over Bluetooth, and go.' },
            { step: '3', title: 'See your data', body: 'Rep counts, power output, and fatigue trends — live and post-session.' },
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
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-white/10">
        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Ready to train with data?</h2>
        <p className="text-[#9ca3af] mb-8">One sensor. Seven exercises. Real feedback.</p>
        <Link
          href="/buy"
          className="inline-block bg-[#e5322d] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#cc2d28] transition-colors"
        >
          Get BellSense →
        </Link>
      </section>
    </div>
  )
}
