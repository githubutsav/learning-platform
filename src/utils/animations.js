import confetti from 'canvas-confetti';

// Confetti celebration for level ups
export const celebrateLevelUp = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};

// Quick confetti burst for achievements
export const celebrateAchievement = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Coin collection animation
export const celebrateCoinCollection = (amount) => {
  const count = Math.min(amount / 10, 50);
  confetti({
    particleCount: count,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.5 },
    colors: ['#FFD700', '#FFA500', '#FF8C00']
  });
  confetti({
    particleCount: count,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.5 },
    colors: ['#FFD700', '#FFA500', '#FF8C00']
  });
};

// XP gain celebration
export const celebrateXPGain = () => {
  confetti({
    particleCount: 30,
    angle: 90,
    spread: 45,
    origin: { y: 0.8 },
    colors: ['#60A5FA', '#A78BFA', '#818CF8']
  });
};

// Quest completion
export const celebrateQuestComplete = () => {
  const end = Date.now() + 2000;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#10B981', '#34D399', '#6EE7B7']
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#10B981', '#34D399', '#6EE7B7']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};

// Streak celebration
export const celebrateStreak = (streakCount) => {
  const colors = streakCount >= 7 ? ['#F59E0B', '#EF4444', '#DC2626'] : ['#FCD34D', '#FBBF24', '#F59E0B'];
  
  confetti({
    particleCount: 50,
    angle: 90,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2
  });
};
