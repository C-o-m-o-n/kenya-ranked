'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, GraduationCap, DollarSign, Heart, Leaf, Home, Scale } from 'lucide-react';
import HDROIndicatorCard from '@/components/hdro/HDROIndicatorCard';
import {
  fetchCoreIndices,
  fetchGenderMetrics,
  fetchEducationIndicators,
  fetchEconomicIndicators,
  fetchHealthIndicators,
  fetchEnvironmentIndicators,
  fetchLivingStandards,
  fetchGovernanceIndicators,
} from '@/lib/hdro/client';
import { formatIndicatorValue, calculateChange, getTrendDirection, getIndicatorMetadata } from '@/lib/hdro/formatters';

export default function HDRODashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [
          coreIndices,
          genderMetrics,
          education,
          economic,
          health,
          environment,
          livingStandards,
          governance,
        ] = await Promise.all([
          fetchCoreIndices(),
          fetchGenderMetrics(),
          fetchEducationIndicators(),
          fetchEconomicIndicators(),
          fetchHealthIndicators(),
          fetchEnvironmentIndicators(),
          fetchLivingStandards(),
          fetchGovernanceIndicators(),
        ]);

        setData({
          coreIndices,
          genderMetrics,
          education,
          economic,
          health,
          environment,
          livingStandards,
          governance,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-soft-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-slate-light">Loading HDRO indicators...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-soft-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Error Loading Data</h2>
          <p className="text-slate-light mb-4">{error}</p>
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

  const { coreIndices, genderMetrics, education, economic, health, environment, livingStandards, governance } = data;

  return (
    <div className="bg-soft-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
              Kenya's Human Development Indicators
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Track Kenya's progress across 22 key development indicators from the UNDP Human Development Report Office.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/indicators" className="btn-secondary bg-white/10 hover:bg-white/20 border-white/30 text-white">
                ← All Indicators
              </Link>
              <Link href="/compare" className="btn-primary bg-kenya-green hover:bg-kenya-green/90">
                Compare with Other Countries
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Core Development Indices */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Core Development Indices
              </h2>
              <p className="text-slate-light">Composite measures of human development</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HDROIndicatorCard
              title="Human Development Index (HDI)"
              value={formatIndicatorValue(coreIndices.hdi.kenya.current.value, 'index')}
              year={coreIndices.hdi.kenya.current.year}
              trend={getTrendDirection(coreIndices.hdi.kenya.history)}
              change={coreIndices.hdi.kenya.history.length >= 2 ? 
                calculateChange(
                  coreIndices.hdi.kenya.history[0].value,
                  coreIndices.hdi.kenya.history[1].value
                ).formatted : undefined}
              description={getIndicatorMetadata('hdi').description}
              unit={getIndicatorMetadata('hdi').unit}
              onClick={() => window.location.href = '/indicators/hdro/hdi'}
            />

            <HDROIndicatorCard
              title="Inequality-adjusted HDI"
              value={formatIndicatorValue(coreIndices.ihdi.kenya.current.value, 'index')}
              year={coreIndices.ihdi.kenya.current.year}
              trend={getTrendDirection(coreIndices.ihdi.kenya.history)}
              change={coreIndices.ihdi.kenya.history.length >= 2 ?
                calculateChange(
                  coreIndices.ihdi.kenya.history[0].value,
                  coreIndices.ihdi.kenya.history[1].value
                ).formatted : undefined}
              description={getIndicatorMetadata('ihdi').description}
              unit={getIndicatorMetadata('ihdi').unit}
              onClick={() => window.location.href = '/indicators/hdro/ihdi'}
            />

            <HDROIndicatorCard
              title="Planetary Pressures-adjusted HDI"
              value={formatIndicatorValue(coreIndices.phdi.kenya.current.value, 'index')}
              year={coreIndices.phdi.kenya.current.year}
              trend={getTrendDirection(coreIndices.phdi.kenya.history)}
              change={coreIndices.phdi.kenya.history.length >= 2 ?
                calculateChange(
                  coreIndices.phdi.kenya.history[0].value,
                  coreIndices.phdi.kenya.history[1].value
                ).formatted : undefined}
              description={getIndicatorMetadata('phdi').description}
              unit={getIndicatorMetadata('phdi').unit}
              onClick={() => window.location.href = '/indicators/hdro/phdi'}
            />
          </div>
        </section>

        {/* Gender Equality */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Gender Equality
              </h2>
              <p className="text-slate-light">Measuring gender gaps and equality</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HDROIndicatorCard
              title="Gender Development Index (GDI)"
              value={formatIndicatorValue(genderMetrics.gdi.kenya.current.value, 'index')}
              year={genderMetrics.gdi.kenya.current.year}
              trend={getTrendDirection(genderMetrics.gdi.kenya.history)}
              description={getIndicatorMetadata('gdi').description}
              unit={getIndicatorMetadata('gdi').unit}
              onClick={() => window.location.href = '/indicators/hdro/gdi'}
            />

            <HDROIndicatorCard
              title="Gender Inequality Index (GII)"
              value={formatIndicatorValue(genderMetrics.gii.kenya.current.value, 'index')}
              year={genderMetrics.gii.kenya.current.year}
              trend={getTrendDirection(genderMetrics.gii.kenya.history)}
              description={getIndicatorMetadata('gii').description}
              unit={getIndicatorMetadata('gii').unit}
              onClick={() => window.location.href = '/indicators/hdro/gii'}
            />
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Education
              </h2>
              <p className="text-slate-light">Educational attainment and access</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HDROIndicatorCard
              title="Mean Years of Schooling"
              value={formatIndicatorValue(education.meanYears.kenya.current.total || 
                (education.meanYears.kenya.current.male + education.meanYears.kenya.current.female) / 2, 'years')}
              year={education.meanYears.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('mean-years-schooling').description}
              unit={getIndicatorMetadata('mean-years-schooling').unit}
              onClick={() => window.location.href = '/indicators/hdro/mean-years-schooling'}
            />

            <HDROIndicatorCard
              title="Expected Years of Schooling"
              value={formatIndicatorValue(education.expectedYears.kenya.current.total ||
                (education.expectedYears.kenya.current.male + education.expectedYears.kenya.current.female) / 2, 'years')}
              year={education.expectedYears.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('expected-years-schooling').description}
              unit={getIndicatorMetadata('expected-years-schooling').unit}
              onClick={() => window.location.href = '/indicators/hdro/expected-years-schooling'}
            />

            <HDROIndicatorCard
              title="Secondary Education Rate"
              value={formatIndicatorValue(
                (education.secondary.kenya.current.male + education.secondary.kenya.current.female) / 2, 'percentage')}
              year={education.secondary.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('secondary-education').description}
              unit={getIndicatorMetadata('secondary-education').unit}
              onClick={() => window.location.href = '/indicators/hdro/secondary-education'}
            />
          </div>
        </section>

        {/* Economic */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Economic Indicators
              </h2>
              <p className="text-slate-light">Income and economic participation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HDROIndicatorCard
              title="GNI Per Capita"
              value={formatIndicatorValue(economic.gni.kenya.current.total ||
                (economic.gni.kenya.current.male + economic.gni.kenya.current.female) / 2, 'currency')}
              year={economic.gni.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('gni-per-capita').description}
              unit={getIndicatorMetadata('gni-per-capita').unit}
              onClick={() => window.location.href = '/indicators/hdro/gni-per-capita'}
            />

            <HDROIndicatorCard
              title="Labour Force Participation"
              value={formatIndicatorValue(
                (economic.labourForce.kenya.current.male + economic.labourForce.kenya.current.female) / 2, 'percentage')}
              year={economic.labourForce.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('labour-force').description}
              unit={getIndicatorMetadata('labour-force').unit}
              onClick={() => window.location.href = '/indicators/hdro/labour-force'}
            />
          </div>
        </section>

        {/* Health */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Health Indicators
              </h2>
              <p className="text-slate-light">Life expectancy and health outcomes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HDROIndicatorCard
              title="Life Expectancy"
              value={formatIndicatorValue(
                (health.lifeExpectancy.kenya.current.male + health.lifeExpectancy.kenya.current.female) / 2, 'years')}
              year={health.lifeExpectancy.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('life-expectancy').description}
              unit={getIndicatorMetadata('life-expectancy').unit}
              onClick={() => window.location.href = '/indicators/hdro/life-expectancy'}
            />

            <HDROIndicatorCard
              title="Maternal Mortality Ratio"
              value={formatIndicatorValue(health.maternalMortality.kenya.current.value, 'ratio')}
              year={health.maternalMortality.kenya.current.year}
              trend={getTrendDirection(health.maternalMortality.kenya.history)}
              description={getIndicatorMetadata('maternal-mortality').description}
              unit={getIndicatorMetadata('maternal-mortality').unit}
              onClick={() => window.location.href = '/indicators/hdro/maternal-mortality'}
            />

            <HDROIndicatorCard
              title="Adolescent Birth Rate"
              value={formatIndicatorValue(health.adolescentBirthRate.kenya.current.value, 'ratio')}
              year={health.adolescentBirthRate.kenya.current.year}
              trend={getTrendDirection(health.adolescentBirthRate.kenya.history)}
              description={getIndicatorMetadata('adolescent-birth-rate').description}
              unit={getIndicatorMetadata('adolescent-birth-rate').unit}
              onClick={() => window.location.href = '/indicators/hdro/adolescent-birth-rate'}
            />
          </div>
        </section>

        {/* Environment */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Environmental Sustainability
              </h2>
              <p className="text-slate-light">Carbon emissions and resource use</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HDROIndicatorCard
              title="CO2 Emissions Per Capita"
              value={formatIndicatorValue(environment.co2.kenya.current.value, 'tonnes')}
              year={environment.co2.kenya.current.year}
              trend={getTrendDirection(environment.co2.kenya.history)}
              description={getIndicatorMetadata('co2-emissions').description}
              unit={getIndicatorMetadata('co2-emissions').unit}
              onClick={() => window.location.href = '/indicators/hdro/co2-emissions'}
            />

            <HDROIndicatorCard
              title="Material Footprint Per Capita"
              value={formatIndicatorValue(environment.materialFootprint.kenya.current.value, 'tonnes')}
              year={environment.materialFootprint.kenya.current.year}
              trend={getTrendDirection(environment.materialFootprint.kenya.history)}
              description={getIndicatorMetadata('material-footprint').description}
              unit={getIndicatorMetadata('material-footprint').unit}
              onClick={() => window.location.href = '/indicators/hdro/material-footprint'}
            />
          </div>
        </section>

        {/* Living Standards */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Living Standards
              </h2>
              <p className="text-slate-light">Access to basic services and infrastructure</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HDROIndicatorCard
              title="Access to Electricity"
              value={formatIndicatorValue(livingStandards.electricity.kenya.current.value, 'percentage')}
              year={livingStandards.electricity.kenya.current.year}
              trend={getTrendDirection(livingStandards.electricity.kenya.history)}
              description={getIndicatorMetadata('electricity').description}
              unit={getIndicatorMetadata('electricity').unit}
              onClick={() => window.location.href = '/indicators/hdro/electricity'}
            />

            <HDROIndicatorCard
              title="Access to Clean Water"
              value={formatIndicatorValue(livingStandards.water.kenya.current.value, 'percentage')}
              year={livingStandards.water.kenya.current.year}
              trend={getTrendDirection(livingStandards.water.kenya.history)}
              description={getIndicatorMetadata('water').description}
              unit={getIndicatorMetadata('water').unit}
              onClick={() => window.location.href = '/indicators/hdro/water'}
            />

            <HDROIndicatorCard
              title="Access to Sanitation"
              value={formatIndicatorValue(livingStandards.sanitation.kenya.current.value, 'percentage')}
              year={livingStandards.sanitation.kenya.current.year}
              trend={getTrendDirection(livingStandards.sanitation.kenya.history)}
              description={getIndicatorMetadata('sanitation').description}
              unit={getIndicatorMetadata('sanitation').unit}
              onClick={() => window.location.href = '/indicators/hdro/sanitation'}
            />

            <HDROIndicatorCard
              title="Clean Cooking Fuel"
              value={formatIndicatorValue(livingStandards.cookingFuel.kenya.current.value, 'percentage')}
              year={livingStandards.cookingFuel.kenya.current.year}
              trend={getTrendDirection(livingStandards.cookingFuel.kenya.history)}
              description={getIndicatorMetadata('cooking-fuel').description}
              unit={getIndicatorMetadata('cooking-fuel').unit}
              onClick={() => window.location.href = '/indicators/hdro/cooking-fuel'}
            />

            <HDROIndicatorCard
              title="Housing Quality"
              value={formatIndicatorValue(livingStandards.housing.kenya.current.value, 'percentage')}
              year={livingStandards.housing.kenya.current.year}
              trend={getTrendDirection(livingStandards.housing.kenya.history)}
              description={getIndicatorMetadata('housing').description}
              unit={getIndicatorMetadata('housing').unit}
              onClick={() => window.location.href = '/indicators/hdro/housing'}
            />
          </div>
        </section>

        {/* Governance & Poverty */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-slate-500 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Governance & Poverty
              </h2>
              <p className="text-slate-light">Political representation and poverty measures</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HDROIndicatorCard
              title="Parliamentary Representation"
              value={formatIndicatorValue(governance.parliament.kenya.current.female, 'percentage')}
              year={governance.parliament.kenya.current.year}
              hasGenderData={true}
              description={getIndicatorMetadata('parliament').description}
              unit={getIndicatorMetadata('parliament').unit}
              onClick={() => window.location.href = '/indicators/hdro/parliament'}
            />

            <HDROIndicatorCard
              title="Multidimensional Poverty Index"
              value={formatIndicatorValue(governance.mpi.kenya.current.value, 'index')}
              year={governance.mpi.kenya.current.year}
              trend={getTrendDirection(governance.mpi.kenya.history)}
              description={getIndicatorMetadata('mpi').description}
              unit={getIndicatorMetadata('mpi').unit}
              onClick={() => window.location.href = '/indicators/hdro/mpi'}
            />
          </div>
        </section>

        {/* Data Source */}
        <section className="card bg-gradient-to-r from-primary/5 to-data-cyan/5 border-t-4 border-primary">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Data Source</h3>
          <p className="text-slate-light leading-relaxed mb-4">
            All indicators are sourced from the United Nations Development Programme (UNDP) Human Development Report Office (HDRO).
            Data is updated annually and reflects the most recent available information.
          </p>
          <a
            href="https://hdr.undp.org/data-center"
            target="_blank"
            rel="noopener noreferrer"
            className="text-data-cyan hover:text-data-blue font-medium inline-flex items-center gap-2"
          >
            Visit UNDP Data Center
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </div>
    </div>
  );
}
