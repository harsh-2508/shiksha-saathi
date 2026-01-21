const strategies = [
  // ==============================
  // 1. NOISY CLASS (Behavior)
  // ==============================
  {
    "id": "noise_001",
    "challenge": "noise",
    "grade": "primary",
    "subject": "general",
    "title": "The 1-2-3 Magic Clap",
    "action": "Clap a rhythm (1-2, 1-2-3) and ask students to repeat it. Do this 3 times varying the speed.",
    "why": "Regains attention using motor skills instead of shouting."
  },
  {
    "id": "noise_002",
    "challenge": "noise",
    "grade": "primary",
    "subject": "general",
    "title": "The Silent Statue Game",
    "action": "Say 'Statue!' Students must freeze. The first one to move is 'out'. The last one standing gets a star.",
    "why": "Turns discipline into a game, making silence a challenge rather than a punishment."
  },
  {
    "id": "noise_003",
    "challenge": "noise",
    "grade": "middle",
    "subject": "general",
    "title": "Reverse Timer",
    "action": "Write '30' on the board. Erase a second every time there is noise. Time left = Extra play time.",
    "why": "Uses loss aversion; students police each other to save their break time."
  },
  {
    "id": "noise_004",
    "challenge": "noise",
    "grade": "primary",
    "subject": "general",
    "title": "Hands on Head",
    "action": "Say 'If you can hear me, put your hands on your head.' Then 'on your shoulders'. Whisper the last one.",
    "why": "Forces students to listen actively to follow the changing instructions."
  },

  // ==============================
  // 2. CONCEPT UNCLEAR (Math)
  // ==============================
  {
    "id": "math_001",
    "challenge": "concept",
    "grade": "primary",
    "subject": "math",
    "title": "Pebble Grouping (TLM)",
    "action": "Ask students to use stones/pencils to physically group numbers (e.g., 3 piles of 4 for multiplication).",
    "why": "Concrete visualization is essential before abstract calculation in early stages."
  },
  {
    "id": "math_002",
    "challenge": "concept",
    "grade": "primary",
    "subject": "math",
    "title": "Market Day Simulation",
    "action": "Use paper scraps as 'money'. One student sells, one buys. Practise addition/subtraction.",
    "why": "Connects math to daily life (buying vegetables/snacks), making it relatable."
  },
  {
    "id": "math_003",
    "challenge": "concept",
    "grade": "middle",
    "subject": "math",
    "title": "Fraction Paper Folding",
    "action": "Give every student a paper. Fold in half (1/2), then again (1/4). Shade regions to compare.",
    "why": "Visual proof that 1/2 is larger than 1/4, which is often confusing in text."
  },

  // ==============================
  // 3. CONCEPT UNCLEAR (Science)
  // ==============================
  {
    "id": "sci_001",
    "challenge": "concept",
    "grade": "primary",
    "subject": "science",
    "title": "Living vs Non-Living Hunt",
    "action": "Look out the window. Name 3 things that grow (Living) and 3 that don't (Non-Living).",
    "why": "Observation-based learning is more effective than definitions for EVS."
  },
  {
    "id": "sci_002",
    "challenge": "concept",
    "grade": "middle",
    "subject": "science",
    "title": "Act Out the States of Matter",
    "action": "Solid: Students stand tight together. Liquid: Move slightly. Gas: Run freely.",
    "why": "Kinesthetic learning helps understand molecular arrangement physically."
  },
  {
    "id": "sci_003",
    "challenge": "concept",
    "grade": "middle",
    "subject": "science",
    "title": "The Water Cycle Hand Dance",
    "action": "Hand up (Evaporation), Fingers wiggle down (Precipitation), Hands flow (Collection).",
    "why": "Muscle memory helps recall complex cycle stages."
  },

  // ==============================
  // 4. CONCEPT UNCLEAR (Language/English)
  // ==============================
  {
    "id": "eng_001",
    "challenge": "concept",
    "grade": "primary",
    "subject": "english",
    "title": "Simon Says (Action Verbs)",
    "action": "Play 'Simon Says': 'Jump', 'Sit', 'Run'. If Simon doesn't say it, don't do it.",
    "why": "Associates the English word directly with the physical action (Total Physical Response)."
  },
  {
    "id": "eng_002",
    "challenge": "concept",
    "grade": "middle",
    "subject": "english",
    "title": "Word Chain (Antakshari)",
    "action": "Student A says a word (e.g., 'Apple'). B says word starting with last letter ('Elephant').",
    "why": "Builds vocabulary rapidly without the pressure of a formal test."
  },
  {
    "id": "eng_003",
    "challenge": "concept",
    "grade": "middle",
    "subject": "english",
    "title": "Story Building",
    "action": "Start a story: 'Yesterday I saw a...'. Next student adds 3 words. Go around the class.",
    "why": "Encourages sentence construction and creativity in a low-stakes environment."
  },

  // ==============================
  // 5. BORED / LOW ENERGY
  // ==============================
  {
    "id": "bored_001",
    "challenge": "bored",
    "grade": "primary",
    "subject": "general",
    "title": "Stretch and Breathe",
    "action": "Stand up. Reach for the sky (inhale). Touch toes (exhale). Repeat 3 times.",
    "why": "Re-oxygenates the brain and breaks the monotony of sitting."
  },
  {
    "id": "bored_002",
    "challenge": "bored",
    "grade": "middle",
    "subject": "general",
    "title": "Quiz Master Switch",
    "action": "Select a student to come to the front and ask the class 3 questions from the textbook.",
    "why": "Empowers students and shifts focus from teacher-led to peer-led."
  },
  
  // ==============================
  // 6. SHORT ON TIME
  // ==============================
  {
    "id": "time_001",
    "challenge": "time",
    "grade": "middle",
    "subject": "general",
    "title": "Exit Ticket",
    "action": "Ask: 'What is the ONE thing you learned today?' Pick 3 random students to answer before leaving.",
    "why": "Quick assessment of learning outcomes without grading papers."
  },
  {
    "id": "time_002",
    "challenge": "time",
    "grade": "primary",
    "subject": "general",
    "title": "Rapid Fire Recap",
    "action": "Throw a ball/chalk to a student. They must say one keyword from the lesson and throw it back.",
    "why": "Covers revision in < 2 minutes while packing up."
  }
];

export default strategies;