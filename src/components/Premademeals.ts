export const preMadeMeals = [
  {
    id: 'overnight-oats',
    name: 'Protein Overnight Oats',
    health: ['none'],
    macros: { protein: 40, carbs: 42, fat: 12, fiber: 9, sugar: 12, cals: 400 },
    ingredients: [
      { id: 'protein-oats', amount: 50 },
      { id: 'protein-powder', amount: 40 },
      { id: 'milk-skim', amount: 200 },
      { id: 'banana', amount: 50 },
      { id: 'pb-powder', amount: 12 },
      { id: 'berries-mixed', amount: 30 }
    ],
    recipe: {
      title: 'Protein Overnight Oats',
      servings: 1,
      prepTime: '2 min',
      cookTime: '0 min (overnight)',
      difficulty: 'Easy',
      steps: [
        'Mix 50g protein oats with 40g protein powder in jar',
        'Add 200ml skim milk, stir well',
        'Cover and refrigerate overnight',
        'Top with 50g banana, 30g berries, 12g PB2 powder',
        'Stir and enjoy'
      ],
      tips: ['Make 3-4 jars for meal prep', 'Add cinnamon for flavor']
    },
    benefits: ['Meal prep friendly', 'High fiber', 'Portable'],
    prepTime: '2 min + overnight',
    tags: ['Breakfast', 'Meal prep']
  },

  {
    id: 'egg-scramble',
    name: 'High Protein Egg Scramble',
    health: ['none'],
    macros: { protein: 38, carbs: 28, fat: 14, fiber: 6, sugar: 6, cals: 380 },
    ingredients: [
      { id: 'eggs', amount: 150 },
      { id: 'egg-whites', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'tomato', amount: 100 },
      { id: 'mushrooms', amount: 50 },
      { id: 'bread-whole', amount: 44 },
      { id: 'avocado', amount: 30 }
    ],
    recipe: {
      title: 'High Protein Egg Scramble',
      servings: 1,
      prepTime: '5 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Whisk 3 eggs + 100ml egg whites',
        'Sauté mushrooms until golden (3 min)',
        'Add spinach and tomato, cook 2 min',
        'Pour eggs, scramble gently',
        'Toast bread, spread avocado'
      ],
      tips: ['Don\'t overcook eggs', 'Season with pepper']
    },
    benefits: ['Vitamin-rich', 'Filling', 'Quick'],
    prepTime: '15 min',
    tags: ['Breakfast', 'Quick']
  },

  {
    id: 'greek-bowl',
    name: 'Greek Yogurt Power Bowl',
    health: ['none'],
    macros: { protein: 36, carbs: 38, fat: 8, fiber: 7, sugar: 24, cals: 360 },
    ingredients: [
      { id: 'greek-yogurt', amount: 200 },
      { id: 'berries-mixed', amount: 80 },
      { id: 'oats-regular', amount: 40 },
      { id: 'almonds', amount: 14 },
      { id: 'pb-powder', amount: 12 }
    ],
    recipe: {
      title: 'Greek Yogurt Power Bowl',
      servings: 1,
      prepTime: '3 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Add 200g Greek yogurt to bowl',
        'Top with 80g berries and 40g oats',
        'Sprinkle 14g almonds',
        'Add 12g PB2 powder',
        'Mix and enjoy'
      ],
      tips: ['Use frozen berries for thickness']
    },
    benefits: ['Probiotics', 'Quick', 'No cooking'],
    prepTime: '3 min',
    tags: ['Breakfast', 'Quick']
  },

  {
    id: 'protein-pancakes',
    name: 'Banana Protein Pancakes',
    health: ['none'],
    macros: { protein: 42, carbs: 40, fat: 10, fiber: 5, sugar: 16, cals: 420 },
    ingredients: [
      { id: 'protein-powder', amount: 40 },
      { id: 'eggs', amount: 100 },
      { id: 'banana', amount: 118 },
      { id: 'oats-regular', amount: 40 },
      { id: 'berries-mixed', amount: 50 },
      { id: 'greek-yogurt', amount: 30 }
    ],
    recipe: {
      title: 'Banana Protein Pancakes',
      servings: 1,
      prepTime: '10 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Blend oats into flour',
        'Add banana, eggs, protein powder - blend smooth',
        'Heat non-stick pan',
        'Pour small circles, cook until bubbles form',
        'Flip, cook 2 min',
        'Top with berries and yogurt'
      ],
      tips: ['Let batter rest 2 min', 'Don\'t flip too early']
    },
    benefits: ['Sweet breakfast', 'Whole foods', 'Satisfying'],
    prepTime: '20 min',
    tags: ['Breakfast', 'Weekend']
  },

  {
    id: 'breakfast-wrap',
    name: 'Power Breakfast Wrap',
    health: ['none'],
    macros: { protein: 44, carbs: 34, fat: 16, fiber: 6, sugar: 4, cals: 440 },
    ingredients: [
      { id: 'eggs', amount: 100 },
      { id: 'egg-whites', amount: 100 },
      { id: 'chicken-halal', amount: 60 },
      { id: 'wrap-large', amount: 62 },
      { id: 'avocado', amount: 30 },
      { id: 'spinach', amount: 30 },
      { id: 'cheese-light', amount: 20 }
    ],
    recipe: {
      title: 'Power Breakfast Wrap',
      servings: 1,
      prepTime: '5 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Grill 60g Al Amin chicken, slice',
        'Scramble 2 eggs + 100ml egg whites',
        'Warm wrap',
        'Layer spinach, eggs, chicken, avocado, cheese',
        'Roll tightly'
      ],
      tips: ['Prep chicken night before', 'Toast for crispy']
    },
    benefits: ['Portable', 'Complete meal', 'Halal'],
    prepTime: '15 min',
    tags: ['Breakfast', 'Halal', 'Portable']
  },

  {
    id: 'avocado-toast',
    name: 'High Protein Avo Toast',
    health: ['none'],
    macros: { protein: 46, carbs: 30, fat: 20, fiber: 12, sugar: 4, cals: 460 },
    ingredients: [
      { id: 'bread-protein', amount: 100 },
      { id: 'avocado', amount: 100 },
      { id: 'eggs', amount: 100 },
      { id: 'egg-whites', amount: 50 },
      { id: 'feta', amount: 20 },
      { id: 'tomato', amount: 50 }
    ],
    recipe: {
      title: 'High Protein Avo Toast',
      servings: 1,
      prepTime: '5 min',
      cookTime: '5 min',
      difficulty: 'Easy',
      steps: [
        'Toast protein bread',
        'Poach 2 eggs',
        'Mash 100g avocado with lemon',
        'Spread avocado on toast',
        'Add tomato slices',
        'Top with poached eggs and feta'
      ],
      tips: ['Add vinegar to poaching water']
    },
    benefits: ['Healthy fats', 'Trendy', 'Filling'],
    prepTime: '10 min',
    tags: ['Breakfast', 'Vegetarian']
  },

  {
    id: 'smoothie-bowl',
    name: 'Protein Smoothie Bowl',
    health: ['none'],
    macros: { protein: 40, carbs: 46, fat: 8, fiber: 8, sugar: 28, cals: 400 },
    ingredients: [
      { id: 'protein-powder', amount: 40 },
      { id: 'banana', amount: 118 },
      { id: 'berries-mixed', amount: 100 },
      { id: 'greek-yogurt', amount: 85 },
      { id: 'oats-regular', amount: 30 },
      { id: 'pb-powder', amount: 12 },
      { id: 'milk-skim', amount: 100 }
    ],
    recipe: {
      title: 'Protein Smoothie Bowl',
      servings: 1,
      prepTime: '5 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Blend protein powder, half banana, berries, yogurt, milk',
        'Pour into bowl',
        'Top with oats, banana slices, PB2 powder'
      ],
      tips: ['Use frozen berries for thick texture']
    },
    benefits: ['Refreshing', 'Instagram-worthy', 'Quick'],
    prepTime: '5 min',
    tags: ['Breakfast', 'Smoothie']
  },

  {
    id: 'cottage-bowl',
    name: 'Cottage Cheese Bowl',
    health: ['none'],
    macros: { protein: 36, carbs: 42, fat: 10, fiber: 6, sugar: 20, cals: 380 },
    ingredients: [
      { id: 'cottage-cheese', amount: 250 },
      { id: 'banana', amount: 100 },
      { id: 'berries-mixed', amount: 50 },
      { id: 'oats-regular', amount: 40 },
      { id: 'almonds', amount: 14 }
    ],
    recipe: {
      title: 'Cottage Cheese Bowl',
      servings: 1,
      prepTime: '2 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Add cottage cheese to bowl',
        'Top with banana, berries, oats, almonds',
        'Mix and enjoy'
      ],
      tips: ['Use cold cottage cheese']
    },
    benefits: ['High protein', 'Low fat', 'Quick'],
    prepTime: '2 min',
    tags: ['Breakfast', 'Quick']
  },

  {
    id: 'breakfast-burrito',
    name: 'Protein Breakfast Burrito',
    health: ['none'],
    macros: { protein: 42, carbs: 38, fat: 16, fiber: 10, sugar: 3, cals: 440 },
    ingredients: [
      { id: 'eggs', amount: 100 },
      { id: 'egg-whites', amount: 100 },
      { id: 'beans-black', amount: 100 },
      { id: 'wrap-large', amount: 62 },
      { id: 'cheese-light', amount: 20 },
      { id: 'salsa', amount: 50 },
      { id: 'avocado', amount: 30 }
    ],
    recipe: {
      title: 'Protein Breakfast Burrito',
      servings: 1,
      prepTime: '5 min',
      cookTime: '7 min',
      difficulty: 'Easy',
      steps: [
        'Warm black beans',
        'Scramble 2 eggs + 100ml egg whites',
        'Warm wrap',
        'Add beans, eggs, cheese, salsa, avocado',
        'Roll tightly'
      ],
      tips: ['Can freeze for meal prep']
    },
    benefits: ['Fiber-rich', 'Portable', 'Mexican-inspired'],
    prepTime: '12 min',
    tags: ['Breakfast', 'Mexican']
  },

  {
    id: 'omelette-supreme',
    name: 'Veggie Supreme Omelette',
    health: ['none'],
    macros: { protein: 36, carbs: 26, fat: 18, fiber: 8, sugar: 6, cals: 380 },
    ingredients: [
      { id: 'eggs', amount: 150 },
      { id: 'egg-whites', amount: 50 },
      { id: 'capsicum', amount: 50 },
      { id: 'mushrooms', amount: 50 },
      { id: 'spinach', amount: 30 },
      { id: 'feta', amount: 30 },
      { id: 'bread-whole', amount: 44 }
    ],
    recipe: {
      title: 'Veggie Supreme Omelette',
      servings: 1,
      prepTime: '5 min',
      cookTime: '10 min',
      difficulty: 'Medium',
      steps: [
        'Sauté capsicum and mushrooms',
        'Add spinach, wilt',
        'Beat eggs + egg whites, pour into pan',
        'Add vegetables and feta',
        'Fold omelette',
        'Serve with toast'
      ],
      tips: ['Don\'t overfill', 'Lower heat if browning']
    },
    benefits: ['Vegetable-rich', 'Mediterranean', 'Filling'],
    prepTime: '15 min',
    tags: ['Breakfast', 'Vegetarian']
  },

  {
    id: 'french-toast',
    name: 'Protein French Toast',
    health: ['none'],
    macros: { protein: 36, carbs: 42, fat: 14, fiber: 8, sugar: 20, cals: 420 },
    ingredients: [
      { id: 'bread-protein', amount: 100 },
      { id: 'eggs', amount: 100 },
      { id: 'protein-powder', amount: 15 },
      { id: 'berries-mixed', amount: 100 },
      { id: 'greek-yogurt', amount: 50 }
    ],
    recipe: {
      title: 'Protein French Toast',
      servings: 1,
      prepTime: '5 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Mix eggs and protein powder',
        'Dip bread in mixture',
        'Cook in non-stick pan until golden',
        'Top with berries and yogurt'
      ],
      tips: ['Use day-old bread']
    },
    benefits: ['Sweet breakfast', 'High protein', 'Weekend treat'],
    prepTime: '15 min',
    tags: ['Breakfast', 'Sweet']
  },

  {
    id: 'breakfast-hash',
    name: 'Sweet Potato Hash',
    health: ['diabetes'],
    macros: { protein: 38, carbs: 44, fat: 14, fiber: 8, sugar: 10, cals: 440 },
    ingredients: [
      { id: 'sweet-potato', amount: 200 },
      { id: 'eggs', amount: 100 },
      { id: 'egg-whites', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'mushrooms', amount: 50 },
      { id: 'olive-oil', amount: 7 }
    ],
    recipe: {
      title: 'Sweet Potato Hash',
      servings: 1,
      prepTime: '10 min',
      cookTime: '20 min',
      difficulty: 'Easy',
      steps: [
        'Dice sweet potato, roast 20 min',
        'Sauté mushrooms and spinach',
        'Scramble eggs',
        'Combine all',
        'Drizzle olive oil'
      ],
      tips: ['Prep sweet potato night before']
    },
    benefits: ['Low GI', 'Diabetes-friendly', 'Vitamin A'],
    prepTime: '30 min',
    tags: ['Breakfast', 'Diabetes-friendly']
  },

  {
    id: 'chicken-rice-bowl',
    name: 'Chicken & Rice Bowl',
    health: ['none'],
    macros: { protein: 48, carbs: 52, fat: 12, fiber: 4, sugar: 3, cals: 500 },
    ingredients: [
      { id: 'chicken-halal', amount: 150 },
      { id: 'rice-white', amount: 200 },
      { id: 'broccoli', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'olive-oil', amount: 7 },
      { id: 'garlic', amount: 3 }
    ],
    recipe: {
      title: 'Chicken & Rice Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '20 min',
      difficulty: 'Easy',
      steps: [
        'Cook white rice',
        'Grill Al Amin halal chicken',
        'Steam broccoli and carrots',
        'Slice chicken',
        'Build bowl with rice, chicken, vegetables',
        'Drizzle olive oil, season with garlic'
      ],
      tips: ['Meal prep 4 servings on Sunday']
    },
    benefits: ['Simple', 'Halal', 'Meal prep friendly'],
    prepTime: '30 min',
    tags: ['Lunch', 'Dinner', 'Halal']
  },

  {
    id: 'sweet-potato-boat',
    name: 'Loaded Sweet Potato Boat',
    health: ['diabetes'],
    macros: { protein: 42, carbs: 46, fat: 12, fiber: 8, sugar: 8, cals: 460 },
    ingredients: [
      { id: 'chicken-halal', amount: 120 },
      { id: 'sweet-potato', amount: 200 },
      { id: 'broccoli', amount: 100 },
      { id: 'cheese-light', amount: 20 },
      { id: 'greek-yogurt', amount: 50 }
    ],
    recipe: {
      title: 'Loaded Sweet Potato Boat',
      servings: 1,
      prepTime: '5 min',
      cookTime: '45 min',
      difficulty: 'Easy',
      steps: [
        'Bake sweet potato 200°C for 45 min',
        'Grill chicken',
        'Steam broccoli',
        'Slice potato, scoop indent',
        'Fill with chicken and broccoli',
        'Top with cheese and yogurt',
        'Bake 5 min'
      ],
      tips: ['Bake potatoes in bulk']
    },
    benefits: ['Low GI', 'High fiber', 'Diabetes-friendly'],
    prepTime: '50 min',
    tags: ['Dinner', 'Diabetes-friendly', 'Halal']
  },

  {
    id: 'stir-fry',
    name: 'High Protein Stir Fry',
    health: ['high-bp', 'cholesterol'],
    macros: { protein: 44, carbs: 50, fat: 10, fiber: 6, sugar: 8, cals: 460 },
    ingredients: [
      { id: 'chicken-halal', amount: 130 },
      { id: 'rice-white', amount: 150 },
      { id: 'broccoli', amount: 100 },
      { id: 'capsicum', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'garlic', amount: 6 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'olive-oil', amount: 7 }
    ],
    recipe: {
      title: 'High Protein Stir Fry',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook rice',
        'Heat oil in wok',
        'Sauté garlic',
        'Add chicken, cook until golden',
        'Add all vegetables, stir-fry 5 min',
        'Add soy sauce',
        'Serve over rice'
      ],
      tips: ['Use reduced-sodium soy sauce']
    },
    benefits: ['Heart healthy', 'Low saturated fat', 'Quick'],
    prepTime: '25 min',
    tags: ['Dinner', 'Heart-healthy', 'Asian', 'Halal']
  },

  {
    id: 'salmon-bowl',
    name: 'Omega-3 Salmon Bowl',
    health: ['cholesterol', 'high-bp'],
    macros: { protein: 34, carbs: 42, fat: 18, fiber: 7, sugar: 6, cals: 460 },
    ingredients: [
      { id: 'salmon', amount: 143 },
      { id: 'quinoa', amount: 150 },
      { id: 'avocado', amount: 50 },
      { id: 'spinach', amount: 50 },
      { id: 'cucumber', amount: 50 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Omega-3 Salmon Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook quinoa',
        'Bake salmon 180°C for 15 min',
        'Chop vegetables',
        'Build bowl: quinoa, spinach, cucumber',
        'Top with salmon and avocado',
        'Squeeze lemon'
      ],
      tips: ['Don\'t overcook salmon']
    },
    benefits: ['Brain health', 'Heart health', 'Anti-inflammatory'],
    prepTime: '25 min',
    tags: ['Lunch', 'Heart-healthy', 'Brain food']
  },

  {
    id: 'beef-bowl',
    name: 'Al Amin Beef Bowl',
    health: ['none'],
    macros: { protein: 44, carbs: 56, fat: 14, fiber: 5, sugar: 6, cals: 500 },
    ingredients: [
      { id: 'beef-mince', amount: 140 },
      { id: 'rice-brown', amount: 180 },
      { id: 'carrots', amount: 50 },
      { id: 'green-beans', amount: 100 },
      { id: 'garlic', amount: 3 },
      { id: 'soy-sauce', amount: 15 }
    ],
    recipe: {
      title: 'Al Amin Beef Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '20 min',
      difficulty: 'Easy',
      steps: [
        'Cook brown rice',
        'Brown Al Amin beef with garlic',
        'Add carrots, cook 5 min',
        'Steam green beans',
        'Mix beef with soy sauce',
        'Serve over rice'
      ],
      tips: ['Use lean Al Amin beef']
    },
    benefits: ['Halal', 'Iron-rich', 'Satisfying'],
    prepTime: '30 min',
    tags: ['Dinner', 'Halal', 'Iron-rich']
  },

  {
    id: 'greek-wrap',
    name: 'Greek Chicken Wrap',
    health: ['none'],
    macros: { protein: 44, carbs: 34, fat: 12, fiber: 5, sugar: 4, cals: 420 },
    ingredients: [
      { id: 'chicken-halal', amount: 130 },
      { id: 'wrap-large', amount: 62 },
      { id: 'greek-yogurt', amount: 50 },
      { id: 'cucumber', amount: 50 },
      { id: 'tomato', amount: 50 },
      { id: 'lettuce', amount: 30 },
      { id: 'lemon', amount: 10 }
    ],
    recipe: {
      title: 'Greek Chicken Wrap',
      servings: 1,
      prepTime: '10 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Grill chicken, slice',
        'Mix yogurt with lemon',
        'Warm wrap',
        'Spread yogurt sauce',
        'Add vegetables and chicken',
        'Roll tightly'
      ],
      tips: ['Can prep chicken in advance']
    },
    benefits: ['Portable', 'Probiotics', 'Fresh'],
    prepTime: '20 min',
    tags: ['Lunch', 'Portable', 'Halal', 'Mediterranean']
  },

  {
    id: 'prawn-pasta',
    name: 'Garlic Prawn Pasta',
    health: ['none'],
    macros: { protein: 48, carbs: 52, fat: 10, fiber: 6, sugar: 4, cals: 480 },
    ingredients: [
      { id: 'prawns', amount: 170 },
      { id: 'protein-pasta', amount: 75 },
      { id: 'zucchini', amount: 100 },
      { id: 'tomato', amount: 100 },
      { id: 'garlic', amount: 6 },
      { id: 'olive-oil', amount: 7 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Garlic Prawn Pasta',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook Vetta protein pasta',
        'Heat oil, sauté garlic',
        'Add prawns, cook 3 min',
        'Add zucchini and tomato',
        'Toss with pasta',
        'Squeeze lemon'
      ],
      tips: ['Don\'t overcook prawns']
    },
    benefits: ['High protein pasta', 'Lean seafood', 'Quick'],
    prepTime: '25 min',
    tags: ['Dinner', 'Seafood', 'Italian']
  },

  {
    id: 'tofu-stirfry',
    name: 'Tofu Veggie Stir Fry',
    health: ['cholesterol'],
    macros: { protein: 30, carbs: 60, fat: 12, fiber: 8, sugar: 6, cals: 460 },
    ingredients: [
      { id: 'tofu-firm', amount: 250 },
      { id: 'rice-white', amount: 150 },
      { id: 'broccoli', amount: 100 },
      { id: 'capsicum', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'olive-oil', amount: 7 }
    ],
    recipe: {
      title: 'Tofu Veggie Stir Fry',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Press and cube tofu',
        'Cook rice',
        'Stir-fry tofu until golden',
        'Add vegetables',
        'Season with soy sauce',
        'Serve over rice'
      ],
      tips: ['Press tofu well for crispy texture']
    },
    benefits: ['Vegan', 'Low saturated fat', 'Iron-rich'],
    prepTime: '25 min',
    tags: ['Dinner', 'Vegan', 'Asian']
  },

  {
    id: 'tuna-salad',
    name: 'Mediterranean Tuna Salad',
    health: ['none'],
    macros: { protein: 38, carbs: 38, fat: 14, fiber: 8, sugar: 6, cals: 420 },
    ingredients: [
      { id: 'tuna-can', amount: 95 },
      { id: 'chickpeas', amount: 100 },
      { id: 'cucumber', amount: 100 },
      { id: 'tomato', amount: 100 },
      { id: 'feta', amount: 30 },
      { id: 'olive-oil', amount: 14 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Mediterranean Tuna Salad',
      servings: 1,
      prepTime: '10 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Drain tuna',
        'Chop vegetables',
        'Combine tuna, chickpeas, vegetables',
        'Crumble feta',
        'Dress with olive oil and lemon'
      ],
      tips: ['Rinse chickpeas well']
    },
    benefits: ['No cooking', 'Mediterranean diet', 'Quick'],
    prepTime: '10 min',
    tags: ['Lunch', 'No cooking', 'Mediterranean']
  },

  {
    id: 'burrito-bowl',
    name: 'Mexican Burrito Bowl',
    health: ['none'],
    macros: { protein: 40, carbs: 52, fat: 16, fiber: 12, sugar: 4, cals: 500 },
    ingredients: [
      { id: 'chicken-halal', amount: 120 },
      { id: 'rice-brown', amount: 150 },
      { id: 'beans-black', amount: 100 },
      { id: 'avocado', amount: 50 },
      { id: 'salsa', amount: 50 },
      { id: 'cheese-light', amount: 20 }
    ],
    recipe: {
      title: 'Mexican Burrito Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook brown rice',
        'Grill chicken, slice',
        'Warm black beans',
        'Build bowl: rice, beans, chicken',
        'Top with avocado, salsa, cheese'
      ],
      tips: ['Can prep rice and beans in bulk']
    },
    benefits: ['High fiber', 'Halal', 'Complete meal'],
    prepTime: '25 min',
    tags: ['Dinner', 'Mexican', 'Halal']
  },
  {
    id: 'barramundi-veggies',
    name: 'Barramundi with Roasted Veggies',
    health: ['none'],
    macros: { protein: 36, carbs: 42, fat: 10, fiber: 8, sugar: 10, cals: 400 },
    ingredients: [
      { id: 'barramundi', amount: 180 },
      { id: 'sweet-potato', amount: 150 },
      { id: 'broccoli', amount: 100 },
      { id: 'carrots', amount: 100 },
      { id: 'olive-oil', amount: 7 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Barramundi with Roasted Veggies',
      servings: 1,
      prepTime: '10 min',
      cookTime: '25 min',
      difficulty: 'Easy',
      steps: [
        'Preheat oven to 200°C',
        'Dice sweet potato and carrots, toss with olive oil',
        'Roast vegetables for 20 min',
        'Season barramundi with lemon',
        'Bake fish at 180°C for 15 min',
        'Steam broccoli for 5 min',
        'Serve fish with all vegetables'
      ],
      tips: ['Check fish is opaque and flakes easily', 'Can roast all veggies together']
    },
    benefits: ['Lean protein', 'Colorful vegetables', 'Vitamin-rich'],
    prepTime: '35 min',
    tags: ['Dinner', 'Seafood', 'Healthy']
  },

  {
    id: 'chicken-curry',
    name: 'Mild Chicken Curry',
    health: ['none'],
    macros: { protein: 42, carbs: 58, fat: 14, fiber: 6, sugar: 8, cals: 500 },
    ingredients: [
      { id: 'chicken-halal', amount: 130 },
      { id: 'rice-basmati', amount: 200 },
      { id: 'tomato-paste', amount: 65 },
      { id: 'cauliflower', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'milk-skim', amount: 100 }
    ],
    recipe: {
      title: 'Mild Chicken Curry',
      servings: 1,
      prepTime: '10 min',
      cookTime: '30 min',
      difficulty: 'Medium',
      steps: [
        'Cook basmati rice',
        'Dice Al Amin chicken into cubes',
        'Cook chicken in pan until golden',
        'Add tomato paste and skim milk, simmer',
        'Add cauliflower florets, cook 10 min',
        'Add spinach in last 2 min',
        'Season with curry powder',
        'Serve over rice'
      ],
      tips: ['Use mild curry powder', 'Add yogurt for creaminess']
    },
    benefits: ['Halal', 'Comfort food', 'Warming'],
    prepTime: '40 min',
    tags: ['Dinner', 'Halal', 'Indian']
  },

  {
    id: 'beef-taco-bowl',
    name: 'Beef Taco Bowl',
    health: ['none'],
    macros: { protein: 46, carbs: 46, fat: 18, fiber: 10, sugar: 5, cals: 500 },
    ingredients: [
      { id: 'beef-mince', amount: 140 },
      { id: 'rice-brown', amount: 150 },
      { id: 'lettuce', amount: 50 },
      { id: 'tomato', amount: 100 },
      { id: 'avocado', amount: 50 },
      { id: 'salsa', amount: 50 },
      { id: 'cheese-light', amount: 20 }
    ],
    recipe: {
      title: 'Beef Taco Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook brown rice',
        'Brown Al Amin beef in pan',
        'Season with taco spices',
        'Chop lettuce and tomato',
        'Build bowl: rice base',
        'Add beef, lettuce, tomato',
        'Top with avocado, salsa, cheese'
      ],
      tips: ['Season beef with cumin and paprika']
    },
    benefits: ['Halal', 'Tex-Mex', 'Customizable'],
    prepTime: '25 min',
    tags: ['Dinner', 'Mexican', 'Halal']
  },

  {
    id: 'lemon-chicken-quinoa',
    name: 'Lemon Chicken Quinoa Bowl',
    health: ['none'],
    macros: { protein: 48, carbs: 48, fat: 12, fiber: 7, sugar: 2, cals: 480 },
    ingredients: [
      { id: 'chicken-halal', amount: 150 },
      { id: 'quinoa', amount: 200 },
      { id: 'asparagus', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'lemon', amount: 30 },
      { id: 'olive-oil', amount: 7 }
    ],
    recipe: {
      title: 'Lemon Chicken Quinoa Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '20 min',
      difficulty: 'Easy',
      steps: [
        'Cook quinoa',
        'Marinate chicken in lemon juice',
        'Grill chicken until cooked through',
        'Roast asparagus with olive oil',
        'Sauté spinach',
        'Slice chicken',
        'Build bowl and drizzle remaining lemon'
      ],
      tips: ['Save lemon zest for extra flavor']
    },
    benefits: ['Complete protein', 'Halal', 'Refreshing'],
    prepTime: '30 min',
    tags: ['Dinner', 'Halal', 'Mediterranean']
  },

  {
    id: 'prawn-fried-rice',
    name: 'Prawn Fried Rice',
    health: ['none'],
    macros: { protein: 42, carbs: 52, fat: 10, fiber: 4, sugar: 5, cals: 460 },
    ingredients: [
      { id: 'prawns', amount: 170 },
      { id: 'rice-white', amount: 150 },
      { id: 'eggs', amount: 50 },
      { id: 'carrots', amount: 50 },
      { id: 'green-beans', amount: 50 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'garlic', amount: 6 }
    ],
    recipe: {
      title: 'Prawn Fried Rice',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook rice (day-old is best)',
        'Scramble 1 egg, set aside',
        'Heat wok, cook prawns with garlic',
        'Remove prawns',
        'Add diced vegetables, stir-fry',
        'Add rice, break up clumps',
        'Add prawns, egg, soy sauce',
        'Toss everything together'
      ],
      tips: ['High heat is key', 'Use day-old rice for best texture']
    },
    benefits: ['Restaurant-style', 'Complete meal', 'Asian flavors'],
    prepTime: '25 min',
    tags: ['Dinner', 'Asian', 'Seafood']
  },

  {
    id: 'falafel-bowl',
    name: 'Mediterranean Falafel Bowl',
    health: ['cholesterol'],
    macros: { protein: 32, carbs: 54, fat: 16, fiber: 14, sugar: 6, cals: 480 },
    ingredients: [
      { id: 'chickpeas', amount: 200 },
      { id: 'rice-brown', amount: 150 },
      { id: 'cucumber', amount: 100 },
      { id: 'tomato', amount: 100 },
      { id: 'hummus', amount: 50 },
      { id: 'tahini', amount: 15 }
    ],
    recipe: {
      title: 'Mediterranean Falafel Bowl',
      servings: 1,
      prepTime: '15 min',
      cookTime: '20 min',
      difficulty: 'Medium',
      steps: [
        'Drain and mash chickpeas',
        'Mix with spices (cumin, coriander, garlic)',
        'Form into 6 small patties',
        'Bake at 180°C for 20 min, flip halfway',
        'Cook brown rice',
        'Dice cucumber and tomato',
        'Build bowl with rice, falafel, vegetables',
        'Drizzle hummus and tahini'
      ],
      tips: ['Can pan-fry for crispy texture', 'Make extra falafel to freeze']
    },
    benefits: ['Plant-based', 'High fiber', 'Vegan'],
    prepTime: '35 min',
    tags: ['Lunch', 'Vegan', 'Mediterranean']
  },

  {
    id: 'tempeh-bowl',
    name: 'Teriyaki Tempeh Bowl',
    health: ['cholesterol'],
    macros: { protein: 34, carbs: 56, fat: 16, fiber: 10, sugar: 8, cals: 480 },
    ingredients: [
      { id: 'tempeh', amount: 180 },
      { id: 'rice-white', amount: 150 },
      { id: 'broccoli', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'olive-oil', amount: 7 }
    ],
    recipe: {
      title: 'Teriyaki Tempeh Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook white rice',
        'Slice tempeh into strips',
        'Marinate tempeh in soy sauce for 5 min',
        'Pan-fry tempeh until golden and crispy',
        'Steam broccoli and carrots',
        'Build bowl with rice, tempeh, vegetables',
        'Drizzle remaining soy sauce'
      ],
      tips: ['Steam tempeh first to remove bitterness', 'Add ginger for extra flavor']
    },
    benefits: ['Fermented protein', 'Vegan', 'Probiotic'],
    prepTime: '25 min',
    tags: ['Dinner', 'Vegan', 'Asian']
  },

  {
    id: 'chicken-pesto-pasta',
    name: 'Chicken Pesto Pasta',
    health: ['none'],
    macros: { protein: 50, carbs: 54, fat: 14, fiber: 6, sugar: 3, cals: 520 },
    ingredients: [
      { id: 'chicken-halal', amount: 150 },
      { id: 'protein-pasta', amount: 75 },
      { id: 'spinach', amount: 100 },
      { id: 'tomato', amount: 100 },
      { id: 'olive-oil', amount: 14 },
      { id: 'garlic', amount: 6 }
    ],
    recipe: {
      title: 'Chicken Pesto Pasta',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook Vetta protein pasta',
        'Grill Al Amin chicken, slice',
        'Blend spinach, olive oil, garlic for pesto',
        'Toss hot pasta with pesto',
        'Add sliced chicken',
        'Top with diced fresh tomatoes'
      ],
      tips: ['Add pine nuts to pesto if available', 'Can use store-bought pesto']
    },
    benefits: ['High protein pasta', 'Halal', 'Italian flavors'],
    prepTime: '25 min',
    tags: ['Dinner', 'Italian', 'Halal']
  },

  {
    id: 'egg-fried-rice',
    name: 'Veggie Egg Fried Rice',
    health: ['none'],
    macros: { protein: 30, carbs: 52, fat: 14, fiber: 5, sugar: 6, cals: 440 },
    ingredients: [
      { id: 'eggs', amount: 150 },
      { id: 'egg-whites', amount: 50 },
      { id: 'rice-white', amount: 150 },
      { id: 'carrots', amount: 50 },
      { id: 'green-beans', amount: 100 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'garlic', amount: 6 }
    ],
    recipe: {
      title: 'Veggie Egg Fried Rice',
      servings: 1,
      prepTime: '10 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Cook rice (use day-old if possible)',
        'Scramble eggs with egg whites, set aside',
        'Heat wok, sauté garlic',
        'Stir-fry carrots and beans',
        'Add rice, break up clumps',
        'Add eggs and soy sauce',
        'Toss everything together'
      ],
      tips: ['Use high heat', 'Day-old rice works best']
    },
    benefits: ['Budget-friendly', 'Quick', 'Vegetarian'],
    prepTime: '20 min',
    tags: ['Dinner', 'Vegetarian', 'Asian']
  },

  {
    id: 'lentil-soup',
    name: 'Hearty Lentil Soup',
    health: ['diabetes', 'cholesterol'],
    macros: { protein: 28, carbs: 48, fat: 6, fiber: 16, sugar: 8, cals: 360 },
    ingredients: [
      { id: 'lentils', amount: 250 },
      { id: 'carrots', amount: 100 },
      { id: 'tomato', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'garlic', amount: 6 },
      { id: 'olive-oil', amount: 7 }
    ],
    recipe: {
      title: 'Hearty Lentil Soup',
      servings: 1,
      prepTime: '10 min',
      cookTime: '35 min',
      difficulty: 'Easy',
      steps: [
        'Heat olive oil, sauté garlic and diced carrots',
        'Add lentils and 3 cups water',
        'Bring to boil, then simmer 30 min',
        'Add diced tomatoes, cook 5 min',
        'Stir in spinach, cook until wilted',
        'Season with cumin, salt, pepper'
      ],
      tips: ['Can blend half for creamier texture', 'Freeze extra portions']
    },
    benefits: ['High fiber', 'Heart healthy', 'Budget-friendly'],
    prepTime: '45 min',
    tags: ['Lunch', 'Vegan', 'Heart-healthy']
  },

  {
    id: 'chicken-souvlaki',
    name: 'Chicken Souvlaki Bowl',
    health: ['none'],
    macros: { protein: 48, carbs: 46, fat: 14, fiber: 8, sugar: 6, cals: 480 },
    ingredients: [
      { id: 'chicken-halal', amount: 150 },
      { id: 'rice-white', amount: 150 },
      { id: 'cucumber', amount: 100 },
      { id: 'tomato', amount: 100 },
      { id: 'greek-yogurt', amount: 85 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Chicken Souvlaki Bowl',
      servings: 1,
      prepTime: '15 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Marinate chicken in lemon juice, oregano, garlic',
        'Cook white rice',
        'Grill chicken skewers until cooked',
        'Dice cucumber and tomato',
        'Mix yogurt with lemon for tzatziki',
        'Build bowl: rice, chicken, vegetables',
        'Top with tzatziki sauce'
      ],
      tips: ['Marinate chicken for 30 min if time allows', 'Add fresh oregano']
    },
    benefits: ['Mediterranean', 'Halal', 'Fresh flavors'],
    prepTime: '30 min',
    tags: ['Dinner', 'Mediterranean', 'Halal']
  },

  {
    id: 'sushi-bowl',
    name: 'Deconstructed Sushi Bowl',
    health: ['none'],
    macros: { protein: 38, carbs: 54, fat: 16, fiber: 6, sugar: 8, cals: 500 },
    ingredients: [
      { id: 'salmon', amount: 140 },
      { id: 'rice-white', amount: 150 },
      { id: 'avocado', amount: 50 },
      { id: 'cucumber', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'soy-sauce', amount: 15 }
    ],
    recipe: {
      title: 'Deconstructed Sushi Bowl',
      servings: 1,
      prepTime: '15 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Cook sushi rice or white rice',
        'Slice raw sushi-grade salmon (or cook if preferred)',
        'Julienne cucumber and carrots',
        'Slice avocado',
        'Build bowl: rice base',
        'Arrange salmon, vegetables, avocado on top',
        'Drizzle soy sauce'
      ],
      tips: ['Use sushi-grade salmon only', 'Add sesame seeds for garnish']
    },
    benefits: ['Japanese-inspired', 'Omega-3 rich', 'Fresh'],
    prepTime: '25 min',
    tags: ['Lunch', 'Seafood', 'Japanese']
  },

  {
    id: 'thai-peanut-noodles',
    name: 'Thai Peanut Noodles',
    health: ['none'],
    macros: { protein: 34, carbs: 58, fat: 18, fiber: 8, sugar: 10, cals: 500 },
    ingredients: [
      { id: 'protein-pasta', amount: 75 },
      { id: 'pb-regular', amount: 20 },
      { id: 'chicken-halal', amount: 100 },
      { id: 'broccoli', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'sriracha', amount: 15 }
    ],
    recipe: {
      title: 'Thai Peanut Noodles',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook protein pasta',
        'Make sauce: mix peanut butter, soy sauce, sriracha',
        'Grill chicken, slice thin',
        'Steam broccoli and julienne carrots',
        'Toss hot pasta with peanut sauce',
        'Top with chicken and vegetables'
      ],
      tips: ['Add lime juice for tang', 'Thin sauce with water if needed']
    },
    benefits: ['Thai-inspired', 'Halal', 'Flavorful'],
    prepTime: '25 min',
    tags: ['Dinner', 'Asian', 'Halal']
  },

  {
    id: 'caprese-chicken',
    name: 'Caprese Chicken',
    health: ['none'],
    macros: { protein: 46, carbs: 22, fat: 16, fiber: 4, sugar: 6, cals: 420 },
    ingredients: [
      { id: 'chicken-halal', amount: 150 },
      { id: 'tomato', amount: 150 },
      { id: 'cheese-cheddar', amount: 30 },
      { id: 'spinach', amount: 100 },
      { id: 'olive-oil', amount: 14 },
      { id: 'bread-whole', amount: 44 }
    ],
    recipe: {
      title: 'Caprese Chicken',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Grill Al Amin chicken breast',
        'Top with sliced tomato and cheese',
        'Bake at 180°C until cheese melts (5 min)',
        'Sauté spinach in olive oil',
        'Serve chicken with spinach',
        'Side of toasted bread'
      ],
      tips: ['Use fresh basil if available', 'Don\'t overcook chicken']
    },
    benefits: ['Italian classic', 'Halal', 'Simple'],
    prepTime: '25 min',
    tags: ['Dinner', 'Italian', 'Halal']
  },

  {
    id: 'buddha-bowl',
    name: 'Rainbow Buddha Bowl',
    health: ['cholesterol'],
    macros: { protein: 32, carbs: 58, fat: 14, fiber: 14, sugar: 12, cals: 480 },
    ingredients: [
      { id: 'quinoa', amount: 150 },
      { id: 'chickpeas', amount: 150 },
      { id: 'sweet-potato', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'carrots', amount: 50 },
      { id: 'tahini', amount: 15 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Rainbow Buddha Bowl',
      servings: 1,
      prepTime: '15 min',
      cookTime: '25 min',
      difficulty: 'Easy',
      steps: [
        'Cook quinoa',
        'Roast sweet potato cubes and chickpeas at 200°C for 20 min',
        'Steam spinach',
        'Shred raw carrots',
        'Build colorful bowl with all ingredients',
        'Make dressing: mix tahini with lemon juice and water',
        'Drizzle over bowl'
      ],
      tips: ['Toss chickpeas in spices before roasting', 'Make extra for lunch next day']
    },
    benefits: ['Plant-based', 'Rainbow vegetables', 'Vegan'],
    prepTime: '40 min',
    tags: ['Lunch', 'Vegan', 'Colorful']
  },

  {
    id: 'korean-bowl',
    name: 'Korean Beef Bowl',
    health: ['none'],
    macros: { protein: 40, carbs: 52, fat: 14, fiber: 6, sugar: 10, cals: 480 },
    ingredients: [
      { id: 'beef-mince', amount: 120 },
      { id: 'rice-white', amount: 150 },
      { id: 'spinach', amount: 100 },
      { id: 'carrots', amount: 50 },
      { id: 'eggs', amount: 50 },
      { id: 'soy-sauce', amount: 15 },
      { id: 'sriracha', amount: 15 }
    ],
    recipe: {
      title: 'Korean Beef Bowl',
      servings: 1,
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      steps: [
        'Cook white rice',
        'Brown Al Amin beef with soy sauce',
        'Sauté spinach with garlic',
        'Julienne and sauté carrots',
        'Fry 1 egg sunny-side up',
        'Build bowl: rice, beef, vegetables',
        'Top with fried egg and sriracha'
      ],
      tips: ['Add sesame oil for authentic flavor', 'Gochujang is traditional']
    },
    benefits: ['Korean-inspired', 'Halal', 'Balanced'],
    prepTime: '25 min',
    tags: ['Dinner', 'Korean', 'Halal']
  },

  {
    id: 'stuffed-capsicum',
    name: 'Stuffed Bell Peppers',
    health: ['none'],
    macros: { protein: 38, carbs: 48, fat: 12, fiber: 10, sugar: 14, cals: 440 },
    ingredients: [
      { id: 'beef-mince', amount: 120 },
      { id: 'rice-brown', amount: 100 },
      { id: 'capsicum', amount: 200 },
      { id: 'tomato-paste', amount: 65 },
      { id: 'cheese-light', amount: 20 }
    ],
    recipe: {
      title: 'Stuffed Bell Peppers',
      servings: 1,
      prepTime: '15 min',
      cookTime: '35 min',
      difficulty: 'Medium',
      steps: [
        'Cook brown rice',
        'Brown Al Amin beef',
        'Mix rice, beef, tomato paste',
        'Cut 2 large capsicums in half, remove seeds',
        'Stuff capsicums with mixture',
        'Top with cheese',
        'Bake at 180°C for 30 min'
      ],
      tips: ['Use different colored capsicums', 'Can prep and freeze']
    },
    benefits: ['Halal', 'Colorful', 'Meal prep friendly'],
    prepTime: '50 min',
    tags: ['Dinner', 'Halal', 'Meal prep']
  },

  {
    id: 'fish-tacos',
    name: 'Grilled Fish Tacos',
    health: ['none'],
    macros: { protein: 40, carbs: 42, fat: 14, fiber: 8, sugar: 6, cals: 440 },
    ingredients: [
      { id: 'barramundi', amount: 180 },
      { id: 'wrap-mini', amount: 96 },
      { id: 'lettuce', amount: 50 },
      { id: 'tomato', amount: 100 },
      { id: 'avocado', amount: 50 },
      { id: 'salsa', amount: 50 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Grilled Fish Tacos',
      servings: 1,
      prepTime: '10 min',
      cookTime: '10 min',
      difficulty: 'Easy',
      steps: [
        'Season barramundi with lemon and spices',
        'Grill fish until flaky',
        'Flake fish into chunks',
        'Warm 3 mini wraps',
        'Fill with lettuce, fish, tomato',
        'Top with avocado and salsa',
        'Squeeze lemon over'
      ],
      tips: ['Can use any white fish', 'Add lime for authentic flavor']
    },
    benefits: ['Light & fresh', 'Mexican-inspired', 'Quick'],
    prepTime: '20 min',
    tags: ['Dinner', 'Mexican', 'Seafood']
  },

  {
    id: 'protein-shake',
    name: 'Post-Workout Protein Shake',
    health: ['none'],
    macros: { protein: 40, carbs: 36, fat: 6, fiber: 4, sugar: 20, cals: 360 },
    ingredients: [
      { id: 'protein-powder', amount: 40 },
      { id: 'banana', amount: 118 },
      { id: 'berries-mixed', amount: 50 },
      { id: 'milk-skim', amount: 250 },
      { id: 'pb-powder', amount: 12 }
    ],
    recipe: {
      title: 'Post-Workout Protein Shake',
      servings: 1,
      prepTime: '3 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Add all ingredients to blender',
        'Blend until smooth',
        'Add ice if desired',
        'Drink within 30 min of workout'
      ],
      tips: ['Use frozen banana for thickness', 'Drink immediately post-workout']
    },
    benefits: ['Muscle recovery', 'Quick protein', 'Portable'],
    prepTime: '3 min',
    tags: ['Snack', 'Post-workout', 'Quick']
  },

  {
    id: 'protein-yogurt-parfait',
    name: 'High Protein Parfait',
    health: ['none'],
    macros: { protein: 32, carbs: 40, fat: 8, fiber: 6, sugar: 26, cals: 360 },
    ingredients: [
      { id: 'greek-yogurt', amount: 200 },
      { id: 'berries-mixed', amount: 100 },
      { id: 'oats-regular', amount: 40 },
      { id: 'protein-powder', amount: 15 },
      { id: 'almonds', amount: 14 }
    ],
    recipe: {
      title: 'High Protein Parfait',
      servings: 1,
      prepTime: '5 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Mix Greek yogurt with protein powder',
        'Layer in glass: yogurt, berries, oats',
        'Repeat layers',
        'Top with crushed almonds'
      ],
      tips: ['Prep in mason jar for grab-and-go']
    },
    benefits: ['No cooking', 'Probiotics', 'Visual appeal'],
    prepTime: '5 min',
    tags: ['Snack', 'Quick', 'No cooking']
  },

  {
    id: 'tuna-rice-cakes',
    name: 'Tuna Rice Cake Stack',
    health: ['none'],
    macros: { protein: 28, carbs: 32, fat: 10, fiber: 4, sugar: 2, cals: 320 },
    ingredients: [
      { id: 'tuna-can', amount: 95 },
      { id: 'rice-white', amount: 60 },
      { id: 'avocado', amount: 30 },
      { id: 'cucumber', amount: 50 },
      { id: 'lemon', amount: 15 }
    ],
    recipe: {
      title: 'Tuna Rice Cake Stack',
      servings: 1,
      prepTime: '5 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Mix drained tuna with lemon juice',
        'Cook rice and shape into patties (or use rice cakes)',
        'Top rice with mashed avocado',
        'Add tuna mixture',
        'Top with sliced cucumber'
      ],
      tips: ['Can use store-bought rice cakes', 'Add hot sauce for kick']
    },
    benefits: ['Quick protein', 'No cooking', 'Portable'],
    prepTime: '5 min',
    tags: ['Snack', 'Quick', 'No cooking']
  },

  {
    id: 'chicken-salad-wrap',
    name: 'Chicken Salad Mini Wraps',
    health: ['none'],
    macros: { protein: 38, carbs: 32, fat: 12, fiber: 4, sugar: 3, cals: 380 },
    ingredients: [
      { id: 'chicken-halal', amount: 110 },
      { id: 'wrap-mini', amount: 96 },
      { id: 'greek-yogurt', amount: 50 },
      { id: 'lettuce', amount: 30 },
      { id: 'cucumber', amount: 50 }
    ],
    recipe: {
      title: 'Chicken Salad Mini Wraps',
      servings: 1,
      prepTime: '10 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Use pre-cooked Al Amin chicken, dice',
        'Mix chicken with Greek yogurt',
        'Chop lettuce and cucumber',
        'Fill 3 mini wraps with mixture',
        'Roll and serve'
      ],
      tips: ['Meal prep chicken on Sunday', 'Add grapes for sweetness']
    },
    benefits: ['Portable', 'No cooking', 'Halal'],
    prepTime: '10 min',
    tags: ['Snack', 'Lunch', 'Halal']
  },

  {
    id: 'protein-energy-balls',
    name: 'No-Bake Protein Balls',
    health: ['none'],
    macros: { protein: 24, carbs: 48, fat: 14, fiber: 8, sugar: 20, cals: 400 },
    ingredients: [
      { id: 'protein-powder', amount: 30 },
      { id: 'oats-regular', amount: 80 },
      { id: 'pb-powder', amount: 24 },
      { id: 'banana', amount: 60 }
    ],
    recipe: {
      title: 'No-Bake Protein Balls',
      servings: '6 balls',
      prepTime: '10 min',
      cookTime: '0 min (chill 30 min)',
      difficulty: 'Easy',
      steps: [
        'Mash banana in bowl',
        'Mix in oats, protein powder, PB2 powder',
        'Form into 6 balls',
        'Refrigerate 30 min to firm up',
        'Store in fridge for up to 5 days'
      ],
      tips: ['Roll in coconut for coating', 'Make double batch']
    },
    benefits: ['Meal prep', 'Portable', 'No baking'],
    prepTime: '10 min + chill',
    tags: ['Snack', 'Meal prep', 'Sweet']
  },

  {
    id: 'egg-muffins',
    name: 'Veggie Egg Muffins',
    health: ['none'],
    macros: { protein: 30, carbs: 18, fat: 16, fiber: 4, sugar: 6, cals: 340 },
    ingredients: [
      { id: 'eggs', amount: 150 },
      { id: 'egg-whites', amount: 100 },
      { id: 'spinach', amount: 50 },
      { id: 'capsicum', amount: 50 },
      { id: 'cheese-light', amount: 30 }
    ],
    recipe: {
      title: 'Veggie Egg Muffins',
      servings: '6 muffins',
      prepTime: '10 min',
      cookTime: '20 min',
      difficulty: 'Easy',
      steps: [
        'Preheat oven to 180°C',
        'Whisk eggs and egg whites',
        'Chop spinach and capsicum',
        'Mix vegetables and cheese into eggs',
        'Pour into 6 muffin tins',
        'Bake 20 min until set',
        'Store in fridge for 5 days'
      ],
      tips: ['Reheat in microwave 30 sec', 'Freeze for longer storage']
    },
    benefits: ['Meal prep', 'Portable', 'Grab-and-go'],
    prepTime: '30 min',
    tags: ['Snack', 'Breakfast', 'Meal prep']
  },

  {
    id: 'chickpea-snack',
    name: 'Roasted Chickpea Snack',
    health: ['none'],
    macros: { protein: 20, carbs: 60, fat: 10, fiber: 16, sugar: 2, cals: 400 },
    ingredients: [
      { id: 'chickpeas', amount: 300 },
      { id: 'olive-oil', amount: 14 }
    ],
    recipe: {
      title: 'Roasted Chickpea Snack',
      servings: '3 servings',
      prepTime: '5 min',
      cookTime: '30 min',
      difficulty: 'Easy',
      steps: [
        'Drain and dry chickpeas thoroughly',
        'Toss with olive oil and spices',
        'Spread on baking sheet',
        'Roast at 200°C for 30 min, shake halfway',
        'Let cool until crispy',
        'Store in airtight container'
      ],
      tips: ['Must be completely dry', 'Try different spice combos']
    },
    benefits: ['Crunchy', 'High fiber', 'Vegan'],
    prepTime: '35 min',
    tags: ['Snack', 'Vegan', 'Crunchy']
  },

  {
    id: 'protein-oat-bars',
    name: 'No-Bake Protein Oat Bars',
    health: ['none'],
    macros: { protein: 28, carbs: 52, fat: 12, fiber: 8, sugar: 16, cals: 400 },
    ingredients: [
      { id: 'protein-oats', amount: 100 },
      { id: 'protein-powder', amount: 40 },
      { id: 'pb-powder', amount: 24 },
      { id: 'banana', amount: 118 }
    ],
    recipe: {
      title: 'No-Bake Protein Oat Bars',
      servings: '4 bars',
      prepTime: '10 min',
      cookTime: '0 min (chill 2 hours)',
      difficulty: 'Easy',
      steps: [
        'Mash banana in bowl',
        'Mix in oats, protein powder, PB2',
        'Press into lined pan',
        'Refrigerate 2 hours',
        'Cut into 4 bars',
        'Wrap individually for grab-and-go'
      ],
      tips: ['Add chocolate chips', 'Freeze for firmer texture']
    },
    benefits: ['Meal prep', 'Portable', 'No baking'],
    prepTime: '10 min + chill',
    tags: ['Snack', 'Meal prep', 'Sweet']
  },

  {
    id: 'cottage-toast',
    name: 'Savory Cottage Cheese Toast',
    health: ['none'],
    macros: { protein: 32, carbs: 32, fat: 12, fiber: 8, sugar: 6, cals: 360 },
    ingredients: [
      { id: 'cottage-cheese', amount: 200 },
      { id: 'bread-protein', amount: 50 },
      { id: 'tomato', amount: 100 },
      { id: 'avocado', amount: 30 }
    ],
    recipe: {
      title: 'Savory Cottage Cheese Toast',
      servings: 1,
      prepTime: '5 min',
      cookTime: '2 min',
      difficulty: 'Easy',
      steps: [
        'Toast protein bread',
        'Spread cottage cheese thick',
        'Top with sliced tomato',
        'Add mashed avocado',
        'Season with pepper and chili flakes'
      ],
      tips: ['Use cherry tomatoes for sweetness']
    },
    benefits: ['Quick protein', 'Savory', 'Filling'],
    prepTime: '7 min',
    tags: ['Snack', 'Quick', 'Savory']
  },

  {
    id: 'apple-pb-snack',
    name: 'Apple with Protein PB',
    health: ['none'],
    macros: { protein: 20, carbs: 38, fat: 6, fiber: 6, sugar: 24, cals: 280 },
    ingredients: [
      { id: 'apple', amount: 182 },
      { id: 'pb-powder', amount: 36 }
    ],
    recipe: {
      title: 'Apple with Protein PB',
      servings: 1,
      prepTime: '3 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      steps: [
        'Slice apple into 8 wedges',
        'Mix 36g (6 tbsp) PB2 powder with water to make paste',
        'Dip apple slices in PB2 mixture'
      ],
      tips: ['Add cinnamon to PB2', 'Use any apple variety']
    },
    benefits: ['Simple', 'Natural sugar', 'Quick'],
    prepTime: '3 min',
    tags: ['Snack', 'Quick', 'Sweet']
  }

];