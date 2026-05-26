import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import cairsExample from '../../data/cairsExample.json';
import frameworkPillars from '../../data/frameworkPillars.json';
import registers from '../../data/registers.json';
import researchDomains from '../../data/researchDomains.json';
import siteStats from '../../data/siteStats.json';
import standards from '../../data/standards.json';

const GITHUB_REPO = 'https://github.com/Cyber-Development/cybersecurity-ai-framework';

const valueCards = [
  {
    title: 'AI Assisted Intelligence',
    description: 'Security reasoning supported by transparent AI-assisted analysis.',
    icon: 'shield'
  },
  {
    title: 'Evidence Driven Validation',
    description: 'Findings grounded in reproducible proof, not unchecked assertions.',
    icon: 'target'
  },
  {
    title: 'Consistent Risk Scoring',
    description: 'Explainable scoring across impact, exposure, evidence, and attack chains.',
    icon: 'chart'
  },
  {
    title: 'Community Governed',
    description: 'Standards reviewed in public by researchers, defenders, and maintainers.',
    icon: 'community'
  }
];

const contributorActions = [
  {
    title: 'Join Discussions',
    description: 'Share ideas and collaborate.',
    icon: 'messages',
    href: `${GITHUB_REPO}/discussions`
  },
  {
    title: 'Contribute',
    description: 'Submit PRs and improve the framework.',
    icon: 'branch',
    href: `${GITHUB_REPO}/pulls`
  },
  {
    title: 'Review & Approve',
    description: 'Help maintain quality and consistency.',
    icon: 'shield',
    href: `${GITHUB_REPO}/pulls`
  },
  {
    title: 'Make an Impact',
    description: 'Build a safer digital world together.',
    icon: 'spark',
    href: '/docs/contributors/how-to-contribute'
  }
];

function Icon({ name, className }) {
  const common = {
    className: clsx('caif-icon', className),
    viewBox: '0 0 48 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true
  };

  const icons = {
    shield: (
      <svg {...common}>
        <path d="M24 5L39 11V23C39 33 33 40 24 44C15 40 9 33 9 23V11L24 5Z" />
        <path d="M17 24L22 29L32 18" />
      </svg>
    ),
    target: (
      <svg {...common}>
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="9" />
        <circle cx="24" cy="24" r="3" />
        <path d="M24 3V10M24 38V45M3 24H10M38 24H45" />
      </svg>
    ),
    chart: (
      <svg {...common}>
        <path d="M9 38H39" />
        <path d="M13 32V20M24 32V11M35 32V16" />
        <path d="M10 13L19 20L27 14L38 23" />
      </svg>
    ),
    community: (
      <svg {...common}>
        <circle cx="18" cy="19" r="6" />
        <circle cx="32" cy="17" r="5" />
        <path d="M7 38C8 31 12 28 18 28C24 28 28 31 29 38" />
        <path d="M27 28C33 28 38 31 40 37" />
      </svg>
    ),
    document: (
      <svg {...common}>
        <path d="M14 6H29L38 15V42H14V6Z" />
        <path d="M29 6V15H38" />
        <path d="M19 24H33M19 31H33M19 17H24" />
      </svg>
    ),
    code: (
      <svg {...common}>
        <path d="M18 15L8 24L18 33" />
        <path d="M30 15L40 24L30 33" />
        <path d="M27 10L21 38" />
      </svg>
    ),
    download: (
      <svg {...common}>
        <path d="M24 7V29" />
        <path d="M15 21L24 30L33 21" />
        <path d="M10 38H38" />
      </svg>
    ),
    globe: (
      <svg {...common}>
        <circle cx="24" cy="24" r="17" />
        <path d="M7 24H41" />
        <path d="M24 7C30 12 33 18 33 24C33 30 30 36 24 41C18 36 15 30 15 24C15 18 18 12 24 7Z" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <path d="M12 25L20 33L37 14" />
        <path d="M10 9H34V17M38 22V39H10V9" />
      </svg>
    ),
    bug: (
      <svg {...common}>
        <path d="M16 21C16 15 20 11 24 11C28 11 32 15 32 21V29C32 35 28 39 24 39C20 39 16 35 16 29V21Z" />
        <path d="M24 11V39M13 15L17 19M35 15L31 19M8 25H16M32 25H40M11 36L17 32M37 36L31 32" />
      </svg>
    ),
    crossed: (
      <svg {...common}>
        <path d="M9 39L39 9" />
        <path d="M16 9L39 32V39H32L9 16V9H16Z" />
      </svg>
    ),
    codebox: (
      <svg {...common}>
        <path d="M8 12H40V36H8V12Z" />
        <path d="M20 19L15 24L20 29" />
        <path d="M28 19L33 24L28 29" />
      </svg>
    ),
    brain: (
      <svg {...common}>
        <path d="M20 8C15 8 12 12 12 16C8 18 7 22 9 26C7 30 10 36 16 36C17 40 22 42 24 38V13C23 10 22 8 20 8Z" />
        <path d="M28 8C33 8 36 12 36 16C40 18 41 22 39 26C41 30 38 36 32 36C31 40 26 42 24 38V13C25 10 26 8 28 8Z" />
        <path d="M15 22H21M27 22H33M16 31H22M26 31H32" />
      </svg>
    ),
    network: (
      <svg {...common}>
        <circle cx="12" cy="15" r="4" />
        <circle cx="34" cy="12" r="4" />
        <circle cx="24" cy="35" r="4" />
        <circle cx="38" cy="30" r="4" />
        <path d="M16 15L30 12M14 19L22 32M28 33L34 31M34 16L38 26" />
      </svg>
    ),
    cloud: (
      <svg {...common}>
        <path d="M16 34H34C39 34 42 31 42 27C42 23 39 20 35 20C33 13 28 10 22 12C18 13 16 16 15 20C10 21 7 24 7 28C7 32 10 34 16 34Z" />
      </svg>
    ),
    circuit: (
      <svg {...common}>
        <path d="M10 10H20V20H10V10ZM28 28H38V38H28V28Z" />
        <path d="M20 15H29V24H34V28M15 20V33H28M34 10V20M29 15H39" />
        <circle cx="34" cy="10" r="3" />
        <circle cx="39" cy="15" r="3" />
      </svg>
    ),
    identity: (
      <svg {...common}>
        <circle cx="24" cy="18" r="7" />
        <path d="M11 39C13 31 18 27 24 27C30 27 35 31 37 39" />
        <path d="M35 10L40 15L35 20" />
      </svg>
    ),
    mobile: (
      <svg {...common}>
        <path d="M17 6H31C33 6 35 8 35 10V38C35 40 33 42 31 42H17C15 42 13 40 13 38V10C13 8 15 6 17 6Z" />
        <path d="M21 36H27" />
      </svg>
    ),
    forensics: (
      <svg {...common}>
        <circle cx="21" cy="21" r="11" />
        <path d="M29 29L40 40" />
        <path d="M18 16C22 13 28 16 26 21C24 26 18 27 16 23" />
      </svg>
    ),
    messages: (
      <svg {...common}>
        <path d="M8 10H36V29H20L11 38V29H8V10Z" />
        <path d="M16 18H29M16 24H25" />
      </svg>
    ),
    branch: (
      <svg {...common}>
        <circle cx="14" cy="12" r="5" />
        <circle cx="34" cy="36" r="5" />
        <circle cx="14" cy="36" r="5" />
        <path d="M14 17V31M19 12H28C32 12 34 15 34 19V31" />
      </svg>
    ),
    spark: (
      <svg {...common}>
        <path d="M24 5L29 18L43 24L29 30L24 43L19 30L5 24L19 18L24 5Z" />
        <path d="M36 5V13M32 9H40M12 35V43M8 39H16" />
      </svg>
    )
  };

  return icons[name] || icons.shield;
}

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function AnimatedNumber({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const duration = 900;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        }

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function HeroMesh() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="globe">
        <div className="globe__core" />
        <div className="globe__ring globe__ring--one" />
        <div className="globe__ring globe__ring--two" />
        <svg className="globe__mesh" viewBox="0 0 560 420">
          <defs>
            <radialGradient id="globeGlow" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#0a54c7" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#020814" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="280" cy="210" r="142" fill="url(#globeGlow)" stroke="#1687ff" strokeOpacity="0.55" />
          <path d="M147 210C208 158 354 158 413 210C354 262 208 262 147 210Z" />
          <path d="M164 150C226 198 335 198 397 150" />
          <path d="M164 270C226 222 335 222 397 270" />
          <path d="M280 69C328 114 352 162 352 210C352 258 328 306 280 351C232 306 208 258 208 210C208 162 232 114 280 69Z" />
          <path d="M280 69V351" />
          <path d="M138 210H422" />
          <path d="M106 143L177 96L268 123L359 86L460 150" className="mesh-line" />
          <path d="M91 284L177 242L258 291L355 252L473 306" className="mesh-line mesh-line--slow" />
          <path d="M177 96L177 242L268 123L258 291L359 86L355 252L460 150L473 306" className="mesh-line" />
          {[
            [106, 143],
            [177, 96],
            [268, 123],
            [359, 86],
            [460, 150],
            [91, 284],
            [177, 242],
            [258, 291],
            [355, 252],
            [473, 306],
            [280, 210],
            [214, 171],
            [333, 190]
          ].map(([cx, cy], index) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 3 === 0 ? 3.2 : 2.4} className="mesh-node" />
          ))}
        </svg>
      </div>
      <div className="mission-card">
        <span>Our Mission</span>
        <p>
          To build a global, open standard that brings clarity, consistency, and trust to cybersecurity
          through AI-powered validation and community collaboration.
        </p>
        <Link to="/docs/framework/introduction">Learn our mission</Link>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="caif-hero">
      <div className="caif-container hero-grid">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow">Open. Community Driven. One Source of Truth.</div>
          <h1>
            The Open Standard for AI-Powered <span>Cybersecurity Validation & Intelligence</span>
          </h1>
          <p className="hero-lede">
            A community-driven framework for vulnerability validation, risk scoring, proof-of-exploitability,
            and security operations powered by AI and human expertise.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary button--lg caif-button" to="/docs/framework/introduction">
              Get Started <span aria-hidden="true">-&gt;</span>
            </Link>
            <a className="button button--secondary button--lg caif-button caif-button--ghost" href="#framework-pillars">
              Explore the Framework <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button button--secondary button--lg caif-button caif-button--text" href={`${GITHUB_REPO}/discussions`}>
              Join as Contributor
            </a>
          </div>
          <div className="value-strip">
            {valueCards.map((card) => (
              <article className="value-card" key={card.title}>
                <Icon name={card.icon} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <p className="powered-by">Powered by <span>Cyber Development</span></p>
        </div>
        <HeroMesh />
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="caif-section caif-section--panel" id="framework-pillars" data-reveal>
      <div className="caif-container">
        <div className="section-heading section-heading--center">
          <span>The Framework Pillars</span>
          <h2>A Holistic Approach to Cybersecurity</h2>
        </div>
        <div className="pillar-grid">
          {frameworkPillars.map((pillar) => (
            <Link className="pillar-card" to={pillar.href} key={pillar.id}>
              <Icon name={pillar.icon} />
              <strong>{pillar.id}</strong>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="caif-container stats-strip" data-reveal>
      {siteStats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <Icon name={stat.icon} />
          <div>
            <strong>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </strong>
            <span>{stat.label}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

function CairsScoreCard() {
  const [copyLabel, setCopyLabel] = useState('Copy vector');
  const scorePercent = (cairsExample.score / cairsExample.scaleMax) * 100;
  const vector = useMemo(() => {
    const dimensions = cairsExample.dimensions.map((dimension) => `${dimension.label}:${dimension.value}`).join(';');
    return `${cairsExample.name}|Score:${cairsExample.score}|Rating:${cairsExample.rating}|${dimensions}`;
  }, []);

  async function copyVector() {
    try {
      await navigator.clipboard.writeText(vector);
      setCopyLabel('Copied');
      window.setTimeout(() => setCopyLabel('Copy vector'), 1400);
    } catch {
      setCopyLabel('Copy unavailable');
      window.setTimeout(() => setCopyLabel('Copy vector'), 1400);
    }
  }

  return (
    <article className="cairs-card" data-reveal>
      <div className="section-heading">
        <span>AI Risk Scoring</span>
        <h2>{cairsExample.name}</h2>
        <p>{cairsExample.title}</p>
      </div>
      <div className="cairs-layout">
        <div className="score-ring" style={{ '--score': scorePercent }}>
          <div className="score-ring__value">
            <strong>{cairsExample.score}</strong>
            <span>{cairsExample.rating}</span>
          </div>
          <div className="score-ring__scale">
            <span>{cairsExample.scaleMin}</span>
            <span>{cairsExample.scaleMax}</span>
          </div>
        </div>
        <div className="dimension-list">
          {cairsExample.dimensions.map((dimension) => (
            <div className="dimension-row" key={dimension.label}>
              <span>{dimension.label}</span>
              <strong className={`tone-${dimension.tone}`}>{dimension.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="cairs-actions">
        <Link className="button button--primary caif-button caif-button--purple" to="/docs/scoring/calculator">
          Try the CAIRS Calculator <span aria-hidden="true">-&gt;</span>
        </Link>
        <button type="button" className="copy-vector" onClick={copyVector}>
          {copyLabel}
        </button>
      </div>
    </article>
  );
}

function StandardsExplorer() {
  const [query, setQuery] = useState('');
  const filteredStandards = standards.filter((standard) => {
    const haystack = `${standard.id} ${standard.title} ${standard.description}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <article className="explorer-card" data-reveal>
      <div className="section-heading section-heading--inline">
        <div>
          <span>Explore Our Standards</span>
          <h2>Standards Explorer</h2>
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter standards"
          aria-label="Filter standards"
        />
      </div>
      <div className="standard-list">
        {filteredStandards.map((standard) => (
          <Link className="standard-row" to={standard.href} key={standard.id}>
            <span>{standard.id}</span>
            <strong>{standard.title}</strong>
            <em>{standard.status}</em>
            <b aria-hidden="true">-&gt;</b>
          </Link>
        ))}
      </div>
      <Link className="text-link" to="/docs/standards/caf-ai-001">
        View all standards <span aria-hidden="true">-&gt;</span>
      </Link>
    </article>
  );
}

function RegistersSection() {
  return (
    <article className="register-card" data-reveal>
      <div className="section-heading">
        <span>Community Registers</span>
        <h2>Registers</h2>
      </div>
      <div className="register-list">
        {registers.map((register) => (
          <Link className="register-row" to={register.href} key={register.title}>
            <Icon name={register.icon} />
            <div>
              <strong>{register.title}</strong>
              <span>{register.subtitle}</span>
            </div>
            <em>
              {register.count}
              {register.suffix}
            </em>
          </Link>
        ))}
      </div>
      <Link className="text-link" to="/docs/framework/api-feeds">
        Explore all registers <span aria-hidden="true">-&gt;</span>
      </Link>
    </article>
  );
}

function DashboardSection() {
  return (
    <section className="caif-container dashboard-grid">
      <CairsScoreCard />
      <StandardsExplorer />
      <RegistersSection />
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="caif-container community-section" data-reveal>
      <div className="community-copy">
        <h2>
          One Community. <span>One Source of Truth.</span>
        </h2>
        <p>
          No forks. No fragmentation. Join the official community, contribute, review, and help shape
          the future of cybersecurity together.
        </p>
      </div>
      <div className="contributor-actions">
        {contributorActions.map((action) => {
          const content = (
            <>
              <Icon name={action.icon} />
              <strong>{action.title}</strong>
              <span>{action.description}</span>
            </>
          );

          return action.href.startsWith('http') ? (
            <a className="action-card" href={action.href} key={action.title}>
              {content}
            </a>
          ) : (
            <Link className="action-card" to={action.href} key={action.title}>
              {content}
            </Link>
          );
        })}
      </div>
      <div className="community-ctas">
        <a className="button button--primary caif-button" href={`${GITHUB_REPO}/discussions`}>
          Join the Community on GitHub <span aria-hidden="true">-&gt;</span>
        </a>
        <Link className="button button--secondary caif-button caif-button--ghost" to="/docs/contributors/become-an-author">
          Become a Framework Author
        </Link>
      </div>
    </section>
  );
}

function ResearchDomainsSection() {
  const [query, setQuery] = useState('');
  const filteredDomains = researchDomains.filter((domain) =>
    `${domain.title} ${domain.status}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="caif-section research-section" data-reveal>
      <div className="caif-container">
        <div className="section-heading section-heading--inline">
          <div>
            <span>Research Domains Open for Contribution</span>
            <h2>Become a Named Framework Author</h2>
            <p>Researchers can help own, write, and review specific subject matter areas.</p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter domains"
            aria-label="Filter research domains"
          />
        </div>
        <div className="domain-grid">
          {filteredDomains.map((domain) => {
            const issueUrl = `${GITHUB_REPO}/issues/new?template=${domain.issueTemplate}&title=${encodeURIComponent(
              `[Author Application]: ${domain.title}`
            )}`;
            return (
              <a className="domain-card" href={issueUrl} key={domain.title}>
                <Icon name={domain.icon} />
                <strong>{domain.title}</strong>
                <span>{domain.status}</span>
                <em>Contribute to this Domain</em>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Home() {
  useScrollReveal();

  return (
    <Layout
      title="The Open Standard for AI-Powered Cybersecurity Validation"
      description="Cybersecurity AI Framework is an open community standard for AI-powered cybersecurity validation, risk scoring, proof-of-exploitability, and community intelligence."
    >
      <main className="caif-page">
        <HeroSection />
        <PillarsSection />
        <StatsStrip />
        <DashboardSection />
        <CommunitySection />
        <ResearchDomainsSection />
      </main>
    </Layout>
  );
}

export default Home;
