import { useState, FormEvent, useEffect } from 'react';

// Define a type for user stats
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
  
  const [, setCalories] = useState<{ [key: string]: number }>({});
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
    lastUpdated: null
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

  const calculateCalories = () => {
    if (weight === '' || goalWeight === '' || height === '' || age === '') return;

    const weightInKg = weight;
    const heightInCm = height;
    const ageInYears = age;

    let bmr = gender === 'male'
      ? 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5
      : 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;

    const activityMultipliers = {
      Sedentary: 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725,
    };

    const tdee = bmr * activityMultipliers[activityLevel];
    
    const calorieOptions: { [key: string]: number } = {
      maintenance: tdee,
      mildLoss: tdee - 250,
      moderateLoss: tdee - 500,
      extremeLoss: Math.max(tdee - 1000, 800),
      mildGain: tdee + 250,
      moderateGain: tdee + 500,
      extremeGain: tdee + 1000,
    };
    
    setCalories(calorieOptions);
    
    let calculatedCalories = null;
    let calculatedDuration = null;
    
    if (goalCategory === 'maintenance') {
      calculatedCalories = calorieOptions.maintenance;
    } else if (goalCategory === 'loss') {
      if (goalRate === 'mild') {
        calculatedCalories = calorieOptions.mildLoss;
      } else if (goalRate === 'moderate') {
        calculatedCalories = calorieOptions.moderateLoss;
      } else {
        calculatedCalories = calorieOptions.extremeLoss;
      }
      
      // Calculate duration for weight loss
      const totalLoss = weightInKg - goalWeight;
      const deficitPerDay = goalRate === 'mild' ? 250 : goalRate === 'moderate' ? 500 : 1000;
      calculatedDuration = Math.ceil((totalLoss * 7700) / (deficitPerDay * 7));
      
    } else if (goalCategory === 'gain') {
      if (goalRate === 'mild') {
        calculatedCalories = calorieOptions.mildGain;
      } else if (goalRate === 'moderate') {
        calculatedCalories = calorieOptions.moderateGain;
      } else {
        calculatedCalories = calorieOptions.extremeGain;
      }
      
      const totalGain = goalWeight - weightInKg;
      const surplusPerDay = goalRate === 'mild' ? 250 : goalRate === 'moderate' ? 500 : 1000;
      calculatedDuration = Math.ceil((totalGain * 7700) / (surplusPerDay * 7));
    }
    
    setSelectedCalories(calculatedCalories);
    setDuration(calculatedDuration);

    // Save to user stats
    // Save to user stats
    const updatedStats: UserStats = {
    weight,
    goalWeight,
    age,
    height,
    activityLevel,
    gender,
    recommendedCalories: calculatedCalories,
    estimatedDuration: calculatedDuration,
    goalCategory,
    goalRate,
    lastUpdated: new Date()
  };

  setUserStats(updatedStats);

  localStorage.setItem('userStats', JSON.stringify(updatedStats));

  if (onSaveStats) {
    onSaveStats(updatedStats);
  }

    if (goalCategory === 'loss' && goalRate === 'extreme' && 
        ((gender === 'female' && calorieOptions.extremeLoss < 1200) || 
         (gender === 'male' && calorieOptions.extremeLoss < 1500))) {
      setCaloriesTooLowWarning('Warning: Extreme deficit is too low for long-term health.');
    } else {
      setCaloriesTooLowWarning('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculateCalories();
    setIsFormSubmitted(true);
  };

  // Get the rate label based on goal rate
  const getRateLabel = (rate: string, category: string) => {
    if (category === 'loss') {
      if (rate === 'mild') return '0.25 kg/week';
      if (rate === 'moderate') return '0.5 kg/week';
      return '1 kg/week';
    } else if (category === 'gain') {
      if (rate === 'mild') return '0.25 kg/week';
      if (rate === 'moderate') return '0.5 kg/week';
      return '1 kg/week';
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Current Weight (kg):</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value) || '')} required />
              </div>
              <div className="form-group">
                <label>Goal Weight (kg):</label>
                <input type="number" value={goalWeight} onChange={(e) => setGoalWeight(Number(e.target.value) || '')} required />
              </div>
              <div className="form-group">
                <label>Height (cm):</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || '')} required />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || '')} required />
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
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as any)}>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              </div>
              
              {/* Goal selection section */}
              <div className="form-group">
                <label>Goal:</label>
                <select value={goalCategory} onChange={(e) => setGoalCategory(e.target.value as 'maintenance' | 'loss' | 'gain')}>
                  <option value="maintenance">Maintenance</option>
                  <option value="loss">Weight Loss</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
              
              {/* Only show rate selection if not maintenance */}
              {goalCategory !== 'maintenance' && (
                <div className="form-group">
                  <label>Rate:</label>
                  <select value={goalRate} onChange={(e) => setGoalRate(e.target.value as 'mild' | 'moderate' | 'extreme')}>
                    <option value="mild">Mild ({getRateLabel('mild', goalCategory)})</option>
                    <option value="moderate">Moderate ({getRateLabel('moderate', goalCategory)})</option>
                    <option value="extreme">Aggressive ({getRateLabel('extreme', goalCategory)})</option>
                  </select>
                </div>
              )}
              
              <button type="submit">Calculate</button>
            </form>
          </>
        ) : (
          <div>
            <h3>Calorie Estimate</h3>
            
            {goalCategory === 'maintenance' && (
              <p>Maintenance: {selectedCalories?.toFixed(0)} kcal/day</p>
            )}
            
            {goalCategory === 'loss' && (
              <>
                <p>
                  {goalRate === 'mild' && `Mild Weight Loss (0.25 kg/week): ${selectedCalories?.toFixed(0)} kcal/day`}
                  {goalRate === 'moderate' && `Weight Loss (0.5 kg/week): ${selectedCalories?.toFixed(0)} kcal/day`}
                  {goalRate === 'extreme' && `Extreme Weight Loss (1 kg/week): ${selectedCalories?.toFixed(0)} kcal/day`}
                </p>
                {duration && <p>Estimated duration to reach goal weight: {duration} weeks</p>}
              </>
            )}
            
            {goalCategory === 'gain' && (
              <>
                <p>
                  {goalRate === 'mild' && `Mild Weight Gain (0.25 kg/week): ${selectedCalories?.toFixed(0)} kcal/day`}
                  {goalRate === 'moderate' && `Weight Gain (0.5 kg/week): ${selectedCalories?.toFixed(0)} kcal/day`}
                  {goalRate === 'extreme' && `Extreme Weight Gain (1 kg/week): ${selectedCalories?.toFixed(0)} kcal/day`}
                </p>
                {duration && <p>Estimated duration to reach goal weight: {duration} weeks</p>}
              </>
            )}
            
            {caloriesTooLowWarning && <p className="warning">{caloriesTooLowWarning}</p>}
            
            <div className="button-group">
              <button onClick={handleSaveAndClose} className="primary-button">Save to My Stats</button>
              <button onClick={closeModal} className="secondary-button">Close without Saving</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;