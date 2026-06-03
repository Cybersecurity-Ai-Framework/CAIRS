import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import caifCvss from '../../data/caifCvssMetrics.json';

const ATTACK_KEYS = ['AV', 'AC', 'AT', 'PR', 'UI'];
const VULNERABLE_IMPACT_KEYS = ['VC', 'VI', 'VA'];
const SUBSEQUENT_IMPACT_KEYS = ['SC', 'SI', 'SA'];
const INTELLIGENCE_KEYS = ['E', 'AIX', 'EQ'];
const ENVIRONMENT_KEYS = ['EX', 'BI', 'SF'];

const metricLookup = new Map(
  caifCvss.metricGroups.flatMap((group) => group.metrics.map((metric) => [metric.key, metric]))
);

function getMetricWeight(key, selectedValue) {
  const option = metricLookup.get(key)?.options.find((item) => item.value === selectedValue);
  return option?.weight ?? 0;
}

function average(keys, selected) {
  return keys.reduce((sum, key) => sum + getMetricWeight(key, selected[key]), 0) / keys.length;
}

function getRating(score) {
  if (score >= 9) return 'Critical';
  if (score >= 7) return 'High';
  if (score >= 4) return 'Medium';
  if (score > 0) return 'Low';
  return 'None';
}

function getTone(rating) {
  if (rating === 'Critical') return 'critical';
  if (rating === 'High') return 'high';
  if (rating === 'Medium') return 'medium';
  if (rating === 'Low') return 'low';
  return 'none';
}

export function calculateCaifCvss(selected) {
  const attack = average(ATTACK_KEYS, selected);
  const vulnerableImpact = average(VULNERABLE_IMPACT_KEYS, selected);
  const subsequentImpact = average(SUBSEQUENT_IMPACT_KEYS, selected);
  const intelligence = average(INTELLIGENCE_KEYS, selected);
  const environment = average(ENVIRONMENT_KEYS, selected);

  if (vulnerableImpact + subsequentImpact === 0) {
    return {
      score: 0,
      rating: 'None',
      tone: 'none',
      subscores: { attack, vulnerableImpact, subsequentImpact, intelligence, environment }
    };
  }

  const intrinsic = attack * 4.2 + vulnerableImpact * 3.9 + subsequentImpact * 1.8;
  const contextMultiplier = 0.88 + intelligence * 0.07 + environment * 0.05;
  const score = Math.min(10, Math.max(0, intrinsic * contextMultiplier));
  const roundedScore = Math.round(score * 10) / 10;
  const rating = getRating(roundedScore);

  return {
    score: roundedScore,
    rating,
    tone: getTone(rating),
    subscores: { attack, vulnerableImpact, subsequentImpact, intelligence, environment }
  };
}

function createVector(selected) {
  return `CAIF-CVSS:1.0/${Object.entries(selected)
    .map(([key, value]) => `${key}:${value}`)
    .join('/')}`;
}

function formatSubscore(value) {
  return `${Math.round(value * 100)}%`;
}

export default function CaifCvssCalculator({ compact = false }) {
  const [selected, setSelected] = useState(caifCvss.defaults);
  const [copyLabel, setCopyLabel] = useState('Copy vector');
  const visibleGroups = compact
    ? caifCvss.metricGroups.filter((group) => ['base', 'intelligence'].includes(group.key))
    : caifCvss.metricGroups;
  const result = useMemo(() => calculateCaifCvss(selected), [selected]);
  const vector = useMemo(() => createVector(selected), [selected]);
  const scorePercent = (result.score / caifCvss.scaleMax) * 100;

  function updateMetric(key, value) {
    setSelected((current) => ({ ...current, [key]: value }));
  }

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
    <div className={clsx('caif-cvss', compact && 'caif-cvss--compact')}>
      <div className="caif-cvss__result">
        <div className="section-heading">
          <span>Cybersecurity AI CVSS</span>
          <h2>{caifCvss.name}</h2>
          <p>{caifCvss.subtitle}</p>
        </div>
        <div className={clsx('score-ring score-ring--cvss', `score-ring--${result.tone}`)} style={{ '--score': scorePercent }}>
          <div className="score-ring__value">
            <strong>{result.score.toFixed(1)}</strong>
            <span>{result.rating}</span>
          </div>
          <div className="score-ring__scale">
            <span>{caifCvss.scaleMin}</span>
            <span>{caifCvss.scaleMax}</span>
          </div>
        </div>
        <div className="caif-vector">
          <span>Vector</span>
          <code>{vector}</code>
        </div>
        <div className="caif-cvss__actions">
          <button type="button" className="copy-vector" onClick={copyVector}>
            {copyLabel}
          </button>
          {compact ? (
            <Link className="text-link" to="/calculator">
              Full calculator <span aria-hidden="true">-&gt;</span>
            </Link>
          ) : (
            <Link className="text-link" to="/docs/scoring/caif-cvss-v1">
              Scoring model <span aria-hidden="true">-&gt;</span>
            </Link>
          )}
        </div>
        <div className="subscore-grid" aria-label="CAIF CVSS subscore summary">
          <div>
            <span>Exploitability</span>
            <strong>{formatSubscore(result.subscores.attack)}</strong>
          </div>
          <div>
            <span>Vulnerable Impact</span>
            <strong>{formatSubscore(result.subscores.vulnerableImpact)}</strong>
          </div>
          <div>
            <span>Subsequent Impact</span>
            <strong>{formatSubscore(result.subscores.subsequentImpact)}</strong>
          </div>
          <div>
            <span>AI / Evidence</span>
            <strong>{formatSubscore(result.subscores.intelligence)}</strong>
          </div>
          <div>
            <span>Exposure Context</span>
            <strong>{formatSubscore(result.subscores.environment)}</strong>
          </div>
        </div>
      </div>
      <div className="caif-cvss__metrics">
        {visibleGroups.map((group) => (
          <section className="metric-group" key={group.key}>
            <div>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
            </div>
            <div className="metric-list">
              {group.metrics.map((metric) => (
                <fieldset className="metric-row" key={metric.key}>
                  <legend>
                    <span>{metric.key}</span>
                    {metric.label}
                  </legend>
                  <div className="metric-options">
                    {metric.options.map((option) => (
                      <button
                        type="button"
                        className={clsx('metric-option', selected[metric.key] === option.value && 'is-selected')}
                        onClick={() => updateMetric(metric.key, option.value)}
                        key={option.value}
                      >
                        <strong>{option.value}</strong>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        ))}
        {compact && (
          <p className="caif-cvss__compact-note">
            Compact preview uses default impact and exposure values. Open the full calculator to edit every metric.
          </p>
        )}
      </div>
    </div>
  );
}
