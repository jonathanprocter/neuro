/**
 * Complete Question Database for Neuro-Transmitter Questionnaire
 * 
 * This file contains all questions from the PDF, structured by section and category.
 * It will replace the incomplete question set in the current application.
 */

const questionDatabase = {
  part1: {
    // Section 1A: Dopamine Assessment
    dopamine: {
      memoryAttention: [
        "I find it easy to process my thoughts.",
        "I concentrate effectively.",
        "I am a deep thinker.",
        "I am good at careful observing.",
        "I have a good memory for details.",
        "I am good at math.",
        "I am good at solving puzzles.",
        "I am good at remembering names.",
        "I am good at remembering faces.",
        "I am good at remembering what I read."
      ],
      physical: [
        "I have a lot of physical energy.",
        "I am well-coordinated.",
        "I am good at sports.",
        "I have a strong sex drive.",
        "I have a strong handshake.",
        "I have a firm musculature.",
        "I have a strong voice.",
        "I have a strong appetite.",
        "I am physically strong.",
        "I have good posture."
      ],
      personality: [
        "I am self-confident.",
        "I am extroverted.",
        "I am assertive.",
        "I am a leader.",
        "I am a risk-taker.",
        "I am competitive.",
        "I am aggressive.",
        "I am intense.",
        "I am a hard worker.",
        "I am ambitious."
      ],
      character: [
        "I am logical.",
        "I am analytical.",
        "I am rational.",
        "I am focused.",
        "I am goal-oriented.",
        "I am practical.",
        "I am objective.",
        "I am realistic.",
        "I am decisive.",
        "I am independent."
      ]
    },
    
    // Section 2A: Acetylcholine Assessment
    acetylcholine: {
      memoryAttention: [
        "I have a good memory for conversations.",
        "I have a good memory for places.",
        "I have a good memory for experiences.",
        "I have a good memory for trivia.",
        "I have a good memory for facts.",
        "I have a good memory for movies.",
        "I have a good memory for stories.",
        "I have a good memory for lyrics.",
        "I have a good memory for jokes.",
        "I have a good memory for directions."
      ],
      physical: [
        "I am graceful.",
        "I have good balance.",
        "I am flexible.",
        "I have good fine motor skills.",
        "I have sensitive skin.",
        "I have a youthful appearance.",
        "I have a good sense of smell.",
        "I have a good sense of taste.",
        "I have a good sense of touch.",
        "I have good hearing."
      ],
      personality: [
        "I am creative.",
        "I am intuitive.",
        "I am imaginative.",
        "I am artistic.",
        "I am sensitive.",
        "I am emotional.",
        "I am romantic.",
        "I am spiritual.",
        "I am idealistic.",
        "I am passionate."
      ],
      character: [
        "I am curious.",
        "I am innovative.",
        "I am expressive.",
        "I am perceptive.",
        "I am introspective.",
        "I am philosophical.",
        "I am insightful.",
        "I am empathetic.",
        "I am compassionate.",
        "I am understanding."
      ]
    },
    
    // Section 3A: GABA Assessment
    gaba: {
      memoryAttention: [
        "I am good at remembering routines.",
        "I am good at remembering procedures.",
        "I am good at remembering schedules.",
        "I am good at remembering rules.",
        "I am good at remembering patterns.",
        "I am good at remembering sequences.",
        "I am good at remembering systems.",
        "I am good at remembering formulas.",
        "I am good at remembering methods.",
        "I am good at remembering structures."
      ],
      physical: [
        "I am calm.",
        "I am relaxed.",
        "I sleep well.",
        "I have a steady hand.",
        "I have a regular heartbeat.",
        "I have good digestion.",
        "I have stable blood pressure.",
        "I have a strong immune system.",
        "I have good endurance.",
        "I recover quickly from illness."
      ],
      personality: [
        "I am patient.",
        "I am steady.",
        "I am reliable.",
        "I am consistent.",
        "I am methodical.",
        "I am organized.",
        "I am disciplined.",
        "I am cautious.",
        "I am careful.",
        "I am thorough."
      ],
      character: [
        "I am loyal.",
        "I am dependable.",
        "I am trustworthy.",
        "I am responsible.",
        "I am ethical.",
        "I am moral.",
        "I am principled.",
        "I am honorable.",
        "I am conscientious.",
        "I am dutiful."
      ]
    },
    
    // Section 4A: Serotonin Assessment
    serotonin: {
      memoryAttention: [
        "I am good at remembering people.",
        "I am good at remembering social events.",
        "I am good at remembering conversations.",
        "I am good at remembering relationships.",
        "I am good at remembering emotional experiences.",
        "I am good at remembering personal details.",
        "I am good at remembering social cues.",
        "I am good at remembering social networks.",
        "I am good at remembering social dynamics.",
        "I am good at remembering social history."
      ],
      physical: [
        "I have a good appetite.",
        "I have a regular sleep cycle.",
        "I have good physical rhythm.",
        "I have good physical timing.",
        "I have good physical coordination.",
        "I have good physical stamina.",
        "I have good physical resilience.",
        "I have good physical recovery.",
        "I have good physical adaptability.",
        "I have good physical flexibility."
      ],
      personality: [
        "I am sociable.",
        "I am friendly.",
        "I am outgoing.",
        "I am cheerful.",
        "I am optimistic.",
        "I am enthusiastic.",
        "I am energetic.",
        "I am spontaneous.",
        "I am playful.",
        "I am adventurous."
      ],
      character: [
        "I am adaptable.",
        "I am flexible.",
        "I am resilient.",
        "I am easygoing.",
        "I am accepting.",
        "I am tolerant.",
        "I am forgiving.",
        "I am generous.",
        "I am kind.",
        "I am compassionate."
      ]
    }
  },
  
  part2: {
    // Section 1B: Dopamine Deficiency
    dopamine: {
      memoryAttention: [
        "I have difficulty concentrating.",
        "I have difficulty focusing.",
        "I have difficulty paying attention.",
        "I have difficulty staying on task.",
        "I have difficulty completing projects.",
        "I have difficulty organizing my thoughts.",
        "I have difficulty making decisions."
      ],
      physical: [
        "I feel physically fatigued.",
        "I have low energy.",
        "I have a low sex drive.",
        "I have difficulty getting started in the morning.",
        "I have muscle weakness.",
        "I have a weak handshake.",
        "I have poor posture."
      ],
      personality: [
        "I lack self-confidence.",
        "I am introverted.",
        "I am passive.",
        "I avoid risks.",
        "I avoid competition.",
        "I lack motivation.",
        "I procrastinate."
      ],
      character: [
        "I am indecisive.",
        "I lack focus.",
        "I lack direction.",
        "I lack ambition.",
        "I lack drive.",
        "I lack purpose.",
        "I can't stop thinking about the meaning of life."
      ]
    },
    
    // Section 2B: Acetylcholine Deficiency
    acetylcholine: {
      memoryAttention: [
        "I have difficulty remembering names.",
        "I have difficulty remembering faces.",
        "I have difficulty remembering conversations.",
        "I have difficulty remembering what I read.",
        "I have difficulty remembering recent events.",
        "I have difficulty learning new information.",
        "I have difficulty recalling information."
      ],
      physical: [
        "I have dry skin.",
        "I have dry eyes.",
        "I have dry mouth.",
        "I have muscle cramps.",
        "I have muscle twitches.",
        "I have headaches.",
        "I have blurred vision."
      ],
      personality: [
        "I lack creativity.",
        "I lack imagination.",
        "I lack intuition.",
        "I lack emotional depth.",
        "I lack passion.",
        "I lack enthusiasm.",
        "I lack spontaneity."
      ],
      character: [
        "I lack curiosity.",
        "I lack insight.",
        "I lack perception.",
        "I lack empathy.",
        "I lack compassion.",
        "I lack understanding.",
        "I no longer want to take risks."
      ]
    },
    
    // Section 3B: GABA Deficiency
    gaba: {
      memoryAttention: [
        "I have racing thoughts.",
        "I have difficulty focusing on one thing.",
        "I am easily distracted.",
        "I have difficulty following instructions.",
        "I have difficulty following routines.",
        "I have difficulty following procedures.",
        "I have difficulty following systems."
      ],
      physical: [
        "I feel tense.",
        "I feel anxious.",
        "I have difficulty sleeping.",
        "I have muscle tension.",
        "I have a rapid heartbeat.",
        "I have digestive problems.",
        "I have high blood pressure."
      ],
      personality: [
        "I am impatient.",
        "I am restless.",
        "I am irritable.",
        "I am impulsive.",
        "I am reactive.",
        "I am unpredictable.",
        "I am disorganized."
      ],
      character: [
        "I am unreliable.",
        "I am inconsistent.",
        "I am undisciplined.",
        "I am careless.",
        "I am reckless.",
        "I am irresponsible.",
        "The lack of meaning in my life is painful to me."
      ]
    },
    
    // Section 4B: Serotonin Deficiency
    serotonin: {
      memoryAttention: [
        "I am not very perceptive.",
        "I can't remember things that I have seen in the past.",
        "I have a slow reaction time.",
        "I have a poor sense of direction.",
        "I have difficulty remembering social events.",
        "I have difficulty remembering relationships.",
        "I have difficulty remembering emotional experiences."
      ],
      physical: [
        "I have nightsweats.",
        "I have insomnia.",
        "I tend to sleep in many different positions in order to feel comfortable.",
        "I always awake early in the morning.",
        "I can't relax.",
        "I wake up at least two times per night.",
        "It is difficult for me to fall back asleep when I am awakened."
      ],
      personality: [
        "I have chronic anxiety.",
        "I am easily irritated.",
        "I have thoughts of self-destruction.",
        "I have had suicidal thoughts in my life.",
        "I tend to dwell on ideas too much.",
        "I am sometimes so structured that I become inflexible.",
        "My imagination takes over."
      ],
      character: [
        "I don't play by the rules anymore.",
        "I have lost many friends.",
        "I can't sustain romantic relationships.",
        "I consider the law arbitrary and without reason.",
        "I now consider rules that I used to follow ridiculous.",
        "Fear grips me.",
        "I always try to introduce some excitement."
      ]
    }
  }
};

export default questionDatabase;
