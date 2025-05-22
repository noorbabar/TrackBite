import { useState } from "react";
import '../Learn.css';
import React from 'react';

type Article = {
  id: number;
  title: string;
  preview: string;
  content: string;
};

type Recipe = {
  id: number;
  title: string;
  preview: string;
  image: string;
  content: string;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
};

type ItemType = "article" | "recipe";

const Learn = () => {
  const [activeTab, setActiveTab] = useState("articles");

  const articles = [
    {
      id: 1,
      title: "Understanding Calories",
      preview: "Learn what calories are and how they affect your body weight and health.",
      content: `
        <h3>What Are Calories?</h3>
        <p>A calorie is a unit of energy. In nutrition, we typically use kilocalories (kcal) to measure the energy content of food. Your body needs calories for basic functions like breathing and cell maintenance (basal metabolic rate) as well as for physical activities.</p>
        
        <h3>Calorie Balance</h3>
        <p>Weight management depends on the balance between calories consumed and calories expended:</p>
        <ul>
          <li><strong>Calorie Deficit:</strong> When you consume fewer calories than you burn, resulting in weight loss</li>
          <li><strong>Calorie Maintenance:</strong> When calories in equals calories out, maintaining current weight</li>
          <li><strong>Calorie Surplus:</strong> When you consume more calories than you burn, resulting in weight gain</li>
        </ul>
        
        <h3>How Many Calories Do You Need?</h3>
        <p>Your calorie needs depend on several factors including age, sex, weight, height, and activity level. As a starting point, you can calculate your Total Daily Energy Expenditure (TDEE):</p>
        <ol>
          <li>Calculate your Basal Metabolic Rate (BMR)</li>
          <li>Multiply by an activity factor (1.2 for sedentary, 1.375 for light activity, 1.55 for moderate activity, 1.725 for very active)</li>
        </ol>
        <p>For weight loss, create a moderate deficit of 500 calories per day to lose approximately 1 pound per week.</p>
      `
    },
    {
      id: 2,
      title: "Macronutrients Explained",
      preview: "Proteins, carbs, and fats: Learn what they do and how much you need.",
      content: `
        <h3>What Are Macronutrients?</h3>
        <p>Macronutrients are nutrients that your body needs in large amounts to function properly: proteins, carbohydrates, and fats.</p>
        
        <h3>Protein</h3>
        <p>Protein is essential for building and repairing tissues, making enzymes and hormones, and supporting immune function.</p>
        <ul>
          <li><strong>Recommended intake:</strong> 0.8-2.2g per kg of body weight, depending on activity level and goals</li>
          <li><strong>Higher needs:</strong> Athletes, people building muscle, or those losing weight</li>
          <li><strong>Sources:</strong> Meat, fish, eggs, dairy, legumes, tofu, tempeh, and plant protein powders</li>
        </ul>
        
        <h3>Carbohydrates</h3>
        <p>Carbs are your body's primary energy source, especially for high-intensity activities.</p>
        <ul>
          <li><strong>Recommended intake:</strong> 45-65% of total calories for most people</li>
          <li><strong>Focus on:</strong> Whole, unprocessed sources like fruits, vegetables, whole grains, and legumes</li>
          <li><strong>Fiber:</strong> Aim for 25-35g daily for digestive health and steady blood sugar</li>
        </ul>
        
        <h3>Fats</h3>
        <p>Dietary fats are essential for hormone production, brain health, and vitamin absorption.</p>
        <ul>
          <li><strong>Recommended intake:</strong> 20-35% of total calories</li>
          <li><strong>Prioritize:</strong> Unsaturated fats from olive oil, avocados, nuts, seeds, and fatty fish</li>
          <li><strong>Limit:</strong> Saturated and trans fats from processed foods</li>
        </ul>
      `
    },
    {
      id: 3,
      title: "Women's Hormonal Cycle and Nutrition",
      preview: "How your menstrual cycle affects nutrition needs and workout performance.",
      content: `
        <h3>Understanding Your Cycle</h3>
        <p>The menstrual cycle consists of several phases, each with different hormonal patterns that can influence your energy, hunger, cravings, and exercise performance.</p>
        
        <h3>Follicular Phase (Days 1-14)</h3>
        <p><strong>Nutrition:</strong> This is often a good time to focus on slightly lower calorie intake if weight loss is a goal. Estrogen increases insulin sensitivity, making it easier to metabolize carbs.</p>
        <p><strong>Exercise:</strong> Estrogen promotes muscle building, so this is an ideal time for strength training. Energy levels often increase after menstruation ends.</p>
        
        <h3>Ovulation (Around Day 14)</h3>
        <p><strong>Nutrition:</strong> Metabolism may slightly increase. Focus on sufficient protein intake to support muscle recovery.</p>
        <p><strong>Exercise:</strong> Many women experience peak strength and energy. Great time for high-intensity workouts.</p>
        
        <h3>Luteal Phase (Days 15-28)</h3>
        <p><strong>Nutrition:</strong> Increased progesterone can reduce insulin sensitivity and increase hunger. You may need slightly more calories (100-300 extra) and carbohydrates. Cravings for sweets and salt are common.</p>
        <p><strong>Exercise:</strong> Energy may decline. Focus on lower intensity workouts, yoga, and recovery sessions.</p>
        
        <h3>Key Nutrients Throughout Your Cycle</h3>
        <ul>
          <li><strong>Iron:</strong> Critical during menstruation to replace lost blood (aim for 18mg daily)</li>
          <li><strong>Magnesium:</strong> May help reduce PMS symptoms and cramps (310-320mg daily)</li>
          <li><strong>B vitamins:</strong> Support energy metabolism during energy fluctuations</li>
          <li><strong>Omega-3s:</strong> May help reduce inflammation and period pain</li>
        </ul>
      `
    },
    {
      id: 4,
      title: "Hydration and Performance",
      preview: "Why water intake matters and how much you really need.",
      content: `
        <h3>Importance of Hydration</h3>
        <p>Water makes up about 60% of your body and is essential for nearly every bodily function, including:</p>
        <ul>
          <li>Regulating body temperature</li>
          <li>Transporting nutrients</li>
          <li>Removing waste</li>
          <li>Lubricating joints</li>
          <li>Supporting cognitive function</li>
        </ul>
        
        <h3>How Much Water Do You Need?</h3>
        <p>The old "8 glasses a day" rule isn't personalized enough. Your needs depend on:</p>
        <ul>
          <li><strong>Body size:</strong> Larger individuals need more water</li>
          <li><strong>Activity level:</strong> Exercise increases water needs</li>
          <li><strong>Climate:</strong> Hot or humid environments increase water loss</li>
          <li><strong>Diet:</strong> High protein or salty diets require more water</li>
        </ul>
        
        <h3>Personalized Calculation</h3>
        <p>A good starting point is:</p>
        <ul>
          <li>30-35ml per kg of body weight</li>
          <li>Add 500-1000ml for each hour of exercise</li>
        </ul>
        
        <h3>Signs of Dehydration</h3>
        <p>Watch for these indicators that you need more fluids:</p>
        <ul>
          <li>Dark urine (aim for pale yellow)</li>
          <li>Thirst (already a sign of mild dehydration)</li>
          <li>Headaches</li>
          <li>Fatigue</li>
          <li>Decreased workout performance</li>
        </ul>
      `
    },
    {
      id: 5,
      title: "How to Lose Fat Effectively",
      preview: "Science-backed approaches to sustainable fat loss.",
      content: `
        <h3>The Science of Fat Loss</h3>
        <p>Fat loss occurs when you create a calorie deficit, but there are evidence-based ways to make this process more efficient and sustainable.</p>
        
        <h3>Creating a Healthy Calorie Deficit</h3>
        <ul>
          <li><strong>Moderate deficit:</strong> Aim for 500 calories below maintenance for sustainable results</li>
          <li><strong>Avoid extreme dieting:</strong> Deficits greater than 1000 calories can lead to muscle loss, metabolic slowdown, and rebound weight gain</li>
          <li><strong>Regular reassessment:</strong> Recalculate your needs every 2-4 weeks as your body adapts</li>
        </ul>
        
        <h3>Protein Priority</h3>
        <p>Higher protein intake during fat loss (1.6-2.2g per kg of body weight) helps:</p>
        <ul>
          <li>Preserve lean muscle mass</li>
          <li>Increase feelings of fullness</li>
          <li>Boost metabolic rate through the thermic effect of food</li>
        </ul>
        
        <h3>Exercise Strategy</h3>
        <p>An effective fat loss exercise program includes:</p>
        <ul>
          <li><strong>Strength training:</strong> 2-4 times weekly to maintain muscle</li>
          <li><strong>Cardiovascular exercise:</strong> Both HIIT and steady-state cardio have benefits</li>
          <li><strong>Daily movement:</strong> Increasing NEAT (non-exercise activity thermogenesis) through more steps and less sitting</li>
        </ul>
        
        <h3>Beyond Calories</h3>
        <p>Other factors that influence fat loss success:</p>
        <ul>
          <li><strong>Sleep:</strong> 7-9 hours of quality sleep reduces hunger hormones</li>
          <li><strong>Stress management:</strong> High cortisol can promote fat storage</li>
          <li><strong>Food quality:</strong> Whole foods promote satiety and provide more nutrients</li>
        </ul>
      `
    },
    {
      id: 6,
      title: "Tracking Macros Effectively",
      preview: "How to track your protein, carbs and fats without obsession.",
      content: `
        <h3>Why Track Macros?</h3>
        <p>Tracking macronutrients provides more detailed nutrition information than calories alone, helping you:</p>
        <ul>
          <li>Ensure adequate protein intake</li>
          <li>Balance carbohydrates for energy and performance</li>
          <li>Consume healthy fats in appropriate amounts</li>
          <li>Identify patterns in how foods affect your hunger and energy</li>
        </ul>
        
        <h3>Getting Started with Tracking</h3>
        <ol>
          <li><strong>Calculate your targets:</strong> Use a TDEE calculator and determine your macro splits based on your goals</li>
          <li><strong>Choose a tracking method:</strong> Apps like MyFitnessPal, Cronometer, or TrackBite make the process easier</li>
          <li><strong>Use a food scale:</strong> For accuracy in the beginning, weighing food is more reliable than estimating</li>
          <li><strong>Develop visual estimation skills:</strong> Over time, learn to eyeball portion sizes</li>
        </ol>
        
        <h3>Flexible vs. Strict Tracking</h3>
        <p>Different approaches work for different people:</p>
        <ul>
          <li><strong>Strict tracking:</strong> Logging everything precisely (useful when starting or for specific goals)</li>
          <li><strong>Flexible tracking:</strong> Focusing mainly on protein and calories, being more relaxed with carbs and fats</li>
          <li><strong>Periodic tracking:</strong> Logging for a few days each month to check in</li>
        </ul>
        
        <h3>Avoiding Obsession</h3>
        <p>Signs that tracking may be becoming unhealthy:</p>
        <ul>
          <li>Anxiety about eating foods you can't precisely measure</li>
          <li>Avoiding social situations involving food</li>
          <li>Rigid rules about what/when you can eat</li>
          <li>Distress when unable to track</li>
        </ul>
        <p>Consider taking breaks from tracking or working with a professional if these signs appear.</p>
      `
    }
  ];

  const recipes = [
    {
      id: 1,
      title: "High-Protein Greek Yogurt Bowl",
      preview: "25g protein | 320 calories | Quick breakfast",
      image: "/api/placeholder/300/200",
      macros: {
        protein: 25,
        carbs: 30,
        fat: 10,
        calories: 320
      },
      content: `
        <h3>Ingredients</h3>
        <ul>
          <li>1 cup (200g) non-fat Greek yogurt</li>
          <li>1 tablespoon honey or maple syrup</li>
          <li>1/4 cup (30g) mixed berries</li>
          <li>1 tablespoon (15g) chia seeds</li>
          <li>1 tablespoon (15g) almond butter</li>
          <li>1/4 cup (30g) low-sugar granola</li>
        </ul>
        
        <h3>Instructions</h3>
        <ol>
          <li>Add Greek yogurt to a bowl</li>
          <li>Drizzle with honey or maple syrup</li>
          <li>Top with berries, chia seeds, almond butter, and granola</li>
          <li>Optional: Add cinnamon or vanilla extract for extra flavor</li>
        </ol>
        
        <h3>Macro Modifications</h3>
        <ul>
          <li><strong>Higher protein:</strong> Add a scoop of protein powder (+20-25g protein)</li>
          <li><strong>Lower carb:</strong> Skip the granola and honey, add more berries</li>
          <li><strong>Higher calorie:</strong> Double the almond butter and granola</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "Sheet Pan Garlic Herb Chicken & Vegetables",
      preview: "35g protein | 420 calories | One-pan dinner",
      image: "/api/placeholder/300/200",
      macros: {
        protein: 35,
        carbs: 25,
        fat: 18,
        calories: 420
      },
      content: `
        <h3>Ingredients (2 servings)</h3>
        <ul>
          <li>2 (150g each) chicken breasts</li>
          <li>2 cups (200g) broccoli florets</li>
          <li>1 large (200g) sweet potato, cubed</li>
          <li>1 red bell pepper, sliced</li>
          <li>2 tablespoons olive oil</li>
          <li>2 cloves garlic, minced</li>
          <li>1 teaspoon dried herbs (rosemary, thyme, oregano)</li>
          <li>Salt and pepper to taste</li>
        </ul>
        
        <h3>Instructions</h3>
        <ol>
          <li>Preheat oven to 400°F (200°C)</li>
          <li>Toss vegetables with 1 tablespoon olive oil, half the garlic, herbs, salt and pepper</li>
          <li>Arrange on a sheet pan</li>
          <li>Rub chicken with remaining oil, garlic, herbs, salt and pepper</li>
          <li>Place chicken on the same pan</li>
          <li>Bake for 20-25 minutes until chicken reaches 165°F (74°C)</li>
        </ol>
        
        <h3>Macro Modifications</h3>
        <ul>
          <li><strong>Higher carb:</strong> Add more sweet potato or serve with 1/2 cup cooked quinoa</li>
          <li><strong>Lower carb:</strong> Replace sweet potato with cauliflower</li>
          <li><strong>Higher calorie:</strong> Increase olive oil to 4 tablespoons total</li>
        </ul>
      `
    },
    {
      id: 3,
      title: "Power Protein Smoothie",
      preview: "30g protein | 350 calories | Perfect post-workout",
      image: "/api/placeholder/300/200",
      macros: {
        protein: 30,
        carbs: 35,
        fat: 10,
        calories: 350
      },
      content: `
        <h3>Ingredients</h3>
        <ul>
          <li>1 scoop (25g) protein powder (whey, pea, or your preference)</li>
          <li>1 cup (240ml) unsweetened almond milk</li>
          <li>1/2 medium banana, frozen</li>
          <li>1/2 cup (75g) frozen berries</li>
          <li>1 tablespoon (15g) nut butter</li>
          <li>1 cup (30g) fresh spinach (won't taste it!)</li>
          <li>1/2 tablespoon (7g) ground flaxseed</li>
          <li>Ice cubes as needed</li>
        </ul>
        
        <h3>Instructions</h3>
        <ol>
          <li>Add liquid ingredients to blender first</li>
          <li>Add remaining ingredients</li>
          <li>Blend until smooth, adding ice for desired thickness</li>
        </ol>
        
        <h3>Macro Modifications</h3>
        <ul>
          <li><strong>Higher protein:</strong> Add an extra 1/2 scoop protein powder</li>
          <li><strong>Lower carb:</strong> Skip the banana, use 1/4 cup berries</li>
          <li><strong>Higher calorie:</strong> Add 1/4 avocado and an extra tablespoon of nut butter</li>
        </ul>
      `
    },
    {
      id: 4,
      title: "Mediterranean Quinoa Bowl",
      preview: "20g protein | 450 calories | Plant-based option",
      image: "/api/placeholder/300/200",
      macros: {
        protein: 20,
        carbs: 55,
        fat: 18,
        calories: 450
      },
      content: `
        <h3>Ingredients</h3>
        <ul>
          <li>3/4 cup (130g) cooked quinoa</li>
          <li>1/2 cup (120g) chickpeas, rinsed and drained</li>
          <li>1/4 cup (40g) cucumber, diced</li>
          <li>1/4 cup (40g) cherry tomatoes, halved</li>
          <li>1/4 cup (40g) bell pepper, diced</li>
          <li>2 tablespoons (30g) red onion, finely diced</li>
          <li>2 tablespoons (30g) kalamata olives, sliced</li>
          <li>2 tablespoons (30g) feta cheese (omit for vegan)</li>
          <li>1 tablespoon olive oil</li>
          <li>1 tablespoon lemon juice</li>
          <li>1/2 teaspoon dried oregano</li>
          <li>Salt and pepper to taste</li>
        </ul>
        
        <h3>Instructions</h3>
        <ol>
          <li>Combine quinoa and chickpeas in a bowl</li>
          <li>Add all vegetables and feta cheese</li>
          <li>Whisk together olive oil, lemon juice, oregano, salt and pepper</li>
          <li>Drizzle dressing over bowl and toss to combine</li>
        </ol>
        
        <h3>Macro Modifications</h3>
        <ul>
          <li><strong>Higher protein:</strong> Add 3oz (85g) grilled chicken or tofu</li>
          <li><strong>Lower carb:</strong> Reduce quinoa to 1/3 cup, add more vegetables</li>
          <li><strong>Higher calorie:</strong> Increase olive oil to 2 tablespoons, add 1/4 avocado</li>
        </ul>
      `
    }
  ];

  const [selectedItem, setSelectedItem] = useState<Article | Recipe | null>(null);
  const [itemType, setItemType] = useState<ItemType | null>(null);

  const viewItem = (item: Article | Recipe, type: ItemType) => {
    setSelectedItem(item);
    setItemType(type);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setSelectedItem(null);
    setItemType(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white py-6 shadow-sm border-b border-gray-100">
        <div style={{ textAlign: 'center', width: '100%' }} className="px-4">
        <h1 style={{ textAlign: 'center' }} className="text-3xl font-bold text-mint-dark">TrackLearn</h1>
        <p style={{ textAlign: 'center' }} className="text-gray-600">Knowledge in bite-sized pages</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {selectedItem ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <button 
              onClick={goBack} 
              className="back-button mb-6"
            >
              <span className="back-arrow">←</span>
              <span>Back to {itemType === "article" ? "Articles" : "Recipes"}</span>
            </button>
            
            <h2 className="text-3xl font-bold mb-6 text-mint-dark">{selectedItem.title}</h2>
            
            {itemType === "recipe" && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="macro-badge protein">
                    Protein: {(selectedItem as Recipe).macros.protein}g
                  </span>
                  <span className="macro-badge carbs">
                    Carbs: {(selectedItem as Recipe).macros.carbs}g
                  </span>
                  <span className="macro-badge fats">
                    Fat: {(selectedItem as Recipe).macros.fat}g
                  </span>
                  <span className="macro-badge calories">
                    Calories: {(selectedItem as Recipe).macros.calories}
                  </span>
                </div>
              </div>
            )}
            
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: selectedItem.content }}
            />
          </div>
        ) : (
          <>
            <div className="tab-container">
            <button
              className={`tab-button ${activeTab === "articles" ? "active" : ""}`}
              onClick={() => setActiveTab("articles")}
            >
              Educational Articles
            </button>

            <button
              className={`tab-button ${activeTab === "recipes" ? "active" : ""}`}
              onClick={() => setActiveTab("recipes")}
            >
              Macro-Friendly Recipes
            </button>
            </div>

            {activeTab === "articles" && (
              <div className="article-container">
                {articles.map((article, index) => (
                  <article 
                    key={article.id} 
                    className={`article-cube ${index === 0 ? 'featured-cube' : ''}`}
                    onClick={() => viewItem(article, "article")}
                  >
                    <div className="cube-header">
                      <h2>{article.title}</h2>
                    </div>
                    <div className="cube-content">
                      <p>{article.preview}</p>
                    </div>
                    <div className="cube-footer">
                      <span className="cube-category">Education</span>
                      <a href="#" className="cube-button" onClick={(e) => {
                        e.preventDefault();
                        viewItem(article, "article");
                      }}>Read</a>
                    </div>
                    <div className="page-corner"></div>
                    <div className="page-number">{article.id}</div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "recipes" && (
              <div className="article-container">
                {recipes.map((recipe) => (
                  <article 
                    key={recipe.id} 
                    className="article-cube"
                    onClick={() => viewItem(recipe, "recipe")}
                  >
                    <div className="cube-header">
                    <h2>{recipe.title}</h2>
                    </div>
                    <div className="cube-content">
                      <div className="flex gap-1 mb-2">
                        <span> P:{recipe.macros.protein}g </span>
                        <span> C:{recipe.macros.carbs}g </span>
                        <span> F:{recipe.macros.fat}g </span>
                      </div>
                      <p>{recipe.preview}</p>
                    </div>
                    <div className="cube-footer">
                      <span className="cube-category">Recipe</span>
                      <a href="#" className="cube-button" onClick={(e) => {
                        e.preventDefault();
                        viewItem(recipe, "recipe");
                      }}>View</a>
                    </div>
                    <div className="page-corner"></div>
                    <div className="page-number">{recipe.id}</div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Learn;