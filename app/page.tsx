'use client'
import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'

export default function Home() {
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(1)
  const [videoReady, setVideoReady] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  type ChatMessage = { role: 'user' | 'assistant'; content: string }
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! Got questions? Send us a message and we'll reply ASAP. AI chat is coming soon.",
    },
  ])
  const [chatInput, setChatInput] = useState('')

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = chatInput.trim()
    if (!text) return
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: text },
      { role: 'assistant', content: "Thanks! We've received your message and will get back to you shortly." },
    ])
    setChatInput('')
  }
  // Trigger an immediate fade-in on mount
  // Video shows immediately without fade

  // Testimonials data
  const testimonials = [
    {
      id: 0,
      quote: "Outstanding service! My car looks brand new after their ceramic coating treatment. The attention to detail is incredible and the staff is very professional.",
      name: "MICHAEL JOHNSON",
      role: "Client",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      id: 1,
      quote: "Amazing ceramic coating service! My car has never looked better and the protection is incredible. Highly recommend their professional team.",
      name: "JUSTIN LEE",
      role: "Client",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      id: 2,
      quote: "Amazing interior detailing service! They transformed my car's interior completely. Professional team, fair pricing, and exceptional results. Highly recommended!",
      name: "SARAH MARTINEZ",
      role: "Client",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=64&h=64&fit=crop&crop=face"
    }
  ]

  // Navigation functions
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const selectTestimonial = (index: number) => {
    setActiveTestimonial(index)
  }

  useEffect(() => {
    const handleScroll = () => {
      const servicesEl = document.getElementById('services')
      if (!servicesEl) return
      const { top } = servicesEl.getBoundingClientRect()
      setShowStickyNav(top <= 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver to add in-view class for scroll-reveals
  useEffect(() => {
    if (typeof window === 'undefined') return
    const nodes = document.querySelectorAll<HTMLElement>('.reveal')
    if (!nodes.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view')
      })
    }, { threshold: 0.15 })
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  // Split hero title and line into characters and animate them
  useEffect(() => {
    if (typeof window === 'undefined') return
    const targets = [
      document.querySelector('#hero-kicker'),
      document.querySelector('#hero-title'),
    ].filter(Boolean) as HTMLElement[]

    targets.forEach((el) => {
      if (!el) return
      const text = el.textContent || ''
      el.textContent = ''
      const frag = document.createDocumentFragment()
      ;[...text].forEach((ch, idx) => {
        const span = document.createElement('span')
        span.className = 'char'
        if (ch === ' ') {
          span.innerHTML = '&nbsp;'
        } else {
          span.textContent = ch
        }
        frag.appendChild(span)
        // stagger entrance
        requestAnimationFrame(() => {
          setTimeout(() => span.classList.add('in'), idx * 30)
        })
      })
      el.appendChild(frag)
    })
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-white">
          <h1 className="text-2xl font-bold md:-ml-15">Auto Detailing Pro</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-red-400">Home</a>
            <a href="#services" className="hover:text-red-400">Services</a>
            <a href="#about" className="hover:text-red-400">About</a>
            <a href="#reviews" className="hover:text-red-400">Reviews</a>
            <a href="#news" className="hover:text-red-400">News</a>
            <a href="#contact" className="hover:text-red-400">Contact</a>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 tracking-wide">
            GET A QUOTE
          </button>
        </div>
      </nav>

      {/* Sticky Nav (appears on/after Services) */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ease-out ${showStickyNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="backdrop-blur" style={{ backgroundColor: 'rgb(13, 12, 15)', borderBottom: '0' }}>
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-white">
            <h1 className="text-2xl font-bold">Auto Detailing Pro</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-red-400">Home</a>
              <a href="#services" className="hover:text-red-400">Services</a>
              <a href="#about" className="hover:text-red-400">About</a>
              <a href="#reviews" className="hover:text-red-400">Reviews</a>
              <a href="#news" className="hover:text-red-400">News</a>
              <a href="#contact" className="hover:text-red-400">Contact</a>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 tracking-wide">
              GET A QUOTE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[80vh] sm:h-[85vh] md:h-screen flex items-center md:items-end justify-center md:justify-start overflow-hidden">
        {/* Background Video */}
        <video
          className={`absolute top-0 left-0 w-full h-full object-cover z-0`}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Detail Video Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay (top and bottom vignette) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(rgba(12,12,12,0.9) 0%, rgba(12,12,12,0) 26%, rgba(12,12,12,0) 56%, rgba(12,12,12,0.8) 71%, rgba(12,12,12,1) 88%, rgba(12,12,12,1) 100%)',
          }}
        />

        {/* Content */}
        <div className="z-20 w-full px-6 md:px-10 pb-0 sm:pb-2 md:pb-6 text-center md:text-left text-white">
          <div className="max-w-4xl reveal reveal-up">
            <p id="hero-kicker" className="text-[clamp(12px,3.5vw,18px)] uppercase text-white font-bold leading-none mb-1 md:ml-4 md:mb-0">
              FULL  SERVICE AND EXCELLENT QUALITY
            </p>
            <h1 id="hero-title" className="font-black uppercase leading-none tracking-tight mb-4 text-[clamp(64px,18vw,260px)] whitespace-nowrap drop-shadow-lg">
              CAR DETAILING
            </h1>
            <div className="mt-4 md:hidden">
              <a
                href="#contact"
                className="inline-block bg-red-600 text-white px-8 py-4 uppercase tracking-wide hover:bg-red-700 transition-colors"
              >
                Book Now
              </a>
            </div>
            
          </div>

          {/* Scroll Down indicator */}
          <a
            href="#services"
            className="hidden md:flex items-center gap-3 absolute right-8 bottom-10 text-white z-20 uppercase tracking-wide"
          >
            <span className="text-sm">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 18"
              className="w-3.5 h-4.5 animate-bounce"
              fill="currentColor"
            >
              <path d="M6.5 18c-.4 0-.8-.2-1-.6l-5-8a1.15 1.15 0 0 1 2-1.2l4 6.4 4-6.4a1.15 1.15 0 0 1 2 1.2l-5 8c-.2.4-.6.6-1 .6Z" />
            </svg>
          </a>

          {/* Scroll Down indicator (mobile center) */}
          <a
            href="#services"
            className="flex md:hidden items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 text-white z-20 uppercase tracking-wide"
          >
            <span className="text-xs">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 18"
              className="w-3.5 h-4.5 animate-bounce"
              fill="currentColor"
            >
              <path d="M6.5 18c-.4 0-.8-.2-1-.6l-5-8a1.15 1.15 0 0 1 2-1.2l4 6.4 4-6.4a1.15 1.15 0 0 1 2 1.2l-5 8c-.2.4-.6.6-1 .6Z" />
            </svg>
          </a>
        </div>
      </section>



      {/* Services Section */}
      <section id="services" className="py-0 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0 w-full">
          
            {/* Card 1 */}
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden group cursor-pointer reveal reveal-up reveal-delay-1">
              <img
                src="/services%201.jpg"
                alt="Protection film on car"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute left-6 bottom-6 transform transition-transform duration-300 group-hover:-translate-y-3">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">PROTECTION FILM</h3>
                <p className="text-white/80">Lorem ipsum dolor sit</p>
                {/* Arrow that appears on hover */}
                <div className="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden group cursor-pointer reveal reveal-up reveal-delay-2">
              <img
                src="/services%202.jpg"
                alt="Steam cleaning interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute left-6 bottom-6 transform transition-transform duration-300 group-hover:-translate-y-3">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">STEAM CLEANING</h3>
                <p className="text-white/80">Lorem ipsum dolor sit</p>
                {/* Arrow that appears on hover */}
                <div className="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden group cursor-pointer reveal reveal-up reveal-delay-3">
              <img
                src="/services%203.jpg"
                alt="Rims and tires washing"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute left-6 bottom-6 transform transition-transform duration-300 group-hover:-translate-y-3">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">RIMS & TIRES WASHING</h3>
                <p className="text-white/80">Lorem ipsum dolor sit</p>
                {/* Arrow that appears on hover */}
                <div className="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden group cursor-pointer reveal reveal-up reveal-delay-4">
              <img
                src="/services%204.jpg"
                alt="Ceramic coating application"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute left-6 bottom-6 transform transition-transform duration-300 group-hover:-translate-y-3">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">CERAMIC COATING</h3>
                <p className="text-white/80">Lorem ipsum dolor sit</p>
                {/* Arrow that appears on hover */}
                <div className="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* What We Do Section */}
      <section id="about" className="py-24 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="reveal reveal-left">
              <div className="uppercase tracking-widest text-white/70 text-sm mb-4">What we do</div>
                              <h2 className="text-5xl md:text-6xl font-extrabold leading-none mb-6">
                FULL-SERVICE<br />
                <span className="text-red-600">DETAILING FOR CARS</span>
              </h2>
              <h3 className="text-2xl font-semibold mb-4">Welcome to DetailX!</h3>
              <p className="text-white/80 max-w-xl mb-8">
                Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                  {/* phone icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/90">
                    <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.019c.98 0 1.84.63 2.14 1.563l.723 2.223a2.25 2.25 0 01-.52 2.287l-1.21 1.21a15.042 15.042 0 006.324 6.324l1.21-1.21a2.25 2.25 0 012.287-.52l2.223.723a2.25 2.25 0 011.563 2.14V19.5a2.25 2.25 0 01-2.25 2.25h-1.5C8.552 21.75 2.25 15.448 2.25 7.5v-0.75z"/>
                  </svg>
                </div>
                <div className="text-xl font-semibold tracking-wide">0 800 555 44 33</div>
              </div>
            </div>

            {/* Right images */}
            <div className="relative w-full h-[420px] md:h-[620px] reveal reveal-right reveal-delay-2">
              {/* Large top-right image */}
              <img
                src="/new%20what%20we%20do%202.jpg"
                alt="Red leather car seats"
                className="absolute top-0 right-0 h-[340px] w-[280px] md:h-[540px] md:w-[500px] object-cover z-0"
              />
              {/* Foreground bottom-left image */}
              <img
                src="/what%20we%20do%20%201.jpg"
                alt="Detailer polishing car"
                className="absolute top-[40%] left-4 md:left-8 md:top-[30%] w-[220px] h-[220px] md:w-[420px] md:h-[420px] object-cover shadow-2xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-1 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-[rgb(35,34,37)] px-10 py-12 text-center group cursor-pointer">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center text-red-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M40.4,20.57a1.009,1.009,0,0,0-.95-.69H34.48l-1.53-4.72a1,1,0,0,0-1.9,0l-1.53,4.72H24.55a1.009,1.009,0,0,0-.95.69.991.991,0,0,0,.37,1.12l4.01,2.92-1.53,4.72a1,1,0,0,0,.36,1.12,1.022,1.022,0,0,0,1.18,0L32,27.53l4.01,2.92a1.086,1.086,0,0,0,.59.19,1.036,1.036,0,0,0,.59-.19,1,1,0,0,0,.36-1.12l-1.53-4.72,4.01-2.92A.991.991,0,0,0,40.4,20.57Zm-6.14,2.85a1.006,1.006,0,0,0-.37,1.12l.81,2.48-2.11-1.54a1.011,1.011,0,0,0-1.18,0L29.3,27.02l.81-2.48a1.006,1.006,0,0,0-.37-1.12l-2.11-1.54h2.61a.991.991,0,0,0,.95-.69L32,18.71l.81,2.48a.991.991,0,0,0,.95.69h2.61Z"/>
                    <path d="M32,10.26a13.239,13.239,0,0,0-1.13,26.43c.38.03.75.05,1.13.05.34,0,.69-.02,1.03-.05h.1v-.01A13.234,13.234,0,0,0,32,10.26Zm9.81,18.72a.01.01,0,0,0-.01.01,11.191,11.191,0,0,1-8.85,5.7l-.01.01h-.01a9.1,9.1,0,0,1-1.88-.01,11.236,11.236,0,1,1,10.76-5.71Z"/>
                    <path d="M58.88,52.73,55.12,46.9q-4.035-6.225-8.06-12.47c.21-.08.45-.17.69-.25a4.179,4.179,0,0,0,2.67-1.8,4.179,4.179,0,0,0-.25-3.19,4.06,4.06,0,0,1-.37-1.63,3.96,3.96,0,0,1,1.01-1.25,4.234,4.234,0,0,0,1.64-2.81,4.19,4.19,0,0,0-1.64-2.8,4.091,4.091,0,0,1-1.01-1.26,4.06,4.06,0,0,1,.37-1.63,4.157,4.157,0,0,0,.25-3.18,4.2,4.2,0,0,0-2.67-1.8,4.218,4.218,0,0,1-1.49-.71,4.362,4.362,0,0,1-.36-1.61,4.191,4.191,0,0,0-1.15-3,4.2,4.2,0,0,0-3.17-.45,4.081,4.081,0,0,1-1.65,0,4.051,4.051,0,0,1-1.01-1.27,4.212,4.212,0,0,0-2.37-2.23,4.132,4.132,0,0,0-3.02.96A4.143,4.143,0,0,1,32,5.25a4.143,4.143,0,0,1-1.53-.73,4.122,4.122,0,0,0-3.01-.96,4.2,4.2,0,0,0-2.38,2.23,4.2,4.2,0,0,1-1,1.27,4.136,4.136,0,0,1-1.66,0,4.174,4.174,0,0,0-3.16.45,4.164,4.164,0,0,0-1.16,3.01,3.961,3.961,0,0,1-.37,1.6,3.944,3.944,0,0,1-1.47.7,4.226,4.226,0,0,0-2.68,1.8,4.179,4.179,0,0,0,.25,3.19,4.06,4.06,0,0,1,.37,1.63,4.091,4.091,0,0,1-1.01,1.26,4.19,4.19,0,0,0-1.64,2.8,4.234,4.234,0,0,0,1.64,2.81,3.96,3.96,0,0,1,1.01,1.25,4.06,4.06,0,0,1-.37,1.63,4.157,4.157,0,0,0-.25,3.18,4.142,4.142,0,0,0,2.67,1.8c.23.09.47.17.69.26Q12.905,40.67,8.88,46.9L5.12,52.73a.981.981,0,0,0,.01,1.1.992.992,0,0,0,1.01.42l6.83-1.27,1.66,6.76a1,1,0,0,0,.81.74.875.875,0,0,0,.16.02.985.985,0,0,0,.84-.46L27.22,43.35c.08.02.15.07.23.09a2.2,2.2,0,0,0,.5.06,5.009,5.009,0,0,0,2.52-1.02A4.143,4.143,0,0,1,32,41.75a4.143,4.143,0,0,1,1.53.73,4.1,4.1,0,0,0,3.03.96c.08-.02.15-.07.22-.09L47.56,60.04a.985.985,0,0,0,.84.46.875.875,0,0,0,.16-.02,1,1,0,0,0,.81-.74l1.66-6.76,6.83,1.27a1,1,0,0,0,1.01-.42A.981.981,0,0,0,58.88,52.73ZM16.02,57l-1.33-5.41a1,1,0,0,0-1.15-.75L8.06,51.86l2.5-3.87q3.75-5.82,7.52-11.64a.784.784,0,0,1,.02.14,4.191,4.191,0,0,0,1.15,3,4.205,4.205,0,0,0,3.17.45,4.081,4.081,0,0,1,1.65,0,3.935,3.935,0,0,1,1.01,1.27c.19.29.38.58.58.86ZM36.4,41.29a.7.7,0,0,1-.3.2c-.28.06-1.02-.39-1.5-.7A5.071,5.071,0,0,0,32,39.75a5.071,5.071,0,0,0-2.6,1.04c-.48.31-1.22.77-1.49.71a.828.828,0,0,1-.32-.22,6.488,6.488,0,0,1-.81-1.13,5.026,5.026,0,0,0-1.83-2.01,3.246,3.246,0,0,0-1.45-.29,11.376,11.376,0,0,0-1.3.1c-.62.07-1.46.17-1.7-.02s-.34-1.04-.41-1.66a5.025,5.025,0,0,0-.79-2.64,1.7,1.7,0,0,0-.27-.27,1.249,1.249,0,0,0-.12-.09l-.01-.01h-.01a6.3,6.3,0,0,0-1.98-.97c-.59-.21-1.39-.49-1.53-.79-.14-.28.14-1.07.34-1.65a4.932,4.932,0,0,0,.43-2.73,4.848,4.848,0,0,0-1.55-2.23c-.44-.44-1.05-1.05-1.05-1.39s.61-.95,1.05-1.39a4.848,4.848,0,0,0,1.55-2.23,4.932,4.932,0,0,0-.43-2.73c-.2-.58-.48-1.37-.34-1.66s.95-.57,1.54-.78a4.864,4.864,0,0,0,2.37-1.34,4.91,4.91,0,0,0,.8-2.63c.07-.62.16-1.46.41-1.66s1.08-.1,1.7-.03a5.007,5.007,0,0,0,2.75-.19,4.956,4.956,0,0,0,1.83-2.01c.33-.54.79-1.27,1.12-1.34.28-.07,1.02.4,1.5.7A5.071,5.071,0,0,0,32,7.25a5.071,5.071,0,0,0,2.6-1.04c.48-.3,1.21-.76,1.5-.7.33.07.79.8,1.12,1.34a4.956,4.956,0,0,0,1.83,2.01,5.007,5.007,0,0,0,2.75.19c.62-.07,1.46-.17,1.7.02s.34,1.04.41,1.66a5.025,5.025,0,0,0,.79,2.64,5.024,5.024,0,0,0,2.39,1.35c.59.2,1.39.48,1.53.78.14.28-.14,1.07-.34,1.65a4.932,4.932,0,0,0-.43,2.73,4.848,4.848,0,0,0,1.55,2.23c.44.44,1.05,1.05,1.05,1.39s-.61.95-1.05,1.39a4.848,4.848,0,0,0-1.55,2.23,4.932,4.932,0,0,0,.43,2.73c.2.58.48,1.37.34,1.66s-.95.58-1.53.78a6.074,6.074,0,0,0-2.07,1.02,3.107,3.107,0,0,0-.31.32,4.91,4.91,0,0,0-.8,2.63c-.07.62-.16,1.46-.41,1.66s-1.08.1-1.7.03a4.916,4.916,0,0,0-2.75.19,5.026,5.026,0,0,0-1.83,2.01A6.464,6.464,0,0,1,36.4,41.29Zm14.06,9.55a1,1,0,0,0-1.15.75L47.98,57,38.34,42.07c.2-.28.39-.57.58-.86a4.07,4.07,0,0,1,1-1.27,4.136,4.136,0,0,1,1.66,0,4.174,4.174,0,0,0,3.16-.45,4.157,4.157,0,0,0,1.16-3,.675.675,0,0,1,.02-.14q3.765,5.82,7.52,11.64l2.5,3.87Z"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-wide">PREMIUM QUALITY</h3>
              <p className="text-white/70 mt-3">Sed do eiusmod tempor</p>
              <div className="flex items-center justify-center gap-1 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[rgb(35,34,37)] px-10 py-12 text-center group cursor-pointer">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center text-red-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M16 11H14M16 16H14M8 11L9 12L11 10M8 16L9 17L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-wide">LICENSE & INSURANCE</h3>
              <p className="text-white/70 mt-3">Sed do eiusmod tempor</p>
              <div className="flex items-center justify-center gap-1 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[rgb(35,34,37)] px-10 py-12 text-center group cursor-pointer">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center text-red-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-12 h-12" viewBox="0 0 436.38 436.381" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M218.19,232c54.735,0,99.107-51.936,99.107-116c0-88.842-44.371-116-99.107-116c-54.736,0-99.107,27.158-99.107,116C119.083,180.064,163.455,232,218.19,232z"/>
                    <path d="M432.47,408.266l-50-112.636c-1.838-4.142-5.027-7.534-9.045-9.626l-79.62-41.445c-4.809-2.504-10.423-2.947-15.564-1.231c-5.141,1.715-9.364,5.442-11.707,10.329L232.7,324.266l4.261-38.408c0.133-1.201-0.174-2.412-0.865-3.405l-13.8-19.839c-0.048-0.068-0.104-0.131-0.154-0.195l11.935-9.061c1.028-0.781,1.633-1.998,1.633-3.291c0-4.834-3.935-8.769-8.77-8.769h-17.498c-4.835,0-8.769,3.935-8.769,8.769c0,1.293,0.604,2.51,1.633,3.291l11.934,9.061c-0.051,0.064-0.106,0.127-0.154,0.195l-13.8,19.839c-0.691,0.993-0.999,2.204-0.865,3.405l4.26,38.408l-33.834-70.609c-2.342-4.887-6.566-8.614-11.707-10.329c-5.14-1.716-10.757-1.271-15.564,1.231l-79.62,41.445c-4.018,2.092-7.207,5.484-9.045,9.626l-50,112.636c-2.746,6.188-2.177,13.342,1.512,19.018c3.689,5.674,9.999,9.098,16.768,9.098h392c6.769,0,13.078-3.424,16.768-9.1C434.648,421.607,435.216,414.453,432.47,408.266z"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-wide">CERTIFIED EXPERTS</h3>
              <p className="text-white/70 mt-3">Sed do eiusmod tempor</p>
              <div className="flex items-center justify-center gap-1 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[rgb(35,34,37)] px-10 py-12 text-center group cursor-pointer">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center text-red-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-12 h-12" viewBox="0 0 512.000000 512.000000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M4137 5099 c-47 -25 -72 -77 -85 -181 -26 -210 -186 -374 -389 -400-43 -5 -97 -18 -120 -29 -108 -48 -108 -210 0 -258 23 -11 77 -23 119 -29 210-26 364 -180 390 -390 14 -106 38 -156 87 -182 51 -25 91 -25 142 0 49 26 73 76 87 182 26 210 180 364 390 390 106 14 156 38 182 87 40 79 12 167 -63 200-23 11 -77 24 -120 29 -203 26 -363 190 -389 400 -14 106 -38 156 -87 182 -50 25 -95 25 -144 -1z m147 -663 l73 -74 -73 -73 -74 -73 -74 73 -73 73 71 73c39 41 72 74 74 74 1 1 36 -32 76 -73z"/>
                    <path d="M1137 4189 c-47 -25 -72 -77 -85 -181 -26 -210 -180 -364 -390 -390-106 -14 -156 -38 -182 -87 -25 -51 -25 -91 0 -141 23 -46 81 -80 134 -80 102 0 222 -50 306 -128 l53 -48 -89 -358 c-49 -197 -92 -362 -95 -367 -3 -5 -37-17 -75 -27 -131 -35 -245 -104 -350 -214 -78 -81 -125 -161 -166 -279 l-33-94 -3 -385 c-3 -266 0 -403 8 -445 25 -129 114 -249 225 -306 l65 -34 0 -101c0 -184 38 -293 134 -390 174 -174 458 -174 632 0 94 95 134 207 134 377 l0 89 1050 0 1050 0 0 -89 c0 -170 40 -282 134 -377 174 -174 458 -174 632 0 96 97 134 206 134 390 l0 101 65 34 c111 57 200 177 225 306 8 42 11 179 8 445l-3 385 -33 94 c-41 118 -88 198 -166 279 -105 110 -219 179 -350 214 -38 10-71 20 -74 22 -2 3 -55 208 -117 456 -74 296 -123 471 -141 507 -34 67 -114 149 -181 186 -105 57 -105 57 -994 57 -513 0 -836 4 -870 10 -193 37 -336 191-361 388 -14 106 -38 156 -87 182 -50 25 -95 25 -144 -1z m148 -659 l70 -70-73 -73 -72 -72 -72 72 -73 73 70 70 c38 38 72 70 75 70 3 0 37 -32 75 -70zm2154 -238 c19 -9 44 -30 55 -45 14 -19 55 -166 122 -433 l102 -404 -138 0-137 0 -18 48 c-67 179 -207 314 -390 373 -55 18 -93 23 -175 23 -82 0 -120-5 -175 -23 -183 -59 -323 -194 -390 -373 l-18 -48 -587 0 -588 0 37 148 37 147 40 6 c97 13 134 63 152 201 24 193 168 351 353 387 24 5 413 9 864 10 762 1 822 0 854 -17z m-495 -746 c59 -18 117 -57 151 -102 l26 -34 -261 0 -261 0 26 34 c72 95 203 137 319 102z m1047 -446 c180 -34 325 -179 359 -359 5 -30 10 -202 10 -388 0 -315 -1 -336 -20 -373 -13 -26 -34 -47 -60 -60 -39 -20 -55-20 -1870 -20 -1815 0 -1831 0 -1870 20 -26 13 -47 34 -60 60 -19 37 -20 58-20 373 0 186 5 358 10 388 33 176 179 324 351 358 65 13 3103 13 3170 1zm-2931 -1590 c0 -112 -20 -159 -80 -190 -50 -25 -90 -25 -140 0 -60 31 -80 78-80 190 l0 90 150 0 150 0 0 -90z m3000 0 c0 -112 -20 -159 -80 -190 -50 -25-90 -25 -140 0 -60 31 -80 78 -80 190 l0 90 150 0 150 0 0 -90z"/>
                    <path d="M838 1789 c-43 -22 -78 -81 -78 -131 0 -18 10 -51 23 -73 21 -38 41-50 355 -207 240 -121 343 -168 368 -168 53 0 111 34 134 80 26 51 25 95 -3 145 -21 38 -41 50 -355 208 -360 180 -372 184 -444 146z"/>
                    <path d="M3538 1643 c-314 -158 -334 -170 -355 -208 -28 -50 -29 -94 -3 -145 23 -46 81 -80 134 -80 25 0 128 47 368 168 314 157 334 169 355 207 28 50 29 94 3 145 -23 46 -81 80 -134 80 -25 0 -128 -47 -368 -167z"/>
                    <path d="M2038 1489 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 37 -19 58 -20 370 -20 312 0 333 1 370 20 45 23 80 80 80 130 0 50 -35 107 -80 130-37 19 -58 20 -372 20 -312 -1 -335 -2 -370 -21z"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-wide">RANGE OF SERVICE</h3>
              <p className="text-white/70 mt-3">Sed do eiusmod tempor</p>
              <div className="flex items-center justify-center gap-1 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-red-500 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Text Section */}
      <section className="relative overflow-hidden py-8 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="relative">
          {/* Marquee Container */}
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-white/10 mr-16">
              drive a new car every day
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-white/10 mr-16">
              drive a new car every day
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-white/10 mr-16">
              drive a new car every day
            </span>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-0 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          
          {/* Left Panel - Book Now */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img
              src="/contact%201.jpg"
              alt="Car detailing service"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-500/60 mix-blend-saturation" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="uppercase tracking-widest text-white/80 text-sm mb-4">GET IN TOUCH</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                HAVE A PROBLEM?
              </h2>
              <button className="border-2 border-white text-white px-8 py-4 text-lg font-semibold tracking-wide hover:bg-white hover:text-black transition-all duration-300">
                BOOK NOW
              </button>
            </div>
          </div>

          {/* Right Panel - Contact Us */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img
              src="/contact%202.jpg"
              alt="Car interior detailing"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="uppercase tracking-widest text-white/80 text-sm mb-4">CAREERS</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                WANT TO WORK WITH US?
              </h2>
              <button className="border-2 border-white text-white px-8 py-4 text-lg font-semibold tracking-wide hover:bg-white hover:text-black transition-all duration-300">
                CONTACT US
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            {/* Red quotation marks */}
            <div className="text-red-600 text-4xl md:text-6xl font-bold mb-4 md:mb-8">"</div>
            
            {/* Main testimonial text with side arrows */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-6 md:mb-12">
              {/* Left arrow */}
              <button 
                onClick={prevTestimonial}
                className="text-white hover:text-white/70 transition-colors cursor-pointer flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              <div className="flex items-center justify-center min-h-[120px] md:min-h-[150px] max-w-4xl">
                <p className="text-lg md:text-2xl lg:text-3xl leading-relaxed text-white/90 transition-all duration-500">
                  {testimonials[activeTestimonial].quote}
                </p>
              </div>
              
              {/* Right arrow */}
              <button 
                onClick={nextTestimonial}
                className="text-white hover:text-white/70 transition-colors cursor-pointer flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            
            {/* Client name */}
            <h3 className="text-xl md:text-2xl font-bold tracking-wide mb-2 transition-all duration-500">
              {testimonials[activeTestimonial].name}
            </h3>
            <p className="text-white/60 text-base md:text-lg transition-all duration-500">
              {testimonials[activeTestimonial].role}
            </p>
          </div>
          
          {/* Client avatars */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3 md:gap-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  onClick={() => selectTestimonial(index)}
                  className={`rounded-full overflow-hidden border-2 border-white/20 hover:border-white/50 cursor-pointer transition-all duration-300 ${
                    index === activeTestimonial ? 'w-20 h-20 md:w-24 md:h-24' : 'w-14 h-14 md:w-16 md:h-16'
                  }`}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>





      {/* Latest Articles Section */}
      <section className="py-24 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="uppercase tracking-widest text-white/70 text-sm mb-4">OUR NEWS</div>
            <h2 className="text-5xl md:text-6xl font-extrabold">LATEST ARTICLES</h2>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal reveal-up">
            
            {/* Article 1 */}
            <div className="group cursor-pointer">
              <div className="h-[500px] rounded-lg overflow-hidden bg-[rgba(35,34,37,1)] grid grid-rows-[auto,1fr,auto]">
                {/* Top Content Block */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide">
                      DETAILING
                    </span>
                    <span className="text-white/80 text-sm">Jul 10, 2023</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    CAR BODY POLISH MAKES IT LOOK LIKE NEW!
                  </h3>
                </div>

                {/* Middle Image */}
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&h=800&fit=crop"
                    alt="Car body polish"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Bottom Action Block */}
                <div className="p-6">
                  <a href="#" className="relative inline-flex items-center text-white group-hover:pl-32 transition-all duration-300">
                    <span className="absolute left-0 uppercase text-sm font-bold tracking-wide opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="group cursor-pointer">
              <div className="h-[500px] rounded-lg overflow-hidden bg-[rgba(35,34,37,1)] grid grid-rows-[auto,1fr,auto]">
                {/* Top Content Block */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide">
                      DETAILING
                    </span>
                    <span className="text-white/80 text-sm">Jul 10, 2023</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    SEALING HEADLIGHTS AFTER A POLISH WITH A FILM
                  </h3>
                </div>

                {/* Middle Image */}
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop"
                    alt="Sealing headlights"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Bottom Action Block */}
                <div className="p-6">
                  <a href="#" className="relative inline-flex items-center text-white group-hover:pl-32 transition-all duration-300">
                    <span className="absolute left-0 uppercase text-sm font-bold tracking-wide opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="group cursor-pointer">
              <div className="h-[500px] rounded-lg overflow-hidden bg-[rgba(35,34,37,1)] grid grid-rows-[auto,1fr,auto]">
                {/* Top Content Block */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide">
                      DETAILING
                    </span>
                    <span className="text-white/80 text-sm">Jul 10, 2023</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    THE BEST SOAP AND WAX TO COVER YOUR CAR WITH
                  </h3>
                </div>

                {/* Middle Image */}
                <div className="relative overflow-hidden">
                  <img
                    src="/image%20for%20the%20article%20cleaning%20car.jpg"
                    alt="Car washing with soap"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Bottom Action Block */}
                <div className="p-6">
                  <a href="#" className="relative inline-flex items-center text-white group-hover:pl-32 transition-all duration-300">
                    <span className="absolute left-0 uppercase text-sm font-bold tracking-wide opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 text-white reveal reveal-up" style={{ backgroundColor: 'rgb(13, 12, 15)' }}>
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0 items-stretch min-h-[700px]">
            {/* Left image / visual */}
            <div className="hidden lg:block relative w-full h-full overflow-hidden">
              <img src="/imageforcontact.jpg" alt="Contact visual" className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>

            {/* Form block */}
            <div className="flex items-center px-8 pl-4">
              <div className="w-full">
                <div className="uppercase tracking-widest text-white/60 text-sm mb-4">Contact Us</div>
                <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-10">
                  Have questions?
                  <br />
                  <span className="text-white">Get in touch!</span>
                </h2>

                            <form className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Name</label>
                    <input type="text" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white placeholder-white/40 outline-none py-2" placeholder="" />
                 </div>
                 <div>
                    <label className="block text-white/70 text-sm mb-1">Last Name</label>
                    <input type="text" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white placeholder-white/40 outline-none py-2" placeholder="" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Email</label>
                    <input type="email" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white placeholder-white/40 outline-none py-2" placeholder="" />
                 </div>
                 <div>
                    <label className="block text-white/70 text-sm mb-1">Phone</label>
                    <input type="tel" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white placeholder-white/40 outline-none py-2" placeholder="" />
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-white/70 text-sm mb-1">Message</label>
                  <textarea rows={3} className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white placeholder-white/40 outline-none py-2" />
                </div>

                {/* Submit */}
                <button type="submit" className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-md font-semibold tracking-wide">
                  <Send className="w-4 h-4" />
                  Get in touch
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="text-white py-8" style={{ backgroundColor: 'rgb(35, 34, 37)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">Auto Detailing Pro</h3>
              <p>Professional auto detailing services for all vehicle types.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>Exterior Detailing</li>
                <li>Interior Detailing</li>
                <li>Paint Correction</li>
                <li>Ceramic Coating</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-red-400">Home</a></li>
                <li><a href="#services" className="hover:text-red-400">Services</a></li>
                <li><a href="#about" className="hover:text-red-400">About</a></li>
                <li><a href="#contact" className="hover:text-red-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Auto Detailing Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat floating button */}
      <button
        type="button"
        onClick={() => setIsChatOpen((o) => !o)}
        aria-label="Live chat"
        className="fixed bottom-10 md:bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.418-4.03 8-9 8-1.27 0-2.49-.2-3.6-.57-.28-.09-.59-.07-.86.05L3 20l.64-3.18c.05-.25 0-.5-.13-.72C3.56 14.68 3 13.38 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h.01M12 11h.01M16 11h.01"/>
        </svg>
      </button>

      {/* Live Chat widget */}
      {isChatOpen && (
        <div className="fixed bottom-28 md:bottom-36 right-6 z-50 w-[92vw] max-w-sm bg-[rgb(35,34,37)] text-white rounded-lg shadow-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[rgba(255,255,255,0.06)] border-b border-white/10">
            <div className="text-sm font-semibold tracking-wide">Live Chat</div>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {chatMessages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className={
                    'inline-block px-3 py-2 rounded-lg max-w-[85%] ' +
                    (m.role === 'user' ? 'bg-red-600' : 'bg-white/10')
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex items-center gap-2 p-3 border-t border-white/10 bg-[rgba(255,255,255,0.03)]">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none border border-white/15 focus:border-white/30 rounded px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}