import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import fallbackProgramFeeds from '../../data/programFeeds.json';

const GITHUB_REPO = 'https://github.com/Cybersecurity-Ai-Framework/CAIRS';
const PROGRAM_ISSUE_URL = `${GITHUB_REPO}/issues/new?template=submit-bbp-vdp-program.yml`;
const LIVE_REFRESH_MS = 60_000;

function normalizeFeed(payload) {
  const data = payload?.data || payload;
  if (!data || !Array.isArray(data.programs)) return fallbackProgramFeeds;
  return data;
}

function formatTimestamp(value) {
  if (!value) return 'not yet synced';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getProgramUrl(program) {
  if (program.programUrl) return program.programUrl;
  if (program.href?.startsWith('http')) return program.href;
  return undefined;
}

export default function ProgramFeeds() {
  const [query, setQuery] = useState('');
  const [programType, setProgramType] = useState('All');
  const [feed, setFeed] = useState(fallbackProgramFeeds);
  const [feedStatus, setFeedStatus] = useState('Loading live feed');
  const [lastLiveSync, setLastLiveSync] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState(fallbackProgramFeeds.programs[0]?.id);
  const programsApiUrl = useBaseUrl('/api/bbp-vdp-programs.json');
  const programTypes = ['All', 'BBP', 'VDP'];

  async function refreshFeed() {
    try {
      setFeedStatus('Refreshing live feed');
      const response = await fetch(`${programsApiUrl}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Feed returned ${response.status}`);
      }
      const payload = await response.json();
      const nextFeed = normalizeFeed(payload);
      setFeed(nextFeed);
      setLastLiveSync(payload.generatedAt || new Date().toISOString());
      setFeedStatus('Live feed connected');
    } catch {
      setFeed(fallbackProgramFeeds);
      setFeedStatus('Using bundled fallback feed');
      setLastLiveSync('');
    }
  }

  useEffect(() => {
    refreshFeed();
    const interval = window.setInterval(refreshFeed, LIVE_REFRESH_MS);
    return () => window.clearInterval(interval);
  }, [programsApiUrl]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const programId = params.get('program');
    if (programId) setSelectedProgramId(programId);
  }, []);

  const programs = useMemo(
    () =>
      [...feed.programs].sort((a, b) => {
        const aTime = new Date(`${a.publishedDate}T00:00:00Z`).getTime();
        const bTime = new Date(`${b.publishedDate}T00:00:00Z`).getTime();
        return bTime - aTime;
      }),
    [feed]
  );

  const filteredPrograms = programs.filter((program) => {
    const haystack = `${program.name} ${program.programType} ${program.platform} ${program.rewardRange} ${program.targets.join(
      ' '
    )} ${program.opportunity} ${program.status} ${program.summary || ''} ${program.scopeSummary || ''}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesType = programType === 'All' || program.programType === programType;
    return matchesQuery && matchesType;
  });
  const selectedProgram =
    filteredPrograms.find((program) => program.id === selectedProgramId) ||
    programs.find((program) => program.id === selectedProgramId) ||
    filteredPrograms[0] ||
    programs[0];

  function showDetails(program) {
    setSelectedProgramId(program.id);
    const params = new URLSearchParams(window.location.search);
    params.set('program', program.id);
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }

  return (
    <section className="caif-section programs-section" data-reveal>
      <div className="caif-container programs-panel">
        <div className="section-heading section-heading--inline">
          <div>
            <span>Latest BBP / VDP Programs</span>
            <h2>Researcher Opportunity Feed</h2>
            <p>
              A CAIF-owned public feed for bug bounty and vulnerability disclosure programs. The page reads the
              public JSON feed at runtime and refreshes automatically while you are viewing it.
            </p>
          </div>
          <div className="feed-controls">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter programs"
              aria-label="Filter BBP and VDP programs"
            />
            <div className="segmented-control" aria-label="Filter by program type">
              {programTypes.map((type) => (
                <button
                  type="button"
                  className={programType === type ? 'is-selected' : undefined}
                  onClick={() => setProgramType(type)}
                  key={type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="program-feed-meta">
          <span>Feed updated {feed.updatedAt}</span>
          <span>{feedStatus}</span>
          <span>Last checked {formatTimestamp(lastLiveSync)}</span>
          <span>{feed.sourceModel}</span>
          <button type="button" className="program-refresh-button" onClick={refreshFeed}>
            Refresh now
          </button>
        </div>
        <div className="program-list" aria-live="polite">
          {filteredPrograms.map((program) => (
            <article className="program-row" key={program.id}>
              <div className="program-date">
                <span>{program.publishedDate}</span>
                <strong>{program.programType}</strong>
              </div>
              <div className="program-main">
                <div>
                  <h3>{program.name}</h3>
                  <span>{program.platform}</span>
                </div>
                <div className="program-tags">
                  {program.targets.map((target) => (
                    <em key={target}>{target}</em>
                  ))}
                </div>
              </div>
              <strong className="program-reward">{program.rewardRange}</strong>
              <div className="program-opportunity">
                <span>{program.opportunity}</span>
                <em>{program.status}</em>
              </div>
              <div className="program-row__actions">
                <button type="button" className="program-detail-button" onClick={() => showDetails(program)}>
                  Details
                </button>
                {getProgramUrl(program) ? (
                  <a className="program-open-link" href={getProgramUrl(program)} target="_blank" rel="noreferrer">
                    Open Program <span aria-hidden="true">-&gt;</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        {selectedProgram ? (
          <article className="program-detail-card" aria-labelledby="program-detail-title">
            <div className="program-detail-card__header">
              <div>
                <span>{selectedProgram.id}</span>
                <h3 id="program-detail-title">{selectedProgram.name}</h3>
                <p>{selectedProgram.summary || feed.disclaimer}</p>
              </div>
              {getProgramUrl(selectedProgram) ? (
                <a className="button button--primary caif-button" href={getProgramUrl(selectedProgram)} target="_blank" rel="noreferrer">
                  Open Official Program <span aria-hidden="true">-&gt;</span>
                </a>
              ) : null}
            </div>
            <div className="program-detail-grid">
              <div>
                <strong>Platform</strong>
                <span>{selectedProgram.platform}</span>
              </div>
              <div>
                <strong>Program type</strong>
                <span>{selectedProgram.programType}</span>
              </div>
              <div>
                <strong>Reward range</strong>
                <span>{selectedProgram.rewardRange}</span>
              </div>
              <div>
                <strong>Verification</strong>
                <span>{selectedProgram.validationStatus || selectedProgram.status}</span>
              </div>
            </div>
            <div className="program-detail-body">
              <div>
                <strong>Public targets</strong>
                <div className="program-tags">
                  {selectedProgram.targets.map((target) => (
                    <em key={target}>{target}</em>
                  ))}
                </div>
              </div>
              <div>
                <strong>Research notes</strong>
                <p>{selectedProgram.scopeSummary || 'Review the official program page before testing.'}</p>
              </div>
              <p className="program-disclaimer">{feed.disclaimer}</p>
            </div>
          </article>
        ) : null}
        <div className="program-feed-actions">
          <a className="button button--primary caif-button" href={PROGRAM_ISSUE_URL}>
            Submit a Program <span aria-hidden="true">-&gt;</span>
          </a>
          <Link className="button button--secondary caif-button caif-button--ghost" to="/docs/contributors/bbp-vdp-feeds">
            Feed Governance
          </Link>
          <a className="text-link" href={programsApiUrl}>
            JSON feed <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
