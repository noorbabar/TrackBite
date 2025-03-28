// src/pages/Dashboard.tsx

const Dashboard = () => {
  // Soo this is sample data - will leave it like this for now
  const dailySummary = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 70,
  };

  return (
    <div>
      <h2>Today's Summary</h2>
      <div>
        <p><strong>Calories:</strong> {dailySummary.calories} kcal</p>
        <p><strong>Protein:</strong> {dailySummary.protein} g</p>
        <p><strong>Carbs:</strong> {dailySummary.carbs} g</p>
        <p><strong>Fats:</strong> {dailySummary.fats} g</p>
      </div>
    </div>
  );
};

export default Dashboard;
