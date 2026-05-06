import Database from 'better-sqlite3';

const db = new Database('./data/blog.db');

const sources = {
  nutrition: [
    '[WHO: healthy diet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet)',
    '[Harvard Health: Healthy Eating Plate](https://www.health.harvard.edu/questions-and-answers-about-the-healthy-eating-plate)',
    '[CDC: healthy eating tips](https://www.cdc.gov/nutrition/features/healthy-eating-tips.html)'
  ],
  training: [
    '[CDC: adult physical activity guidelines](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html)',
    '[WHO: physical activity](https://www.who.int/initiatives/behealthy/physical-activity)'
  ],
  mindset: [
    '[CDC: sleep and health](https://www.cdc.gov/sleep/about/index.html)',
    '[NIDDK: factors that affect weight and health](https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/factors-affecting-weight-health)',
    '[CDC: adding physical activity to your routine](https://www.cdc.gov/physical-activity-basics/adding-adults/index.html)'
  ],
  supplements: [
    '[NIH ODS: dietary supplements for exercise and athletic performance](https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-Consumer/)',
    '[ISSN: protein and exercise position stand](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8)',
    '[ISSN: creatine supplementation safety and efficacy](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z)'
  ]
};

const articles = [
  {
    slug: 'como-montar-um-prato-saudavel-para-emagrecer-sem-passar-fome',
    title: 'How to Build a Healthy Weight-Loss Plate Without Feeling Hungry',
    keyword: 'healthy plate for weight loss',
    sourceKey: 'nutrition',
    promise: 'build meals that feel generous, colorful, and aligned with fat loss',
    quick: 'A healthy weight-loss plate is not a tiny plate. It is a structured meal: plenty of vegetables, enough protein, a measured portion of quality carbohydrates, and a small amount of fat for flavor and satisfaction.',
    sections: [
      ['Nutrient density beats tiny portions', 'The goal is to get more nutrition per bite. Leafy greens, beans, eggs, yogurt, fish, chicken, fruit, potatoes, oats, rice, and whole grains give the body vitamins, minerals, fiber, and useful energy. Ultra-processed snacks can be easy to overeat because they often combine refined starch, fat, salt, and strong flavors without much fullness.'],
      ['Use visual portions instead of perfection', 'For most beginners, the plate method is more sustainable than weighing every gram. Fill half the plate with vegetables or salad, use one quarter for protein, and use one quarter for carbohydrates such as rice, beans, potatoes, quinoa, pasta, or fruit. Add fat with intention: olive oil, avocado, nuts, seeds, or cheese can fit, but the portion matters.'],
      ['Hunger is information, not failure', 'A plan that leaves you constantly hungry is usually too aggressive or too low in protein, fiber, or total food volume. Weight loss works best when the deficit is moderate. If you are hungry one hour after every meal, adjust the plate before blaming your discipline.']
    ],
    steps: ['Start with vegetables first, choosing at least two colors when possible.', 'Add a palm-sized portion of protein or an equivalent plant-based serving.', 'Choose one carbohydrate that matches your activity and appetite.', 'Add one small fat source instead of several hidden fats at once.', 'Eat slowly enough to notice fullness before serving more food.'],
    table: [['Food choice', 'Nutrient-dense option', 'Less useful when overused'], ['Lunch base', 'Rice, beans, vegetables, eggs, fish, lean meat, tofu', 'Fried snacks, creamy sauces, refined pastries'], ['Snack', 'Fruit with yogurt, nuts, boiled eggs, cottage cheese', 'Candy, soda, cookies, sweetened coffee drinks'], ['Dinner', 'Soup with protein, salad bowl, potatoes with lean protein', 'Large takeout meals with little fiber']],
    mistakes: ['turning the plate method into a very low calorie diet', 'forgetting protein at breakfast or dinner', 'using too much oil, dressing, cheese, or nuts without noticing'],
    cta: 'Build one plate with this structure today and repeat it for three meals before changing the plan.'
  },
  {
    slug: 'quantas-calorias-comer-por-dia-guia-simples-para-iniciantes',
    title: 'How Many Calories Should You Eat per Day? A Simple Beginner Guide',
    keyword: 'how many calories per day',
    sourceKey: 'nutrition',
    promise: 'understand calories without turning your life into a spreadsheet',
    quick: 'Calories measure energy. For fat loss, most people need a moderate energy deficit, but the best target is the one you can follow while keeping hunger, sleep, mood, and training reasonably stable.',
    sections: [
      ['Calories matter, but food quality changes the experience', 'Body weight changes according to energy balance, yet equal calories do not always feel equal. A meal with protein, vegetables, legumes, and whole grains usually keeps you full longer than a meal built around soda, pastries, and fried snacks. That is why calorie awareness and food quality should work together.'],
      ['Use calculators as starting points', 'Online calculators estimate daily energy needs from age, sex, height, weight, and activity. Treat the result as a starting estimate, not a verdict. Track your average weight, waist measurement, energy, and training for two or three weeks before making big adjustments.'],
      ['A moderate deficit wins more often', 'Aggressive cuts can create fast scale changes, but they also increase hunger and make weekends harder. Beginners often do better by reducing liquid calories, repeated portions, frequent snacks, and very energy-dense extras before cutting whole food groups.']
    ],
    steps: ['Estimate your maintenance calories with a reliable calculator.', 'Record three to seven honest days of eating to learn your baseline.', 'Create a small deficit before trying a large one.', 'Keep protein and vegetables in your main meals.', 'Review weekly averages instead of reacting to one day on the scale.'],
    table: [['Method', 'Best use', 'Watch out for'], ['Counting calories', 'Learning portion awareness', 'Becoming rigid or anxious'], ['Plate method', 'Simple daily structure', 'Less precision for advanced goals'], ['Food journal', 'Finding hidden patterns', 'Underreporting snacks and drinks']],
    mistakes: ['copying someone else calorie target', 'cutting too low and losing training energy', 'ignoring sauces, alcohol, weekends, and sweet drinks'],
    cta: 'Pair this calorie estimate with the healthy plate method so the numbers become real meals.'
  },
  {
    slug: 'proteina-no-emagrecimento-quanto-comer-e-quais-alimentos-escolher',
    title: 'Protein for Weight Loss: How Much to Eat and Which Foods to Choose',
    keyword: 'protein for weight loss',
    sourceKey: 'nutrition',
    promise: 'use protein to improve fullness and protect lean mass during fat loss',
    quick: 'Protein supports fullness, muscle repair, and lean mass maintenance. During weight loss, it works best when distributed across the day and combined with fiber-rich foods, hydration, and strength training.',
    sections: [
      ['Why protein matters during a deficit', 'When calories go down, the body still needs building blocks. Adequate protein plus resistance training helps preserve muscle, which supports strength, posture, independence, and body composition. Protein also tends to make meals more satisfying, which makes the plan easier to repeat.'],
      ['Practical portions are enough for most beginners', 'You do not need to calculate every amino acid to start. Put a palm-sized serving of protein at lunch and dinner, then add a protein-rich breakfast or snack if hunger is high. Active people often need more than sedentary people, but needs vary with body size, training, age, and health status.'],
      ['Affordable sources work very well', 'Eggs, chicken, fish, lean meats, plain yogurt, milk, cottage cheese, beans, lentils, chickpeas, tofu, tempeh, and soy foods can all help. Whey is optional. It is useful when convenience is the problem, not because it has special fat-loss magic.']
    ],
    steps: ['Choose one protein anchor for each main meal.', 'Combine animal or plant protein with vegetables and legumes when possible.', 'Use beans and lentils for both protein and fiber.', 'Plan one protein-rich snack for your hungriest time of day.', 'Get individualized guidance if you have kidney disease or a clinical condition.'],
    table: [['Source', 'Strength', 'Easy use'], ['Eggs', 'Affordable and versatile', 'Breakfast, salads, quick dinners'], ['Greek yogurt', 'Convenient and filling', 'Snack with fruit'], ['Lentils', 'Plant protein plus fiber', 'Soups, bowls, meal prep'], ['Chicken or tofu', 'Easy to season', 'Lunch plates and wraps']],
    mistakes: ['eating most protein in only one meal', 'using supplements before fixing basic meals', 'forgeting vegetables and fiber because protein gets all the attention'],
    cta: 'Build your next meal around protein, vegetables, and one quality carbohydrate.'
  },
  {
    slug: 'cafe-da-manha-fitness-opcoes-praticas-para-ter-mais-energia',
    title: 'Fitness Breakfast: Practical Options for More Energy',
    keyword: 'fitness breakfast',
    sourceKey: 'nutrition',
    promise: 'start the day with steady energy without complicated recipes',
    quick: 'A useful fitness breakfast combines protein, fiber, and quality carbohydrates. It is not mandatory for everyone, but it can help people who wake up hungry, train in the morning, or lose control later in the day.',
    sections: [
      ['What makes breakfast work better', 'The first meal should not create hunger one hour later. Whole fruit, eggs, plain yogurt, oats, whole-grain bread, seeds, milk, tofu, and cottage cheese tend to work better than sweet drinks and pastries because they bring protein, fiber, and chewing.'],
      ['Before morning training', 'If you train early, choose something light enough to digest. Banana with yogurt, toast with eggs, oats with fruit, or coffee with a small carbohydrate can work. The best option is the one that gives energy without stomach discomfort.'],
      ['No time in the morning', 'Prepare the decision before the morning starts. Keep washed fruit, boiled eggs, portioned oats, plain yogurt, or a simple sandwich ready. Consistency improves when breakfast is assembled, not invented, while you are already late.']
    ],
    steps: ['Decide whether you actually need to eat early or can wait.', 'Pick a protein such as eggs, yogurt, milk, cheese, tofu, or cottage cheese.', 'Add fiber through fruit, oats, seeds, or whole-grain bread.', 'Keep coffee from becoming a dessert drink every morning.', 'Create two backup breakfasts for busy days.'],
    table: [['Option', 'Best for', 'Upgrade'], ['Eggs with fruit', 'Fullness', 'Add whole-grain toast'], ['Yogurt with oats', 'Speed', 'Add berries or seeds'], ['Toast with cheese', 'Simple routine', 'Add tomato or fruit'], ['Banana smoothie', 'Pre-workout', 'Use milk or yogurt for protein']],
    mistakes: ['drinking only sweet coffee and getting hungry soon after', 'using large portions of granola without noticing calories', 'replacing whole fruit with juice every day'],
    cta: 'Choose two breakfast options and repeat them for one week to compare hunger and energy.'
  },
  {
    slug: 'carboidrato-a-noite-engorda-entenda-o-que-realmente-importa',
    title: 'Do Carbs at Night Make You Gain Weight? What Actually Matters',
    keyword: 'carbs at night weight gain',
    sourceKey: 'nutrition',
    promise: 'stop fearing dinner and use carbohydrates with better judgment',
    quick: 'Carbs at night do not cause fat gain by themselves. Weight change depends on total intake, food quality, activity, sleep, and consistency. Timing may affect digestion and sleep for some people, but it is not a magic rule.',
    sections: [
      ['The timing myth is incomplete', 'Many people lose weight after cutting carbs at night because they also cut total calories. The result usually comes from the energy reduction, not from the clock. A dinner with rice, beans, vegetables, and protein can be more useful than uncontrolled low-carb snacks.'],
      ['When reducing evening carbs makes sense', 'If large late meals make you sleep poorly or you tend to overeat at night, adjust portions and timing. That does not mean banning carbohydrates. It means using a portion that fits your appetite, activity, and total day.'],
      ['Quality matters before fear', 'Potatoes, rice, beans, oats, fruit, and whole grains are different from candy, soda, and ultra-processed desserts. The type of carbohydrate affects fiber, fullness, micronutrients, and how easy it is to stop eating.']
    ],
    steps: ['Notice whether night hunger is physical hunger, habit, or stress.', 'Fill half the plate with vegetables when possible.', 'Add protein so dinner is satisfying.', 'Use one moderate carbohydrate portion.', 'Avoid very large meals right before bed if they hurt your sleep.'],
    table: [['Dinner pattern', 'Usually helps', 'Can hurt'], ['Rice, beans, protein, salad', 'Balanced fullness', 'Too much oil or repeated portions'], ['Soup with vegetables and meat or tofu', 'Volume and comfort', 'Too little protein'], ['Homemade sandwich', 'Convenience', 'Heavy sauces and oversized fillings']],
    mistakes: ['blaming only the time of day', 'cutting carbs and compensating with too much fat', 'eating too little dinner and snacking later'],
    cta: 'Test a balanced dinner for seven nights before deciding to remove a whole food group.'
  },
  {
    slug: 'treino-para-iniciantes-na-academia-como-comecar-com-seguranca',
    title: 'Gym Workout for Beginners: How to Start Safely',
    keyword: 'beginner gym workout',
    sourceKey: 'training',
    promise: 'enter the gym with more confidence, safety, and clarity',
    quick: 'The best beginner workout is simple, repeatable, and progressive. Start with basic movement patterns, light to moderate loads, and technique before intensity.',
    sections: [
      ['Your first goal is learning', 'The first month is not about destroying yourself. It is about learning the equipment, practicing movement, building the habit, and leaving the gym feeling capable. This early phase prepares muscles, joints, and tendons for future progress.'],
      ['Realistic frequency builds momentum', 'Two to three sessions per week can be enough for a beginner to improve. Public health guidance encourages aerobic activity and muscle strengthening, but you can build toward that gradually instead of trying to become advanced in one week.'],
      ['Full-body training keeps things simple', 'A full-body routine is efficient when you are starting. Include a lower-body movement, a push, a pull, a hip hinge, and a core exercise. Repeating the same basic plan helps technique and makes progress visible.']
    ],
    steps: ['Warm up for five to eight minutes with easy cardio and mobility.', 'Choose one leg exercise, one push exercise, and one pull exercise.', 'Use a load that lets you finish with clean technique.', 'Rest 60 to 90 seconds between sets.', 'Write down weights and repetitions so progress is gradual.'],
    table: [['Exercise', 'Pattern', 'Beginner option'], ['Leg press', 'Lower body', 'Comfortable range of motion'], ['Machine row', 'Pull', 'Supported back'], ['Machine chest press', 'Push', 'Light load'], ['Plank', 'Core', 'Knees down if needed']],
    mistakes: ['copying an advanced routine too soon', 'changing exercises every week', 'using a load that breaks technique'],
    cta: 'Start with three simple workouts before making the plan more complex.'
  },
  {
    slug: 'musculacao-emagrece-como-usar-o-treino-de-forca-a-seu-favor',
    title: 'Does Strength Training Help You Lose Weight? How to Use It Well',
    keyword: 'strength training for weight loss',
    sourceKey: 'training',
    promise: 'understand how lifting supports fat loss beyond the scale',
    quick: 'Strength training supports weight loss by increasing energy use, preserving muscle, and improving body composition. It works best with a realistic calorie deficit, protein, sleep, and daily movement.',
    sections: [
      ['The scale can miss progress', 'When someone starts lifting, fat loss and small muscle gains may happen at the same time. The scale may move slowly while waist measurements, photos, clothes, and strength improve. Use more than one marker before deciding the plan is failing.'],
      ['Diet creates the deficit; lifting protects the body', 'Nutrition usually drives most of the calorie deficit. Strength training tells the body to keep useful muscle while weight comes down. That combination tends to look and feel better than only eating less.'],
      ['Cardio still has a place', 'Strength and cardio do not need to compete. Walking, cycling, swimming, or easy running can support heart health and total energy expenditure. The best weekly plan is the one you can recover from and repeat.']
    ],
    steps: ['Lift two to four times per week depending on recovery.', 'Prioritize compound movements before small isolation work.', 'Progress weight or repetitions while keeping technique stable.', 'Add walking or light cardio on separate days.', 'Treat sleep and protein as part of the training plan.'],
    table: [['Tool', 'Helps with', 'Limit'], ['Strength training', 'Muscle and strength', 'Calorie burn varies by session'], ['Cardio', 'Heart health and energy use', 'Does not replace strength work'], ['Nutrition', 'Calorie deficit', 'Without training, muscle loss risk increases']],
    mistakes: ['using sweat as the main measure of success', 'doing only random machines without progression', 'quitting when the scale stalls but strength improves'],
    cta: 'Use strength training as the base, then adjust nutrition so the result becomes visible.'
  },
  {
    slug: 'treino-em-casa-para-emagrecer-plano-simples-sem-equipamentos',
    title: 'Home Workout for Weight Loss: A Simple No-Equipment Plan',
    keyword: 'home workout for weight loss',
    sourceKey: 'training',
    promise: 'train at home with little space and no gym machines',
    quick: 'Home workouts can support weight loss when they combine strength, low-impact cardio, and progression. The secret is not novelty; it is repeating a plan that gradually becomes a little harder.',
    sections: [
      ['What actually works at home', 'You need useful movement patterns: squat, push, pull with a towel or backpack, hip bridge, hinge, carry, march, and step. Without equipment, progression comes from more repetitions, slower tempo, longer sets, better range of motion, or a heavier backpack.'],
      ['Low impact is still effective', 'Jumping is not mandatory. Fast marching, chair squats, incline push-ups, step-ups on a stable surface, and shadow boxing can raise your heart rate with less joint stress. This is especially useful if you are returning after inactivity.'],
      ['A simple weekly rhythm', 'Three short sessions per week are enough to start. On other days, walk, stretch, or do mobility. Your first goal is to finish feeling like you could repeat the session again later in the week.']
    ],
    steps: ['Choose three fixed training days.', 'Warm up with marching, arm circles, and easy squats.', 'Do three rounds of squat, incline push-up, hip bridge, row variation, and plank.', 'Finish with five to ten minutes of brisk walking or marching.', 'Increase only one variable each week.'],
    table: [['Move', 'Beginner version', 'Progression'], ['Squat', 'Sit-to-stand from a chair', 'Slower tempo or backpack'], ['Push-up', 'Hands on table or wall', 'Lower surface'], ['Row', 'Towel row or backpack row', 'More reps'], ['Cardio', 'March in place', 'Longer intervals']],
    mistakes: ['starting with high-impact jumps because they look intense', 'changing the workout every day', 'ignoring nutrition and expecting exercise alone to do everything'],
    cta: 'Schedule your first three home sessions and keep them short enough to complete.'
  },
  {
    slug: 'quantas-vezes-por-semana-devo-treinar-para-ver-resultados',
    title: 'How Many Times per Week Should You Train to See Results?',
    keyword: 'how many times per week to train',
    sourceKey: 'training',
    promise: 'choose a training frequency that fits your life and still produces progress',
    quick: 'Most beginners can see results with two to four well-planned sessions per week. The right frequency depends on recovery, experience, goals, schedule, and how much movement you get outside workouts.',
    sections: [
      ['More is not always better', 'Training frequency only helps when you can recover from it. A person who trains three focused sessions and sleeps well may progress more than someone who trains six chaotic sessions while tired and sore. Quality, recovery, and progression matter together.'],
      ['Start below your maximum', 'If your schedule allows five workouts but you have not trained in months, start with two or three. Leaving room to improve is smarter than beginning at a level that collapses after one busy week.'],
      ['Match frequency to the goal', 'For general health and fat loss, combine strength training with walking or other cardio. For muscle gain, each muscle group usually needs repeated weekly stimulus. For beginners, full-body workouts make this easier.']
    ],
    steps: ['Choose the minimum number of sessions you can protect every week.', 'Place rest days between harder workouts at first.', 'Add walking on non-lifting days.', 'Track performance and soreness for two weeks.', 'Increase frequency only when recovery is stable.'],
    table: [['Frequency', 'Good for', 'Best condition'], ['2 days/week', 'Starting safely', 'Full-body sessions'], ['3 days/week', 'Most beginners', 'Balanced recovery'], ['4 days/week', 'Faster skill practice', 'Sleep and schedule are stable'], ['5+ days/week', 'Advanced goals', 'Planned volume management']],
    mistakes: ['starting with daily workouts after a long break', 'training hard while sleep is poor', 'adding days before mastering current sessions'],
    cta: 'Pick the frequency you can repeat for four weeks, then earn the next training day.'
  },
  {
    slug: 'erros-comuns-na-academia-que-atrasam-seus-resultados',
    title: 'Common Gym Mistakes That Slow Your Results',
    keyword: 'common gym mistakes',
    sourceKey: 'training',
    promise: 'fix the habits that make training feel hard without producing enough progress',
    quick: 'Most gym mistakes are simple: no plan, poor technique, inconsistent effort, too much ego, too little recovery, and nutrition that does not match the goal.',
    sections: [
      ['Mistake one: training without progression', 'Doing random exercises can make you sweat, but progress needs a signal. Track repetitions, load, sets, range of motion, and how hard the set felt. If nothing changes over time, the body has little reason to adapt.'],
      ['Mistake two: chasing exhaustion', 'A workout does not need to leave you destroyed to be effective. Constant soreness can reduce performance and consistency. Most sessions should be challenging but repeatable, with hard sets planned instead of accidental.'],
      ['Mistake three: ignoring the basics outside the gym', 'Sleep, protein, hydration, and total calories influence training results. If these are chaotic, the gym will feel harder and recovery will be slower. You do not need perfection, but you do need a base.']
    ],
    steps: ['Write a simple plan before entering the gym.', 'Repeat key exercises long enough to improve them.', 'Film or ask for feedback on complex movements if safe to do so.', 'Leave one or two repetitions in reserve on most sets.', 'Review sleep and protein when progress stalls.'],
    table: [['Mistake', 'Why it hurts', 'Better approach'], ['No tracking', 'Progress is invisible', 'Log main lifts'], ['Too much load', 'Technique breaks', 'Earn heavier weights'], ['No rest days', 'Fatigue accumulates', 'Plan recovery'], ['Poor warm-up', 'Movement feels worse', 'Prepare joints and muscles']],
    mistakes: ['judging sessions only by sweat', 'copying influencers without context', 'changing the goal every Monday'],
    cta: 'Choose one mistake from this list and fix it for the next two weeks.'
  },
  {
    slug: 'como-criar-disciplina-para-treinar-mesmo-sem-motivacao',
    title: 'How to Build Training Discipline Even When Motivation Is Low',
    keyword: 'training discipline',
    sourceKey: 'mindset',
    promise: 'make exercise easier to start when motivation is unreliable',
    quick: 'Discipline is not a personality trait reserved for a few people. It is a system of cues, planning, small commitments, and recovery that makes the desired behavior easier to repeat.',
    sections: [
      ['Motivation is useful but unstable', 'Motivation rises when life is calm and drops when work, stress, sleep, or emotions get heavy. If your plan depends on feeling excited every day, it will break. Discipline starts by lowering the friction to begin.'],
      ['Build a small default workout', 'Create a minimum version of training that counts on hard days: ten minutes, two exercises, or a walk. This keeps identity and momentum alive. Many people do more once they start, but the small version protects consistency.'],
      ['Make the environment do some work', 'Put workout clothes ready, choose a fixed time, keep shoes visible, and remove decisions. The fewer choices you need before training, the less motivation you need.']
    ],
    steps: ['Choose a fixed training window for the week.', 'Prepare clothes, water, and workout plan the night before.', 'Define a minimum session that still counts.', 'Track completed sessions with a visible calendar.', 'Reward consistency with recovery, not only with food.'],
    table: [['Barrier', 'System fix', 'Example'], ['No time', 'Minimum session', '10-minute workout'], ['Low energy', 'Lower intensity', 'Walk or mobility'], ['Decision fatigue', 'Pre-written plan', 'Same first exercise'], ['Embarrassment', 'Simpler setting', 'Home or quiet gym hours']],
    mistakes: ['waiting to feel motivated before starting', 'making the minimum session too hard', 'treating one missed day as failure'],
    cta: 'Write your minimum workout today and use it whenever motivation disappears.'
  },
  {
    slug: 'por-que-voce-desiste-da-dieta-estrategias-para-manter-a-constancia',
    title: 'Why You Quit Diets: Practical Strategies to Stay Consistent',
    keyword: 'diet consistency',
    sourceKey: 'mindset',
    promise: 'understand why diets collapse and make your eating plan easier to sustain',
    quick: 'People usually quit diets because the plan is too restrictive, too complicated, socially difficult, or disconnected from hunger and routine. Consistency improves when the plan becomes realistic.',
    sections: [
      ['Restriction creates rebound pressure', 'Cutting too many foods at once can work for a few days, then backfire when hunger, cravings, or social life returns. A better plan includes satisfying meals, flexible portions, and a clear way to handle weekends.'],
      ['Complexity kills follow-through', 'A diet that requires rare ingredients, daily cooking, and perfect tracking may look impressive but fail in ordinary life. Repeating a few reliable meals is often more effective than chasing novelty.'],
      ['Identity matters more than punishment', 'If every slip becomes proof that you failed, the diet becomes emotionally expensive. Treat mistakes as data. Ask what made the plan hard and adjust the environment, timing, or portion instead of starting over dramatically.']
    ],
    steps: ['Keep two or three meals that you genuinely like and can repeat.', 'Include protein and fiber before reducing portions further.', 'Plan one flexible meal instead of uncontrolled cheat days.', 'Use a weekly average, not one perfect day, to judge consistency.', 'Change one habit at a time when life is stressful.'],
    table: [['Problem', 'Likely cause', 'Practical fix'], ['Night cravings', 'Too little food earlier', 'Add protein at lunch'], ['Weekend overeating', 'No structure', 'Plan flexible meals'], ['Boredom', 'Too few flavors', 'Rotate sauces and spices'], ['Giving up after one mistake', 'All-or-nothing thinking', 'Restart at the next meal']],
    mistakes: ['removing every favorite food', 'using punishment workouts after overeating', 'changing the entire plan every week'],
    cta: 'Simplify your diet until it feels repeatable on a normal week.'
  },
  {
    slug: 'sono-e-emagrecimento-como-dormir-melhor-pode-ajudar-nos-resultados',
    title: 'Sleep and Weight Loss: How Better Sleep Can Support Results',
    keyword: 'sleep and weight loss',
    sourceKey: 'mindset',
    promise: 'treat sleep as a performance tool instead of an afterthought',
    quick: 'Sleep affects appetite, energy, training performance, recovery, and decision-making. Improving sleep will not replace nutrition, but it can make weight loss much easier to sustain.',
    sections: [
      ['Poor sleep changes behavior', 'When sleep is short, people often feel hungrier, crave quick energy, move less, and train with lower quality. The issue is not weak willpower; the body is trying to manage fatigue.'],
      ['Sleep supports recovery', 'Training creates stress that the body needs to adapt to. Better sleep helps muscle repair, mood, coordination, and readiness for the next session. Without recovery, even a good workout plan becomes harder to maintain.'],
      ['Start with routine, not perfection', 'You do not need an ideal lifestyle to improve sleep. A consistent wake time, lower evening caffeine, dimmer screens, and a wind-down routine can make a noticeable difference.']
    ],
    steps: ['Choose a realistic bedtime window for weekdays.', 'Keep caffeine earlier in the day if it affects you.', 'Make the bedroom darker, cooler, and quieter when possible.', 'Use a short evening routine that does not involve work.', 'Avoid very heavy meals right before bed if they disrupt sleep.'],
    table: [['Sleep habit', 'Why it helps', 'Simple action'], ['Consistent wake time', 'Stabilizes rhythm', 'Same alarm most days'], ['Less late caffeine', 'Improves sleep pressure', 'Switch to decaf later'], ['Light management', 'Signals night to the body', 'Dim screens'], ['Wind-down', 'Reduces mental load', 'Read or stretch']],
    mistakes: ['using caffeine to cover chronic sleep debt', 'training hard late at night when it ruins sleep', 'ignoring sleep while cutting calories aggressively'],
    cta: 'Choose one sleep habit and protect it for the next seven nights.'
  },
  {
    slug: 'como-voltar-a-rotina-fitness-depois-de-parar-por-muito-tempo',
    title: 'How to Return to a Fitness Routine After a Long Break',
    keyword: 'return to fitness routine',
    sourceKey: 'mindset',
    promise: 'restart training without trying to compensate for lost time',
    quick: 'The safest return is gradual. Start below your old capacity, rebuild consistency, and let the body adapt before chasing personal records or strict diets.',
    sections: [
      ['Do not restart from your peak', 'Your memory may remember old weights and workouts, but your tissues need time. Returning too aggressively can create soreness, joint pain, and discouragement. A lighter first phase is not failure; it is smart re-entry.'],
      ['Use two weeks as a ramp', 'For the first two weeks, reduce volume and intensity. Choose familiar exercises, fewer sets, moderate effort, and extra walking. The goal is to finish sessions with confidence and repeat them.'],
      ['Make food boringly reliable', 'You do not need a dramatic diet on the same week you return to training. Organize protein, vegetables, water, and regular meals first. Once routine returns, refine portions.']
    ],
    steps: ['Pick three fixed training days for the first month.', 'Cut old loads roughly in half if needed.', 'Use fewer sets than you used before the break.', 'Walk on alternate days instead of adding intense cardio immediately.', 'Increase volume only if soreness and joints feel manageable.'],
    table: [['Week', 'Main focus', 'Goal'], ['1', 'Restart habit', 'Easy sessions'], ['2', 'Technique', 'Repeat exercises'], ['3', 'Progression', 'Add small load or reps'], ['4', 'Consistency', 'Keep the full routine']],
    mistakes: ['trying to compensate for months in one week', 'ignoring joint pain', 'changing training and diet radically at the same time'],
    cta: 'Schedule your first three return workouts before searching for the perfect plan.'
  },
  {
    slug: 'metas-fitness-realistas-como-definir-objetivos-sem-frustracao',
    title: 'Realistic Fitness Goals: How to Set Targets Without Frustration',
    keyword: 'realistic fitness goals',
    sourceKey: 'mindset',
    promise: 'turn a fitness wish into a plan you can measure and repeat',
    quick: 'A good goal is specific, measurable, and connected to weekly behaviors. Instead of promising to change everything, choose actions that point toward the result.',
    sections: [
      ['Separate outcome from process', 'Losing weight, gaining muscle, or improving endurance are outcomes. Training three times, walking 150 minutes, preparing lunches, or sleeping earlier are process goals. You control the process more directly.'],
      ['Use honest deadlines', 'Sustainable change takes weeks and months. Aggressive deadlines increase frustration and encourage extreme actions. A realistic plan leaves room for work, family, travel, and imperfect days.'],
      ['Track more than body weight', 'Use waist measurements, photos, gym performance, steps, sleep, energy, and consistency. One metric can mislead you. A broader dashboard gives a clearer picture.']
    ],
    steps: ['Write one outcome goal clearly.', 'Convert it into three weekly behaviors.', 'Define when and where each behavior will happen.', 'Choose one review metric for Sunday.', 'Adjust the goal if it does not fit real life.'],
    table: [['Vague goal', 'Better goal', 'Linked behavior'], ['Lose weight', 'Lose 2 kg in 8 weeks', 'Train 3x and use the plate method'], ['Be disciplined', 'Train Monday, Wednesday, Friday', 'Prepare clothes at night'], ['Eat better', 'Pack lunch 4x/week', 'Meal prep on Sunday']],
    mistakes: ['judging only by the scale', 'setting impossible timelines', 'quitting because one week was imperfect'],
    cta: 'Write one process goal for this week and put it somewhere visible.'
  },
  {
    slug: 'whey-protein-vale-a-pena-quando-usar-e-como-escolher',
    title: 'Is Whey Protein Worth It? When to Use It and How to Choose',
    keyword: 'is whey protein worth it',
    sourceKey: 'supplements',
    promise: 'decide whether whey fits your routine without falling for marketing',
    quick: 'Whey protein is a convenient protein source. It is worth considering when it helps you reach daily protein needs, but it is not required if your food intake already covers them.',
    sections: [
      ['What whey actually is', 'Whey is a milk-derived protein powder used mostly for convenience. It can fit snacks, post-workout meals, or busy days. It is still a food product, not a shortcut that replaces a balanced diet.'],
      ['When whey makes sense', 'Use whey when you struggle to get enough protein from meals or when a quick shake prevents a worse choice. If you already eat enough eggs, dairy, lean meats, legumes, soy foods, or other protein sources, you may not need it.'],
      ['How to choose wisely', 'Check protein per serving, ingredient list, sweeteners, digestive tolerance, third-party testing, and price per gram of protein. People with milk allergy, lactose intolerance, or clinical conditions should be more careful.']
    ],
    steps: ['Estimate your daily protein intake from normal meals.', 'Identify whether snacks are the weak point.', 'Compare protein per serving and price.', 'Start with a smaller serving to test digestion.', 'Do not use whey to cover an otherwise chaotic diet.'],
    table: [['Type', 'Main trait', 'May suit'], ['Concentrate', 'Common and often cheaper', 'People who tolerate lactose'], ['Isolate', 'More protein per serving', 'People wanting lower lactose'], ['Plant protein', 'No dairy', 'Vegans or milk-allergic users']],
    mistakes: ['buying based only on flavor', 'using multiple scoops without need', 'believing whey causes fat loss by itself'],
    cta: 'Review your regular meals before deciding whether a protein powder is necessary.'
  },
  {
    slug: 'creatina-para-que-serve-como-tomar-e-quem-pode-usar',
    title: 'Creatine: What It Does, How to Take It, and Who Can Use It',
    keyword: 'how to take creatine',
    sourceKey: 'supplements',
    promise: 'use creatine with realistic expectations and better safety habits',
    quick: 'Creatine monohydrate is one of the most studied supplements for strength and power. Many people use a simple daily maintenance dose, but anyone with kidney disease or a clinical condition should seek professional guidance.',
    sections: [
      ['What creatine does', 'Creatine supports the fast energy system used during short, intense efforts such as lifting, sprinting, and repeated powerful movements. It does not replace training; it helps the body perform certain efforts a little better over time.'],
      ['How people usually take it', 'A consistent daily dose is common. A loading phase is not mandatory for everyone; it mainly fills stores faster. The most important detail is regular use, because benefits accumulate.'],
      ['What to expect', 'Some people notice better repetitions, strength, or training quality. Body weight may rise slightly due to water stored inside muscle, which is different from fat gain. Results depend on training, diet, and consistency.']
    ],
    steps: ['Choose plain creatine monohydrate.', 'Take it daily at a time you can remember.', 'Mix it with water or with a meal.', 'Drink water regularly through the day.', 'Talk with a clinician if you have kidney disease or take relevant medications.'],
    table: [['Question', 'Practical answer', 'Note'], ['Do I need to cycle?', 'Usually no', 'Consistency matters more'], ['Does it hold water?', 'It can increase weight', 'Often inside muscle'], ['Is it like caffeine?', 'No', 'Effect is not immediate stimulation']],
    mistakes: ['expecting results after one workout', 'buying expensive blends without need', 'using it despite medical contraindications'],
    cta: 'If creatine fits your context, choose a simple product and track training performance.'
  },
  {
    slug: 'pre-treino-natural-alimentos-que-ajudam-na-energia-sem-exageros',
    title: 'Natural Pre-Workout Foods for Energy Without Overdoing Stimulants',
    keyword: 'natural pre-workout foods',
    sourceKey: 'supplements',
    promise: 'train with better energy without depending on strong stimulants',
    quick: 'A good natural pre-workout combines easy-to-digest carbohydrates, some protein if there is enough time, and hydration. Caffeine may help, but it should not be used to hide chronic poor sleep.',
    sections: [
      ['Energy comes from the whole day', 'The meal 30 minutes before training matters, but it cannot fix an underfed day. If breakfast, lunch, hydration, and sleep are poor, no pre-workout snack will fully solve low energy.'],
      ['Training early requires simplicity', 'Banana, toast with jam, yogurt, a small bowl of oats, fruit with coffee, or a small sandwich may work. The closer you are to the workout, the simpler and lower-fat the option should be.'],
      ['Use caffeine with respect', 'Coffee can improve alertness for some people, but too much can increase anxiety, heart racing, and poor sleep. Avoid using stimulants late in the day if they damage recovery.']
    ],
    steps: ['Check how much time you have before training.', 'If you have less than 60 minutes, choose a lighter option.', 'Drink water before and during the session.', 'Test foods on normal training days, not important events.', 'Avoid large amounts of fat and fiber right before training if they bother your stomach.'],
    table: [['Time before', 'Option', 'Why it works'], ['30 minutes', 'Banana or fruit', 'Simple digestion'], ['60 minutes', 'Toast with eggs or yogurt', 'Energy plus protein'], ['90 minutes', 'Oats with yogurt', 'More staying power'], ['Any time', 'Water', 'Basic hydration']],
    mistakes: ['forcing fasted training when you feel terrible', 'using stimulants late at night', 'eating a heavy meal and blaming the workout'],
    cta: 'Test two simple pre-workout options and keep the one that improves energy without discomfort.'
  },
  {
    slug: 'dor-muscular-pos-treino-o-que-e-normal-e-como-recuperar-melhor',
    title: 'Post-Workout Muscle Soreness: What Is Normal and How to Recover Better',
    keyword: 'post workout muscle soreness',
    sourceKey: 'training',
    promise: 'tell normal adaptation apart from signs that you may have overdone it',
    quick: 'Delayed muscle soreness can happen after a new or harder workout and should improve within a few days. Sharp joint pain, major swelling, loss of function, or pain that worsens deserves attention.',
    sections: [
      ['Soreness is not a trophy', 'Being sore does not prove the workout was productive. Progress comes from the right stimulus plus recovery. If every session leaves you unable to move well, volume or intensity may be too high.'],
      ['What actually helps recovery', 'Sleep, enough food, protein, carbohydrates, hydration, light walking, and gradual progression help more than miracle fixes. Gentle stretching may feel good, but it cannot erase poor programming.'],
      ['When to be cautious', 'Sharp joint pain, bruising, severe swelling, unusual weakness, or symptoms that get worse over several days are not normal training feedback. Avoid hard training for the same area until it recovers.']
    ],
    steps: ['Reduce intensity in the next session if soreness is high.', 'Use light walking to increase circulation.', 'Prioritize sleep the night after hard training.', 'Eat enough protein and carbohydrates for your goal.', 'Increase load and volume gradually instead of all at once.'],
    table: [['Symptom', 'Likely scenario', 'Action'], ['Diffuse muscle soreness', 'Normal adaptation', 'Light training or rest'], ['Sharp joint pain', 'Possible irritation', 'Reduce and assess'], ['Major swelling', 'Warning sign', 'Seek professional help'], ['Improves in 48-72h', 'Expected recovery', 'Resume progression']],
    mistakes: ['training a very sore muscle hard again too soon', 'using medication to mask bad loading choices', 'increasing weekly volume too quickly'],
    cta: 'Next week, progress a little less and see whether recovery improves.'
  },
  {
    slug: 'descanso-tambem-da-resultado-como-a-recuperacao-melhora-seu-treino',
    title: 'Rest Gets Results Too: How Recovery Improves Your Training',
    keyword: 'muscle recovery',
    sourceKey: 'mindset',
    promise: 'see rest as an active part of progress, not a lack of discipline',
    quick: 'Recovery depends on sleep, nutrition, hydration, training spacing, and stress management. Good rest lets you train better; it does not cancel your effort.',
    sections: [
      ['Adaptation happens after the workout', 'Training creates the signal. Recovery allows the body to adapt. If fatigue piles up without enough rest, performance drops and aches become more likely.'],
      ['Active recovery can be useful', 'A light day does not need to mean doing nothing. Walking, mobility, easy cycling, and gentle stretching can support movement quality without competing with hard training. The key is to finish feeling better, not more drained.'],
      ['Signs recovery is falling behind', 'Poor sleep, irritability, lower strength, persistent soreness, low motivation, and repeated bad sessions can mean the plan is too much for your current recovery. Sometimes the best progress comes from a lighter week.']
    ],
    steps: ['Keep your sleep schedule as regular as your life allows.', 'Plan at least one lighter day each week.', 'Alternate muscle groups or intensity across sessions.', 'Eat enough protein and total food for your goal.', 'Use a deload week when performance drops for many workouts.'],
    table: [['Recovery pillar', 'How it helps', 'Simple action'], ['Sleep', 'Repair and energy', 'Consistent bedtime window'], ['Nutrition', 'Building materials', 'Daily protein'], ['Hydration', 'Muscle function', 'Water through the day'], ['Load planning', 'Controls fatigue', 'Gradual progression']],
    mistakes: ['believing rest slows results', 'training hard every day without a plan', 'refusing to adapt workouts during stressful weeks'],
    cta: 'Plan your next light day with the same respect as your hardest workout.'
  }
];

function buildArticle(article) {
  const sourceList = sources[article.sourceKey].map((item) => `- ${item}`).join('\n');
  const sectionText = article.sections.map(([title, body]) => `## ${title}\n\n${body}`).join('\n\n');
  const steps = article.steps.map((step, index) => `${index + 1}. **${step.split('.')[0]}.**${step.includes('.') ? step.slice(step.indexOf('.') + 1) : ''}`).join('\n\n');
  const table = [
    `|${article.table[0].join('|')}|`,
    `|${article.table[0].map(() => '---').join('|')}|`,
    ...article.table.slice(1).map((row) => `|${row.join('|')}|`)
  ].join('\n');
  const mistakes = article.mistakes.map((item) => `- ${item}.`).join('\n');

  return `If you searched for **${article.keyword}**, you probably found advice that is either too simplistic or too extreme. Fitness content often makes healthy habits look harder than they need to be. This guide is written to give you a clear, practical way to ${article.promise}.

Use this article as educational content, not as a replacement for individual medical, nutrition, or exercise guidance. If you have pain, a chronic condition, a history of disordered eating, pregnancy, medication use, or symptoms that get worse with diet or exercise, work with a qualified professional.

## Quick answer

${article.quick}

The main idea is consistency. A simple plan repeated for several weeks usually beats an aggressive plan that only lasts a few days.

${sectionText}

## Practical step-by-step

${steps}

## Quick comparison

${table}

## Common mistakes to avoid

${mistakes}

Be careful with any promise that guarantees dramatic results in a few days. The body responds to sleep, food quality, training stimulus, stress, age, genetics, medication, and daily routine. A plan should improve your life instead of constantly competing with it.

## How to know it is working

Use both objective and subjective markers. Weight, waist measurement, training loads, repetitions, steps, and photos can be useful. Hunger, energy, sleep, mood, digestion, and adherence are just as important because they show whether the plan can survive a normal week.

Review progress weekly instead of hourly. Ask three questions: Did I repeat the basics most days? Did my energy stay acceptable? Am I moving closer to the goal without damaging my relationship with food, training, or rest? If the answer is no, adjust the dose before abandoning the whole plan.

## A simple 7-day implementation plan

Treat the next seven days as a test. On day one, choose one small action from this article. On days two and three, repeat the same action so you do not have to redesign the plan. On day four, identify what made the action difficult: time, hunger, fatigue, shopping, environment, social pressure, or unrealistic expectations.

On days five and six, adjust one variable only. Make the workout shorter, prepare one meal in advance, move caffeine earlier, simplify breakfast, walk after lunch, or sleep 20 minutes earlier. On day seven, review what felt repeatable. The goal is not to prove willpower; it is to discover the version of the habit you can actually keep.

## Checklist before moving forward

- The basic action was repeated on most days.
- The strategy did not harm sleep, mood, or your relationship with food.
- You know the next small step.
- The plan fits a normal week, not only a perfect week.

## When to seek professional guidance

Get individualized support from a physician, registered dietitian, or qualified exercise professional if you have a chronic disease, persistent pain, dizziness, a history of eating disorders, pregnancy, medication use, or any symptom that worsens with diet or exercise. Good articles can organize your decisions, but they cannot evaluate your personal medical context.

## Conclusion

${article.title} does not need to be confusing. Start with the basics, apply them long enough to get real feedback, and adjust based on how your body and routine respond. Sustainable results are built from small decisions repeated well.

**Next step:** ${article.cta}

## Sources and references

${sourceList}
`;
}

const updateArticle = db.prepare(`
  UPDATE articles
  SET title_en = ?, content_en = ?
  WHERE slug = ?
`);

const transaction = db.transaction(() => {
  for (const article of articles) {
    const result = updateArticle.run(article.title, buildArticle(article), article.slug);
    if (result.changes === 0) {
      console.warn(`Article not found: ${article.slug}`);
    }
  }
});

transaction();

console.log(`English versions updated: ${articles.length} articles.`);
