import  { useState, FormEvent } from 'react';

const ProfileSetup = ({ closeModal }: { closeModal: () => void }) => {

    const [weight, setWeight] = useState<number | ''>('');
  const [goalWeight, setGoalWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active'>('Sedentary');
  const [goal, setGoal] = useState<'maintenance' | 'loss' | 'gain'>('maintenance');
  const [cutType, setCutType] = useState<'moderate' | 'aggressive'>('moderate');
  const [calories, setCalories] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [waterRecommendation, setWaterRecommendation] = useState<string>('');
  const [sleepRecommendation, setSleepRecommendation] = useState<string>('');
  const [caloriesTooLowWarning, setCaloriesTooLowWarning] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const calculateCalories = () => {
    if (weight === '' || goalWeight === '' || height === '' || age === '') return;

    const weightInKg = weight;
    const heightInCm = height;
    const ageInYears = age;
    const goalWeightKg = goalWeight;

    let bmr = gender === 'male'
      ? 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5
      : 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;

    const activityMultipliers: Record<'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active', number> = {
      Sedentary: 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725,
    };

    const tdee = bmr * activityMultipliers[activityLevel];
    let adjustedCalories = tdee;
    let weeks = null;

    // Calorie adjustment for weight loss or gain
    if (goal === 'loss') {
      const totalLoss = weightInKg - goalWeightKg;
      const deficitPerWeek = cutType === 'aggressive' ? 1000 * 7 : 500 * 7;
      weeks = Math.ceil((totalLoss * 7700) / deficitPerWeek);
      adjustedCalories -= cutType === 'aggressive' ? 1000 : 500;
    } else if (goal === 'gain') {
      adjustedCalories += 500;
    }

    // Check if calories are too low
    if (adjustedCalories < (gender === 'male' ? 1500 : 1200)) {
      setCaloriesTooLowWarning('Warning: The suggested calorie intake is too low. Please consult a healthcare provider for a safe approach.');
    } else {
      setCaloriesTooLowWarning('');
    }

    // Calculate water and sleep recommendations
    const waterAmount = Math.min(3.5, weightInKg * 0.033); 
    setWaterRecommendation(`For optimal hydration, aim for a minimum of ${waterAmount.toFixed(1)}L of water per day.`);
    setSleepRecommendation('Aim for 8+ hours of sleep for optimal recovery and health.');

    setCalories(adjustedCalories);
    setDuration(weeks);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculateCalories();
    setIsFormSubmitted(true);
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

              <div className="form-group row">
                <label>Gender:</label>
                <div>
                  <label><input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male</label>
                  <label><input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female</label>
                </div>
              </div>

              <div className="form-group">
                <label>Activity Level:</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active')}>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              </div>

              <div className="form-group">
                <label>Goal:</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value as 'maintenance' | 'loss' | 'gain')}>
                  <option value="maintenance">Maintain Weight</option>
                  <option value="loss">Weight Loss</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>

              {goal === 'loss' && (
                <div className="form-group row">
                  <label>Cut Type:</label>
                  <div>
                    <label><input type="radio" value="aggressive" checked={cutType === 'aggressive'} onChange={() => setCutType('aggressive')} /> Aggressive</label>
                    <label><input type="radio" value="moderate" checked={cutType === 'moderate'} onChange={() => setCutType('moderate')} /> Moderate</label>
                  </div>
                </div>
              )}

              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <div>
            <h3>Profile Setup Complete</h3>
            <p>Your daily calorie requirement is: {calories} kcal</p>
            {caloriesTooLowWarning && <p className="warning">{caloriesTooLowWarning}</p>}
            {goal === 'loss' && duration && <p>Estimated duration to reach goal weight: {duration} weeks</p>}
            <p>{waterRecommendation}</p>
            <p>{sleepRecommendation}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
