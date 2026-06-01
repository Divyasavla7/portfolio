import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
];

const typingLines = [
    'AI & Data Analysis | Python Developer | Django | REST APIs',
    'Building intelligent systems with clean backend logic.',
    'Turning data into practical decisions and visual stories.',
];

const contact = {
    github: 'https://github.com/Divyasavla7',
    linkedin: 'https://www.linkedin.com/in/divya-savla-035356153/',
    email: 'sdivya721.127@gmail.com',
    phone: '+919321897244',
};

const projectReferences = {
    aeroGuard: 'https://teachablemachine.withgoogle.com/',
    irisHealth: 'https://www.tableau.com/',
    secureCampus: 'https://www.django-rest-framework.org/',
    placementInsights: 'https://public.tableau.com/app/discover',
};

const skills = [
    { title: 'Languages', items: 'Python, C++, Java, SQL', icon: '01', progress: 92 },
    { title: 'Backend & Frameworks', items: 'Django, FastAPI, REST APIs', icon: '02', progress: 90 },
    { title: 'AI/ML', items: 'TensorFlow, Scikit-learn', icon: '03', progress: 84 },
    { title: 'Data Analytics', items: 'Pandas, NumPy, Tableau, Power BI, Seaborn', icon: '04', progress: 88 },
    { title: 'Databases', items: 'MySQL, MongoDB, PostgreSQL', icon: '05', progress: 86 },
    { title: 'Tools', items: 'GitHub, Docker', icon: '06', progress: 78 },
    { title: 'Frontend', items: 'HTML, CSS, Bootstrap', icon: '07', progress: 80 },
];

const projects = [
    {
        title: 'AeroGuard - AI-Based Smart Security System',
        category: 'ai',
        banner: 'AeroGuard',
        tags: ['TensorFlow', 'ESP32', 'Firebase', 'Computer Vision', 'Hackathon Finalist'],
        features: ['Smart threat detection with computer vision workflows.', 'Real-time event logging and alert handling.'],
        githubUrl: contact.github,
        liveUrl: projectReferences.aeroGuard,
    },
    {
        title: 'IRIS Health Dashboard',
        category: 'ai',
        banner: 'IRIS Health Dashboard',
        tags: ['Django', 'Gemini API', 'MySQL', 'AI Chatbot', 'Data Visualization'],
        features: ['Healthcare dashboard with intelligent assistance.', 'Analytics-first UI for tracking and insights.'],
        githubUrl: contact.github,
        liveUrl: projectReferences.irisHealth,
    },
    {
        title: 'SecureCampusAccess',
        category: 'backend',
        banner: 'SecureCampusAccess',
        tags: ['Role-Based Authentication', 'Django/Flask', 'Secure Backend Workflows'],
        features: ['Access control for campus environments.', 'Secure request handling and role segmentation.'],
        githubUrl: contact.github,
        liveUrl: projectReferences.secureCampus,
    },
    {
        title: 'Placement Insights Visualizer',
        category: 'analytics',
        banner: 'Placement Insights Visualizer',
        tags: ['Tableau', 'Seaborn', 'Placement Analytics Dashboards'],
        features: ['Data-rich dashboards for placement trends.', 'Clear visual storytelling for stakeholders.'],
        githubUrl: contact.github,
        liveUrl: projectReferences.placementInsights,
    },
];

const achievements = [
    { label: 'Finalist', title: 'HACKSAGON Hackathon', detail: 'ABV-IIITM Gwalior' },
    { label: 'Team Lead', title: 'Vega Hackathon 2026', detail: 'Led cross-functional team delivery.' },
    { label: 'Team Lead', title: 'Designing Team, Patches Initiative', detail: 'Helped shape creative direction and coordination.' },
];

const impact = [
    { value: 60, suffix: '+', label: 'Hackathon Teams Managed' },
    { value: 50000, prefix: '₹', label: 'Prize Pool Coordinated' },
    { value: 12, suffix: '+', label: 'AI + Full Stack Projects Built' },
    { value: 5, suffix: '+', label: 'Multiple Tech Domains Explored' },
];

const contributionPattern = Array.from({ length: 70 }, (_, index) => (index % 11 === 0 || index % 7 === 0 ? 'high' : index % 4 === 0 ? 'mid' : ''));

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function useTypingText(lines) {
    const [text, setText] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = lines[lineIndex];
        const timeout = setTimeout(() => {
            if (!deleting) {
                const next = current.slice(0, charIndex + 1);
                setText(next);
                if (next === current) {
                    setDeleting(true);
                } else {
                    setCharIndex((value) => value + 1);
                }
            } else {
                const next = current.slice(0, Math.max(charIndex - 1, 0));
                setText(next);
                if (!next) {
                    setDeleting(false);
                    setLineIndex((value) => (value + 1) % lines.length);
                    setCharIndex(0);
                } else {
                    setCharIndex((value) => value - 1);
                }
            }
        }, deleting ? 28 : 42);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, lineIndex, lines]);

    return text;
}

function useCountUp(target, trigger = true) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!trigger) return undefined;
        let frame = 0;
        const start = performance.now();
        const duration = 1500;

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, trigger]);

    return value;
}

function CountUp({ prefix = '', suffix = '', target }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const value = useCountUp(target, visible);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.35 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <strong ref={ref}>
            {prefix}
            {value.toLocaleString('en-IN')}
            {suffix}
        </strong>
    );
}

function SectionTitle({ eyebrow, title, centered = false }) {
    return (
        <motion.div variants={fadeUp} className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
            <span className="section-pill">{eyebrow}</span>
            <h2 className="section-title">{title}</h2>
        </motion.div>
    );
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [cursor, setCursor] = useState({ x: -100, y: -100 });
    const [loaded, setLoaded] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const typedText = useTypingText(typingLines);

    const filteredProjects = useMemo(
        () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
        [filter]
    );

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 700);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handlePointer = (event) => {
            setCursor({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('pointermove', handlePointer);
        return () => window.removeEventListener('pointermove', handlePointer);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name') || 'someone'}`);
        const body = encodeURIComponent(
            `Name: ${formData.get('name') || ''}\nEmail: ${formData.get('email') || ''}\n\n${formData.get('message') || ''}`
        );
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
        event.currentTarget.reset();
        setFormStatus('Opening your email client...');
        setTimeout(() => setFormStatus(''), 2500);
    };

    return (
        <div className="portfolio-shell">
            {!loaded && (
                <div className="loader" aria-hidden="true">
                    <div className="loader-orb" />
                    <div className="loader-text">Initializing portfolio experience...</div>
                </div>
            )}

            <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
            <div className="cursor-ring" style={{ left: cursor.x, top: cursor.y }} />

            <div className="background-grid" />
            <div className="blob blob-one" />
            <div className="blob blob-two" />
            <div className="blob blob-three" />

            <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
                <nav className="mx-auto flex w-[min(1180px,calc(100%-1rem))] items-center justify-between gap-4 py-4">
                    <a href="#hero" className="flex items-center gap-3 font-heading text-lg font-bold tracking-tight">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-glow">DS</span>
                        <span>Divya Hiren Savla</span>
                    </a>

                    <button
                        type="button"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
                        onClick={() => setMenuOpen((value) => !value)}
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        <span className="space-y-1.5">
                            <span className="block h-0.5 w-5 rounded-full bg-white" />
                            <span className="block h-0.5 w-5 rounded-full bg-white" />
                            <span className="block h-0.5 w-5 rounded-full bg-white" />
                        </span>
                    </button>

                    <div className={`${menuOpen ? 'nav-open' : 'nav-closed'} nav-links`}>
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>
            </header>

            <main>
                <section id="hero" className="section-wrap mx-auto grid w-[min(1180px,calc(100%-1rem))] items-center gap-8 pt-10 md:min-h-[calc(100vh-5rem)] md:grid-cols-[1.15fr_0.85fr]">
                    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                        <motion.div variants={fadeUp} className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                            Computer Engineering Student | AI + Data Analytics
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="mt-5 max-w-4xl font-heading text-5xl font-bold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Divya Hiren Savla
                        </motion.h1>
                        <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-200 sm:text-xl">
                            <span>{typedText}</span>
                            <span className="typing-caret">|</span>
                        </motion.p>
                        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                            Building intelligent systems, data-driven solutions, and impactful digital experiences.
                        </motion.p>
                        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                            <a className="btn-primary" href="#projects">View Projects</a>
                            <a className="btn-secondary" href="/resume.html" download>Download Resume</a>
                            <a className="btn-ghost" href="#contact">Contact Me</a>
                        </motion.div>
                        <motion.div variants={fadeUp} className="mt-10 grid gap-3 sm:grid-cols-3">
                            <div className="glass-card stat-card">
                                <CountUp target={60} suffix="+" />
                                <span>Hackathon Teams Managed</span>
                            </div>
                            <div className="glass-card stat-card">
                                <CountUp prefix="₹" target={50000} />
                                <span>Prize Pool Coordinated</span>
                            </div>
                            <div className="glass-card stat-card">
                                <CountUp target={4} suffix="+" />
                                <span>Core Tech Domains</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="show" className="hero-visual justify-self-stretch">
                        <div className="glass-card hero-panel p-4 sm:p-5">
                            <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                                <div className="flex items-center gap-2">
                                    <span className="status-dot" />
                                    AI / Data / Backend Stack
                                </div>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Student-ready</span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {['Python', 'Django', 'TensorFlow', 'REST APIs', 'Tableau', 'Power BI', 'SQL', 'Docker'].map((item) => (
                                    <span key={item} className="pill-chip">{item}</span>
                                ))}
                            </div>

                            <div className="hero-orbit">
                                <div className="orbit-core" />
                                <div className="orbit-ring orbit-ring-one" />
                                <div className="orbit-ring orbit-ring-two" />
                                <div className="orbit-badge orbit-one">AI</div>
                                <div className="orbit-badge orbit-two">DB</div>
                                <div className="orbit-badge orbit-three">API</div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                <section id="about" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <div className="grid gap-6 md:grid-cols-2">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
                            <SectionTitle eyebrow="About Me" title="Curious, technical, and built for high-signal problem solving." />
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                I am a Computer Engineering student with a strong interest in AI, backend systems, and data visualization.
                                I like turning messy, real-world problems into structured solutions that are useful, scalable, and easy to understand.
                            </p>
                            <p className="mt-4 leading-8 text-slate-400">
                                My personal vibe is a mix of sketching ideas on paper, listening to classical music, late-night coding sessions,
                                and organizing chaos into spreadsheets that actually make sense.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                {['Sketching', 'Classical Music', 'Late-Night Coding', 'Spreadsheet Brain'].map((item) => (
                                    <span key={item} className="pill-chip">{item}</span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="glass-card p-5">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="profile-placeholder">Profile Image</div>
                                <div>
                                    <h3 className="font-heading text-2xl font-bold">Student Engineer</h3>
                                    <p className="mt-2 text-slate-400">Ambitious AI engineer + data analyst portfolio with hackathon and leadership presence.</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4 border-l border-white/10 pl-5">
                                <div className="timeline-item">
                                    <span className="timeline-dot" />
                                    <div>
                                        <h4 className="font-semibold">Computer Engineering</h4>
                                        <p className="text-slate-400">Building practical systems across AI, backend engineering, and analytics.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <span className="timeline-dot" />
                                    <div>
                                        <h4 className="font-semibold">Leadership & Hackathons</h4>
                                        <p className="text-slate-400">Experienced in team coordination, rapid prototyping, and presentation under pressure.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="education" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <SectionTitle centered eyebrow="Education" title="Academic foundation with a strong performance record." />
                    <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                        <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="glass-card p-5">
                            <span className="section-pill">2023 - 2027</span>
                            <h3 className="mt-4 font-heading text-2xl font-bold">Shah & Anchor Kutchhi Engineering College</h3>
                            <p className="mt-2 text-slate-400">Bachelor of Technology in Computer Engineering</p>
                            <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                                <span>CGPA 9.57</span>
                                <span>Excellent Academic Standing</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400" style={{ width: '95.7%' }} />
                            </div>
                        </motion.article>
                        <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="glass-card p-5">
                            <span className="section-pill">Focus Areas</span>
                            <h3 className="mt-4 font-heading text-2xl font-bold">Systems, AI, and Analytics</h3>
                            <p className="mt-2 text-slate-400">Building deeper technical depth across software engineering, machine learning, and data storytelling.</p>
                            <div className="mt-6 space-y-4">
                                <div>
                                    <strong className="text-white">AI</strong>
                                    <p className="text-slate-400">TensorFlow, Scikit-learn</p>
                                </div>
                                <div>
                                    <strong className="text-white">Backend</strong>
                                    <p className="text-slate-400">Django, FastAPI, REST APIs</p>
                                </div>
                            </div>
                        </motion.article>
                    </div>
                </section>

                <section id="skills" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <SectionTitle centered eyebrow="Skills" title="Toolkit for building, analyzing, and shipping modern products." />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {skills.map((skill) => (
                            <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={skill.title} className="glass-card p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-heading text-2xl font-bold">{skill.title}</h3>
                                        <p className="mt-2 text-slate-400">{skill.items}</p>
                                    </div>
                                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-sky-100">{skill.icon}</div>
                                </div>
                                <div className="mt-5 h-2 rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400" style={{ width: `${skill.progress}%` }} />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section id="projects" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <SectionTitle centered eyebrow="Projects" title="Selected builds with AI, backend, and analytics depth." />
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {['all', 'ai', 'backend', 'analytics'].map((item) => (
                            <button key={item} type="button" className={`filter-chip ${filter === item ? 'filter-chip-active' : ''}`} onClick={() => setFilter(item)}>
                                {item === 'all' ? 'All' : item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {filteredProjects.map((project) => (
                            <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} key={project.title} className="glass-card overflow-hidden p-4">
                                <div className="project-banner">{project.banner}</div>
                                <h3 className="mt-4 font-heading text-2xl font-bold">{project.title}</h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="pill-chip">{tag}</span>
                                    ))}
                                </div>
                                <ul className="mt-4 space-y-2 text-slate-400">
                                    {project.features.map((feature) => (
                                        <li key={feature}>• {feature}</li>
                                    ))}
                                </ul>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <a className="btn-secondary" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                                    <a className="btn-ghost" href={project.liveUrl} target="_blank" rel="noreferrer">Reference Demo</a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section id="achievements" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <SectionTitle centered eyebrow="Achievements & Leadership" title="Proof of execution, ownership, and momentum." />
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {achievements.map((item) => (
                            <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={item.title} className="glass-card p-5">
                                <span className="section-pill">{item.label}</span>
                                <h3 className="mt-4 font-heading text-2xl font-bold">{item.title}</h3>
                                <p className="mt-2 text-slate-400">{item.detail}</p>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section id="impact" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <SectionTitle centered eyebrow="Experience / Leadership Impact" title="Numbers that show team trust and delivery range." />
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {impact.map((item) => (
                            <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={item.label} className="glass-card p-5 text-center">
                                <CountUp target={item.value} prefix={item.prefix || ''} suffix={item.suffix || ''} />
                                <span className="mt-2 block text-slate-400">{item.label}</span>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section id="github-graph" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <SectionTitle centered eyebrow="Consistency" title="GitHub contribution rhythm." />
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="glass-card mt-8 p-5">
                        <div className="grid grid-cols-7 gap-2 sm:grid-cols-10 lg:grid-cols-14">
                            {contributionPattern.map((tone, index) => (
                                <span
                                    key={`${tone}-${index}`}
                                    className={`aspect-square rounded-md border border-white/5 ${tone === 'high' ? 'bg-cyan-300/80' : tone === 'mid' ? 'bg-sky-500/35' : 'bg-white/8'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </section>

                <section id="contact" className="section-wrap mx-auto w-[min(1180px,calc(100%-1rem))] py-20">
                    <div className="grid gap-6 md:grid-cols-2">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
                            <SectionTitle eyebrow="Contact" title="Let’s build something impactful together." />
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Open to internships, hackathons, collaborations, and high-impact opportunities in AI, backend engineering, and data analytics.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a className="pill-chip" href={`mailto:${contact.email}`}>Email</a>
                                <a className="pill-chip" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                                <a className="pill-chip" href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
                                <a className="pill-chip" href={`tel:${contact.phone}`}>Phone</a>
                            </div>
                        </motion.div>

                        <motion.form variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="glass-card grid gap-4 p-5" onSubmit={handleSubmit}>
                            <label className="grid gap-2">
                                <span className="text-sm text-slate-300">Name</span>
                                <input className="field-input" name="name" type="text" placeholder="Your name" />
                            </label>
                            <label className="grid gap-2">
                                <span className="text-sm text-slate-300">Email</span>
                                <input className="field-input" name="email" type="email" placeholder="you@example.com" />
                            </label>
                            <label className="grid gap-2">
                                <span className="text-sm text-slate-300">Message</span>
                                <textarea className="field-input min-h-36" name="message" rows="5" placeholder="Tell me about your idea or opportunity..." />
                            </label>
                            <button className="btn-primary w-full" type="submit">Send Message</button>
                            {formStatus ? <p className="text-sm text-cyan-200">{formStatus}</p> : null}
                        </motion.form>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/10 py-8">
                <div className="mx-auto flex w-[min(1180px,calc(100%-1rem))] flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
                    <p>Divya Hiren Savla</p>
                    <p>AI & Data Analysis | Python Developer | Django | REST APIs</p>
                </div>
            </footer>
        </div>
    );
}

export default App;