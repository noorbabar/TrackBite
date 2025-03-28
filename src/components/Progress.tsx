// src/components/Progress.tsx

const Progress = () => {
  // Sample data
  const progressData = {
    totalCalories: 2500, // Example data
    weight: 75, // Example data (kg)
    weightGoal: 70, // Example goal
    dailyGoal: 2000, // Example daily calorie goal
  };

  return (
    <div>
      <h1>Your Progress</h1>
      <div>
        <h2>Calories Consumed: {progressData.totalCalories} kcal</h2>
        <h3>Daily Goal: {progressData.dailyGoal} kcal</h3>
        <h2>Current Weight: {progressData.weight} kg</h2>
        <h3>Goal Weight: {progressData.weightGoal} kg</h3>
        {/* You can add more progress tracking data here */}
      </div>

      {/* Add a simple progress bar for weight goal */}
      <div>
        <h3>Weight Progress</h3>
        <progress
          value={progressData.weight}
          max={progressData.weightGoal}
        ></progress>
      </div>
    </div>
  );
};

export default Progress;
