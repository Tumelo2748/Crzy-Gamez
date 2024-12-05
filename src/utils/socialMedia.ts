export const getRandomEmbarrassingComment = (): string => {
  const comments = [
    "I still sleep with my childhood teddy bear! 🧸",
    "Just googled how to boil water again... 🤔",
    "My pet rock is my best friend! 🪨",
    "I think pineapple belongs on pizza! 🍍",
    "Sometimes I pretend my plants are my coworkers! 🌱",
    "I sing in the shower... badly! 🚿",
    "I'm not wearing pants while typing this! 👖",
    "I talk to myself in the mirror... a lot! 🪞",
    "Sometimes I pretend I'm a T-Rex when home alone! 🦖",
    "I dance like a chicken when nobody's watching! 🐔"
  ];
  return comments[Math.floor(Math.random() * comments.length)];
};

export const getRandomNotification = (username: string): string => {
  const notifications = [
    `Your ex just saw your profile 37 times in the last hour! 👀`,
    `Your mom just discovered your secret meme account! 😱`,
    `${username} is typing... and judging you! 😬`,
    `Your crush from 3rd grade just found your profile! 💕`,
    `Your boss wants to 'connect' with you on all platforms! 😅`,
    `Someone screenshot your post! (Probably for blackmail) 📸`,
    `Your cat just created an account to unfollow you! 🐱`,
    `Your post went viral... in Antarctica! 🧊`,
    `A time traveler from 2045 liked your post! ⏰`,
    `Your future self is cringing at this post! 😖`
  ];
  return notifications[Math.floor(Math.random() * notifications.length)];
};

export const generateRandomPost = () => {
  const usernames = [
    'ChaosLover42', 'MemeQueen', 'SocialButterfly', 'DigitalNomad',
    'CoffeeAddict', 'PizzaPhilosopher', 'CatWhisperer', 'ProfessionalNapper'
  ];

  const contents = [
    "Just saw a cloud that looks exactly like my neighbor's dog's accountant! 🌥️",
    "My plants started a book club without inviting me... rude! 🌿📚",
    "Breaking: Local sock declares independence from its pair! 🧦",
    "My toaster just complimented my outfit! Should I be concerned? 🍞✨",
    "Teaching my cat quantum physics. So far she's mastered string theory! 😺",
    "My coffee maker is plotting something, I can feel it... ☕",
    "Just finished a staring contest with my reflection. I lost... 🪞",
    "My shadow and I had a disagreement about personal space today 🌞"
  ];

  const images = [
    'https://picsum.photos/400/300',
    'https://picsum.photos/401/300',
    'https://picsum.photos/400/301',
    'https://picsum.photos/402/300'
  ];

  return {
    id: Math.random().toString(),
    username: usernames[Math.floor(Math.random() * usernames.length)],
    avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${Math.random()}`,
    content: contents[Math.floor(Math.random() * contents.length)],
    image: Math.random() > 0.5 ? images[Math.floor(Math.random() * images.length)] : undefined,
    likes: Math.floor(Math.random() * 1000),
    comments: [],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toLocaleString()
  };
};
