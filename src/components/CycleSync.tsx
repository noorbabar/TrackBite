import { useState, useEffect } from 'react';

interface CycleData {
  lastPeriod: string;
  cycleLength: number;
  periodLength: number;
}

const CycleSync = () => {
  const [hasSetup, setHasSetup] = useState(false);
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [formData, setFormData] = useState({
    lastPeriod: '',
    cycleLength: 28,
    periodLength: 5
  });
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cycleData');
    if (stored) {
      const data = JSON.parse(stored);
      setCycleData(data);
      setHasSetup(true);
    }
  }, []);

  const handleSetup = () => {
    const data = {
      lastPeriod: formData.lastPeriod,
      cycleLength: formData.cycleLength,
      periodLength: formData.periodLength
    };
    localStorage.setItem('cycleData', JSON.stringify(data));
    setCycleData(data);
    setHasSetup(true);
  };

  const getCurrentPhase = () => {
    if (!cycleData) return null;

    const lastPeriod = new Date(cycleData.lastPeriod);
    const today = new Date();
    const daysSince = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const cycleDay = (daysSince % cycleData.cycleLength) + 1;

    if (cycleDay <= cycleData.periodLength) return { name: 'Menstrual', day: cycleDay };
    if (cycleDay <= 14) return { name: 'Follicular', day: cycleDay };
    if (cycleDay <= 16) return { name: 'Ovulation', day: cycleDay };
    return { name: 'Luteal', day: cycleDay };
  };

  const getPhaseInfo = (phaseName: string) => {
    const phases: any = {
      Menstrual: {
        color: '#e57373',
        training: {
          title: 'TRAINING APPROACH',
          content: 'Days 1-5 of your cycle. This is your body\'s natural recovery period. Focus on gentle, restorative movement rather than intense training.\n\nRECOMMENDED ACTIVITIES:\n• Light cardio: 20-30 min walks, easy cycling, or swimming\n• Yoga and stretching: Yin yoga, gentle flow, or restorative poses\n• Mobility work: Hip mobility and lower back stretches\n• Pilates: Gentle mat work focusing on core and breathing\n\nAVOID:\n• Heavy compound lifts at maximum effort\n• High-intensity interval training (HIIT)\n• Testing personal records\n• Long duration cardio (over 45 minutes)\n• Exercises putting pressure on abdomen\n\nIF EXPERIENCING CRAMPS:\nComplete rest is perfectly acceptable. Your uterus is actively shedding its lining - this is physical work. Some women can train through periods, others cannot - both are completely normal.\n\nWHY THIS APPROACH WORKS:\nBlood loss and hormonal shifts mean your body is in recovery mode. Intense exercise can increase cramping and fatigue. However, gentle movement actually helps by increasing blood flow to the uterus, releasing pain-relieving endorphins, and improving mood. Studies show moderate walking reduces period pain by up to 20%.'
        },
        nutrition: {
          title: 'NUTRITION STRATEGY',
          content: 'Your body loses iron, magnesium, zinc, and other vital nutrients through menstrual blood. Strategic nutrition significantly reduces symptoms.\n\nIRON REPLACEMENT (CRITICAL):\nYou lose 30-40mg of iron per period. Without replacement, fatigue worsens.\n• Heme iron (best absorbed, 15-35%): Red meat, liver, chicken, salmon, sardines\n• Non-heme iron (lower absorption, 2-20%): Spinach, lentils, chickpeas, tofu, fortified cereals\n• BOOST ABSORPTION: Pair with Vitamin C - citrus, capsicum, tomatoes, strawberries\n• BLOCK ABSORPTION: Avoid tea, coffee, calcium supplements within 2 hours of iron-rich meals\n• Target: 18-20mg iron daily during menstruation\n\nANTI-INFLAMMATORY FOODS:\nProstaglandins cause cramping - these foods reduce their production:\n• Omega-3 fatty acids: Salmon, sardines, mackerel, walnuts, flaxseed, chia seeds\n• Ginger: 250mg 4x daily shown to reduce pain as effectively as ibuprofen\n• Turmeric: Curcumin compound has anti-inflammatory properties\n• Berries: High in antioxidants that reduce inflammation\n• Leafy greens: Kale, swiss chard, collard greens\n\nMAGNESIUM FOR CRAMP RELIEF:\nMagnesium relaxes smooth muscle tissue (your uterus is smooth muscle).\n• Dark chocolate (70%+ cocoa): 64mg per 28g\n• Pumpkin seeds: 156mg per 28g\n• Almonds: 80mg per 28g\n• Spinach (cooked): 157mg per cup\n• Target: 300-400mg daily\n• Timing: Evening dose helps overnight cramps and sleep\n\nHYDRATION:\n• Target: 2.5-3L water daily (more if heavy bleeding)\n• Herbal teas: Peppermint (reduces bloating), Ginger (anti-nausea), Chamomile (calms), Raspberry leaf (tones uterus)\n• Coconut water: Replaces electrolytes\n\nFOODS TO LIMIT:\n• Excess sodium (over 2300mg/day): Increases bloating\n• Processed foods and refined sugars: Worsen mood swings and inflammation\n• Alcohol: Dehydrates and worsens cramps\n• Caffeine (over 200mg/day): Can worsen anxiety and cramps\n\nCALORIC NEEDS:\nYour metabolic rate is at its lowest. You naturally need 100-200 fewer calories than usual. Focus on nutrient density over quantity.'
        },
        energy: {
          title: 'ENERGY PROFILE',
          content: 'Lowest point of your entire cycle. This is completely normal and biologically appropriate.\n\nWHAT\'S HAPPENING:\n• Both estrogen and progesterone drop to their lowest levels\n• This hormonal withdrawal triggers menstrual bleeding\n• Low estrogen = low serotonin = reduced energy and motivation\n• Your basal metabolic rate drops by 5-10%\n• Mitochondrial function (cellular energy production) is reduced\n\nTYPICAL TIMELINE:\n• Day 1-2: Often most difficult - heavy bleeding, severe cramping, extreme fatigue\n• Day 3-4: Symptoms begin improving, energy slowly returns\n• Day 5: Beginning to feel normal, bleeding lightens\n• Sleep quality: Often disrupted due to discomfort or bathroom trips\n• Cognitive function: Brain fog, difficulty concentrating\n• Physical stamina: Reduced by 15-30% compared to peak follicular phase\n\nWHY YOU FEEL THIS WAY:\n• Blood loss: Less oxygen-carrying capacity = more fatigue\n• Inflammatory response: Immune system active during uterine shedding\n• Hormonal crash: Rapid hormone drops affect neurotransmitters\n• Disturbed sleep: Poor sleep compounds fatigue\n• Pain and discomfort: Chronic pain is exhausting\n\nWHAT HELPS:\n• Extra sleep: 30-60 minutes earlier bedtime\n• Strategic naps: 20-minute power naps (not longer)\n• Gentle movement: Light activity increases energy more than complete rest\n• Protein at breakfast: Stabilises blood sugar\n• Iron-rich foods: Support oxygen transport\n• Sunlight: 15-30 minutes morning exposure\n• Reduce obligations: Say no to non-essentials\n\nADJUST EXPECTATIONS:\n• Work productivity may be 60-70% of normal\n• Desire for solitude is normal\n• Avoid major decisions if possible\n• Don\'t compare performance to other phases'
        },
        hormones: {
          title: 'HORMONAL ACTIVITY',
          content: 'ESTROGEN: At rock bottom (10-50 pg/mL)\nProduced by ovarian follicles, which are currently inactive.\n\nEffects of low estrogen:\n• Reduced serotonin, dopamine, acetylcholine (mood, motivation, memory)\n• Lower mitochondrial function\n• May feel colder, lower body temperature\n• Duller skin, less hydrated\n• Drier mucous membranes\n• Lower exercise capacity\n• Slower cognitive processing\n\nPROGESTERONE: Also at lowest levels (<1 ng/mL)\nNo corpus luteum exists, so no progesterone production. The DROP in progesterone actually triggered menstruation.\n\nPROSTAGLANDINS: The primary pain mechanism\nHormone-like substances released by degenerating endometrial cells.\n\nWhy they cause pain:\n• Trigger strong uterine muscle contractions (similar to labor)\n• Constrict blood vessels in uterus (causes ischemic pain)\n• Sensitize pain nerve endings\n• High levels cause worse cramps, nausea, diarrhea, headaches\n• NSAIDs work by blocking prostaglandin production\n\nTESTOSTERONE: Low (15-70 ng/dL)\n• Lower competitive drive\n• Decreased muscle protein synthesis\n• Reduced strength and power output\n\nCORTISOL: Often elevated\nStress hormone may spike due to physical discomfort and inflammation. Can worsen cramps and disrupt sleep.\n\nFOLLICLE STIMULATING HORMONE (FSH): Begins to rise\nPituitary starts stimulating follicles for next cycle. By day 3-5, multiple follicles begin developing.\n\nCYTOKINES: Inflammatory markers elevated\nYour immune system is active. Uterine shedding is an inflammatory process. Why you might feel flu-like symptoms.'
        },
        symptoms: {
          title: 'COMPREHENSIVE SYMPTOMS',
          content: 'PHYSICAL (Uterine/Pelvic):\n• Uterine cramping: Mild to severe, debilitating pain\n• Lower back pain from contractions and referred pain\n• Hip and leg discomfort from nerve pathways\n• Pelvic pressure and heaviness\n• Vaginal soreness\n\nBLEEDING:\n• Heavy flow days 1-3 typically\n• Small clots (under 50c piece) are normal\n• Color changes: Bright red (fresh) to dark red/brown (older)\n• Average blood loss: 30-40mL total\n\nDIGESTIVE:\n• Bloating and distension\n• Diarrhea from prostaglandins affecting intestines\n• Nausea from prostaglandins and pain\n• Food aversions\n\nMUSCULOSKELETAL:\n• Joint pain and stiffness\n• Muscle aches (legs, back, shoulders)\n• Reduced flexibility\n• Headaches or migraines\n• Breast tenderness\n• General flu-like malaise\n\nCOGNITIVE:\n• Brain fog and difficulty concentrating\n• Memory issues\n• Reduced verbal fluency\n• Slower reaction time\n• Dizziness when standing\n\nEMOTIONAL:\n• Low mood, sadness, or depression\n• Irritability and frustration\n• Anxiety or worry\n• Social withdrawal\n• Emotional sensitivity\n• Reduced motivation\n• Self-criticism\n• Feeling overwhelmed\n\nSLEEP:\n• Difficulty falling asleep\n• Frequent waking\n• Night sweats\n• Non-restorative sleep\n\nWHEN TO SEE A DOCTOR:\nURGENT:\n• Soaking through pad/tampon every hour for several hours\n• Blood clots larger than 50c piece\n• Severe dizziness or fainting\n• Fever over 38.5°C\n\nMAKE APPOINTMENT:\n• Cramps so severe you cannot function\n• Periods over 7 days consistently\n• Bleeding between periods\n• Significant increase in pain or flow\n• Severe mood disturbances\n• Symptoms of anemia'
        },
        tips: {
          title: 'MANAGEMENT STRATEGIES',
          content: 'PAIN MANAGEMENT:\n\nHeat Therapy (First-line):\n• Heating pad on lower abdomen at 40-42°C\n• 15-20 min sessions, repeat frequently\n• Hot water bottle on lower back\n• Warm bath with Epsom salts\n• Studies show comparable effectiveness to ibuprofen\n\nMedication:\n• NSAIDs: Ibuprofen 400mg or naproxen 500mg every 8-12 hours\n• Start when bleeding begins (don\'t wait for severe pain)\n• Blocks prostaglandin production\n• Take with food, maximum 3-5 days\n• Paracetamol: 500-1000mg every 6 hours if NSAIDs not tolerated\n\nNon-pharmacological:\n• TENS machine: Blocks pain signals\n• Abdominal massage: Gentle clockwise circular motions\n• Orgasm: Releases endorphins, relieves cramping\n• Acupressure: LI4 point (between thumb and finger)\n\nYOGA FOR CRAMPS:\n• Child\'s pose: Compresses abdomen gently\n• Cat-cow: Mobilises spine, releases lower back\n• Supine twist: Releases hip tension\n• Legs up wall: Improves circulation\n• Pigeon pose: Opens hips\n• Hold each 5-10 breaths\n\nSLEEP OPTIMISATION:\n• Earlier bedtime: 30-60 min earlier than usual\n• Warm bath 1 hour before sleep\n• Herbal tea: Chamomile or valerian root\n• No screens: Blue light disrupts melatonin\n• Fetal position: Reduces lower back strain\n• Pillow between knees\n• Cooler room: 18-20°C\n\nDIET:\n• Smaller frequent meals every 3-4 hours\n• Front-load protein at breakfast\n• Anti-inflammatory meals: Salmon with vegetables\n• Iron-rich breakfast: Spinach omelette with orange juice\n• Magnesium-rich snacks: Dark chocolate, almonds\n• Hydration: 250ml water every 2 hours\n\nMINDSET:\n• This is temporary (peaks days 1-2, improves rapidly)\n• Your body is doing important work\n• Rest is productive\n• Lower expectations during this phase\n• Honor your cycle\'s natural rhythms\n\nPRACTICAL:\n• Cancel non-essentials\n• Meal prep earlier\n• Lower gym expectations\n• Reschedule important tasks if possible\n• Ask for help\n• Comfortable clothing: Loose, soft, no waistbands'
        }
      },
      Follicular: {
        color: '#81c784',
        training: {
          title: 'TRAINING APPROACH',
          content: 'Days 6-14. Your BEST phase for strength training, progressive overload, and achieving PRs. This is your growth phase.\n\nOPTIMAL TRAINING:\n• Heavy compound lifts: Squats, deadlifts, bench press, overhead press\n• Progressive overload: Increase weight by 2.5-5% each workout\n• Hypertrophy training: 3-4 sets of 8-12 reps\n• Test PRs: Attempt new personal records (1-3 rep max)\n• Learn new skills: Motor learning enhanced\n• High training volume: Body recovers 30% faster than luteal phase\n• Explosive movements: Power cleans, box jumps, Olympic lifts\n\nTRAINING FREQUENCY:\n• 4-6 sessions per week optimal\n• Upper/lower split or push/pull/legs\n• Can handle back-to-back training days\n• Recovery time significantly faster\n\nCARDIO CAPACITY:\n• High-intensity interval training (HIIT): Maximum benefits\n• Longer runs: Endurance improved\n• Sprints: Power output at peak\n• VO2 max training: Cardiovascular system highly responsive\n\nWHY YOU FEEL STRONG:\n• Rising estrogen increases muscle protein synthesis\n• Testosterone elevation peaks mid-follicular\n• Pain tolerance highest\n• Neuromuscular coordination enhanced\n• Glycogen storage more efficient\n• Lactic acid clearance faster\n• Connective tissue more resilient\n\nCAUTIONS:\n• Ligament laxity: ACL injury risk increases (focus on form)\n• Warm up thoroughly: Don\'t skip because you feel good\n• Progressive increases: Don\'t jump weight too aggressively\n• Listen to body: Feeling great doesn\'t mean invincible'
        },
        nutrition: {
          title: 'NUTRITION STRATEGY',
          content: 'Your body is primed to build and perform. Nutrient partitioning is optimal - your body efficiently shuttles nutrients to muscle.\n\nCARBOHYDRATE FOCUS:\nYour body handles carbs exceptionally well due to insulin sensitivity.\n• Increase complex carbs: 45-55% of total calories\n• Pre-workout: 30-50g carbs 1-2 hours before training\n• Post-workout: 30-40g carbs + 20-30g protein within 90 minutes\n• Best sources: Oats, rice, sweet potato, quinoa, fruit, whole grain bread\n• Timing: Carbs around training maximize glycogen replenishment\n\nWHY MORE CARBS:\n• Estrogen increases insulin sensitivity\n• Muscles absorb glucose more efficiently\n• Glycogen storage capacity increases\n• Performance and recovery optimised\n• Less likely stored as fat this phase\n\nPROTEIN REQUIREMENTS:\n• Target: 1.6-2.2g per kg bodyweight\n• Distribute: 25-40g per meal\n• Post-workout crucial: Muscle protein synthesis elevated\n• Quality sources: Chicken, fish, lean beef, eggs, Greek yogurt, tofu, legumes\n• Leucine-rich foods: Trigger muscle protein synthesis (whey, chicken, eggs)\n\nFAT INTAKE:\n• Moderate: 20-30% of calories\n• Focus: Omega-3s and monounsaturated fats\n• Sources: Salmon, avocado, nuts, olive oil, eggs\n• Role: Supports hormone production and nutrient absorption\n\nMICRONUTRIENTS:\n• B vitamins: Energy production (eggs, meat, legumes)\n• Zinc: Testosterone production (red meat, oysters, pumpkin seeds)\n• Magnesium: Muscle function (leafy greens, nuts, seeds)\n• Vitamin D: Aids muscle function if supplementing\n• Iron: Continue replenishing from menstrual phase\n\nMEAL TIMING:\n• Pre-workout: 1-2 hours before, carb + protein\n• During workout (if over 90min): Carb source (banana, gel)\n• Post-workout: Within 90min (optimal anabolic window)\n• Evening: Protein-rich for overnight recovery\n\nHYDRATION:\n• Baseline: 2-3L daily\n• Exercise: Add 500ml per hour of training\n• Electrolytes if sweating heavily\n• Monitor: Clear urine indicates adequate hydration\n\nAPPETITE:\n• May be higher than menstrual but lower than luteal\n• Eat to support training: Don\'t drastically cut calories\n• Trust hunger cues: Your body knows its needs\n• Focus: Nutrient timing rather than restriction'
        },
        energy: {
          title: 'ENERGY PROFILE',
          content: 'Rising steadily throughout phase. This is your power phase.\n\nHORMONAL DRIVERS:\n• Estrogen climbs progressively (50-300 pg/mL)\n• Each day you should feel incrementally better\n• Testosterone also rises (doubles from baseline)\n• Growth hormone secretion enhanced\n• Thyroid function optimised\n• Cortisol awakening response normalised\n\nPHYSICAL ENERGY:\n• Days 6-8: Noticeably better than period\n• Days 9-11: Peak performance capacity building\n• Days 12-14: Approaching absolute peak\n• Stamina: Can train longer and harder\n• Recovery: Faster between sets and sessions\n• Power output: Increases 10-15% vs menstrual phase\n• Endurance: Improved cardiovascular capacity\n• Strength: Progressive increases session to session\n\nMENTAL ENERGY:\n• Cognitive clarity: Thinking is sharp and clear\n• Focus: Can concentrate for longer periods\n• Decision making: Confidence in choices\n• Verbal fluency: Words come easily\n• Memory: Enhanced short and long-term\n• Learning: New information absorbed quickly\n• Creativity: Problem-solving enhanced\n• Motivation: High drive and goal-oriented\n\nEMOTIONAL ENERGY:\n• Mood: Optimistic and positive\n• Confidence: Self-assured and capable\n• Social energy: Desire for interaction\n• Assertiveness: Comfortable setting boundaries\n• Resilience: Bounce back from setbacks quickly\n• Enthusiasm: Excited about goals and challenges\n\nSLEEP QUALITY:\n• Sleep architecture: Improved REM and deep sleep\n• Sleep latency: Fall asleep more easily\n• Wake feeling: Refreshed and restored\n• Requirements: May need slightly less (7-8 hours vs 8-9)\n\nOPTIMISE THIS PHASE:\n• Schedule important work: Presentations, exams, deadlines\n• Start new projects: Motivation and focus high\n• Social commitments: You\'ll enjoy them\n• Try new things: Learning enhanced\n• Tackle challenges: You can handle more\n• Push boundaries: Physical and mental limits expand\n\nWHAT SUPPORTS ENERGY:\n• Adequate carbs: Fuel for high activity\n• Quality sleep: Still foundation\n• Sunlight: 20-30min morning exposure\n• Movement: Exercise energizes rather than depletes\n• Stress management: Don\'t overcommit despite feeling great'
        },
        hormones: {
          title: 'HORMONAL ACTIVITY',
          content: 'ESTROGEN: Rising steadily (50-300 pg/mL)\nDominant hormone of this phase, produced by developing ovarian follicles.\n\nEffects:\n• Brain: Increases serotonin, dopamine, acetylcholine\n• Better mood, motivation, memory, learning\n• Enhanced neuroplasticity\n• Energy: Increases mitochondrial biogenesis\n• Enhances fat oxidation\n• Improves insulin sensitivity\n• Cardiovascular: Vasodilation (better blood flow)\n• Increased stroke volume\n• Enhanced oxygen delivery\n• Musculoskeletal: Stimulates collagen synthesis\n• Ligament laxity increases (caution)\n• Bone formation markers increase\n• Muscle protein synthesis enhanced\n• Skin: Collagen and elastin production increases\n• Skin is plumper, more hydrated, glowing\n• Reduced sebum (less acne)\n• Metabolic: Improves glucose metabolism\n• Better carbohydrate utilization\n• Enhanced glycogen storage\n• Increased leptin sensitivity\n\nTESTOSTERONE: Also rising (peaks at ovulation)\nProduced by ovaries and adrenals, increases 50-100% from baseline.\n\nEffects:\n• Muscle: Enhanced protein synthesis and strength gains\n• Confidence: More assertive and risk-taking\n• Competitive drive: Desire to challenge self\n• Fat metabolism: Aids lean mass maintenance\n• Bone health: Supports bone density\n\nFOLLICLE STIMULATING HORMONE (FSH):\n• Days 1-7: High, stimulating multiple follicles\n• Days 8-14: Drops as dominant follicle selected\n• One follicle becomes dominant (will release egg)\n• Others undergo atresia (cell death)\n\nLUTEINISING HORMONE (LH):\n• Low-moderate throughout follicular phase\n• By day 12-13: Beginning to rise\n• Sets stage for dramatic surge at ovulation\n\nPROGESTERONE: Remains low (<1 ng/mL)\n• No corpus luteum yet\n• Low progesterone = no sedative effect\n• Contributes to high energy and alertness\n\nCORTISOL: Well-regulated\n• Healthy circadian rhythm (high morning, low evening)\n• Stress response appropriate\n• Recovery from stressors faster\n• Estrogen helps modulate stress response\n\nINSULIN: Sensitivity at peak\n• Muscles are insulin sensitive\n• Carbohydrates efficiently stored as glycogen\n• Blood sugar stability easier\n• Less likely to store carbs as fat\n• Optimal time for higher carb intake\n\nTHYROID: Function optimised\n• Estrogen supports thyroid hormone activity\n• Metabolism running efficiently\n• Energy production optimal\n\nGROWTH HORMONE: Enhanced secretion\n• Deep sleep produces more growth hormone\n• Supports muscle recovery and growth\n• Fat metabolism improved\n• Cellular repair optimised'
        },
        tips: {
          title: 'MAXIMIZE THIS PHASE',
          content: 'TRAINING OPTIMISATION:\n\nProgressive Overload:\n• Increase weight: 2.5-5% per session if form solid\n• Add reps: Extra 1-2 reps per set\n• Add sets: Extra set to compound movements\n• Reduce rest: Shorten rest by 15-30 seconds\n• Increase frequency: Extra training session if recovered\n\nPR Attempts:\n• Test strength: Attempt new 1-3 rep maxes\n• Time trials: Push pace for cardio PRs\n• Benchmark workouts: Retest previous standards\n• Document: Record PRs for motivation\n• Video: Capture form for future reference\n\nSkill Acquisition:\n• Learn new exercises: Olympic lifts, complex movements\n• Refine technique: Motor patterns ingrained better\n• Try new sports: Coordination enhanced\n• Challenge balance: Single-leg work, instability\n• Practice skills: Gym or sport-specific\n\nInjury Prevention:\n• Thorough warm-up: 10-15 minutes despite feeling ready\n• Form first: Don\'t sacrifice technique for weight\n• Knee stability: Focus on knee tracking (ACL vulnerable)\n• Eccentric control: Slower lowering phase\n• Proprioception work: Balance exercises\n• Adequate recovery: 48 hours between same muscle groups\n\nNUTRITION TIMING:\n\nPre-Workout:\n• Timing: 1-2 hours before\n• Composition: 30-50g carbs + 15-25g protein\n• Examples: Oatmeal with protein powder and banana, Rice with chicken and vegetables, Sweet potato with eggs\n\nPost-Workout:\n• Timing: Within 90 minutes (earlier better)\n• Composition: 30-40g carbs + 20-30g protein\n• Examples: Protein shake with banana, Greek yogurt with berries and granola, Chicken with rice and vegetables\n\nDaily Structure:\n• Breakfast: Protein-rich to stabilise blood sugar\n• Lunch: Balanced with carbs (you handle them well)\n• Dinner: Protein + veggies + moderate carbs\n• Snacks: Protein-focused, strategic carbs around training\n• earn skills: Language,ourses: Information retained\n• Practice mindfulness: Easier to focus\n• Goal setting: Clarity on what you want\n\nRECOVERY:\n\nSleep: 7-8 hours, maintain consistent schedule\nActive Recovery: Yoga, swimming, walking, foam rolling\nRestoration: Massage, Epsom bath, sauna, meditation\n\nSupplementation (with doctor approval):\n• Protein powder if struggling to hit targets\n• Creatine: 5g daily enhances strength gains\n• Omega-3: 1-2g if not eating fatty fish\n• Vitamin D if deficient\n• Magnesium: 300-400mg evening\n• Zinc: 15-30mg if deficient\n• B complex: Supports energy production\n\nMINDSET:\n• Recognize this is YOUR time: Use it wisely\n• Build momentum: Gains compound\n• Document wins: Track PRs and achievements\n• Take risks: Try things outside comfort zone\n• Be bold: Confidence is authentic\n• Trust yourself: Instincts are sharp\n• Don\'t overcommit: Still need recovery\n• Maintain boundaries: Can say no despite energy\n• Rest is productive: Even when feeling great\n• Enjoy: Savor feeling good\n\nAvoid:\n• Comparison trap: This is your peak, not all phases\n• Overtraining: More isn\'t always better\n• Pushing injuries: Don\'t ignore warning signs\n• Sleep deprivation: Foundation of all gains\n• Neglecting nutrition: Fuel the high activity'
        }
      },
      Ovulation: {
        color: '#ffd54f',
        training: {
          title: 'TRAINING APPROACH',
          content: 'Days 15-16. PEAK strength and power window. This is your absolute performance peak - approximately 48 hours.\n\nOPTIMAL TRAINING:\n• Maximum strength testing: Go for 1-rep maxes\n• Power movements: Box jumps, Olympic lifts, sprints\n• Explosive work: Plyometrics, jump squats, power cleans\n• Complex movements: Your coordination is at absolute best\n• High-intensity work: HIIT sessions highly effective\n• Strength endurance: Can combine strength and cardio effectively\n\nWHY YOU\'RE AT PEAK:\n• Estrogen peaks before dropping\n• Testosterone at highest point of entire cycle\n• LH surge provides acute performance boost\n• Pain tolerance at absolute maximum\n• Neuromuscular coordination optimised\n• Motor unit recruitment maximized\n• Muscle contractile capacity enhanced\n• Central nervous system primed for max output\n\nPERFORMANCE MARKERS:\n• Strength: 5-8% higher than follicular average\n• Power output: Maximum explosive capability\n• Reaction time: Fastest of entire cycle\n• Coordination: Complex movements feel easy\n• Grip strength: Peaks during ovulation\n• Vertical jump: Highest point\n• Sprint times: Fastest\n\nTRAINING CONSIDERATIONS:\n• Short window: Only 24-48 hours at absolute peak\n• Recovery still needed: Don\'t train to complete failure daily\n• Form crucial: High confidence can lead to form breakdown\n• Ligament laxity: Still elevated from follicular phase\n• Warm up thoroughly: Don\'t skip despite feeling invincible\n\nIDEAL SESSION STRUCTURE:\n• Compound movement focus\n• Lower rep ranges (1-5 reps) for strength\n• Longer rest periods (3-5 min) for full recovery\n• Technical lifts: Best time to test or learn\n• Video your best lifts: Capture peak performance\n\nCAUTIONS:\n• Highest injury risk of cycle due to confidence + laxity\n• Don\'t test maxes multiple days in a row\n• Listen to joints and connective tissue\n• Ego can override good judgment - stay mindful\n• Adequate sleep critical for CNS recovery'
        },
        nutrition: {
          title: 'NUTRITION STRATEGY',
          content: 'Your body is at peak metabolic efficiency. Nutrient utilization is optimal across all macronutrients.\n\nMACRONUTRIENT BALANCE:\n• Balanced approach: No need to favor carbs or fats\n• Carbohydrates: 40-50% of calories (moderate-high)\n• Protein: 25-30% of calories (1.8-2.2g/kg)\n• Fats: 25-30% of calories\n• Your body efficiently uses all fuel sources\n\nWHY BALANCED:\n• Insulin sensitivity remains high\n• Fat oxidation capability excellent\n• Protein synthesis still elevated\n• Metabolic flexibility at peak\n• Nutrient partitioning optimal\n• Less likely to store excess as fat\n\nTIMING AROUND TRAINING:\n• Pre-workout: 40-60g carbs + 20-30g protein\n• Larger pre-workout meal tolerated due to efficient digestion\n• Post-workout: 40-50g carbs + 25-35g protein\n• Your anabolic window is maximized\n• Faster glycogen replenishment\n• Enhanced muscle protein synthesis\n\nMETABOLIC RATE:\n• Basal metabolic rate at highest point\n• You naturally burn 5-10% more calories at rest\n• Can tolerate slight caloric surplus better\n• Good time for refeeds if dieting\n• Less likely to store excess as fat\n• Excellent nutrient partitioning to muscle\n\nHYDRATION:\n• Critical during this phase\n• Baseline: 3-3.5L daily\n• Add 500-750ml per hour of training\n• Electrolytes important: Sodium, potassium, magnesium\n• Cervical fluid production increases (normal)\n• Monitor urine: Should be pale yellow\n\nMICRONUTRIENTS:\n• Continue all minerals from follicular phase\n• Antioxidants: High intensity training creates oxidative stress\n• Vitamin C: Supports connective tissue (berries, citrus)\n• Vitamin E: Anti-inflammatory (nuts, seeds, avocado)\n• Zinc: Supports immune function during high training load\n• Magnesium: Muscle function and recovery\n\nAPPETITE:\n• May be moderate to high\n• Hunger signals trustworthy\n• Don\'t restrict during this peak performance window\n• Honor increased appetite from training intensity\n• Focus on nutrient-dense foods\n• Meal timing becomes more important\n\nPRE/POST WORKOUT EXAMPLES:\nPre-workout (2 hours before):\n• Large bowl oatmeal with protein powder, banana, berries\n• Rice bowl with grilled chicken, sweet potato, vegetables\n• Whole grain toast with eggs, avocado, fruit\n\nPost-workout (within 60 min):\n• Large protein shake with banana, berries, oats\n• Chicken breast with rice and roasted vegetables\n• Salmon with quinoa and leafy greens\n• Greek yogurt with granola, fruit, nuts'
        },
        energy: {
          title: 'ENERGY PROFILE',
          content: 'Absolute peak of entire cycle. You may feel invincible - and physiologically, you\'re not far off.\n\nPHYSICAL ENERGY:\n• Maximum strength output\n• Peak power and explosiveness\n• Highest endurance capacity\n• Fastest recovery between sets\n• Minimal fatigue from training\n• Can handle higher training volume and intensity\n• Stamina seems unlimited\n• Movement feels effortless\n• Coordination at peak\n\nMENTAL ENERGY:\n• Crystal clear thinking\n• Razor-sharp focus\n• Quick decision making\n• Peak verbal fluency and communication\n• Maximum confidence in abilities\n• Strategic thinking optimised\n• Memory at best (both working and long-term)\n• Learning and retention maximized\n• Problem-solving feels easy\n• Creative solutions flow naturally\n\nEMOTIONAL ENERGY:\n• Peak confidence and self-assurance\n• Charisma and social magnetism\n• Natural leadership presence\n• Assertive without aggression\n• Highly motivated and goal-oriented\n• Positive, optimistic outlook\n• Emotional resilience strong\n• Stress doesn\'t impact as heavily\n• Feel attractive and desirable\n• High self-worth\n\nLIBIDO:\n• At absolute highest point\n• Biological drive to reproduce peaks\n• Increased sexual thoughts and desires\n• Physical sensitivity heightened\n• Natural lubrication maximum\n• Orgasms easier to achieve and more intense\n• Pheromone production peaks\n• Perceived as more attractive by others\n\nSOCIAL ENERGY:\n• Highly extroverted energy\n• Want to be around people\n• Communication feels effortless\n• Reading social cues enhanced\n• Empathy and emotional intelligence high\n• Charismatic presence\n• Natural conversationalist\n• Networking feels natural\n\nCOGNITIVE PEAK:\n• Verbal skills at absolute best\n• Spatial reasoning enhanced\n• Mathematical/analytical thinking sharp\n• Creative thinking maximized\n• Can multitask effectively\n• Attention span longest\n• Processing speed fastest\n• Decision making confident and accurate\n\nSLEEP:\n• May need slightly less (7-8 hours)\n• Fall asleep easily despite high energy\n• Sleep quality excellent\n• Wake feeling ready to conquer world\n• Dreams may be vivid\n• REM sleep optimised\n\n WHAT SUPPORTS THIS PEAK:\n• Adequate fuel: Don\'t under-eat\n• Strategic caffeine: Amplifies already high energy\n• Quality sleep: 7-8 hours to support CNS\n• Stress management: Don\'t waste peak on stress\n• Capture momentum: Document achievements\n• Social interaction: Energizes you further\n• Physical activity: Enhances rather than depletes'
        },
        hormones: {
          title: 'HORMONAL ACTIVITY',
          content: 'ESTROGEN: Peaks then drops\nReaches highest level (200-400 pg/mL) then sharply declines.\n\nPeak estrogen effects:\n• Maximum neurotransmitter production\n• Optimal insulin sensitivity\n• Peak cardiovascular efficiency\n• Maximum collagen synthesis\n• Skin at most radiant\n• Best fat oxidation\n• Enhanced mitochondrial function\n\nThe drop:\n• Triggers LH surge\n• Can cause energy dip 12-24 hours post-ovulation\n• Some women feel this transition, others don\'t\n• Minor headache possible from rapid drop\n\nLUTEINISING HORMONE (LH): SURGE\nDramatic spike that triggers ovulation.\n\nEffects:\n• 5-10x increase in 24-48 hours\n• Causes dominant follicle to release egg\n• Brief performance boost (many athletes report this)\n• Increased alertness and energy\n• Enhanced motor unit recruitment\n• Improved neuromuscular coordination\n\nTESTOSTERONE: At absolute peak\nHighest level of entire cycle (double baseline).\n\nEffects:\n• Maximum muscle protein synthesis\n• Peak strength and power output\n• Highest competitive drive\n• Maximum confidence and assertiveness\n• Peak libido\n• Enhanced aggression (in positive, competitive way)\n• Improved spatial reasoning\n• Increased risk-taking behavior\n• Enhanced athletic performance\n\nFOLLICLE STIMULATING HORMONE (FSH): Low\nHas done its job, now suppressed by high estrogen.\n\nPROGESTERONE: Beginning to rise slightly\nCorpus luteum begins forming after egg release.\n\nEarly effects:\n• Very minimal at this point\n• Slight temperature increase (0.2-0.3°C)\n• Not yet causing sedative effects\n• Won\'t impact performance during ovulation itself\n\nCORTISOL: Well-regulated\n• Stress response appropriate\n• High training intensity tolerated well\n• Recovery from stressors quick\n• Circadian rhythm optimal\n\nINSULIN: Sensitivity still excellent\n• Carbohydrate tolerance high\n• Glucose uptake efficient\n• Glycogen storage optimised\n• Fat storage minimized\n\nGROWTH HORMONE: Secretion maximized\n• Peak during deep sleep\n• Supports muscle recovery from intense training\n• Fat metabolism enhanced\n• Protein synthesis supported\n• Cellular repair optimised\n\nOXYTOCIN: Can spike\n• "Bonding hormone"\n• Enhances social bonding\n• Promotes trust and connection\n\n PHEROMONES: Production peaks\n• Copulins at highest concentration\n• Biological signaling for fertility\n• Studies show women rated as more attractive\n• Voice pitch slightly higher\n• Facial symmetry perceived as better\n• Body language more open and confident'
        },
        symptoms: {
          title: 'TYPICAL EXPERIENCES',
          content: 'PHYSICAL PEAK:\n• Maximum strength and power\n• Peak athletic performance\n• Fastest reaction times\n• Best coordination and balance\n• Highest pain tolerance\n• Minimal muscle soreness\n• Fastest recovery\n• Glowing, radiant skin (absolute peak)\n• Shiny, healthy hair\n• Bright, clear eyes\n• Symmetrical facial features (perceived)\n• Strong, fast-growing nails\n• Body feels light and capable\n\nENERGY AND VITALITY:\n• Feel invincible or superhuman\n• Boundless energy\n• Can accomplish anything\n• Minimal fatigue despite activity\n• Sleep deeply but need less\n• Wake energized and ready\n• Stamina seems unlimited\n\nCOGNITIVE PEAK:\n• Sharpest mental clarity of cycle\n• Lightning-fast thinking\n• Excellent memory\n• Quick wit and humor\n• Verbal fluency maximized\n• Can articulate thoughts perfectly\n• Complex problems solved easily\n• Creative ideas flow\n• Strategic thinking optimal\n\nEMOTIONAL PEAK:\n• Maximum confidence\n• Self-assured and bold\n• Natural charisma\n• Magnetic personality\n• Leadership presence\n• Assertive communication\n• Fearless in approaching challenges\n• Optimistic outlook\n• High self-esteem\n• Feel attractive and desirable\n\nSOCIAL PEAK:\n• Most extroverted\n• Desire social interaction\n• Conversations flow effortlessly\n• Charismatic and engaging\n• Others drawn to you\n• Reading social cues expertly\n• Empathetic and understanding\n• Natural networking\n• Make strong first impressions\n\nSEXUAL PEAK:\n• Highest libido of entire cycle\n• Frequent sexual thoughts\n• Increased physical sensitivity\n• Easy arousal\n• Natural lubrication maximum\n• Cervical fluid (clear, stretchy - "egg white")\n• Orgasms intense and easily achieved\n• Multiple orgasms more likely\n• Feel sexually confident\n• Attraction to partners peaks\n\nPHYSICAL SIGNS OF OVULATION:\n• Mittelschmerz: Brief one-sided pelvic pain (not everyone)\n• Ovulation spotting: Light pink/brown spotting (some women)\n• Cervical fluid: Clear, stretchy, abundant\n• Basal body temperature: Slight rise post-ovulation\n• Cervix position: High, soft, open\n• Breast tenderness: May begin\n• Increased sense of smell\n• Heightened taste sensitivity\n• Slight bloating (some women)\n\nPOTENTIAL MINOR NEGATIVES:\n• Mittelschmerz (ovulation pain): 20% of women\n• Brief headache: From estrogen drop\n• Heightened emotions: Can swing from high confidence to brief vulnerability\n• Increased sensitivity: To criticism or rejection\n• Overconfidence: May take excessive risks\n• Overcommitment: Say yes to too much\n• Difficulty winding down: Mind racing with ideas\n• Restlessness: Hard to sit still\n\nPOST-OVULATION TRANSITION (Hours 24-48):\n• Energy may dip slightly as estrogen drops\n• Brief emotional vulnerability\n• Mild cramping possible\n• Appetite may increase\n• Desire for rest after peak performance\n• These are normal signs of hormonal transition'
        },
        tips: {
          title: 'MAXIMIZE THIS PEAK',
          content: 'PERFORMANCE OPTIMISATION:\n\nTesting Maxes:\n• Schedule max testing during this 48-hour window\n• 1-rep max attempts: Squat, deadlift, bench press\n• Power testing: Vertical jump, broad jump, sprint times\n• Benchmark workouts: Retest standards\n• Competition: If possible, compete during ovulation\n• Document: Video and record all PRs\n\nTraining Approach:\n• Low reps, high weight: 1-5 rep range\n• Long rest periods: 3-5 minutes between sets\n• Compound movements: Multi-joint exercises\n• Explosive work: Plyometrics, Olympic lifts\n• Technical practice: Perfect form on complex lifts\n• Skill work: Learn new movements\n\nRecovery:\n• Despite feeling great, recovery still critical\n• Don\'t max out multiple days in a row\n• 48 hours between same muscle groups\n• Sleep 7-8 hours minimum\n• Active recovery: Light movement between sessions\n• Stretching: Ligaments still lax\n• Ice baths: If training at very high intensity\n\nInjury Prevention:\n• Warm up 15-20 minutes (thorough)\n• Don\'t let confidence override form\n• Video yourself: Check technique\n• Knee stability: ACL still vulnerable\n• Ankle stability: Focus on proprioception\n• Listen to joints: Connective tissue stress\n• Stop if sharp pain: Overconfidence can mask warning signs\n\nCARREER AND WORK:\n\nSchedule Strategically:\n• Important presentations: During ovulation\n• Salary negotiations: Assertiveness peaks\n• Job interviews: Peak performance\n• Client pitches: Communication optimal\n• Public speaking: Verbal fluency maximized\n• Difficult conversations: Confidence high\n• Performance reviews: Self-advocacy strong\n• Networking events: Social magnetism\n• Creative brainstorming: Ideas flow\n• Strategic planning: Big-picture thinking\n\nProductivity:\n• Tackle most challenging projects\n• Complex problem-solving\n• Important decisions: Judgment is sound\n• Multi-project management: Can juggle effectively\n• Leadership tasks: Natural presence\n• Teaching or mentoring: Communication clear\n• Writing: Ideas flow easily\n• Public-facing work: Charisma peaks\n\nSOCIAL AND RELATIONSHIPS:\n\nSocial Strategy:\n• First dates: Peak attractiveness and confidence\n• Important social events: Networking maximized\n• Meeting new people: First impressions strong\n• Reconnecting: Communication effortless\n• Group activities: Leadership natural\n• Parties or gatherings: Most extroverted\n• Collaboration: Team work optimised\n• Conflict resolution: Communication and empathy high\n\nLIFESTYLE OPTIMISATION:\n\nCapture the Momentum:\n• Document achievements: Journal PRs and wins\n• Take photos: You look your best\n• Video content: If creating content, film now\n• Voice recordings: Pitch is optimal\n• Start projects: Motivation will carry forward\n• Set goals: Clarity is maximum\n• Make vision boards: Creative visualisation peaks\n\nSelf-Care:\n• Professional photos: Book during ovulation\n• Special events: Schedule haircuts, important outings\n• Try new things: Confidence supports risk-taking\n• Solo adventures: You can handle anything\n• Skill building: Learn something new\n• Mindfulness: Ground high energy\n• Gratitude: Appreciate this peak\n\nNutrition:\n• Eat enough: Don\'t restrict during peak performance\n• Pre-workout: Fuel intense training (40-60g carbs)\n• Post-workout: Maximize recovery (40-50g carbs, 25-35g protein)\n• Hydration: 3-3.5L water daily minimum\n• Electrolytes: Support high activity\n• Protein: 1.8-2.2g/kg bodyweight\n• Carbs: 40-50% of calories\n• Trust hunger: Your body knows its needs\n\nMindset:\n• Embrace confidence: It\'s authentic, not arrogance\n• Take calculated risks: Judgment is sound\n• Speak up: Voice your ideas and needs\n• Lead: Others respond to your natural presence\n• Trust instincts: They\'re sharp right now\n• Document wins: You\'ll want reminders later\n• Be bold: This is your time\n• Connect: Social energy is genuine\n\nAvoid:\n• Overconfidence: Can lead to injury or poor decisions\n• Overcommitment: Saying yes to everything\n• Neglecting recovery: Despite feeling invincible\n• Comparing: This is your peak, not sustainable daily\n• Excessive caffeine: Already naturally high energy\n• Alcohol: Blunts performance edge\n• Sleep deprivation: Undermines CNS recovery\n• Junk food: You want premium fuel\n\nPREPARE FOR TRANSITION:\n• Recognize this is 48-hour peak\n• Luteal phase begins immediately after\n• Energy will normalise (not crash, just moderate)\n• Don\'t panic when you don\'t feel this way daily\n• Document what worked: Replicate next cycle\n• Appreciate: This phase will return\n• Rest after: Allow recovery from peak output'
        }
      },
      Luteal: {
        color: '#9575cd',
        training: {
          title: 'TRAINING APPROACH',
          content: 'Days 17-28. Your body shifts to maintenance and recovery mode. Training should support, not stress your system.\n\nEARLY LUTEAL (Days 17-21):\nStill relatively good energy and performance.\n• Moderate intensity training\n• Maintenance of strength: Same weights as follicular but don\'t push for PRs\n• Steady-state cardio: Endurance work well-tolerated\n• Technique refinement: Perfect form on lifts\n• Volume over intensity: More reps at moderate weight\n• Recovery focus: Longer rest between sets\n\nLATE LUTEAL (Days 22-28):\nEnergy declines, PMS symptoms emerge.\n• Lower intensity: 60-70% of max effort\n• Listen to body: Some days need complete rest\n• Gentle cardio: Walking, easy cycling, swimming\n• Yoga and stretching: Restorative practices\n• Mobility work: Joint health and flexibility\n• Avoid: PRs, max efforts, competition\n\nWHY THIS APPROACH:\n• Progesterone is catabolic (breaks down muscle)\n• Body temperature elevated (harder to cool during exercise)\n• Increased perceived exertion (feels harder)\n• Slower recovery between sets and sessions\n• Reduced pain tolerance\n• Coordination may decrease\n• Strength down 5-10% from ovulation peak\n• Injury risk increases if pushing too hard\n\nTRAINING FREQUENCY:\n• Early luteal: 3-5 sessions per week\n• Late luteal: 2-4 sessions, with rest days as needed\n• Focus on consistency over intensity\n• REST DAYS ARE PRODUCTIVE: Your body needs them\n\nENDURANCE ADVANTAGE:\n• Late luteal: Better at using fat for fuel\n• Longer steady-state cardio well-tolerated\n• Good phase for zone 2 cardio (conversational pace)\n• Marathon runners: This phase can be advantageous\n• Less reliance on carbohydrates\n\nAVOID:\n• Comparing performance to follicular/ovulation phases\n• Pushing through fatigue or pain\n• High-intensity interval training (especially late luteal)\n• Testing maxes or PRs\n• New, complex movement patterns\n• Training to complete failure\n• Multiple days without rest\n\nMENTAL GAME:\n• Progress isn\'t just about intensity\n• Maintenance IS progress\n• Rest supports next follicular phase gains\n• Your body is preparing for menstruation\n• Lower output now = better performance next cycle\n• Trust the process\n\nSIGNS TO REST:\n• Unusually sore or fatigued\n• Irritable or emotional\n• Not recovering between sessions\n• Loss of motivation\n• Sleep disrupted\n• Appetite significantly increased\n• Cramping or PMS symptoms starting\n\nALTERNATIVE ACTIVITIES:\n• Restorative yoga\n• Walking in nature\n• Swimming or water aerobics\n• Gentle cycling\n• Tai chi or qigong\n• Stretching and mobility\n• Breathwork and meditation\n• Foam rolling and myofascial release'
        },
        nutrition: {
          title: 'NUTRITION STRATEGY',
          content: 'Your body\'s needs shift dramatically. Increased appetite and cravings are HORMONAL, not weakness.\n\nCALORIC NEEDS INCREASE:\n• Metabolic rate rises 5-10% in late luteal phase\n• Body temperature elevated (0.3-0.5°C)\n• You legitimately need 100-300 MORE calories daily\n• This is biological, not psychological\n• Restriction during this phase backfires\n• Honor increased hunger\n\nWHY YOU\'RE HUNGRIER:\n• Progesterone increases appetite\n• Body preparing for potential pregnancy\n• Increased cellular metabolism\n• Higher body temperature requires more energy\n• Serotonin drops (triggers carb cravings)\n• Blood sugar less stable\n\nCRAVINGS EXPLAINED:\n• Sweet cravings: Low serotonin, body seeking carbs to boost it\n• Salty cravings: Progesterone causes sodium loss\n• Chocolate: Magnesium deficiency (period approaching)\n• Carb-heavy foods: Body\'s preferred fuel source shifts\n• These are not "bad" - they\'re biological signals\n\nNUTRITION STRATEGY:\n\nCARBOHYDRATES:\n• Increase complex carbs: 50-60% of calories\n• Why: Supports serotonin production, stabilises mood\n• Best sources: Oats, rice, potatoes, quinoa, fruit\n• Timing: Throughout day, especially evening\n• Helps: Mood, sleep, energy, cravings\n\nPROTEIN:\n• Maintain: 1.6-2.0g per kg bodyweight\n• Why: Combats catabolic effects of progesterone\n• Supports: Muscle maintenance, satiety\n• Sources: Continue variety from earlier phases\n• Don\'t neglect: Even if craving carbs\n\nFATS:\n• Moderate to higher: 25-35% of calories\n• Why: Hormone production, satiety, temperature regulation\n• Focus: Omega-3s (anti-inflammatory for upcoming period)\n• Sources: Salmon, avocado, nuts, olive oil, eggs\n• Helps: Reduce future period cramps\n\nSODIUM:\n• Don\'t restrict: Progesterone causes sodium loss\n• Moderate increase: 2500-3000mg daily\n• Why: Prevents excessive water retention paradoxically\n• Sources: Sea salt, electrolytes, pickles, olives\n• Helps: Energy, prevents dizziness\n\nMAGNESIUM:\n• Critical in late luteal: 400-500mg daily\n• Why: Drops before period, deficiency worsens PMS\n• Sources: Dark chocolate, pumpkin seeds, spinach, almonds\n• Supplementation: Evening dose helps sleep and cramping\n• Benefits: Mood, sleep, reduces cramping, eases PMS\n\nCALCIUM:\n• Important: 1000-1200mg daily\n• Why: Reduces PMS symptoms by 50% in studies\n• Sources: Dairy, leafy greens, fortified foods\n• Timing: Spread throughout day\n• Benefits: Mood, reduces water retention, supports bone\n\nB VITAMINS:\n• B6 especially: 50-100mg daily\n• Why: Supports serotonin production, reduces bloating\n• B12: Combats fatigue\n• Folate: Mood support\n• Sources: Whole grains, meat, eggs, leafy greens\n\nCOMPLEX CARBS TO EMPHASIZE:\n• Oatmeal: Slow-release energy, supports serotonin\n• Sweet potato: Nutrient-dense, satisfying\n• Brown rice: Filling, stable energy\n• Quinoa: Complete protein + carbs\n• Whole grain bread: Practical, satisfying\n• Fruit: Natural sugars, vitamins, fiber\n\nCRAVING MANAGEMENT:\n• Don\'t restrict: Leads to binges\n• Plan for cravings: Keep dark chocolate, popcorn, fruit\n• Balanced approach: Pair cravings with protein\n• Example: Dark chocolate with almonds\n• Example: Popcorn with cheese\n• Example: Fruit with Greek yogurt\n• Mindful eating: Enjoy without guilt\n\nFOODS THAT HELP PMS:\n• Fatty fish: Omega-3s reduce inflammation\n• Leafy greens: Magnesium and calcium\n• Nuts and seeds: Magnesium, healthy fats\n• Dark chocolate: Magnesium, satisfies cravings\n• Bananas: B6, potassium\n• Whole grains: B vitamins, steady energy\n• Legumes: Protein, fiber, B vitamins\n\nFOODS TO LIMIT:\n• Excess caffeine: Worsens anxiety and sleep\n• Refined sugars: Blood sugar crashes worsen mood\n• Excess alcohol: Disrupts sleep, worsens symptoms\n• Processed foods: Increase inflammation\n• Excessive sodium: If already bloated (but don\'t eliminate)\n\nHYDRATION:\n• Counterintuitive: Drink MORE water for bloating\n• Target: 2.5-3L daily\n• Why: Helps flush excess sodium\n• Herbal teas: Peppermint (anti-bloating), chamomile (calming)\n• Limit: Caffeine to 200mg max\n\nMEAL TIMING:\n• Breakfast: Protein + complex carbs (stabilise blood sugar)\n• Lunch: Balanced (protein + carbs + fats)\n• Afternoon snack: When cravings peak (planned snack)\n• Dinner: Carb-focused (supports sleep and mood)\n• Evening: Small snack if hungry (don\'t ignore hunger)\n\nPORTION GUIDANCE:\n• Trust hunger cues: They\'re accurate\n• Eat every 3-4 hours: Prevents blood sugar crashes\n• Don\'t skip meals: Worsens cravings and mood\n• Mindful portions: Satisfying but not overfull\n• Remember: You need more calories this phase\n\nMINDSET:\n• Your appetite is not a moral failing\n• Increased hunger is hormonal and legitimate\n• Restriction worsens PMS and next period\n• Food is fuel, especially now\n• Honor your body\'s needs\n• Plan for cravings rather than fighting them\n• Extra calories now = better performance next cycle'
        },
        energy: {
          title: 'ENERGY PROFILE',
          content: 'Energy trajectory declines from ovulation peak. This is normal, cyclical, and temporary.\n\nEARLY LUTEAL (Days 17-21):\nModerate energy, manageable.\n• Noticeable drop from ovulation but still functional\n• Can maintain most activities\n• May need strategic caffeine\n• Afternoon energy dip common\n• Social energy decreases\n• Desire for downtime increases\n\nLATE LUTEAL (Days 22-28):\nEnergy significantly lower, PMS emerges.\n• Fatigue increases progressively\n• Mornings hardest (despite full sleep)\n• Brain fog and slower thinking\n• Reduced motivation\n• Everything feels harder\n• Social withdrawal intensifies\n• Need more rest and sleep\n\nPHYSICAL ENERGY:\n• Stamina reduced: 20-30% less than ovulation\n• Perceived exertion higher: Same workout feels harder\n• Recovery slower: Between sets and sessions\n• Body temperature elevated: Harder to cool during exercise\n• Coordination may decrease: Movement less fluid\n• Strength down: 5-10% from peak\n• Endurance variable: Some women maintain, others don\'t\n\nMENTAL ENERGY:\n• Cognitive function: Slower processing speed\n• Focus: Harder to concentrate for long periods\n• Memory: Working memory may be affected\n• Decision making: Takes more effort\n• Verbal fluency: Words don\'t come as easily\n• Motivation: Lower drive\n• Multitasking: More challenging\n• Mental fatigue: Sets in quickly\n\nEMOTIONAL ENERGY:\n• Mood baseline lower\n• Irritability increases\n• Emotional sensitivity heightened\n• Patience reduced\n• Social battery drains faster\n• Desire for solitude\n• Self-criticism increases\n• Anxiety may spike\n• Depression symptoms possible (for some)\n\nWHY ENERGY DROPS:\n\nProgesterone effects:\n• Sedative properties: Makes you sleepy\n• Body temperature increase: Feels like mild fever\n• Metabolism shifts: Uses more energy at rest\n• Smooth muscle relaxation: Can cause sluggishness\n\nEstrogen decline:\n• Drops after ovulation peak\n• Serotonin decreases with estrogen\n• Dopamine also affected\n• Neurotransmitter changes affect mood and energy\n\nOther factors:\n• Sleep quality: Often disrupted in late luteal\n• Inflammation: Increases before period\n• Water retention: Feels heavy, bloated\n• Blood sugar: Less stable\n• Cortisol: May be elevated\n• PMS symptoms: Drain energy\n\nWHAT HELPS ENERGY:\n\nSleep:\n• Go to bed 30-60 minutes earlier\n• Target 8-9 hours (need more this phase)\n• Consistent sleep schedule\n• Cool room (progesterone raises temp)\n• No screens 1 hour before bed\n• Magnesium before bed\n\nNutrition:\n• Don\'t restrict calories: Worsens energy\n• Complex carbs throughout day\n• Protein at every meal\n• Frequent meals: Every 3-4 hours\n• Iron-rich foods: Preparing for period\n• Hydration: 2.5-3L water\n• Limit caffeine: After 2pm\n\nMovement:\n• Gentle exercise: Walks, yoga, swimming\n• Don\'t force intensity: Depletes further\n• Sunlight: 20-30 min daily\n• Nature exposure: Restorative\n• Stretching: Releases tension\n\nStress Management:\n• Lower expectations: Of yourself\n• Say no: To non-essentials\n• Simplify: Routines and commitments\n• Ask for help: From partner, family, friends\n• Reduce stimulation: Quiet, calm environment\n• Meditation: 10-15 min daily\n• Breathwork: Calming practices\n\nWHAT DOESN\'T HELP:\n\n• Caffeine overload: Temporary boost, then crash + anxiety\n• Sugar for energy: Blood sugar rollercoaster worsens mood\n• Pushing through: Leads to burnout\n• Comparing to other phases: Unrealistic expectations\n• Ignoring needs: Compounds fatigue\n• Over-scheduling: Overwhelms already low energy\n• Alcohol: Disrupts sleep, worsens symptoms\n• Intense exercise: Depletes further\n\nSocial:\n• You won\'t want to socialise as much\n• This is normal, not antisocial\n• It\'s okay to decline invitations\n• Prioritize restful socialising\n• Small groups better than large\n• Short interactions better than long\n\nGym:\n• Performance will be lower\n• Don\'t compare to other phases\n• Maintenance is success\n• Showing up counts\n• Rest days are productive\n• You\'re preparing for next cycle\n\nREMEMBER:\n• This is temporary: 5-12 days typically\n• It\'s cyclical: Will improve with period\n• It\'s biological: Not a personality flaw\n• It\'s purposeful: Body is preparing\n• It\'s normal: Every woman experiences this\n• It cycles back: Follicular energy returns'
        },
        hormones: {
          title: 'HORMONAL ACTIVITY',
          content: 'PROGESTERONE: Dominant hormone\nRises steadily after ovulation, peaks mid-luteal, drops before period.\n\nEarly luteal (days 17-21): Rising\n• 2-5 ng/mL and climbing\n• Beginning to exert effects\n\nMid luteal (days 21-24): Peak\n• 10-20 ng/mL (peak if no pregnancy)\n• Maximum effects felt\n\nLate luteal (days 25-28): Dropping\n• Rapid decline triggers menstruation\n• PMS symptoms worsen during drop\n\nProgesterone effects:\n• Sedation: GABA-like action on brain\n• Temperature: Raises body temp 0.3-0.5°C\n• Appetite: Increases significantly\n• Metabolism: Increases 5-10%\n• Smooth muscle: Relaxes (can cause bloating)\n• Catabolic: Breaks down muscle tissue\n• Fluid retention: Sodium and water\n• Breathing: Slightly increased rate\n• Sleep: Can be sedating but also disruptive\n• Mood: Can worsen mood in sensitive individuals\n\nESTROGEN: Declines after ovulation peak\nDrop after ovulation, slight rise mid-luteal, drops before period.\n\nPattern:\n• Post-ovulation: Sharp drop from peak\n• Mid-luteal: Small secondary rise\n• Late luteal: Drops to lowest levels\n\nLow estrogen effects (late luteal):\n• Serotonin drops: Mood declines\n• Dopamine drops: Motivation decreases\n• Energy production: Mitochondrial function reduced\n• Insulin sensitivity: Decreases\n• Water retention: Increases\n• Skin: Can become drier or break out\n• Libido: Decreases for most\n\nESTROGEN-PROGESTERONE BALANCE:\nThe RATIO matters more than absolute levels.\n\nEarly luteal:\n• Progesterone rising, estrogen moderate\n• Relatively balanced\n• Symptoms mild\n\nLate luteal:\n• Both hormones dropping\n• Progesterone drops faster\n• Imbalance causes PMS\n• Estrogen dominance possible (if progesterone drops too fast)\n\nTESTOSTERONE: Gradual decline\nDrops from ovulation peak back to baseline.\n\nEffects of declining testosterone:\n• Strength decreases\n• Muscle protein synthesis reduces\n• Competitive drive lowers\n• Assertiveness decreases\n• Libido declines\n• Confidence may decrease\n\nSEROTONIN: Significant drop\nDeclines with estrogen, lowest in late luteal.\n\nLow serotonin causes:\n• Low mood, sadness\n• Irritability\n• Anxiety\n• Carb cravings (body trying to boost serotonin)\n• Sleep disturbances\n• Pain sensitivity increases\n• Digestive changes\n\nThis is why SSRIs can help severe PMS/PMDD.\n\nCORTISOL: May be dysregulated\nStress response exaggerated.\n\nLate luteal cortisol:\n• Morning spike may be higher\n• Evening decline delayed\n• Stress feels more overwhelming\n• Anxiety increases\n• Sleep disrupted\n• Why stress management crucial\n\nINSULIN: Sensitivity decreases\nCells become more insulin resistant.\n\nEffects:\n• Carb cravings increase\n• Blood sugar less stable\n• Energy crashes more common\n• Fat storage more likely\n• Why frequent meals help\n• Need more carbs for same effect\n\nALDOSTERONE: Increases\nCauses sodium and water retention.\n\nEffects:\n• Water weight gain: 2-5 pounds normal\n• Bloating\n• Breast tenderness\n• Feeling "puffy"\n• Temporary - resolves with period\n• Why reducing sodium backfires\n\nPROSTAGLANDINS: Begin rising late luteal\nPreparing for menstruation.\n\nEarly effects:\n• Inflammation increases\n• May cause early cramping\n• Digestive changes\n• Body aches\n• Why anti-inflammatory diet helps\n\nMELATONIN: May be disrupted\nSleep hormone affected by progesterone.\n\nEffects:\n• Sleep architecture altered\n• May have trouble falling asleep\n• Or wake frequently\n• Non-restorative sleep\n• Vivid dreams or nightmares\n• Contributes to fatigue\n\nTHYROID: Progesterone can suppress\nT3/T4 levels may decrease slightly.\n\nEffects:\n• Metabolism slows (paradoxically, while also elevated)\n• Can feel sluggish\n• Temperature regulation affected\n• Contributes to fatigue\n\nOXYTOCIN: Lower than ovulation\n• Bonding hormone reduced\n• Less desire for intimacy\n• May feel more isolated\n• Need for connection varies\n\nENDORPHINS: Reduced\n• Natural pain relief lower\n• Pain sensitivity increases\n• Exercise feels harder\n• Why gentle movement still helps (boosts endorphins)\n\nPMS/PMDD NOTE:\nFor severe symptoms, hormonal imbalance may exist.\nConsider: Birth control, SSRIs, or other medical intervention.\nTrack symptoms: If interfering with life, seek medical help.'
        },
        symptoms: {
          title: 'COMPREHENSIVE SYMPTOMS',
          content: 'EARLY LUTEAL (Days 17-21):\nRelatively mild symptoms.\n• Slight energy decrease\n• Mild appetite increase\n• Some bloating\n• Slight breast tenderness\n• Mood generally stable\n• Sleep quality okay\n• Most women function normally\n\nLATE LUTEAL / PMS (Days 22-28):\nSymptoms intensify as period approaches.\n\nPHYSICAL SYMPTOMS:\n• Water retention and bloating\n• Weight gain: 2-5 pounds water weight (temporary)\n• Breast tenderness and swelling\n• Headaches or migraines\n• Fatigue and lethargy\n• Muscle aches and joint pain\n• Lower back pain\n• Acne breakouts: Chin and jawline common\n• Skin: Oilier, more sensitive\n• Hair: May be greasier\n• Digestive issues: Constipation, bloating, gas\n• Food cravings: Sweets, salty foods, carbs\n• Increased appetite\n• Sleep disturbances\n• Hot flashes or night sweats (some women)\n• Dizziness or lightheadedness\n• Clumsiness: Coordination affected\n• Changes in libido: Usually decreased\n\nEMOTIONAL/PSYCHOLOGICAL:\n• Irritability and short temper\n• Mood swings\n• Anxiety or nervousness\n• Depression or sadness\n• Crying easily\n• Feeling overwhelmed\n• Social withdrawal\n• Sensitivity to criticism\n• Self-doubt\n• Negative self-talk\n• Feeling out of control\n• Anger or rage (in severe cases)\n• Difficulty concentrating\n• Forgetfulness\n• Brain fog\n• Indecision\n• Loss of interest in usual activities\n\nSLEEP DISTURBANCES:\n• Difficulty falling asleep\n• Frequent waking\n• Non-restorative sleep\n• Vivid dreams or nightmares\n• Night sweats\n• Restless legs\n• Wake unrefreshed\n\nDIGESTIVE:\n• Bloating and gas\n• Constipation\n• Diarrhea (as period approaches)\n• Nausea\n• Food aversions\n• Sensitive stomach\n\nCRAVINGS:\n• Chocolate: Most common\n• Salty foods: Chips, pickles\n• Carbohydrates: Bread, pasta, baked goods\n• Sweets: Candy, desserts\n• Comfort foods: Pizza, mac and cheese\n• These are hormonal, not lack of willpower\n\nBREAST CHANGES:\n• Tenderness\n• Swelling\n• Heaviness\n• Pain with touch or movement\n• Nipple sensitivity\n• Usually worse before bed\n• Resolves with period\n\nSKIN CHANGES:\n• Acne: Hormonal breakouts\n• Oilier complexion\n• Dullness\n• Sensitivity to products\n• Easier bruising\n• Existing skin conditions worsen (eczema, psoriasis)\n\nPAIN:\n• Headaches: Tension-type or migraine\n• Muscle aches\n• Joint pain\n• Lower back pain\n• Cramps: Can start before period\n• Breast pain\n• Generalised body aches\n\nCOGNITIVE:\n• Brain fog\n• Difficulty concentrating\n• Memory lapses\n• Slower thinking\n• Difficulty finding words\n• Reduced productivity\n• Mental fatigue\n• Easily distracted\n\nBEHAVIORAL:\n• Social withdrawal\n• Reduced activity\n• Changes in eating\n• Sleep pattern changes\n• Crying spells\n• Increased conflict with others\n• Impulsive behavior\n• Reduced coping abilities\n\nSYMPTOM VARIABILITY:\n• Not all women experience all symptoms\n• Severity varies person to person\n• Symptoms can vary cycle to cycle\n• Age affects symptoms (often worse 30s-40s)\n• Stress worsens symptoms\n• Sleep deprivation worsens symptoms\n• Diet affects symptom severity\n\nPMS vs PMDD:\n\nPMS (Premenstrual Syndrome):\n• Mild to moderate symptoms\n• Manageable, doesn\'t interfere with life\n• 75% of menstruating women experience\n• Treatable with lifestyle changes\n\nPMDD (Premenstrual Dysphoric Disorder):\n• Severe symptoms\n• Significantly interferes with life, work, relationships\n• 3-8% of women\n• May require medication (SSRIs, hormonal treatment)\n• Suicidal ideation possible (seek immediate help)\n\nWHEN TO SEE A DOCTOR:\n\n• Symptoms interfere with work, school, or relationships\n• Severe mood changes or depression\n• Suicidal thoughts (call emergency services immediately)\n• Symptoms don\'t improve with self-care\n• Physical symptoms are debilitating\n• Symptoms last longer than luteal phase\n• Sudden worsening of symptoms\n• Need to rule out other conditions\n\nOTHER CONDITIONS TO RULE OUT:\n• Thyroid disorders\n• Depression or anxiety (not cyclical)\n• Perimenopause (if over 35)\n• Endometriosis\n• PCOS\n• Iron deficiency anemia\n• Vitamin D deficiency\n\nTRACKING SYMPTOMS:\n• Journal for 2-3 cycles\n• Note severity 1-10\n• Identify patterns\n• Brings awareness\n• Helps medical diagnosis if needed\n• Shows what interventions work'
        },
        tips: {
          title: 'MANAGEMENT STRATEGIES',
          content: 'NUTRITION STRATEGIES:\n\nEat MORE, not less:\n• 100-300 extra calories daily\n• Honor increased hunger\n• Don\'t restrict: Worsens symptoms\n• Frequent meals: Every 3-4 hours\n• Prevents blood sugar crashes\n\nCarbohydrate focus:\n• 50-60% of calories from complex carbs\n• Oats, rice, sweet potato, quinoa, fruit\n• Supports serotonin production\n• Stabilises mood\n• Satisfies cravings healthily\n\nPlan for cravings:\n• Keep dark chocolate (magnesium)\n• Popcorn with sea salt\n• Fruit with nut butter\n• Greek yogurt with granola\n• Don\'t fight cravings, satisfy mindfully\n\nMagnesium-rich foods:\n• Dark chocolate 70%+\n• Pumpkin seeds\n• Almonds\n• Spinach\n• Black beans\n• Target 400-500mg daily\n• Reduces cramps, improves mood, aids sleep\n\nCalcium:\n• 1000-1200mg daily\n• Dairy, leafy greens, fortified foods\n• Reduces PMS symptoms by 50%\n• Mood support\n• Reduces water retention\n\nOmega-3 fatty acids:\n• Salmon, sardines, walnuts, flaxseed\n• Anti-inflammatory\n• Reduces cramping\n• Mood support\n• Aim for 1-2g daily\n\nB vitamins:\n• B6: 50-100mg daily (mood, bloating)\n• B12: Energy support\n• Found in: Whole grains, meat, eggs, leafy greens\n\nIron:\n• Continue iron-rich foods\n• Preparing for upcoming blood loss\n• Red meat, chicken, fish, lentils, spinach\n• With vitamin C for absorption\n\nHydration:\n• 2.5-3L water daily\n• Counterintuitive for bloating but helps\n• Flushes excess sodium\n• Supports digestion\n• Herbal teas: Peppermint, chamomile, ginger\n\nLimit:\n• Caffeine: Max 200mg (worsens anxiety)\n• Refined sugar: Blood sugar crashes worsen mood\n• Alcohol: Disrupts sleep, worsens symptoms\n• Excess sodium: If very bloated (but don\'t eliminate)\n• Processed foods: Increase inflammation\n\nTRAINING ADJUSTMENTS:\n\nEarly luteal:\n• Moderate intensity maintained\n• 70-80% of max effort\n• Focus on technique\n• Steady-state cardio\n• Strength maintenance\n\nLate luteal:\n• Lower intensity: 50-70% effort\n• More rest days: Listen to body\n• Gentle cardio: Walking, cycling, swimming\n• Yoga: Restorative, gentle flow\n• Stretching and mobility\n• It\'s okay to skip gym\n\nEndurance advantage:\n• Body better at fat oxidation\n• Long, slow cardio well-tolerated\n• Zone 2 training (conversational pace)\n• Good time for distance work if energy allows\n\nWhat to avoid:\n• PRs or max testing\n• High-intensity intervals\n• Training to failure\n• New, complex movements\n• Comparing to other phases\n• Pushing through pain or exhaustion\n\nRest is productive:\n• Supports next cycle\n• Prevents injury\n• Allows recovery\n• Maintains long-term progress\n• Listen to body\n\nSLEEP OPTIMISATION:\n\nPrioritize sleep:\n• 8-9 hours target (need more)\n• Earlier bedtime: 30-60 min earlier\n• Consistent schedule: Even weekends\n• Bedroom cool: 18-19°C (progesterone raises temp)\n• Dark environment: Blackout curtains\n• No screens: 1 hour before bed\n\nBedtime routine:\n• Warm bath with Epsom salts\n• Herbal tea: Chamomile or valerian\n• Gentle stretching or yin yoga\n• Meditation or breathwork\n• Reading (not on device)\n• Journaling: Download thoughts\n\nSupplements for sleep:\n• Magnesium: 300-400mg before bed\n• Helps sleep AND reduces cramping\n• Melatonin: If chronic insomnia (consult doctor)\n• L-theanine: Calming without sedation\n\nIf sleep disrupted:\n• Don\'t stress about it: Makes it worse\n• Get up if can\'t sleep after 20 min\n• Gentle activity: Reading, stretching\n• Return to bed when sleepy\n• Nap if needed: 20-30 min max\n\nSTRESS MANAGEMENT:\n\nLower expectations:\n• Of yourself\n• Of productivity\n• Of social engagement\n• Of fitness performance\n• Give yourself grace\n\nSimplify:\n• Meal prep: Batch cook or use convenience foods\n• Lower housekeeping standards\n• Minimize commitments\n• Reduce decisions: Routines help\n• Ask for help: Specific requests\n\nBoundaries:\n• Say no to non-essentials\n• Decline invitations without guilt\n• Communicate needs to partner/family\n• Protect your energy\n• It\'s okay to be "selfish"\n\nMindfulness practices:\n• Meditation: 10-20 min daily\n• Deep breathing: 4-7-8 technique\n• Progressive muscle relaxation\n• Yoga nidra: Deep rest\n• Gentle yoga: Restorative poses\n\nJournaling:\n• Emotional release\n• Identify patterns\n• Track what helps\n• Validate feelings\n• Gratitude practice\n\nNature and sunlight:\n• 20-30 min outside daily\n• Natural light supports mood\n• Gentle walks in nature\n• Grounding practices\n• Fresh air\n\nConnection:\n• Talk to understanding friends\n• Partner support crucial\n• Online communities\n• Therapy if severe symptoms\n• You\'re not alone\n\nSYMPTOM-SPECIFIC MANAGEMENT:\n\nBloating:\n• Stay hydrated\n• Gentle movement\n• Peppermint tea\n• Avoid gas-producing foods\n• Smaller, frequent meals\n• Probiotics\n• Reduce sodium slightly (not eliminate)\n\nBreast tenderness:\n• Supportive bra (even at night)\n• Cold or warm compress\n• Evening primrose oil (supplement)\n• Reduce caffeine\n• Vitamin E (supplement, with doctor approval)\n• Ibuprofen if needed\n\nHeadaches:\n• Consistent sleep schedule\n• Stay hydrated\n• Regular meals\n• Magnesium\n• Cold compress\n• Peppermint oil (temples)\n• Reduce caffeine (but don\'t quit cold turkey)\n• Ibuprofen or paracetamol as needed\n\nMood swings:\n• Awareness: Recognize hormonal influence\n• Self-compassion: Be kind to yourself\n• Communication: Warn loved ones\n• Avoid major decisions\n• Journaling\n• Exercise (if energy allows)\n• Serotonin support: Carbs, sunlight, movement\n\nCravings:\n• Don\'t fight them\n• Plan for them\n• Satisfy mindfully\n• Pair with protein\n• Dark chocolate is actually helpful\n• Honor your body\n\nIrritability:\n• Communicate needs clearly\n• Take timeouts when needed\n• Remove yourself from conflict\n• Breathwork\n• Physical release: Punching bag, intense music\n• It\'s okay to not be social\n\nFatigue:\n• Extra sleep\n• Strategic naps\n• Reduce obligations\n• Gentle movement (helps more than couch)\n• B vitamins\n• Iron-rich foods\n• Hydration\n• Don\'t fight it\n\nSUPPLEMENTATION:\nConsult healthcare provider first.\n\nEvidence-based supplements:\n• Magnesium: 300-500mg daily (mood, cramps, sleep)\n• Calcium: 1000-1200mg daily (reduces PMS 50%)\n• Vitamin B6: 50-100mg daily (mood, bloating)\n• Omega-3: 1-2g daily (anti-inflammatory, mood)\n• Vitamin D: If deficient (mood support)\n• Evening primrose oil: 500-1000mg (breast tenderness)\n• Chasteberry (Vitex): May help PMS (research dose with doctor)\n\nMINDSET REFRAMING:\n\nValidation:\n• Your symptoms are real\n• They\'re hormonal, not character flaws\n• You\'re not "crazy" or "overreacting"\n• Other women experience this too\n• It\'s temporary and cyclical\n\nSelf-compassion:\n• Talk to yourself like a good friend\n• Lower self-criticism\n• Acknowledge difficulty\n• Honor your needs\n• Give yourself permission to rest\n\nPerspective:\n• This is 5-12 days per cycle\n• It always passes\n• Menstruation brings relief\n• Follicular energy returns\n• You\'re not broken, you\'re cyclical\n\nEmpowerment:\n• Tracking gives awareness\n• You can prepare and plan\n• Interventions help\n• You learn your patterns\n• Each cycle you understand better\n• You\'re honoring your body\n\nWHEN TO SEEK HELP:\n\n• Symptoms interfere with daily life\n• Suicidal ideation (call emergency immediately)\n• Severe depression or anxiety\n• Symptoms lasting longer than luteal phase\n• Lifestyle changes not helping\n• Need support and validation\n\nTREATMENT OPTIONS:\n(Discuss with healthcare provider)\n\n• Hormonal birth control: Stabilises hormones\n• SSRIs: For severe mood symptoms (can use just luteal phase)\n• Diuretics: For severe water retention\n• NSAIDs: For pain and inflammation\n• Cognitive behavioral therapy: Coping strategies\n• Hormone therapy: In certain cases\n\nREMEMBER:\n• This phase is temporary\n• It\'s biological and normal\n• Self-care isn\'t selfish\n• You deserve support\n• Your needs are valid\n• Follicular phase is coming\n• You\'re doing your best'
        }
      }
    };
    return phases[phaseName] || {};
  };

  const getNextPeriod = () => {
    if (!cycleData) return null;
    const lastPeriod = new Date

(cycleData.lastPeriod);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleData.cycleLength);
    return nextPeriod.toLocaleDateString();
  };

  const getOvulationDay = () => {
    if (!cycleData) return null;
    const lastPeriod = new Date(cycleData.lastPeriod);
    const ovulation = new Date(lastPeriod);
    ovulation.setDate(lastPeriod.getDate() + 14);
    return ovulation.toLocaleDateString();
  };

  if (!hasSetup) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '600' }}>Set Up Cycle Tracking</h1>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Track your menstrual cycle and get comprehensive, phase-specific training and nutrition guidance. All data is stored locally on your device for complete privacy.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
              Last Period Start Date
            </label>
            <input
              type="date"
              value={formData.lastPeriod}
              onChange={e => setFormData({ ...formData, lastPeriod: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
              Cycle Length (days)
            </label>
            <input
              type="number"
              min="21"
              max="35"
              value={formData.cycleLength}
              onChange={e => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Average is 28 days (21-35 is normal range)</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
              Period Length (days)
            </label>
            <input
              type="number"
              min="2"
              max="8"
              value={formData.periodLength}
              onChange={e => setFormData({ ...formData, periodLength: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Typical range is 3-7 days</p>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleSetup}
            disabled={!formData.lastPeriod}
            style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem' }}
          >
            Start Tracking
          </button>
        </div>
      </div>
    );
  }

  const phase = getCurrentPhase();
  const phaseInfo = phase ? getPhaseInfo(phase.name) : null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontWeight: '600' }}>Cycle Sync Tracker</h1>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>Day {phase?.day} of {cycleData?.cycleLength}</p>
          </div>
          <button 
            className="btn-secondary" 
            onClick={() => setHasSetup(false)}
            style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
          >
            Update Data
          </button>
        </div>

        <div style={{ background: phaseInfo?.color || '#e0e0e0', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#fff', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>CURRENT PHASE</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{phase?.name}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem', fontWeight: '600' }}>NEXT PERIOD</div>
            <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{getNextPeriod()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem', fontWeight: '600' }}>OVULATION (EST.)</div>
            <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{getOvulationDay()}</div>
          </div>
        </div>
      </div>

      {phaseInfo && (
        <>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div 
              onClick={() => setExpandedSection(expandedSection === 'training' ? null : 'training')}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                Training Recommendations
              </h3>
              <span style={{ fontSize: '1.25rem', color: '#666' }}>
                {expandedSection === 'training' ? '−' : '+'}
              </span>
            </div>
            {expandedSection === 'training' && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: phaseInfo.color }}>
                  {phaseInfo.training.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#2d3436', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {phaseInfo.training.content}
                </p>
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <div 
              onClick={() => setExpandedSection(expandedSection === 'nutrition' ? null : 'nutrition')}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                Nutrition Guidelines
              </h3>
              <span style={{ fontSize: '1.25rem', color: '#666' }}>
                {expandedSection === 'nutrition' ? '−' : '+'}
              </span>
            </div>
            {expandedSection === 'nutrition' && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: phaseInfo.color }}>
                  {phaseInfo.nutrition.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#2d3436', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {phaseInfo.nutrition.content}
                </p>
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <div 
              onClick={() => setExpandedSection(expandedSection === 'energy' ? null : 'energy')}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                Energy Levels
              </h3>
              <span style={{ fontSize: '1.25rem', color: '#666' }}>
                {expandedSection === 'energy' ? '−' : '+'}
              </span>
            </div>
            {expandedSection === 'energy' && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: phaseInfo.color }}>
                  {phaseInfo.energy.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#2d3436', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {phaseInfo.energy.content}
                </p>
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <div 
              onClick={() => setExpandedSection(expandedSection === 'hormones' ? null : 'hormones')}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                Hormone Activity
              </h3>
              <span style={{ fontSize: '1.25rem', color: '#666' }}>
                {expandedSection === 'hormones' ? '−' : '+'}
              </span>
            </div>
            {expandedSection === 'hormones' && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: phaseInfo.color }}>
                  {phaseInfo.hormones.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#2d3436', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {phaseInfo.hormones.content}
                </p>
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <div 
              onClick={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                Practical Tips & Strategies
              </h3>
              <span style={{ fontSize: '1.25rem', color: '#666' }}>
                {expandedSection === 'tips' ? '−' : '+'}
              </span>
            </div>
            {expandedSection === 'tips' && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: phaseInfo.color }}>
                  {phaseInfo.tips.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#2d3436', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {phaseInfo.tips.content}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <div className="card" style={{ background: '#f5f5f5', borderLeft: '4px solid #81c784' }}>
        <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem', fontWeight: '600' }}>Understanding Cycle Syncing</h3>
        <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: '1.7', marginBottom: '0.75rem' }}>
          Your menstrual cycle profoundly affects energy, strength, recovery, appetite, and mood. Understanding these hormonal fluctuations helps you work WITH your body instead of against it.
        </p>
        <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: '1.7', marginBottom: '0.75rem' }}>
          <strong>Important:</strong> Every body is different. These are general guidelines based on typical hormonal patterns. Track YOUR patterns over 2-3 cycles to understand YOUR unique body.
        </p>
        <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: '1.7', marginBottom: '0.75rem' }}>
          <strong>Phases explained:</strong>
        </p>
        <ul style={{ fontSize: '0.8125rem', color: '#666', lineHeight: '1.7', paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
          <li><strong>Menstrual (Days 1-5):</strong> Recovery phase. Low energy, gentle movement, focus on iron and anti-inflammatory foods.</li>
          <li><strong>Follicular (Days 6-14):</strong> Power phase. Rising energy, best for PRs, high carbs, progressive overload.</li>
          <li><strong>Ovulation (Days 15-16):</strong> Peak phase. Maximum strength and confidence, balanced nutrition, test limits.</li>
          <li><strong>Luteal (Days 17-28):</strong> Maintenance phase. Declining energy, need extra calories, prioritize rest.</li>
        </ul>
        <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: '1.7' }}>
          <strong>Not medical advice.</strong> If you experience severe symptoms, irregular cycles, or concerning changes, consult a healthcare provider. This information is educational and should not replace professional medical guidance.
        </p>
      </div>
    </div>
  );
};

export default CycleSync;