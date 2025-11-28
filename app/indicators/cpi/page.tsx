import Link from 'next/link';
import { ArrowRight, TrendingDown, AlertCircle } from 'lucide-react';
import MetricCard from '@/components/cards/MetricCard';
import BarChart from '@/components/charts/BarChart';
import { getIndicatorBySlug } from '@/lib/dataService';

export default async function CPIPage() {
  const cpiData = await getIndicatorBySlug('cpi');

  if (!cpiData) {
    return (
      <div className="bg-soft-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Data Not Available</h2>
          <p className="text-slate-light mb-4">CPI data could not be loaded</p>
          <Link href="/indicators" className="btn-primary">
            View All Indicators
          </Link>
        </div>
      </div>
    );
  }

  // Prepare comparison data for chart
  const comparisonData = [
    { country: 'Kenya', value: cpiData.score, color: '#0F766E' },
    { country: 'East Africa Avg', value: 32, color: '#14B8A6' },
    { country: 'Sub-Saharan Africa', value: 33, color: '#2DD4BF' },
    { country: 'World Average', value: 43, color: '#F59E0B' },
  ];

  return (
    <div className="bg-soft-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <svg viewBox="0 0 800 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M400 100 L450 150 L500 200 L480 280 L450 350 L400 400 L350 380 L320 320 L300 250 L320 180 L360 130 Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-10 h-10 text-white" />
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">Corruption</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
              Corruption Perceptions Index
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              The CPI ranks countries by their perceived levels of public sector corruption according to experts and business people.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/indicators" className="btn-secondary bg-white/10 hover:bg-white/20 border-white/30 text-white">
                ← All Indicators
              </Link>
              <a 
                href="https://www.transparency.org/en/cpi/2023"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-orange-700 hover:bg-white/90"
              >
                View Full Report
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Key Highlights */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Key Highlights
            </h2>
            <p className="text-lg text-slate-light">
              Kenya's performance in the {cpiData.year} Corruption Perceptions Index
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="CPI Score"
              value={cpiData.score.toString()}
              trend={cpiData.trend}
              change={cpiData.trendData.length >= 2 
                ? `${cpiData.trendData[1].value - cpiData.trendData[0].value > 0 ? '+' : ''}${(cpiData.trendData[1].value - cpiData.trendData[0].value).toFixed(0)}`
                : undefined}
              tooltipContent="Score out of 100, where 0 means highly corrupt and 100 means very clean"
            />
            <MetricCard
              title="Global Rank"
              value={`${cpiData.rank}/${cpiData.totalCountries}`}
              trend={cpiData.trend}
              tooltipContent="Kenya's ranking among all countries assessed"
            />
            <MetricCard
              title="Year"
              value={cpiData.year.toString()}
              trend="neutral"
              tooltipContent="Most recent year of assessment"
            />
          </div>
        </section>

        {/* Understanding the Score */}
        <section className="card bg-gradient-to-br from-orange-50 to-transparent border-l-4 border-orange-500">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            Understanding Kenya's Score
          </h3>
          <p className="text-slate-light leading-relaxed mb-4">
            Kenya scored <strong className="text-primary">{cpiData.score} out of 100</strong> in the {cpiData.year} Corruption Perceptions Index, 
            ranking <strong className="text-primary">#{cpiData.rank} out of {cpiData.totalCountries}</strong> countries globally. 
            This score indicates significant challenges with perceived corruption in the public sector.
          </p>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <h4 className="font-semibold text-primary mb-2">What does this mean?</h4>
            <ul className="space-y-2 text-sm text-slate-light">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>A score below 50 suggests serious corruption challenges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>The score reflects perceptions from business people and country experts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Lower scores correlate with weaker rule of law and governance institutions</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Kenya vs Region vs World */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Kenya vs Region vs World
            </h2>
            <p className="text-lg text-slate-light">
              Comparing Kenya's CPI score with regional and global averages
            </p>
          </div>

          <div className="card">
            <BarChart
              data={comparisonData}
              title="Corruption Perceptions Index"
              yAxisLabel="Score (0-100)"
            />
          </div>
        </section>

        {/* Historical Trend */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Historical Trend
            </h2>
            <p className="text-lg text-slate-light">
              Kenya's CPI score over recent years
            </p>
          </div>

          <div className="card">
            <div className="space-y-4">
              {cpiData.trendData.map((point, index) => (
                <div key={point.year} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-primary">{point.year}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-slate">{point.value}</span>
                    {index > 0 && (
                      <span className={`text-sm ${point.value > cpiData.trendData[index - 1].value ? 'text-data-green' : 'text-data-red'}`}>
                        {point.value > cpiData.trendData[index - 1].value ? '↑' : '↓'} 
                        {Math.abs(point.value - cpiData.trendData[index - 1].value)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Source */}
        <section className="card bg-gradient-to-r from-primary/5 to-orange-500/5 border-t-4 border-orange-500">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Data Source</h3>
          <p className="text-slate-light leading-relaxed mb-4">
            The Corruption Perceptions Index is published annually by Transparency International. 
            It aggregates data from multiple sources to provide a comprehensive view of perceived corruption levels worldwide.
          </p>
          <a
            href={cpiData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-2"
          >
            Visit Transparency International
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </div>
    </div>
  );
}
