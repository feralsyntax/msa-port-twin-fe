import './SimulationsComparison.scss';

import SimulationsComparisonTopBar from '../../../components/Simulations/SimulationsComparison/SimulationsComparisonTopBar/SimulationsComparisonTopBar';
import SimulationsComparisonBanner from '../../../components/Simulations/SimulationsComparison/SimulationsComparisonBanner/SimulationsComparisonBanner';
import RunComparisonCard from '../../../components/Simulations/SimulationsComparison/RunComparisonCard/RunComparisonCard';
import ComparisonMetricCard from '../../../components/Simulations/SimulationsComparison/ComparisonMetricCard/ComparisonMetricCard';
import SimulationVarianceMatrix from '../../../components/Simulations/SimulationsComparison/SimulationVarianceMatrix/SimulationVarianceMatrix';

import type { ComparisonMetricCardProps } from '../../../components/Simulations/SimulationsComparison/ComparisonMetricCard/ComparisonMetricCard';
import type { SimulationVarianceRow } from '../../../components/Simulations/SimulationsComparison/SimulationVarianceMatrix/SimulationVarianceMatrix';

const comparisonMetrics: ComparisonMetricCardProps[] = [
  {
    label: 'Avg Waiting Hours',
    icon: 'hourglass_top',
    delta: '+1.4 h',
    direction: 'up',
    tone: 'coral',
    runAValue: '2.4h',
    runBValue: '3.8h',
  },
  {
    label: 'Max Vessels Waiting',
    icon: 'anchor',
    delta: '+3',
    direction: 'up',
    tone: 'coral',
    runAValue: '4',
    runBValue: '7',
  },
  {
    label: 'Berth Utilization',
    icon: 'pie_chart',
    delta: '-17%',
    direction: 'down',
    tone: 'amber',
    runAValue: '82%',
    runBValue: '65%',
  },
  {
    label: 'Avg Turnaround Hours',
    icon: 'schedule',
    delta: '+1.2 h',
    direction: 'up',
    tone: 'coral',
    runAValue: '10.4h',
    runBValue: '11.6h',
  },
];

const varianceRows: SimulationVarianceRow[] = [
  {
    metric: 'Total Arrivals',
    runA: '14',
    runB: '32',
    delta: '+18',
    tone: 'moss',
  },
  {
    metric: 'Vessels Served',
    runA: '14',
    runB: '25',
    delta: '+11',
    tone: 'moss',
  },
  {
    metric: 'Vessels Waiting',
    runA: '0',
    runB: '7',
    delta: '+7',
    tone: 'coral',
  },
  {
    metric: 'Vessels In Service',
    runA: '0',
    runB: '0',
    delta: '—',
    tone: 'neutral',
  },
  {
    metric: 'Avg Waiting Hours',
    runA: '2.4 h',
    runB: '3.8 h',
    delta: '+1.4 h',
    tone: 'coral',
  },
  {
    metric: 'Avg Turnaround Hours',
    runA: '10.4 h',
    runB: '11.6 h',
    delta: '+1.2 h',
    tone: 'coral',
  },
  {
    metric: 'Berth Utilization',
    runA: '82.0%',
    runB: '65.0%',
    delta: '-17.0%',
    tone: 'amber',
  },
];

const SimulationsComparisonPage = () => {
  return (
    <div className="simulations-comparison-page">
      <SimulationsComparisonTopBar />

      <SimulationsComparisonBanner />

      <div className="simulations-comparison-page__content">
        <section
          className="simulations-comparison-page__runs"
          aria-label="Simulation runs being compared"
        >
          <RunComparisonCard
            label="Run A"
            name="Baseline Operations"
            id="sim_9a4b8e"
            badge="Reference Run"
            badgeTone="reference"
          />

          <RunComparisonCard
            label="Run B"
            name="Heavy Traffic Test"
            id="sim_8f2a1c"
            badge="Stress Target"
            badgeTone="stress"
          />
        </section>

        <section
          className="simulations-comparison-page__metrics"
          aria-label="Comparison metric summaries"
        >
          {comparisonMetrics.map((metric) => (
            <ComparisonMetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <SimulationVarianceMatrix rows={varianceRows} />
      </div>
    </div>
  );
};

export default SimulationsComparisonPage;
