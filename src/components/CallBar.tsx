import { useEffect, useState } from 'react'
import { business } from '../lib/business'
import { PhoneGlyph } from './Nav'
import './CallBar.css'

/**
 * Persistent mobile call affordance. Appears once the hero is mostly gone,
 * hides again over the schedule section (which carries its own call action),
 * and respects the bottom safe area. Desktop hides it in CSS.
 */
export function CallBar() {
  const [pastHero, setPastHero] = useState(false)
  const [overSchedule, setOverSchedule] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const schedule = document.getElementById('schedule')
    if (!hero || !schedule) return

    const heroObs = new IntersectionObserver(
      ([entry]) => setPastHero(entry ? !entry.isIntersecting : false),
      { threshold: 0.45 },
    )
    const schedObs = new IntersectionObserver(
      ([entry]) => setOverSchedule(entry ? entry.isIntersecting : false),
      { threshold: 0 },
    )
    heroObs.observe(hero)
    schedObs.observe(schedule)
    return () => {
      heroObs.disconnect()
      schedObs.disconnect()
    }
  }, [])

  const visible = pastHero && !overSchedule

  return (
    <div className={`callbar${visible ? ' is-visible' : ''}`} inert={!visible}>
      <a className="callbar__call" href={business.phone.href}>
        <PhoneGlyph />
        Call {business.phone.display}
      </a>
      <a className="callbar__schedule" href="#schedule">
        Request an appointment
      </a>
    </div>
  )
}
