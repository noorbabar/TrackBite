import { useState } from 'react';
import '../Learn.css';

interface Article {
  id: number;
  title: string;
  preview: string;
  content: string;
  category: string;
}

const Learn = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "Understanding Macros",
      preview: "Learn what protein, carbs, and fats do for your body and why they matter.",
      category: "Nutrition",
      content: `
        <h2>Understanding Macros</h2>
        <h3>What Are Macronutrients?</h3>
        <p>Macronutrients are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fats.</p>
        
        <h3>Protein</h3>
        <p>Protein is essential for building and repairing muscle tissue. Aim for 1.6-2.2g per kg of body weight if you're active.</p>
        <ul>
          <li>Builds and repairs muscle</li>
          <li>Keeps you full longer</li>
          <li>Sources: chicken, fish, eggs, tofu, beans</li>
        </ul>
        
        <h3>Carbohydrates</h3>
        <p>Carbs are your body's main energy source, especially for workouts.</p>
        <ul>
          <li>Fuel for your brain and muscles</li>
          <li>Choose whole grains, fruits, vegetables</li>
          <li>Fiber helps with digestion and fullness</li>
        </ul>
        
        <h3>Fats</h3>
        <p>Fats support hormone production and help absorb vitamins.</p>
        <ul>
          <li>Essential for hormone health</li>
          <li>Focus on healthy fats: avocados, nuts, olive oil</li>
          <li>Limit saturated and trans fats</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "How to Hit Your Protein Goals",
      preview: "Practical tips for getting enough protein throughout the day.",
      category: "Nutrition",
      content: `
        <h2>How to Hit Your Protein Goals</h2>
        <p>Getting enough protein can feel challenging, but with the right strategies, it's manageable.</p>
        
        <h3>Calculate Your Needs</h3>
        <p>Multiply your body weight (kg) by 1.6-2.2 to find your protein target in grams.</p>
        
        <h3>Spread It Out</h3>
        <p>Aim for 20-40g of protein per meal rather than loading it all into one meal.</p>
        
        <h3>Easy Protein Sources</h3>
        <ul>
          <li>Greek yogurt: 15-20g per cup</li>
          <li>Chicken breast: 30g per 100g</li>
          <li>Eggs: 6g per egg</li>
          <li>Protein powder: 20-25g per scoop</li>
          <li>Tofu: 15g per 150g</li>
        </ul>
        
        <h3>Quick Tips</h3>
        <ul>
          <li>Add protein powder to smoothies</li>
          <li>Snack on Greek yogurt or cottage cheese</li>
          <li>Include protein with every meal</li>
          <li>Prep chicken or tofu in batches</li>
        </ul>
      `
    },
    {
      id: 3,
      title: "Why Weight Isn't Everything",
      preview: "Track measurements, photos, and strength - not just the scale.",
      category: "Progress",
      content: `
        <h2>Why Weight Isn't Everything</h2>
        <p>The scale only tells part of the story. Here's what else to track:</p>
        
        <h3>Body Measurements</h3>
        <p>Track waist, hips, chest, arms, and thighs monthly. You might be losing inches even if the scale doesn't budge.</p>
        
        <h3>Progress Photos</h3>
        <p>Take photos every 2-4 weeks in the same lighting and clothing. Visual changes often appear before scale changes.</p>
        
        <h3>Strength Gains</h3>
        <p>Are you lifting heavier? Doing more reps? This shows you're building muscle, which weighs more than fat.</p>
        
        <h3>How You Feel</h3>
        <ul>
          <li>Better energy levels?</li>
          <li>Clothes fitting differently?</li>
          <li>Sleeping better?</li>
          <li>More confidence?</li>
        </ul>
        
        <p><strong>Remember:</strong> Body recomposition (losing fat while gaining muscle) might not show on the scale, but it's still amazing progress!</p>
      `
    },
    {
      id: 4,
      title: "Cycle-Synced Training Basics",
      preview: "How your menstrual cycle affects energy and training (optional).",
      category: "Training",
      content: `
        <h2>Cycle-Synced Training Basics</h2>
        <p>Understanding your cycle can help you optimize training and nutrition.</p>
        
        <h3>Follicular Phase (Days 1-14)</h3>
        <p>Rising estrogen = higher energy and better muscle building.</p>
        <ul>
          <li>Great time for heavy lifting and PRs</li>
          <li>Recovery is typically faster</li>
          <li>You may feel stronger and more motivated</li>
        </ul>
        
        <h3>Luteal Phase (Days 15-28)</h3>
        <p>Rising progesterone = slightly lower energy, higher appetite.</p>
        <ul>
          <li>Focus on maintenance and moderate intensity</li>
          <li>You may need 100-300 extra calories</li>
          <li>Cravings are normal - plan for them</li>
          <li>Prioritize rest and recovery</li>
        </ul>
        
        <h3>During Your Period</h3>
        <ul>
          <li>Listen to your body</li>
          <li>Lighter workouts or rest if needed</li>
          <li>Focus on iron-rich foods</li>
          <li>Gentle movement can help with cramps</li>
        </ul>
        
        <p><strong>Note:</strong> Everyone's cycle is different. Track your own patterns to find what works for you.</p>
      `
    }
  ];

  if (selectedArticle) {
    return (
      <div className="learn-page">
        <button className="back-button" onClick={() => setSelectedArticle(null)}>
          ← Back to Articles
        </button>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
      </div>
    );
  }

  return (
    <div className="learn-page">
      <h1>Learn</h1>
      <p>Build your fitness and nutrition knowledge</p>

      <div className="article-container">
        {articles.map(article => (
          <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
            <h3>{article.title}</h3>
            <p>{article.preview}</p>
            <span className="category">{article.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;