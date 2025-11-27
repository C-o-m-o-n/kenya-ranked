'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { notFound } from 'next/navigation';
import HistoricalTrendChart from '@/components/hdro/HistoricalTrendChart';
import RegionalComparisonChart from '@/components/hdro/RegionalComparisonChart';
import GenderComparisonChart from '@/components/hdro/GenderComparisonChart';
import {
  fetchHDI, fetchIHDI, fetchPHDI, fetchGDI, fetchGII,
  fetchMeanYearsSchooling, fetchExpectedYearsSchooling, fetchSecondaryEducation,
  fetchGNIPerCapita, fetchLabourForce,
  fetchLifeExpectancy, fetchMaternalMortality, fetchAdolescentBirthRate,
  fetchCO2Emissions, fetchMaterialFootprint,
  fetchElectricityAccess, fetchWaterAccess, fetchSanitationAccess,
  fetchCookingFuelAccess, fetchHousingQuality,
  fetchParliamentRepresentation, fetchMPI,
} from '@/lib/hdro/client';
import { formatIndicatorValue, getIndicatorMetadata, calculateGenderGap } from '@/lib/hdro/formatters';
import type { HDROResponse, GenderResponse } from '@/lib/hdro/types';

// Map of indicator slugs to their fetch functions
const indicatorFetchers: Record<string, () => Promise<HDROResponse | GenderResponse>> = {
  'hdi': fetchHDI,
  'ihdi': fetchIHDI,
  'phdi': fetchPHDI,
  'gdi': fetchGDI,
  'gii': fetchGII,
  'mean-years-schooling': fetchMeanYearsSchooling,
  'expected-years-schooling': fetchExpectedYearsSchooling,
  'secondary-education': fetchSecondaryEducation,
  'gni-per-capita': fetchGNIPerCapita,
  'labour-force': fetchLabourForce,
  'life-expectancy': fetchLifeExpectancy,
  'maternal-mortality': fetchMaternalMortality,
  'adolescent-birth-rate': fetchAdolescentBirthRate,
  'co2-emissions': fetchCO2Emissions,
  'material-footprint': fetchMaterialFootprint,
  'electricity': fetchElectricityAccess,
  'water': fetchWaterAccess,
  'sanitation': fetchSanitationAccess,
  'cooking-fuel': fetchCookingFuelAccess,
  'housing': fetchHousingQuality,
  'parliament': fetchParliamentRepresentation,
  'mpi': fetchMPI,
};

// Indicators with gender data
const genderIndicators = [
  'mean-years-schooling',
  'expected-years-schooling',
  'secondary-education',
  'gni-per-capita',
  'labour-force',
  'life-expectancy',
  'parliament',
];

function isGenderResponse(data: HDROResponse | GenderResponse): data is GenderResponse {
  return 'male' in data.kenya.current && 'female' in data.kenya.current;
}

export default function IndicatorDetailPage() {
  const params = useParams();
  const indicator = params.indicator as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HDROResponse | GenderResponse | null>(null);

  useEffect(() => {
    async function loadData() {
      // Check if indicator exists
      if (!indicatorFetchers[indicator]) {
        notFound();
        return;
      }

      try {
        setLoading(true);
        const fetchedData = await indicatorFetchers[indicator]();
        setData(fetchedData);
      } catch (err: any) {
        setError(err.message || 'Failed to load indicator data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [indicator]);

  if (loading) {
    return (
      <div className="bg-soft-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-slate-light">Loading indicator data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-soft-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Error Loading Data</h2>
          <p className="text-slate-light mb-4">{error || 'No data available'}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const metadata = getIndicatorMetadata(indicator);
  const hasGenderData = genderIndicators.includes(indicator);

  // Get current value for display
  let currentValue: string;
  let currentYear: number;

  if (isGenderResponse(data)) {
    const total = data.kenya.current.total || 
      (data.kenya.current.male + data.kenya.current.female) / 2;
    currentValue = formatIndicatorValue(total, metadata.type);
    currentYear = data.kenya.current.year;
  } else {
    currentValue = formatIndicatorValue(data.kenya.current.value, metadata.type);
    currentYear = data.kenya.current.year;
  }

  // Prepare historical data for chart
  const historicalData = isGenderResponse(data)
    ? data.kenya.history.map(d => ({
        year: d.year,
        value: d.total || (d.male + d.female) / 2,
      }))
    : data.kenya.history;

  return (
    <div className="bg-soft-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/indicators/hdro"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HDRO Dashboard
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                {metadata.name}
              </h1>
              <p className="text-lg text-slate-light">{metadata.description}</p>
            </div>

            <button
              onClick={() => {
                // Export data as CSV
                const csvData = historicalData
                  .map(d => `${d.year},${d.value}`)
                  .join('\n');
                const blob = new Blob([`Year,Value\n${csvData}`], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `kenya-${indicator}-data.csv`;
                a.click();
              }}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Current Value Highlight */}
        <section className="card bg-gradient-to-br from-primary/5 to-data-cyan/5 border-l-4 border-primary">
          <div className="text-center">
            <div className="text-sm text-slate-light mb-2">Current Value ({currentYear})</div>
            <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-2">
              {currentValue}
            </div>
            <div className="text-slate-light">{metadata.unit}</div>
          </div>
        </section>

        {/* Gender Comparison (if applicable) */}
        {hasGenderData && isGenderResponse(data) && (
          <section className="card">
            <GenderComparisonChart
              data={data.kenya.current}
              title="Gender Comparison"
              unit={metadata.unit}
              valueFormatter={(v) => formatIndicatorValue(v, metadata.type)}
            />
          </section>
        )}

        {/* Historical Trend */}
        <section className="card">
          <HistoricalTrendChart
            data={historicalData}
            title="Historical Trend"
            yAxisLabel={metadata.unit}
            valueFormatter={(v) => formatIndicatorValue(v, metadata.type)}
          />
        </section>

        {/* Regional Comparison */}
        <section className="card">
          <RegionalComparisonChart
            data={data.comparison}
            title="Regional Comparison"
            yAxisLabel={metadata.unit}
            valueFormatter={(v) => formatIndicatorValue(v, metadata.type)}
            higherIsBetter={metadata.higherIsBetter}
          />
        </section>

        {/* Key Insights */}
        <section className="card">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
            Key Insights
          </h2>
          
          <div className="space-y-4">
            {/* Latest Value */}
            <div className="p-4 bg-slate/5 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Latest Value</h3>
              <p className="text-slate">
                As of {currentYear}, Kenya's {metadata.name.toLowerCase()} stands at{' '}
                <span className="font-semibold text-primary">{currentValue}</span>.
              </p>
            </div>

            {/* Trend */}
            {historicalData.length >= 2 && (
              <div className="p-4 bg-slate/5 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Trend Analysis</h3>
                <p className="text-slate">
                  {(() => {
                    const first = historicalData[historicalData.length - 1];
                    const last = historicalData[0];
                    const change = last.value - first.value;
                    const percentChange = ((change / first.value) * 100).toFixed(1);
                    
                    return `From ${first.year} to ${last.year}, this indicator has ${
                      change > 0 ? 'increased' : 'decreased'
                    } by ${Math.abs(parseFloat(percentChange))}% (from ${formatIndicatorValue(first.value, metadata.type)} to ${formatIndicatorValue(last.value, metadata.type)}).`;
                  })()}
                </p>
              </div>
            )}

            {/* Gender Gap */}
            {hasGenderData && isGenderResponse(data) && (
              <div className="p-4 bg-slate/5 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Gender Gap</h3>
                <p className="text-slate">
                  {(() => {
                    const gap = calculateGenderGap(
                      data.kenya.current.male,
                      data.kenya.current.female
                    );
                    
                    return `There is a ${gap.formatted} gender gap, ${
                      gap.favorsMale ? 'favoring males' : 'favoring females'
                    }. Males: ${formatIndicatorValue(data.kenya.current.male, metadata.type)}, Females: ${formatIndicatorValue(data.kenya.current.female, metadata.type)}.`;
                  })()}
                </p>
              </div>
            )}

            {/* Regional Position */}
            <div className="p-4 bg-slate/5 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Regional Position</h3>
              <p className="text-slate">
                {(() => {
                  const countries = data.comparison.filter(c => !c.country.includes('Avg'));
                  const sorted = [...countries].sort((a, b) => 
                    metadata.higherIsBetter ? b.value - a.value : a.value - b.value
                  );
                  const kenyaRank = sorted.findIndex(c => c.country === 'Kenya') + 1;
                  
                  return `Kenya ranks #${kenyaRank} out of ${countries.length} countries in the region for this indicator.`;
                })()}
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="card bg-gradient-to-r from-slate/5 to-transparent">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
            About This Indicator
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary mb-2">What It Measures</h3>
              <p className="text-slate">{metadata.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-2">Unit of Measurement</h3>
              <p className="text-slate">{metadata.unit}</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-2">Interpretation</h3>
              <p className="text-slate">
                {metadata.higherIsBetter
                  ? 'Higher values indicate better performance.'
                  : 'Lower values indicate better performance.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-2">Data Source</h3>
              <p className="text-slate mb-2">
                United Nations Development Programme (UNDP) Human Development Report Office (HDRO)
              </p>
              <a
                href="https://hdr.undp.org/data-center"
                target="_blank"
                rel="noopener noreferrer"
                className="text-data-cyan hover:text-data-blue font-medium inline-flex items-center gap-2"
              >
                Visit UNDP Data Center →
              </a>
            </div>
          </div>
        </section>

        {/* Related Indicators */}
        <section className="card">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
            Explore Related Indicators
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/indicators/hdro"
              className="p-4 bg-slate/5 hover:bg-slate/10 rounded-lg transition-colors text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium text-primary">All HDRO Indicators</div>
            </Link>
            
            <Link
              href="/indicators"
              className="p-4 bg-slate/5 hover:bg-slate/10 rounded-lg transition-colors text-center"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-medium text-primary">All Indicators</div>
            </Link>
            
            <Link
              href="/sdg"
              className="p-4 bg-slate/5 hover:bg-slate/10 rounded-lg transition-colors text-center"
            >
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-sm font-medium text-primary">SDG Progress</div>
            </Link>
            
            <Link
              href="/compare"
              className="p-4 bg-slate/5 hover:bg-slate/10 rounded-lg transition-colors text-center"
            >
              <div className="text-2xl mb-2">⚖️</div>
              <div className="text-sm font-medium text-primary">Compare Countries</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
