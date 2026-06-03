import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import programFeeds from '../../data/programFeeds.json';

const GITHUB_REPO = 'https://github.com/Cybersecurity-Ai-Framework/CAIRS';
const PROGRAM_ISSUE_URL = `${GITHUB_REPO}/issues/new?template=submit-bbp-vdp-program.yml`;

export default function ProgramFeeds() {
  const [query, setQuery] = useState('');
  const [programType, setProgramType] = useState('All');
  const programsApiUrl = useBaseUrl('/api/bbp-vdp-programs.json');
  const programTypes = ['All', 'BBP', 'VDP'];
  const filteredPrograms = programFeeds.programs.filter((program) => {
    const haystack = `${program.name} ${program.programType} ${program.platform} ${program.rewardRange} ${program.targets.join(
      ' '
    )} ${program.opportunity} ${program.status}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesType = programType === 'All' || program.programType === programType;
    return matchesQuery && matchesType;
  });

  return (
    <section className="caif-section programs-section" data-reveal>
      <div className="caif-container programs-panel">
        <div className="section-heading section-heading--inline">
          <div>
            <span>Latest BBP / VDP Programs</span>
            <h2>Researcher Opportunity Feed</h2>
            <p>
              A CAIF-owned public feed for bug bounty and vulnerability disclosure programs, maintained through
              reviewed GitHub contributions.
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
          <span>Updated {programFeeds.updatedAt}</span>
          <span>{programFeeds.sourceModel}</span>
        </div>
        <div className="program-list">
          {filteredPrograms.map((program) => (
            <Link className="program-row" to={program.href} key={program.id}>
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
              <b aria-hidden="true">Details -&gt;</b>
            </Link>
          ))}
        </div>
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
