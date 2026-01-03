import { useState } from 'react';

interface Article {
  id: number;
  title: string;
  preview: string;
  content: string;
}

const Learn = () => {
  const [selected, setSelected] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "What Are Macros?",
      preview: "Understanding protein, carbs, and fats",
      content: `Macronutrients are the three main nutrients your body needs: protein, carbohydrates, and fats.

Protein builds and repairs muscle tissue. Aim for 1.6-2.2g per kg of body weight if active. Sources: chicken, fish, eggs, tofu, beans.

Carbohydrates are your body's main energy source, especially for workouts. Choose whole grains, fruits, and vegetables for fiber and nutrients.

Fats support hormone production and help absorb vitamins. Focus on healthy fats: avocados, nuts, olive oil. Limit saturated and trans fats.`
    },
    {
      id: 2,
      title: "How to Hit Your Protein Goals",
      preview: "Practical tips for getting enough protein",
      content: `Getting enough protein can feel challenging, but it's manageable with the right strategies.

Calculate Your Needs: Multiply your body weight (kg) by 1.6-2.2 to find your protein target in grams.

Spread It Out: Aim for 20-40g of protein per meal rather than loading it all into one meal.

Easy Protein Sources:
- Greek yogurt: 15-20g per cup
- Chicken breast: 30g per 100g
- Eggs: 6g per egg
- Protein powder: 20-25g per scoop
- Tofu: 15g per 150g

Quick Tips:
- Add protein powder to smoothies
- Snack on Greek yogurt or cottage cheese
- Include protein with every meal
- Prep chicken or tofu in batches`
    },
    {
      id: 3,
      title: "Why Weight Isn't Everything",
      preview: "Track measurements, photos, and strength too",
      content: `The scale only tells part of the story. Here's what else to track:

Body Measurements: Track waist, hips, chest, arms, and thighs monthly. You might be losing inches even if the scale doesn't budge.

Progress Photos: Take photos every 2-4 weeks in the same lighting and clothing. Visual changes often appear before scale changes.

Strength Gains: Are you lifting heavier? Doing more reps? This shows you're building muscle, which weighs more than fat.

How You Feel:
- Better energy levels?
- Clothes fitting differently?
- Sleeping better?
- More confidence?

Remember: Body recomposition (losing fat while gaining muscle) might not show on the scale, but it's still amazing progress!`
    },
    {
      id: 4,
      title: "Cycle-Synced Training Basics",
      preview: "How your cycle affects training and nutrition",
      content: `Understanding your cycle can help you optimise training and nutrition.

Follicular Phase (Days 1-14): Rising estrogen = higher energy and better muscle building. Great time for heavy lifting and PRs. Recovery is typically faster.

Luteal Phase (Days 15-28): Rising progesterone = slightly lower energy, higher appetite. Focus on maintenance and moderate intensity. You may need 100-300 extra calories. Cravings are normal - plan for them.

During Your Period:
- Listen to your body
- Lighter workouts or rest if needed
- Focus on iron-rich foods
- Gentle movement can help with cramps

Note: Everyone's cycle is different. Track your own patterns to find what works for you.`
    }
  ];

  if (selected) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button 
          className="btn-secondary" 
          onClick={() => setSelected(null)}
          style={{ marginBottom: '1rem', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
        >
          ← Back
        </button>
        
        <div className="card">
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{selected.title}</h1>
          <div style={{ fontSize: '0.875rem', lineHeight: '1.8', color: '#2d3436', whiteSpace: 'pre-line' }}>
            {selected.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Learn</h1>
      <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
        Build your fitness and nutrition knowledge
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {articles.map(article => (
          <div 
            key={article.id}
            className="card"
            onClick={() => setSelected(article)}
            style={{ cursor: 'pointer' }}
          >
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{article.title}</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5', marginBottom: '0.75rem' }}>
              {article.preview}
            </p>
            <div style={{ fontSize: '0.8125rem', color: '#81c784', fontWeight: '500' }}>
              Read →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;