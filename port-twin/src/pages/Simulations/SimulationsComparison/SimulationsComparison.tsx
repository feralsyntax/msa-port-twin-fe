import { Link, useSearchParams } from 'react-router-dom';

import './SimulationsComparison.scss';

import SimulationsComparisonTopBar from '../../../components/Simulations/SimulationsComparison/SimulationsComparisonTopBar/SimulationsComparisonTopBar';
import SimulationsComparisonBanner from '../../../components/Simulations/SimulationsComparison/SimulationsComparisonBanner/SimulationsComparisonBanner';
import RunComparisonCard from '../../../components/Simulations/SimulationsComparison/RunComparisonCard/RunComparisonCard';
import ComparisonMetricCard from '../../../components/Simulations/SimulationsComparison/ComparisonMetricCard/ComparisonMetricCard';
import SimulationVarianceMatrix from '../../../components/Simulations/SimulationsComparison/SimulationVarianceMatrix/SimulationVarianceMatrix';

import type { ComparisonMetricCardProps } from '../../../components/Simulations/SimulationsComparison/ComparisonMetricCard/ComparisonMetricCard';
import type { SimulationVarianceRow } from '../../../components/Simulations/SimulationsComparison/SimulationVarianceMatrix/SimulationVarianceMatrix';

import useGetSimulationComparison from '../../../hooks/simulations/useGetSimulationComparison';

const formatNumber = (value: number, decimals = 0) => {
  return Number(value).toFixed(decimals);
};

const formatDelta = (value: number, decimals = 0, suffix = '') => {
  const formatted = formatNumber(Math.abs(value), decimals);
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';

  return `${sign}${formatted}${suffix}`;
};

const getDirection = (value: number): ComparisonMetricCardProps['direction'] => {
  if (value > 0) return 'up';
  if (value < 0) return 'down';
  return 'neutral';
};

const SimulationsComparisonPage = () => {
  const [searchParams] = useSearchParams();

  const runAId = searchParams.get('run_a') ?? '';
  const runBId = searchParams.get('run_b') ?? '';

  const { data: comparison, isPending, isError } = useGetSimulationComparison(runAId, runBId);

  const hasMissingIds = !runAId || !runBId;
  const hasIdenticalIds = Boolean(runAId && runBId && runAId === runBId);

  const renderComparison = () => {
    if (hasMissingIds || hasIdenticalIds) {
      return (
        <div className="simulations-comparison-page__state">
          <h2>Unable to Compare Simulations</h2>
          <p>
            {hasIdenticalIds
              ? 'Please select two different simulation runs to compare.'
              : 'Two simulation run IDs are required to generate a comparison.'}
          </p>
          <Link to="/simulations">Return to Simulations</Link>
        </div>
      );
    }

    if (isPending) {
      return (
        <div className="simulations-comparison-page__state">
          <p>Loading simulation comparison...</p>
        </div>
      );
    }

    if (isError || !comparison) {
      return (
        <div className="simulations-comparison-page__state">
          <h2>Comparison Unavailable</h2>
          <p>
            The simulation comparison could not be retrieved. Please check that both runs exist and
            have completed successfully.
          </p>
          <Link to="/simulations">Return to Simulations</Link>
        </div>
      );
    }

    const { run_a: runA, run_b: runB, differences } = comparison;

    const comparisonMetrics: ComparisonMetricCardProps[] = [
      {
        label: 'Avg Waiting Hours',
        icon: 'hourglass_top',
        delta: `${formatDelta(differences.average_waiting_hours, 2, ' h')}`,
        direction: getDirection(differences.average_waiting_hours),
        tone: 'coral',
        runAValue: `${formatNumber(runA.summary.average_waiting_hours, 2)}h`,
        runBValue: `${formatNumber(runB.summary.average_waiting_hours, 2)}h`,
      },
      {
        label: 'Vessels Waiting',
        icon: 'anchor',
        delta: formatDelta(differences.vessels_waiting),
        direction: getDirection(differences.vessels_waiting),
        tone: 'coral',
        runAValue: formatNumber(runA.summary.vessels_waiting),
        runBValue: formatNumber(runB.summary.vessels_waiting),
      },
      {
        label: 'Berth Utilization',
        icon: 'pie_chart',
        delta: formatDelta(differences.berth_utilization_percent, 2, ' pp'),
        direction: getDirection(differences.berth_utilization_percent),
        tone: 'amber',
        runAValue: `${formatNumber(runA.summary.berth_utilization_percent, 2)}%`,
        runBValue: `${formatNumber(runB.summary.berth_utilization_percent, 2)}%`,
      },
      {
        label: 'Avg Turnaround Hours',
        icon: 'schedule',
        delta: formatDelta(differences.average_turnaround_hours, 2, ' h'),
        direction: getDirection(differences.average_turnaround_hours),
        tone: 'coral',
        runAValue: `${formatNumber(runA.summary.average_turnaround_hours, 2)}h`,
        runBValue: `${formatNumber(runB.summary.average_turnaround_hours, 2)}h`,
      },
    ];

    const varianceRows: SimulationVarianceRow[] = [
      {
        metric: 'Total Arrivals',
        runA: formatNumber(runA.summary.total_arrivals),
        runB: formatNumber(runB.summary.total_arrivals),
        delta: formatDelta(differences.total_arrivals),
        tone: 'moss',
      },
      {
        metric: 'Vessels Served',
        runA: formatNumber(runA.summary.vessels_served),
        runB: formatNumber(runB.summary.vessels_served),
        delta: formatDelta(differences.vessels_served),
        tone: 'moss',
      },
      {
        metric: 'Vessels Waiting',
        runA: formatNumber(runA.summary.vessels_waiting),
        runB: formatNumber(runB.summary.vessels_waiting),
        delta: formatDelta(differences.vessels_waiting),
        tone: 'coral',
      },
      {
        metric: 'Vessels In Service',
        runA: formatNumber(runA.summary.vessels_in_service),
        runB: formatNumber(runB.summary.vessels_in_service),
        delta: formatDelta(differences.vessels_in_service),
        tone: 'neutral',
      },
      {
        metric: 'Avg Waiting Hours',
        runA: `${formatNumber(runA.summary.average_waiting_hours, 2)} h`,
        runB: `${formatNumber(runB.summary.average_waiting_hours, 2)} h`,
        delta: formatDelta(differences.average_waiting_hours, 2, ' h'),
        tone: 'coral',
      },
      {
        metric: 'Avg Turnaround Hours',
        runA: `${formatNumber(runA.summary.average_turnaround_hours, 2)} h`,
        runB: `${formatNumber(runB.summary.average_turnaround_hours, 2)} h`,
        delta: formatDelta(differences.average_turnaround_hours, 2, ' h'),
        tone: 'coral',
      },
      {
        metric: 'Berth Utilization',
        runA: `${formatNumber(runA.summary.berth_utilization_percent, 2)}%`,
        runB: `${formatNumber(runB.summary.berth_utilization_percent, 2)}%`,
        delta: formatDelta(differences.berth_utilization_percent, 2, ' pp'),
        tone: 'amber',
      },
    ];

    return (
      <>
        {/* Comparison Runs */}
        <section
          className="simulations-comparison-page__runs"
          aria-label="Simulation runs being compared"
        >
          <RunComparisonCard
            label="Run A"
            name={runA.scenario_name}
            id={runA.id}
            badge="Reference Run"
            badgeTone="reference"
          />

          <RunComparisonCard
            label="Run B"
            name={runB.scenario_name}
            id={runB.id}
            badge="Alternative Run"
            badgeTone="stress"
          />
        </section>

        {/* Delta Metrics */}
        <section
          className="simulations-comparison-page__metrics"
          aria-label="Comparison metric summaries"
        >
          {comparisonMetrics.map((metric) => (
            <ComparisonMetricCard key={metric.label} {...metric} />
          ))}
        </section>

        {/* Detailed Variance Matrix */}
        <SimulationVarianceMatrix rows={varianceRows} />
      </>
    );
  };

  return (
    <div className="simulations-comparison-page">
      <SimulationsComparisonTopBar />

      <SimulationsComparisonBanner />

      <div className="simulations-comparison-page__content">{renderComparison()}</div>
    </div>
  );
};

export { SimulationsComparisonPage };
export default SimulationsComparisonPage;
