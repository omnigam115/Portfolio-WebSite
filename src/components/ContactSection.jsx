// ContactSection.jsx — Contact with real CV info + LinkedIn
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SOCIALS = [
  {
    label: 'GitHub',
    value: 'github.com/omnigam115',
    href: 'https://github.com/omnigam115',
    icon: 'GH',
    color: '#ffffff',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/om-nigam',
    href: 'https://www.linkedin.com/in/om-nigam/',
    icon: 'in',
    color: '#0077b5',
  },
  {
    label: 'Email',
    value: 'omnigam115@gmail.com',
    href: 'mailto:omnigam115@gmail.com',
    icon: '@',
    color: '#00d4ff',
  },
  {
    label: 'Phone',
    value: '+91 9918841427',
    href: 'tel:+919918841427',
    icon: '☎',
    color: '#7b2ff7',
  },
]

function InputField({ label, name, type = 'text', value, onChange, multiline }) {
  const [focused, setFocused] = useState(false)
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className="relative">
      <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-xs tracking-widest z-10 ${
        focused || value ? 'top-2 text-cyan-400 text-[10px]' : 'top-1/2 -translate-y-1/2 text-white/30'
      }`}>
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={multiline ? 5 : undefined}
        className={`w-full bg-white/3 border rounded-xl px-4 pt-6 pb-3 text-white font-rajdhani text-sm outline-none transition-all duration-300 resize-none ${
          focused ? 'border-cyan-400/50 bg-cyan-400/5' : 'border-white/8'
        }`}
        style={{ boxShadow: focused ? '0 0 20px rgba(0,212,255,0.1)' : 'none' }}
      />
    </div>
  )
}

export default function ContactSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
  }

  return (
    <section id="contact" className="relative py-32 z-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/6 blur-[100px] rounded-full pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-cyan-400 tracking-[0.4em] mb-4">GET IN TOUCH</p>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl gradient-text">Contact</h2>
          <p className="font-rajdhani text-lg text-white/40 mt-4 max-w-lg mx-auto">
            Ready to build something amazing? Drop a message or reach out directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-orbitron font-bold text-2xl text-white mb-3">Let's Connect</h3>
            <p className="font-rajdhani text-base text-white/50 mb-10 leading-relaxed">
              I'm open to internship opportunities, freelance projects, and exciting collaborations.
              Currently pursuing B.Tech CSE at LPU — let's build something impactful together.
            </p>
            <div className="space-y-4">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 glass rounded-2xl group hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-orbitron font-bold text-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: s.color + '15', color: s.color, border: `1px solid ${s.color}30` }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/30 tracking-widest mb-0.5">{s.label}</p>
                    <p className="font-rajdhani font-semibold text-white/80 group-hover:text-white transition-colors">{s.value}</p>
                  </div>
                  <svg className="w-4 h-4 ml-auto text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/Om_Nigam_CV.pdf"
              download
              data-hover
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-orbitron font-bold text-sm tracking-wider text-dark-900 bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume / CV
            </motion.a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center neon-border"
              >
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="font-orbitron font-bold text-2xl gradient-text-blue mb-3">Message Sent!</h3>
                <p className="font-rajdhani text-white/50 mb-6">
                  Thanks for reaching out, {form.name || 'friend'}! I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
                  data-hover
                  className="px-6 py-3 rounded-xl font-mono text-sm text-cyan-400 glass border border-cyan-400/20 hover:bg-cyan-400/10 transition-all"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-4 neon-border">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="YOUR NAME"  name="name"    value={form.name}    onChange={handleChange} />
                  <InputField label="EMAIL"       name="email"   type="email" value={form.email}   onChange={handleChange} />
                </div>
                <InputField label="SUBJECT"     name="subject" value={form.subject} onChange={handleChange} />
                <InputField label="MESSAGE"     name="message" value={form.message} onChange={handleChange} multiline />
                <button
                  type="submit"
                  data-hover
                  disabled={sending}
                  className="w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider text-dark-900 bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {sending ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full" />
                      Transmitting...
                    </>
                  ) : '⟶ Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
