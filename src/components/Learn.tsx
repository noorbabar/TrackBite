import "../App.css"; 

const Learn = () => {
  return (
    <div className="learn-page">
      <h1>Welcome to TrackLearn</h1>
      <p>
        Get informed and take control of your fitness journey with our educational resources. Learn how to track your calories, understand nutrition, and improve your fitness.
      </p>

      <section className="learn-section">
        <h2>How to Use TrackBite</h2>
        <p>Discover how to track your calories, set goals, and monitor your progress with TrackBite’s intuitive tools.</p>
      </section>

      <section className="learn-section">
        <h2>Understanding Macros</h2>
        <p>Explore the importance of macronutrients—proteins, fats, and carbohydrates—and how they play a role in your fitness goals.</p>
      </section>

      <section className="learn-section">
        <h2>Calorie Deficit Explained</h2>
        <p>Learn the science behind calorie deficit and how it can help you achieve sustainable weight loss.</p>
      </section>
      
      <button
        className="learn-more-button"
        onClick={() => alert('Redirecting to detailed articles...')}
      >
        Learn More
      </button>
    </div>
  );
};

export default Learn;
