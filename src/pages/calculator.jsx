import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import CaifCvssCalculator from '../components/CaifCvssCalculator';

export default function CalculatorPage() {
  return (
    <Layout
      title="CAIF-CVSS Calculator"
      description="Interactive CAIF-CVSS v1.0 calculator for Cybersecurity AI Framework scoring."
    >
      <main className="caif-page caif-subpage">
        <section className="caif-container calculator-page">
          <div className="section-heading section-heading--center">
            <span>Calculator</span>
            <h1>CAIF-CVSS v1.0 Calculator</h1>
            <p>
              A Cybersecurity AI Framework scoring profile based on CVSS v4.0 concepts and extended
              for AI-assisted exploitability, evidence quality, exposure, and business context.
            </p>
          </div>
          <CaifCvssCalculator />
          <div className="calculator-footnote">
            <p>
              CAIF-CVSS is a CAIF-owned public scoring profile, not a replacement for the official FIRST CVSS calculator.
              Use official CVSS for vendor severity and CAIF-CVSS for community validation and prioritization context.
            </p>
            <Link className="text-link" to="/docs/scoring/caif-cvss-v1">
              Read the CAIF-CVSS scoring model <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
