"use client";

import { useState } from "react";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import SectionCounter from "@/components/ui/section-counter";
import ReportUpload from "@/components/dashboard/report-upload";
import RiskHero from "@/components/dashboard/risk-hero";
import KpiRow from "@/components/dashboard/kpi-row";
import DrugTable from "@/components/dashboard/drug-table";
import InteractionChart from "@/components/dashboard/interaction-chart";
import DosageChart from "@/components/dashboard/dosage-chart";
import ShapChart from "@/components/dashboard/shap-chart";
import FeatureImportanceChart from "@/components/dashboard/feature-importance-chart";
import type { AnalyzePrescriptionResponse } from "@/lib/api";

const PIPELINE_STEPS = [
  { n: "01", title: "Extract", body: "PyMuPDF pulls embedded text; Tesseract OCR takes over for scanned pages." },
  { n: "02", title: "Parse", body: "Drug names, dosages, frequency, patient age, and conditions are identified." },
  { n: "03", title: "Predict", body: "A RandomForest classifier scores ADR risk from the extracted features." },
  { n: "04", title: "Explain", body: "SHAP attributes the score back to each feature, per prediction." },
];

export default function Home() {
  const [result, setResult] = useState<AnalyzePrescriptionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <NavBar />

      {/* Hero — dark canvas, upload intake */}
      <section className="bg-abyssal-ink">
        <div className="mx-auto max-w-page px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <SectionCounter current={1} total={4} label="Prescription intake" />
          <h1 className="mt-8 max-w-3xl text-heading-lg text-bone-white md:text-display">
            Adverse drug reaction risk, read straight from the prescription.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-lichen">
            Upload a prescription PDF. Drugs, dosages, and patient context are extracted
            automatically and run through the ADR risk model — every number below the fold
            comes from that response.
          </p>

          <div className="mt-14">
            <ReportUpload
              onStart={() => {
                setLoading(true);
                setError(null);
              }}
              onResult={(r) => {
                setResult(r);
                setError(null);
                setLoading(false);
              }}
              onError={(message) => {
                setError(message);
                setResult(null);
                setLoading(false);
              }}
            />
          </div>

          {error && (
            <div className="mt-6 rounded-card border border-status-critical/40 bg-status-critical/10 p-5 text-body text-status-critical">
              {error}
            </div>
          )}
          {loading && !result && !error && (
            <p className="mt-6 font-mono text-caption uppercase text-lichen">
              Analyzing prescription <span className="animate-pulse text-bioluminescent-lime">●</span>
            </p>
          )}
        </div>
      </section>

      {/* How it works — light canvas band, brand's alternation rhythm */}
      <section className="bg-bone-white">
        <div className="mx-auto max-w-page px-6 py-20">
          <SectionCounter current={2} total={4} label="Pipeline" />
          <h2 className="mt-6 max-w-2xl text-heading-sm text-abyssal-ink">
            Every report is generated the same four steps.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
            {PIPELINE_STEPS.map((step) => (
              <div key={step.n} className="rounded-card border border-lichen bg-paper p-6">
                <span className="font-mono text-caption text-graphite">{step.n}</span>
                <p className="mt-3 text-subheading text-abyssal-ink">{step.title}</p>
                <p className="mt-2 text-caption text-graphite">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model insights — dark canvas, always visible */}
      <section className="bg-abyssal-ink">
        <div className="mx-auto max-w-page px-6 py-20">
          <SectionCounter current={3} total={4} label="Model" />
          <h2 className="mt-6 max-w-2xl text-heading-sm text-bone-white">What the model weighs.</h2>
          <div className="mt-10">
            <FeatureImportanceChart />
          </div>
        </div>
      </section>

      {/* Report — dark canvas, populated once a PDF has been analyzed */}
      <section id="report" className="bg-abyssal-ink">
        <div className="mx-auto max-w-page px-6 pb-24">
          <SectionCounter current={4} total={4} label="Risk report" />

          {!result && (
            <p className="mt-8 text-body text-lichen/50">
              Upload a prescription above to populate this section.
            </p>
          )}

          {result && (
            <div className="mt-10 space-y-6">
              <KpiRow result={result} />
              <RiskHero result={result} />
              <DrugTable result={result} />
              <InteractionChart result={result} />
              <DosageChart result={result} />
              <ShapChart result={result} />
              <p className="text-center text-caption text-lichen/40">
                Extraction method: {result.extraction_method} · Decision support only — does not
                replace clinical judgment.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
