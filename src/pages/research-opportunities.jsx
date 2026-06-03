import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

import ProgramFeeds from '../components/ProgramFeeds';

function ResearchOpportunities() {
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

  return (
    <Layout
      title="Research Opportunities"
      description="Latest CAIF community-reviewed BBP and VDP research opportunities for security researchers."
    >
      <main className="caif-page caif-subpage research-opportunities-page">
        <section className="caif-container research-opportunities-hero" data-reveal>
          <div className="section-heading section-heading--center">
            <span>Research Opportunities</span>
            <h1>Latest BBP / VDP Programs</h1>
            <p>
              A public, community-reviewed opportunity register for researchers. Use it for awareness,
              then verify scope against the official program owner or platform before testing.
            </p>
          </div>
        </section>
        <ProgramFeeds />
      </main>
    </Layout>
  );
}

export default ResearchOpportunities;
