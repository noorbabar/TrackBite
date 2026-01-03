import { useState, useEffect } from 'react';

interface CycleData {
  lastPeriod: string;
  cycleLength: number;
  periodLength: number;
}

const CycleSync = () => {
  const [hasSetup, setHasSetup] = useState(false);
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [formData, setFormData] = useState({
    lastPeriod: '',
    cycleLength: 28,
    periodLength: 5
  });

  useEffect(() => {
    const stored = localStorage.getItem('cycleData');
    if (stored) {
      const data = JSON.parse(stored);
      setCycleData(data);
      setHasSetup(true);
    }
  }, []);

  const handleSetup = () => {
    const data = {
      lastPeriod: formData.lastPeriod,
      cycleLength: formData.cycleLength,
      periodLength: formData.periodLength
    };
    localStorage.setItem('cycleData', JSON.stringify(data));
    setCycleData(data);
    setHasSetup(true);
  };

  const getCurrentPhase = () => {
    if (!cycleData) return null;

    const lastPeriod = new Date(cycleData.lastPeriod);
    const today = new Date();
    const daysSince = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const cycleDay = (daysSince % cycleData.cycleLength) + 1;

    if (cycleDay <= cycleData.periodLength) return { name: 'Menstrual', day: cycleDay };
    if (cycleDay <= 14) return { name: 'Follicular', day: cycleDay };
    if (cycleDay <= 16) return { name: 'Ovulation', day: cycleDay };
    return { name: 'Luteal', day: cycleDay };
  };

  const getPhaseInfo = (phaseName: string) => {
    const phases: any = {
      Menstrual: {
        training: 'Light movement or rest. Focus on recovery.',
        nutrition: 'Eat iron-rich foods. Stay hydrated.',
        energy: 'Low energy. Be gentle with yourself.'
      },
      Follicular: {
        training: 'Great time for heavy lifting and PRs.',
        nutrition: 'Higher carbs for energy and performance.',
        energy: 'Rising energy. Push harder in workouts.'
      },
      Ovulation: {
        training: 'Peak strength. Go for max lifts.',
        nutrition: 'Maintain balanced macros.',
        energy: 'Highest energy and strength.'
      },
      Luteal: {
        training: 'Moderate intensity. Listen to your body.',
        nutrition: 'You may need 100-300 extra calories.',
        energy: 'Energy may dip. Adjust expectations.'
      }
    };
    return phases[phaseName] || {};
  };

  const getNextPeriod = () => {
    if (!cycleData) return null;
    const lastPeriod = new Date(cycleData.lastPeriod);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleData.cycleLength);
    return nextPeriod.toLocaleDateString();
  };

  if (!hasSetup) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Set Up Cycle Sync</h1>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Track your cycle and get phase-specific training and nutrition tips. All data stored locally for privacy.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
              Last Period Start Date
            </label>
            <input
              type="date"
              value={formData.lastPeriod}
              onChange={e => setFormData({ ...formData, lastPeriod: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
              Cycle Length (days)
            </label>
            <input
              type="number"
              min="21"
              max="35"
              value={formData.cycleLength}
              onChange={e => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
              Period Length (days)
            </label>
            <input
              type="number"
              min="2"
              max="8"
              value={formData.periodLength}
              onChange={e => setFormData({ ...formData, periodLength: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <button 
            className="btn-primary" 
            onClick={handleSetup}
            disabled={!formData.lastPeriod}
            style={{ width: '100%' }}
          >
            Set Up Tracking
          </button>
        </div>
      </div>
    );
  }

  const phase = getCurrentPhase();
  const phaseInfo = phase ? getPhaseInfo(phase.name) : null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Cycle Sync</h1>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>Day {phase?.day} of {cycleData?.cycleLength}</p>
          </div>
          <button 
            className="btn-secondary" 
            onClick={() => setHasSetup(false)}
            style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
          >
            Update
          </button>
        </div>

        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem' }}>CURRENT PHASE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{phase?.name}</div>
        </div>

        <div style={{ fontSize: '0.875rem', color: '#666' }}>
          <strong>Next period:</strong> {getNextPeriod()}
        </div>
      </div>

      {phaseInfo && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Training</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>{phaseInfo.training}</p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Nutrition</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>{phaseInfo.nutrition}</p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Energy</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>{phaseInfo.energy}</p>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '1rem', background: '#f5f5f5' }}>
        <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>About Cycle Syncing</h3>
        <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: '1.6' }}>
          Your menstrual cycle affects energy, strength, and recovery. Use these recommendations as a guide, 
          but always listen to your body. Everyone's cycle is different.
        </p>
      </div>
    </div>
  );
};

export default CycleSync;