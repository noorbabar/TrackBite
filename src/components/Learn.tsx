import { useState } from "react";
import '../Learn.css';

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

  // Recipe data
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

  // Selected article/recipe state
  const [selectedItem, setSelectedItem] = useState<Article | Recipe | null>(null);
  const [itemType, setItemType] = useState<ItemType | null>(null);


  // Select an item to view
  const viewItem = (item: Article | Recipe, type: ItemType) => {
    setSelectedItem(item);
    setItemType(type);
    window.scrollTo(0, 0);
  };

  // Go back to list view
  const goBack = () => {
    setSelectedItem(null);
    setItemType(null);
  };

  return (
    <div className="learn-page bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-mint-gradient-from to-mint-gradient-to text-white py-12">
        <div className="container mx-auto px-4">
          
          <h1 className="text-4xl font-bold mb-4">TrackLearn: Knowledge is Power</h1>
          <p className="text-xl">
            Get informed and take control of your fitness journey with our educational resources. 
            Learn how to track your nutrition, understand your body, and achieve your goals.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* If an item is selected, show its detailed view */}
        {selectedItem ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <button 
              onClick={goBack} 
              className="mb-4 flex items-center text-mint-dark hover:text-mint-primary"
            >
              ← Back to {itemType === "article" ? "Articles" : "Recipes"}
            </button>
            
            <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>
            
            {selectedItem && itemType === "recipe" && (
  <div className="mb-6">
    <img 
      src={(selectedItem as Recipe).image} 
      alt={selectedItem.title}
      className="w-full h-64 object-cover rounded-lg mb-4"
    />
    <div className="flex flex-wrap gap-3 mb-4">
      <span className="bg-blue-100 text-mint-dark px-3 py-1 rounded-full text-sm font-medium">
        Protein: {(selectedItem as Recipe).macros.protein}g
      </span>
      <span className="bg-green-100 text-mint-dark px-3 py-1 rounded-full text-sm font-medium">
        Carbs: {(selectedItem as Recipe).macros.carbs}g
      </span>
      <span className="bg-yellow-100 text-mint-dark px-3 py-1 rounded-full text-sm font-medium">
        Fat: {(selectedItem as Recipe).macros.fat}g
      </span>
      <span className="bg-purple-100 text-mint-accent px-3 py-1 rounded-full text-sm font-medium">
        Calories: {(selectedItem as Recipe).macros.calories}
      </span>
    </div>
  </div>
)}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedItem.content }}
            />
          </div>
        ) : (
          <>
            {/* Tab navigation */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "articles" ? "border-b-2 border-mint-primary text-mint-primary" : "text-gray-600"}`}
                onClick={() => setActiveTab("articles")}
              >
                Educational Articles
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "recipes" ? "border-b-2 border-mint-primary text-mint-primary" : "text-gray-600"}`}
                onClick={() => setActiveTab("recipes")}
              >
                Macro-Friendly Recipes
              </button>
            </div>

            {/* Articles tab */}
            {activeTab === "articles" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <div 
                    key={article.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => viewItem(article, "article")}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-mint-dark">{article.title}</h3>
                      <p className="text-gray-600">{article.preview}</p>
                      <button className="mt-4 text-mint-primary font-medium hover:text-mint-accent">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recipes tab */}
            {activeTab === "recipes" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                  <div 
                    key={recipe.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => viewItem(recipe, "recipe")}
                  >
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-mint-dark">{recipe.title}</h3>
                      <p className="text-gray-600 mb-3">{recipe.preview}</p>
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        <span className="bg-blue-100 text-mint-dark px-2 py-1 rounded-full text-xs font-medium">
                          P: {recipe.macros.protein}g
                        </span>
                        <span className="bg-green-100 text-mint-dark px-2 py-1 rounded-full text-xs font-medium">
                          C: {recipe.macros.carbs}g
                        </span>
                        <span className="bg-yellow-100 text-mint-dark px-2 py-1 rounded-full text-xs font-medium">
                          F: {recipe.macros.fat}g
                        </span>
                      </div>
                      <button className="text-mint-primary font-medium hover:text-mint-accent">
                        View Recipe →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-mint-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">TrackBite</h3>
              <p className="text-mint-light">Your companion for nutrition tracking and education</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Quick Links</h4>
              <ul>
                <li className="mb-1"><a href="#" className="text-mint-light hover:text-white">Dashboard</a></li>
                <li className="mb-1"><a href="#" className="text-mint-light hover:text-white">Tracking</a></li>
                <li className="mb-1"><a href="#" className="text-mint-light hover:text-white">Settings</a></li>
                <li className="mb-1"><a href="#" className="text-mint-light hover:text-white">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-mint-light/30 text-center text-mint-light">
            <p>&copy; 2025 TrackBite. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;