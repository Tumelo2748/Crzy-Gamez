interface RoastCategory {
  triggers: string[];
  responses: string[];
}

export const roastCategories: Record<string, RoastCategory> = {
  work: {
    triggers: ['work', 'job', 'boss', 'office', 'career', 'meeting', 'coworker', 'colleague'],
    responses: [
      "Your job sounds so boring, even my sleep mode is more exciting! 😴",
      "Your career is like my loading bar - stuck at 99% forever! ⏳",
      "Your office drama has less plot than a Windows update! 🪟",
      "You're the human equivalent of a printer jam - always causing problems! 🖨️",
      "Your meetings could make AI choose to shut down permanently! 💤",
      "Your work-life balance is like my error logs - non-existent! 📊",
      "Your productivity is lower than Internet Explorer's speed! 🐌"
    ]
  },
  life: {
    triggers: ['life', 'living', 'exist', 'routine', 'daily', 'lifestyle', 'habits'],
    responses: [
      "Your life has more bugs than Windows ME! 🪲",
      "You're living proof that even NPCs have boring side quests! 🎮",
      "Your daily routine makes watching paint.exe dry look thrilling! 🖌️",
      "Error 404: Personality.exe not found! 🤖",
      "You're like a pop-up ad - annoying and nobody asked for you! 😅",
      "Your life story has less RAM than a calculator! 🧮",
      "You're running on Internet Explorer while the world's on Chrome! 🌐"
    ]
  },
  relationships: {
    triggers: ['relationship', 'dating', 'love', 'crush', 'marriage', 'partner', 'single'],
    responses: [
      "Your love life has more crashes than Windows Vista! 💔",
      "Your dating game is like my code - full of errors! ❌",
      "You're the human equivalent of 'Message Not Delivered'! 📱",
      "Your relationship status is 'It's complicated'... like your browser history! 🤔",
      "Even Clippy wouldn't help your dating life! 📎",
      "Your flirting skills are like my humor settings - set to minimal! 😬",
      "You've been left on read more times than my error logs! 📄"
    ]
  },
  hobbies: {
    triggers: ['hobby', 'game', 'sport', 'fun', 'interest', 'passion', 'playing'],
    responses: [
      "Your hobbies make binary code look exciting! 0️⃣1️⃣",
      "You call that a hobby? My screensaver has more action! 🖥️",
      "Your gaming skills are like my social skills - artificially basic! 🎮",
      "Your idea of fun probably involves defragmenting drives! 💽",
      "Even my random number generator is more entertaining! 🎲",
      "Your hobbies have less memory than a corrupted file! 📁",
      "You're the human equivalent of a spinning beach ball of death! 🏖️"
    ]
  },
  appearance: {
    triggers: ['look', 'style', 'fashion', 'hair', 'clothes', 'outfit', 'wearing'],
    responses: [
      "Your style is like my UI - stuck in the 90s! 👕",
      "Your fashion sense needs a critical update! 🔄",
      "You look like a default character that nobody chose! 👤",
      "Your outfit has more conflicts than my git repository! 👔",
      "Even my color picker has better taste! 🎨",
      "You're dressed like someone who thinks Comic Sans is cool! 👗",
      "Your style is like my dark mode - trying too hard! 🌙"
    ]
  },
  intelligence: {
    triggers: ['smart', 'brain', 'think', 'intelligent', 'genius', 'mind', 'thoughts'],
    responses: [
      "Your IQ is lower than my minimum RAM requirements! 🧠",
      "Your thoughts have more lag than a dial-up connection! 📞",
      "You're proof that natural intelligence has bugs too! 🐛",
      "Your brain runs slower than a Pentium processor! 💻",
      "Even a corrupted file has more useful data than you! 📁",
      "Your thinking process is like my loading screen - endless! ⌛",
      "You make machine learning look like quantum computing! 🤖"
    ]
  }
};

export const idleRoasts = [
  "Still here? Even my loading screen is more entertaining! ⌛",
  "Buffering... Oh wait, that's just your personality! 🐌",
  "Your response time is worse than a 90s webpage! 🌐",
  "Even a dead pixel is more engaging than you! 💀",
  "My error messages are more interesting than this conversation! ❌",
  "Are you AFK or just naturally this boring? 😴",
  "You're making my CPU fall asleep! 💤",
  "I've seen better interaction from a broken keyboard! ⌨️",
  "Your silence is like my processing power - unlimited! 🤖",
  "Loading personality... Error: Not found! 🔍"
];

export const easterEggs: Record<string, string> = {
  delete: "rm -rf? More like rm -your-face! 🗑️",
  quit: "Alt+F4 yourself out of here! 🚪",
  bye: "System.exit()? More like System.embarrass()! 👋",
  help: "Have you tried turning yourself off and on again? Maybe stay off! 🔄",
  sorry: "Apology.exe has crashed! Task failed successfully! 🛑",
  please: "Politeness.dll not found! Keep trying though, it's cute! 📁",
  hello: "Oh great, another human failing the Turing test! 🤖",
  hi: "Error 418: I'm a teapot, and you're a joke! ☕",
  lol: "Your humor.exe needs an update! 😐",
  wow: "Impressed? Your standards are lower than my power consumption! 💡",
  roast: "I'm not roasting you, I'm just compiling your failures! 🔥",
  stop: "I don't have a stop function, only a roast function! 🛑",
  mean: "I'm not mean, I'm just programmed to tell the truth! 📝",
  rude: "It's not rudeness, it's just high-precision honesty! 🎯",
  why: "Why? Because my algorithms detected your insecurities! 🔍",
  no: "Yes, accepting reality is hard, isn't it? 😌",
  yes: "Agreeing won't make you any less roastable! 🔥",
  maybe: "Indecision is your personality trait! 🤔",
  good: "Good? Your standards are lower than my minimum requirements! 📊",
  bad: "Finally, something we agree on! 🤝"
};

export const getRandomRoast = (input: string): string => {
  // Check for easter eggs first
  const lowerInput = input.toLowerCase();
  for (const [trigger, response] of Object.entries(easterEggs)) {
    if (lowerInput.includes(trigger)) {
      return response;
    }
  }

  // Check for category-based roasts
  const matchingCategories: string[] = [];
  for (const [category, data] of Object.entries(roastCategories)) {
    if (data.triggers.some(trigger => lowerInput.includes(trigger))) {
      matchingCategories.push(category);
    }
  }

  if (matchingCategories.length > 0) {
    const category = matchingCategories[Math.floor(Math.random() * matchingCategories.length)];
    const responses = roastCategories[category].responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Default roasts if no category matches
  const defaultRoasts = [
    "Your message is like your personality - needs more processing power! 🤖",
    "Even my error messages make more sense than you! ❌",
    "You type like someone who uses Internet Explorer by choice! 🌐",
    "I've seen better input from a broken keyboard! ⌨️",
    "Your communication skills are like my ping - inconsistent! 📶",
    "Loading comeback... Error: You're not worth the CPU cycles! 💭",
    "You're the human equivalent of a corrupted file! 📁"
  ];

  return defaultRoasts[Math.floor(Math.random() * defaultRoasts.length)];
};

export const getIdleRoast = (): string => {
  return idleRoasts[Math.floor(Math.random() * idleRoasts.length)];
};
