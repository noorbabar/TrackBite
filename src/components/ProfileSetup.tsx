import { useState, FormEvent, useEffect } from 'react';

type UserStats = {
  weight: number | null;
  goalWeight: number | null;
  age: number | null;
  height: number | null;
  activityLevel:'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  gender: 'male' | 'female';
  recommendedCalories: number | null;
  estimatedDuration: number | null;
  goalCategory: 'maintenance' | 'loss' | 'gain';
  goalRate: 'mild' | 'moderate' | 'extreme';
  lastUpdated: Date | null;
};

type ProfileSetupProps = {
  closeModal: () => void;
  onSaveStats?: (stats: UserStats) => void; 
  initialStats?: UserStats; 
};

const ProfileSetup = ({ closeModal, onSaveStats, initialStats }: ProfileSetupProps) => {
  const [weight, setWeight] = useState<number | ''>('');
  const [goalWeight, setGoalWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active'>('Sedentary');
  const [goalCategory, setGoalCategory] = useState<'maintenance' | 'loss' | 'gain'>('maintenance');
  const [goalRate, setGoalRate] = useState<'mild' | 'moderate' | 'extreme'>('moderate');

  const [, setCalorieOptions] = useState<{ [key: string]: number }>({});
  const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [caloriesTooLowWarning, setCaloriesTooLowWarning] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    weight: null,
    goalWeight: null,
    age: null,
    height: null,
    activityLevel: 'Sedentary',
    gender: 'male',
    recommendedCalories: null,
    estimatedDuration: null,
    goalCategory: 'maintenance',
    goalRate: 'moderate',
    lastUpdated: null,
  });

  useEffect(() => {
    if (initialStats) {
      setUserStats(initialStats);
      setGoalCategory(initialStats.goalCategory);
      setGoalRate(initialStats.goalRate);
      if (initialStats.recommendedCalories) setSelectedCalories(initialStats.recommendedCalories);
      if (initialStats.estimatedDuration) setDuration(initialStats.estimatedDuration);
    }
  }, [initialStats]);

  // Main calculation function using Mifflin-St Jeor + activity + goal adjustments
  const calculateCalories = () => {
    if (weight === '' || goalWeight === '' || height === '' || age === '') return;

    const weightInKg = Number(weight);
    const goalWeightInKg = Number(goalWeight);
    const heightInCm = Number(height);
    const ageInYears = Number(age);

    // Mifflin-St Jeor Equation for BMR
    const bmr =
      gender === 'male'
        ? 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5
        : 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;

    // Activity multipliers based on scientific consensus
    const activityMultipliers: Record<string, number> = {
      Sedentary: 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725,
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Calorie adjustments (deficit or surplus) per week mapped to daily values
    const calorieAdjustments = {
      mild: 250,
      moderate: 500,
      extreme: 1000,
    };

    // Prevent calorie intake below minimum healthy thresholds
    const minCalories = gender === 'female' ? 1200 : 1500;

    let calculatedCalories = tdee;
    let estimatedDurationWeeks = null;

    if (goalCategory === 'maintenance') {
      calculatedCalories = tdee; 
    } else if (goalCategory === 'loss') {
      const deficit = calorieAdjustments[goalRate];
      calculatedCalories = Math.max(tdee - deficit, minCalories);

      const totalLossKg = weightInKg - goalWeightInKg;
      if (totalLossKg > 0) {
        // 7700 kcal per kg fat; deficit is daily, so *7 for weekly deficit
        estimatedDurationWeeks = Math.ceil((totalLossKg * 7700) / (deficit * 7));
      }
    } else if (goalCategory === 'gain') {
      const surplus = calorieAdjustments[goalRate];
      calculatedCalories = tdee + surplus;

      // Calculate weeks needed for goal weight gain
      const totalGainKg = goalWeightInKg - weightInKg;
      if (totalGainKg > 0) {
        estimatedDurationWeeks = Math.ceil((totalGainKg * 7700) / (surplus * 7));
      }
    }

    setCalorieOptions({
      maintenance: tdee,
      mildLoss: tdee - calorieAdjustments.mild,
      moderateLoss: tdee - calorieAdjustments.moderate,
      extremeLoss: Math.max(tdee - calorieAdjustments.extreme, minCalories),
      mildGain: tdee + calorieAdjustments.mild,
      moderateGain: tdee + calorieAdjustments.moderate,
      extremeGain: tdee + calorieAdjustments.extreme,
    });

    setSelectedCalories(calculatedCalories);
    setDuration(estimatedDurationWeeks);

    // Warn if calories are below recommended minimum for long-term health
    if (calculatedCalories < minCalories) {
      setCaloriesTooLowWarning(
        `Warning: Recommended calorie intake (${calculatedCalories.toFixed(
          0,
        )} kcal/day) is below the minimum healthy threshold of ${minCalories} kcal/day for your gender. Consider choosing a milder goal rate for sustainable progress.`,
      );
    } else {
      setCaloriesTooLowWarning('');
    }

    const updatedStats: UserStats = {
      weight: weightInKg,
      goalWeight: goalWeightInKg,
      age: ageInYears,
      height: heightInCm,
      activityLevel,
      gender,
      recommendedCalories: calculatedCalories,
      estimatedDuration: estimatedDurationWeeks,
      goalCategory,
      goalRate,
      lastUpdated: new Date(),
    };

    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));

    if (onSaveStats) onSaveStats(updatedStats);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculateCalories();
    setIsFormSubmitted(true);
  };

  const getRateLabel = (rate: string, category: string) => {
    if (category === 'loss' || category === 'gain') {
      if (rate === 'mild') return '0.25 kg/week';
      if (rate === 'moderate') return '0.5 kg/week';
      if (rate === 'extreme') return '1 kg/week';
    }
    return '';
  };

  const handleSaveAndClose = () => {
    if (onSaveStats && userStats.recommendedCalories) {
      onSaveStats(userStats);
    }
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isFormSubmitted ? (
          <>
            <h2>Profile Setup</h2>
            <p>
              This calculator uses the Mifflin-St Jeor equation to estimate your basal metabolic rate (BMR), then
              adjusts for activity level to find your total daily energy expenditure (TDEE). Calorie adjustments are
              based on safe, evidence-based rates for weight loss or gain. A deficit/surplus of 500 kcal/day typically
              equals about 0.5 kg (1 lb) change per week.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Current Weight (kg):</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value) || '')}
                  min={1}
                  required
                />
              </div>
              <div className="form-group">
                <label>Goal Weight (kg):</label>
                <input
                  type="number"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(Number(e.target.value) || '')}
                  min={1}
                  required
                />
              </div>
              <div className="form-group">
                <label>Height (cm):</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value) || '')}
                  min={50}
                  max={300}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age (years):</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value) || '')}
                  min={10}
                  max={120}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Activity Level:</label>
                <select
                  value={activityLevel}
                  onChange={(e) =>
                    setActivityLevel(e.target.value as
                      | 'Sedentary'
                      | 'Lightly Active'
                      | 'Moderately Active'
                      | 'Very Active')
                  }
                >
                  <option value="Sedentary">Sedentary (little or no exercise)</option>
                  <option value="Lightly Active">Lightly Active (light exercise/sports 1-3 days/week)</option>
                  <option value="Moderately Active">Moderately Active (moderate exercise 3-5 days/week)</option>
                  <option value="Very Active">Very Active (hard exercise 6-7 days/week)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Goal:</label>
                <select value={goalCategory} onChange={(e) => setGoalCategory(e.target.value as any)}>
                  <option value="maintenance">Maintain weight</option>
                  <option value="loss">Lose weight</option>
                  <option value="gain">Gain weight</option>
                </select>
              </div>
              {(goalCategory === 'loss' || goalCategory === 'gain') && (
                <div className="form-group">
                  <label>Goal rate ({goalCategory === 'loss' ? 'Loss' : 'Gain'}):</label>
                  <select value={goalRate} onChange={(e) => setGoalRate(e.target.value as any)}>
                    <option value="mild">Mild ({getRateLabel('mild', goalCategory)})</option>
                    <option value="moderate">Moderate ({getRateLabel('moderate', goalCategory)})</option>
                    <option value="extreme">Extreme ({getRateLabel('extreme', goalCategory)})</option>
                  </select>
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Calculate
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Results</h2>
            <p>
              Based on your inputs, your estimated daily calorie needs are{' '}
              <strong>{selectedCalories?.toFixed(0)} kcal/day</strong>.
            </p>
            {duration !== null && (
              <p>
                Estimated time to reach your goal weight: <strong>{duration} week(s)</strong>.
              </p>
            )}
            {caloriesTooLowWarning && <p style={{ color: 'red' }}>{caloriesTooLowWarning}</p>}
            <button className="btn btn-secondary" onClick={() => setIsFormSubmitted(false)}>
              Adjust Inputs
            </button>{' '}
            <button className="btn btn-success" onClick={handleSaveAndClose}>
              Save and Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
