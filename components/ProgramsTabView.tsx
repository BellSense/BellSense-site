'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ProgramMeta {
  title: string
  slug: string
  difficulty: string
  weeks: number
  sessionsPerWeek: number
  archetype: string
  trainingStyle: string
  bestFor: string
}

interface PlaceholderCard {
  name: string
  description: string
  difficulty: string
  weeks: number
}

type TrainingStyleId = 'kb_only' | 'kb_bodyweight' | 'kb_barbell' | 'mixed_modality' | 'complex_alt'

const TABS: { id: TrainingStyleId; label: string; isBellSensePlus: boolean }[] = [
  { id: 'kb_only',        label: 'KB Only',         isBellSensePlus: false },
  { id: 'kb_bodyweight',  label: 'KB + Bodyweight',  isBellSensePlus: true  },
  { id: 'kb_barbell',     label: 'KB + Barbell',     isBellSensePlus: true  },
  { id: 'mixed_modality', label: 'Mixed Modality',   isBellSensePlus: true  },
  { id: 'complex_alt',    label: 'Complex & Alt',    isBellSensePlus: true  },
]

const CATEGORY_DESCRIPTIONS: Record<TrainingStyleId, string> = {
  kb_only:
    '9 programs built on The BellSense Kettlebell Method — core activation, ballistic power, strength work, and mobility. All included with your hardware purchase.',
  kb_bodyweight:
    'Kettlebell is the anchor — bodyweight, gymnastics movements, and isometric work build the foundation around it.',
  kb_barbell:
    'KB stays primary — barbell movements like squats and deadlifts are added for structural strength.',
  mixed_modality:
    'Kettlebell leads. Barbell, bodyweight, and conditioning work build complete athleticism around it.',
  complex_alt:
    'Structured complex progressions and alternating session designs built around the kettlebell.',
}

const PLACEHOLDER_CARDS: Record<Exclude<TrainingStyleId, 'kb_only'>, PlaceholderCard[]> = {
  kb_bodyweight: [
    {
      name: 'KB + Calisthenics Strength',
      description: 'Kettlebell ballistics paired with push-ups, pull-ups, and dips for upper body strength.',
      difficulty: 'Intermediate',
      weeks: 8,
    },
    {
      name: 'Grind & Hold',
      description: 'Grind-focused kettlebell work with gymnastic holds and isometric carries.',
      difficulty: 'Advanced',
      weeks: 6,
    },
  ],
  kb_barbell: [
    {
      name: 'Iron Foundation',
      description: 'KB ballistics as the power base — back squat and deadlift build structural strength around them.',
      difficulty: 'Intermediate',
      weeks: 8,
    },
    {
      name: 'Hybrid Power Builder',
      description: 'Explosive KB intervals paired with heavy barbell strength blocks.',
      difficulty: 'Advanced',
      weeks: 10,
    },
  ],
  mixed_modality: [
    {
      name: 'General Physical Preparedness',
      description: 'KB, barbell, bodyweight, and conditioning cycles. Complete athlete development.',
      difficulty: 'Intermediate',
      weeks: 12,
    },
    {
      name: 'The Complete Athlete',
      description: 'All implements plus running and cycling. Built for people who do more than lift.',
      difficulty: 'Advanced',
      weeks: 8,
    },
  ],
  complex_alt: [
    {
      name: 'Armor Builder Progression',
      description: 'KB complex protocol inspired by classic push-pull-hinge sequences. Simple, brutal, effective.',
      difficulty: 'Intermediate',
      weeks: 6,
    },
    {
      name: 'The Alternating Engine',
      description: 'Structured alternating session program pairing ballistic and grind blocks across the week.',
      difficulty: 'Intermediate',
      weeks: 8,
    },
  ],
}

interface Props {
  programs: ProgramMeta[]
  hasPurchased: boolean
}

export default function ProgramsTabView({ programs, hasPurchased }: Props) {
  const [activeTab, setActiveTab] = useState<TrainingStyleId>('kb_only')

  const activeTabMeta = TABS.find((t) => t.id === activeTab)!

  return (
    <div>
      {/* Tab bar */}
      <div className="overflow-x-auto -mx-4 px-4 mb-8">
        <div className="flex border-b border-white/10 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#e5322d] text-[#f0f0f0]'
                  : 'border-transparent text-[#9ca3af] hover:text-[#f0f0f0]'
              }`}
            >
              {tab.label}
              {tab.isBellSensePlus && (
                <span className="text-[#e5322d] text-xs font-bold">+</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category description */}
      <p className="text-[#9ca3af] text-sm mb-8">{CATEGORY_DESCRIPTIONS[activeTab]}</p>

      {/* KB Only — real programs */}
      {!activeTabMeta.isBellSensePlus && (
        <div className="grid sm:grid-cols-2 gap-4">
          {programs
            .filter((p) => (p.trainingStyle ?? 'kb_only') === activeTab)
            .map((p) => {
              const cardContent = (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9ca3af] uppercase tracking-wider">{p.difficulty}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#9ca3af]">
                        {p.weeks}wk · {p.sessionsPerWeek}×/wk
                      </span>
                      {!hasPurchased && <span className="text-[#9ca3af] text-xs">🔒</span>}
                    </div>
                  </div>
                  <h2 className="font-bold mb-1 group-hover:text-white transition-colors">{p.title}</h2>
                  <p className="text-[#9ca3af] text-sm">{p.bestFor}</p>
                </>
              )

              if (hasPurchased) {
                return (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="group bg-white/5 border border-white/10 border-l-2 border-l-white/10 rounded-xl p-6 hover:border-l-[#e5322d] hover:bg-white/[0.07] transition-all duration-200"
                  >
                    {cardContent}
                  </Link>
                )
              }

              return (
                <div
                  key={p.slug}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 opacity-60 cursor-not-allowed"
                >
                  {cardContent}
                </div>
              )
            })}
        </div>
      )}

      {/* BellSense+ tabs — placeholder cards */}
      {activeTabMeta.isBellSensePlus && (
        <div>
          <div className="bg-[#e5322d]/10 border border-[#e5322d]/30 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
            <span className="text-[#e5322d] text-sm">🔒</span>
            <p className="text-sm text-[#f0f0f0]">
              These programs are coming with <span className="font-semibold text-[#e5322d]">BellSense+</span>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {(PLACEHOLDER_CARDS[activeTab as Exclude<TrainingStyleId, 'kb_only'>] ?? []).map(
              (card) => (
                <div
                  key={card.name}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 opacity-60 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9ca3af] uppercase tracking-wider">{card.difficulty}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#9ca3af]">{card.weeks}wk</span>
                      <span className="text-xs font-bold text-[#e5322d]">BellSense+</span>
                    </div>
                  </div>
                  <h2 className="font-bold mb-1 text-[#f0f0f0]">{card.name}</h2>
                  <p className="text-[#9ca3af] text-sm">{card.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
