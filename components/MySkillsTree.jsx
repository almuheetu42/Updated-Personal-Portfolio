import React, { useState } from 'react';

/**
 * MD. AL-MUHEETU SHIHAB - Skills Flowchart & Skill Tree Component
 * Synchronized with the latest CV and index.html portfolio
 */
export const SHIHAB_SKILLS_DATA = {
  frontend: {
    title: 'Frontend Architecture',
    subtitle: 'Web UI, Responsive Layouts & Reactive Frameworks',
    skills: [
      { name: 'HTML5', desc: 'Semantic HTML & modern markup', category: 'frontend' },
      { name: 'CSS3', desc: 'Modern CSS, Flexbox & Grid', category: 'frontend' },
      { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', category: 'frontend' },
      { name: 'JavaScript', desc: 'ES6+, DOM, async/await', category: 'frontend' },
      { name: 'TypeScript', desc: 'Strict typing & scalable application development', category: 'frontend' },
      { name: 'React', desc: 'Component-based modern web UI', category: 'frontend' },
      { name: 'Daisy UI', desc: 'Tailwind CSS component library for modern web interfaces', category: 'frontend' },
      { name: 'SASS / SCSS', desc: 'Preprocessor & modular styles', category: 'frontend' },
      { name: 'Bootstrap', desc: 'Responsive components & utilities', category: 'frontend' },
      { name: 'jQuery', desc: 'DOM helpers & legacy projects', category: 'frontend' },
      { name: 'React Native', desc: 'Cross-platform mobile apps with React', category: 'frontend' },
      { name: 'SEO', desc: 'Search Engine Optimization and performance', category: 'frontend' },
    ],
  },
  mobile: {
    title: 'Mobile & Android Architecture',
    subtitle: 'Kotlin, Jetpack Compose & Clean Architecture',
    skills: [
      { name: 'Kotlin', desc: 'Primary language for modern native Android development', category: 'mobile' },
      { name: 'Jetpack Compose', desc: 'Modern declarative Android UI toolkit', category: 'mobile' },
      { name: 'React Native', desc: 'Cross-platform mobile app development with Expo/CLI', category: 'mobile' },
      { name: 'MVVM Architecture', desc: 'Model-View-ViewModel & Repository pattern', category: 'mobile' },
      { name: 'Coroutines & StateFlow', desc: 'Asynchronous reactive programming & state management', category: 'mobile' },
      { name: 'Room & SQLite', desc: 'Offline-first local database caching & persistence', category: 'mobile' },
      { name: 'Dagger / Hilt', desc: 'Dependency injection for scalable Android architecture', category: 'mobile' },
      { name: 'NativeWind', desc: 'Tailwind CSS for React Native styling', category: 'mobile' },
      { name: 'XML Layouts', desc: 'Traditional Android View-based UI layouts', category: 'mobile' },
      { name: 'ViewModel', desc: 'State holder & lifecycle management for UI', category: 'mobile' },
      { name: 'LiveData', desc: 'Observable lifecycle-aware data streams', category: 'mobile' },
      { name: 'DataStore', desc: 'Local key-value & proto storage solution', category: 'mobile' },
    ],
  },
  backend: {
    title: 'Backend & Networking',
    subtitle: 'REST APIs, Retrofit/OkHttp & PHP',
    skills: [
      { name: 'REST APIs', desc: 'Designing & consuming RESTful services', category: 'backend' },
      { name: 'Retrofit & Moshi', desc: 'Type-safe HTTP client & JSON parsing for Android', category: 'backend' },
      { name: 'OkHttp', desc: 'HTTP networking client & interceptor configuration', category: 'backend' },
      { name: 'API Caching', desc: 'Response caching mechanisms for offline performance', category: 'backend' },
      { name: 'PHP (Basic)', desc: 'Server-side scripting, API endpoints & CMS logic', category: 'backend' },
    ],
  },
  cms: {
    title: 'DevOps, Tools & CMS',
    subtitle: 'Git, GitHub, CI/CD, Postman & WordPress',
    skills: [
      { name: 'Git', desc: 'Version control fundamentals & branching strategies', category: 'cms' },
      { name: 'GitHub', desc: 'Repositories, actions, PR reviews & collaboration', category: 'cms' },
      { name: 'GitLab', desc: 'CI/CD pipelines & enterprise DevOps workflows', category: 'cms' },
      { name: 'Codeberg', desc: 'Open-source Git version control & repository hosting', category: 'cms' },
      { name: 'Postman', desc: 'API testing, mock servers & collection workflows', category: 'cms' },
      { name: 'Slack', desc: 'Cross-functional team communication and integrations', category: 'cms' },
      { name: 'Jira', desc: 'Agile sprint planning, issue tracking & project management', category: 'cms' },
      { name: 'WordPress', desc: 'Theme & plugin customization, CMS administration', category: 'cms' },
    ],
  },
  other: {
    title: 'Core CS, Algorithms & UI/UX Design',
    subtitle: '90+ DSA Problem Solving, Wireframing & Agile Engineering',
    skills: [
      { name: 'Logic & Algorithms', desc: 'Data structures, algorithms, and advanced problem solving', category: 'other' },
      { name: '90+ HackerRank DSA', desc: 'Competitive programming & algorithmic precision', category: 'other' },
      { name: 'UI/UX Design', desc: 'Efficient user interface design, localization & navigation', category: 'other' },
      { name: 'POS Workflows', desc: 'Sales, barcode scanning, thermal printing & multi-payment', category: 'other' },
      { name: 'Navigation Patterns', desc: 'In-app & web navigation architectures', category: 'other' },
      { name: 'Localization', desc: 'Internationalization (i18n) & multilingual app support', category: 'other' },
      { name: 'Coding Proficiency', desc: 'Clean, readable, modular & tested codebases', category: 'other' },
      { name: 'Client Interaction', desc: 'Requirement gathering, sprint demos & client communication', category: 'other' },
      { name: 'Time Management', desc: 'Agile deliverables, milestone tracking & deadlines', category: 'other' },
      { name: 'Team Collaboration', desc: 'Cross-functional teamwork, code reviews & mentorship', category: 'other' },
    ],
  },
};

export default function MySkillsTree({ data = SHIHAB_SKILLS_DATA, onSkillClick }) {
  const [activeSkill, setActiveSkill] = useState(data.mobile.skills[0]);

  const handleSkillClick = (skill) => {
    setActiveSkill(skill.name === activeSkill?.name ? null : skill);
    if (onSkillClick) onSkillClick(skill);
  };

  return (
    <section id="skills" className="relative w-full py-16 px-4 bg-[#080d1a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden font-sans">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-950/40 via-cyan-950/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Skill Architecture & Tech Tree
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">Skills</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Tools, frameworks & architectures I use regularly — click any card to inspect its details
          </p>
          <div className="mt-4">
            <a
              href="images/CV/MD. AL-MUHEETU_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:brightness-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105"
            >
              Download CV
            </a>
          </div>
        </header>

        {/* Highlighted Detail Panel */}
        <div className="mb-12">
          <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-cyan-500/30 flex items-center gap-5 shadow-[0_0_30px_rgba(56,189,248,0.12)]">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl flex-shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <span className="font-bold text-2xl text-cyan-300">
                {activeSkill?.name?.charAt(0) || '★'}
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {activeSkill?.name || 'Select a skill'}
              </div>
              <div className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                {activeSkill?.desc || 'Click any skill pill below to inspect its details and technical role.'}
              </div>
            </div>
          </div>
        </div>

        {/* Central Root: MY SKILLS */}
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition duration-500" />
            <div className="relative px-12 py-4 rounded-xl bg-[#0c1426]/95 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-transform duration-300 group-hover:scale-105">
              <h2 className="text-xl md:text-2xl font-black tracking-[0.25em] text-white uppercase text-center flex items-center gap-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                MY SKILLS
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
              </h2>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP TREE FLOW (md and above) ================= */}
        <div className="hidden md:block">
          
          {/* Top Stem */}
          <div className="w-[2px] h-10 mx-auto bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />

          {/* Tier 1 Branch Bar (50% width centered) */}
          <div className="relative w-1/2 mx-auto">
            <div className="h-[2px] w-full bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="absolute -left-1.5 -top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8]" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8]" />
            <div className="absolute -right-1.5 -top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8]" />

            <div className="absolute left-0 top-0 w-[2px] h-10 bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="absolute right-0 top-0 w-[2px] h-10 bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-10 bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
          </div>

          {/* Tier 1 Grid: Frontend & Mobile */}
          <div className="grid grid-cols-2 gap-10 lg:gap-14 relative mt-10 items-stretch">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)] pointer-events-none" />

            {/* Frontend Card */}
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8] z-20" />
              <div className="h-full rounded-2xl p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-5 pb-3 border-b border-cyan-500/20">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
                    {data.frontend.title}
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                    {data.frontend.skills.length} Skills
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 w-full">
                  {data.frontend.skills.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleSkillClick(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none ${
                        activeSkill?.name === s.name
                          ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-105'
                          : 'bg-[#0d1628]/85 border border-cyan-500/20 text-cyan-200 hover:text-white hover:border-cyan-400 hover:bg-[#13223f] hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] hover:-translate-y-0.5'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Card */}
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8] z-20" />
              <div className="h-full rounded-2xl p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-5 pb-3 border-b border-cyan-500/20">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">
                    {data.mobile.title}
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                    {data.mobile.skills.length} Skills
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 w-full">
                  {data.mobile.skills.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleSkillClick(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none ${
                        activeSkill?.name === s.name
                          ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-105'
                          : 'bg-[#0d1628]/85 border border-cyan-500/20 text-cyan-200 hover:text-white hover:border-emerald-400 hover:bg-[#13223f] hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:-translate-y-0.5'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trunk down to Tier 2 */}
          <div className="w-[2px] h-12 mx-auto bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />

          {/* Tier 2 Branch Bar */}
          <div className="relative w-1/2 mx-auto">
            <div className="h-[2px] w-full bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="absolute -left-1.5 -top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8]" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8]" />
            <div className="absolute -right-1.5 -top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8]" />

            <div className="absolute left-0 top-0 w-[2px] h-10 bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="absolute right-0 top-0 w-[2px] h-10 bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-10 bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
          </div>

          {/* Tier 2 Grid: Backend & DevOps */}
          <div className="grid grid-cols-2 gap-10 lg:gap-14 relative mt-10 items-stretch">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)] pointer-events-none" />

            {/* Backend Card */}
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8] z-20" />
              <div className="h-full rounded-2xl p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-5 pb-3 border-b border-cyan-500/20">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
                    {data.backend.title}
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                    {data.backend.skills.length} Skills
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 w-full">
                  {data.backend.skills.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleSkillClick(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none ${
                        activeSkill?.name === s.name
                          ? 'bg-amber-500/25 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-105'
                          : 'bg-[#0d1628]/85 border border-cyan-500/20 text-cyan-200 hover:text-white hover:border-amber-400 hover:bg-[#13223f] hover:shadow-[0_0_16px_rgba(245,158,11,0.4)] hover:-translate-y-0.5'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DevOps Card */}
            <div className="relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8] z-20" />
              <div className="h-full rounded-2xl p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-5 pb-3 border-b border-cyan-500/20">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-blue-300 uppercase">
                    {data.cms.title}
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono">
                    {data.cms.skills.length} Skills
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 w-full">
                  {data.cms.skills.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleSkillClick(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none ${
                        activeSkill?.name === s.name
                          ? 'bg-blue-500/25 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-105'
                          : 'bg-[#0d1628]/85 border border-cyan-500/20 text-cyan-200 hover:text-white hover:border-blue-400 hover:bg-[#13223f] hover:shadow-[0_0_16px_rgba(59,130,246,0.4)] hover:-translate-y-0.5'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trunk down to Tier 3 */}
          <div className="w-[2px] h-12 mx-auto bg-[#1e3358] shadow-[0_0_8px_rgba(56,189,248,0.4)]" />

          {/* Tier 3: Core CS & UI/UX */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/30 shadow-[0_0_10px_#38bdf8] z-20" />
            <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-6 pb-3 border-b border-cyan-500/20">
                <h3 className="text-xs font-bold tracking-[0.25em] text-pink-300 uppercase">
                  {data.other.title}
                </h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-mono">
                  {data.other.skills.length} Skills
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5 w-full">
                {data.other.skills.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => handleSkillClick(s)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none ${
                      activeSkill?.name === s.name
                        ? 'bg-pink-500/25 border-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                        : 'bg-[#0d1628]/85 border border-cyan-500/20 text-cyan-200 hover:text-white hover:border-pink-400 hover:bg-[#13223f] hover:shadow-[0_0_16px_rgba(236,72,153,0.4)] hover:-translate-y-0.5'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================= MOBILE TREE FLOW (below md) ================= */}
        <div className="block md:hidden mt-8">
          <div className="relative pl-6 border-l-2 border-cyan-500/40 ml-4 space-y-6">
            {Object.entries(data).map(([key, category]) => (
              <div key={key} className="relative">
                <div className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-500/20 shadow-[0_0_10px_#38bdf8]" />
                <div className="rounded-xl p-5 bg-slate-900/90 border border-cyan-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold tracking-[0.15em] text-cyan-300 uppercase">
                      {category.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                      {category.skills.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => handleSkillClick(s)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider select-none ${
                          activeSkill?.name === s.name
                            ? 'bg-cyan-500/30 border border-cyan-400 text-white'
                            : 'bg-[#0d1628] border border-cyan-500/20 text-cyan-200'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
