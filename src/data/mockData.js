export const LEVELS = {
  1: { min: 0, max: 1000, title: "Novice Learner" },
  2: { min: 1000, max: 2500, title: "Apprentice" },
  3: { min: 2500, max: 5000, title: "Scholar" },
};

export const AVATARS = [
  { id: 'alex', name: 'Default Alex', cost: 0, src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { id: 'robot', name: 'Mecha Bot', cost: 500, src: "https://api.dicebear.com/7.x/bottts/svg?seed=Felix" },
  { id: 'cat', name: 'Professor Purr', cost: 1200, src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 'alien', name: 'Zorp', cost: 2500, src: "https://api.dicebear.com/7.x/bottts/svg?seed=Zorp" },
];

export const QUESTS = [
  { 
    id: 1, 
    title: "The Mind's Eye", 
    nodes: [
      { id: 'n1', type: 'lesson', title: 'Perception', status: 'completed' },
      { id: 'n2', type: 'challenge', title: 'Memory Match', status: 'unlocked' },
      { id: 'n3', type: 'boss', title: 'Cognitive Test', status: 'locked' }
    ]
  },
  {
    id: 2,
    title: "AI Ethics",
    nodes: [
      { id: 'n1', type: 'lesson', title: 'Bias in AI', status: 'locked' },
      { id: 'n2', type: 'lesson', title: 'Safety Checks', status: 'locked' },
      { id: 'n3', type: 'boss', title: 'The Turing Test', status: 'locked' }
    ]
  }
];



export const LEARNING_PATHS = [
  {
    id: 1,
    title: "Cognitive Science",
    description: "Explore how the mind works and processes information",
    color: "bg-blue-500",
    icon: "🧠",
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    estimatedTime: "2-3 weeks",
    difficulty: "Beginner",
    quests: [
      { 
        id: 1, 
        title: "The Mind's Eye", 
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Perception', status: 'completed' },
          { id: 'n2', type: 'challenge', title: 'Memory Match', status: 'unlocked' },
          { id: 'n3', type: 'boss', title: 'Cognitive Test', status: 'locked' }
        ]
      },
      {
        id: 2,
        title: "Memory Systems",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Working Memory', status: 'completed' },
          { id: 'n2', type: 'lesson', title: 'Long-term Memory', status: 'completed' },
          { id: 'n3', type: 'challenge', title: 'Memory Palace', status: 'unlocked' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Artificial Intelligence",
    description: "Master the fundamentals of AI and machine learning",
    color: "bg-purple-500",
    icon: "🤖",
    progress: 25,
    totalLessons: 16,
    completedLessons: 4,
    estimatedTime: "4-5 weeks",
    difficulty: "Intermediate",
    quests: [
      {
        id: 3,
        title: "Neural Networks",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Perceptrons', status: 'completed' },
          { id: 'n2', type: 'lesson', title: 'Backpropagation', status: 'unlocked' },
          { id: 'n3', type: 'challenge', title: 'Build a Network', status: 'locked' }
        ]
      },
      {
        id: 4,
        title: "AI Ethics",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Bias in AI', status: 'locked' },
          { id: 'n2', type: 'lesson', title: 'Safety Checks', status: 'locked' },
          { id: 'n3', type: 'boss', title: 'The Turing Test', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Data Science",
    description: "Learn to analyze and visualize data effectively",
    color: "bg-green-500",
    icon: "📊",
    progress: 10,
    totalLessons: 14,
    completedLessons: 1,
    estimatedTime: "3-4 weeks",
    difficulty: "Beginner",
    quests: [
      {
        id: 5,
        title: "Data Visualization",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Chart Types', status: 'completed' },
          { id: 'n2', type: 'lesson', title: 'Color Theory', status: 'unlocked' },
          { id: 'n3', type: 'challenge', title: 'Create Dashboard', status: 'locked' }
        ]
      },
      {
        id: 6,
        title: "Statistical Analysis",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Descriptive Stats', status: 'locked' },
          { id: 'n2', type: 'lesson', title: 'Hypothesis Testing', status: 'locked' },
          { id: 'n3', type: 'boss', title: 'Research Project', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Programming Fundamentals",
    description: "Build a strong foundation in computer programming",
    color: "bg-orange-500",
    icon: "💻",
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    estimatedTime: "5-6 weeks",
    difficulty: "Beginner",
    quests: [
      {
        id: 7,
        title: "Variables & Functions",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Data Types', status: 'unlocked' },
          { id: 'n2', type: 'lesson', title: 'Functions', status: 'locked' },
          { id: 'n3', type: 'challenge', title: 'Calculator App', status: 'locked' }
        ]
      },
      {
        id: 8,
        title: "Control Structures",
        nodes: [
          { id: 'n1', type: 'lesson', title: 'Loops', status: 'locked' },
          { id: 'n2', type: 'lesson', title: 'Conditionals', status: 'locked' },
          { id: 'n3', type: 'boss', title: 'Algorithm Challenge', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Frontend Web Development",
    description: "A practical roadmap to become a productive frontend developer: from HTML/CSS basics to advanced React patterns, performance and deployment.",
    color: "bg-cyan-500",
    icon: "🌐",
    progress: 0,
    totalLessons: 85,
    completedLessons: 0,
    estimatedTime: "8-12 weeks",
    difficulty: "Beginner → Intermediate",
    quests: [
      {
        id: 101,
        title: "HTML & CSS Fundamentals",
        nodes: [
          { id: 'f101-1', type: 'lesson', title: 'HTML Document Structure & DOCTYPE', status: 'unlocked' },
          { id: 'f101-2', type: 'lesson', title: 'Semantic HTML5 Elements', status: 'locked' },
          { id: 'f101-3', type: 'lesson', title: 'Forms, Inputs & Validation', status: 'locked' },
          { id: 'f101-4', type: 'lesson', title: 'CSS Selectors & Specificity', status: 'locked' },
          { id: 'f101-5', type: 'lesson', title: 'Box Model, Margin & Padding', status: 'locked' },
          { id: 'f101-6', type: 'lesson', title: 'Typography & Web Fonts', status: 'locked' },
          { id: 'f101-7', type: 'lesson', title: 'Colors, Backgrounds & Gradients', status: 'locked' },
          { id: 'f101-8', type: 'challenge', title: 'Build a Semantic Blog Post', status: 'locked' },
          { id: 'f101-9', type: 'boss', title: 'Create a Complete Landing Page', status: 'locked' }
        ]
      },
      {
        id: 102,
        title: "Responsive Design & Accessibility",
        nodes: [
          { id: 'f102-1', type: 'lesson', title: 'Mobile-First Design Philosophy', status: 'locked' },
          { id: 'f102-2', type: 'lesson', title: 'Media Queries & Breakpoints', status: 'locked' },
          { id: 'f102-3', type: 'lesson', title: 'Flexbox Layout Patterns', status: 'locked' },
          { id: 'f102-4', type: 'lesson', title: 'CSS Grid: Rows, Columns & Areas', status: 'locked' },
          { id: 'f102-5', type: 'lesson', title: 'Responsive Images & srcset', status: 'locked' },
          { id: 'f102-6', type: 'lesson', title: 'ARIA Roles & Screen Readers', status: 'locked' },
          { id: 'f102-7', type: 'lesson', title: 'Keyboard Navigation & Focus', status: 'locked' },
          { id: 'f102-8', type: 'challenge', title: 'Build an Accessible Navigation Menu', status: 'locked' },
          { id: 'f102-9', type: 'boss', title: 'Responsive Portfolio Site', status: 'locked' }
        ]
      },
      {
        id: 103,
        title: "JavaScript Essentials",
        nodes: [
          { id: 'f103-1', type: 'lesson', title: 'Variables: var, let, const', status: 'locked' },
          { id: 'f103-2', type: 'lesson', title: 'Data Types & Type Coercion', status: 'locked' },
          { id: 'f103-3', type: 'lesson', title: 'Functions & Arrow Functions', status: 'locked' },
          { id: 'f103-4', type: 'lesson', title: 'Arrays & Array Methods', status: 'locked' },
          { id: 'f103-5', type: 'lesson', title: 'Objects & Object Methods', status: 'locked' },
          { id: 'f103-6', type: 'lesson', title: 'DOM Manipulation & Selection', status: 'locked' },
          { id: 'f103-7', type: 'lesson', title: 'Event Listeners & Event Bubbling', status: 'locked' },
          { id: 'f103-8', type: 'lesson', title: 'Loops & Iteration', status: 'locked' },
          { id: 'f103-9', type: 'challenge', title: 'Interactive Calculator', status: 'locked' },
          { id: 'f103-10', type: 'boss', title: 'Dynamic To-Do List App', status: 'locked' }
        ]
      },
      {
        id: 104,
        title: "Modern JavaScript & Tooling",
        nodes: [
          { id: 'f104-1', type: 'lesson', title: 'Template Literals & String Methods', status: 'locked' },
          { id: 'f104-2', type: 'lesson', title: 'Destructuring & Spread Operator', status: 'locked' },
          { id: 'f104-3', type: 'lesson', title: 'Async/Await & Promises', status: 'locked' },
          { id: 'f104-4', type: 'lesson', title: 'Fetch API & HTTP Requests', status: 'locked' },
          { id: 'f104-5', type: 'lesson', title: 'ES6 Modules: import/export', status: 'locked' },
          { id: 'f104-6', type: 'lesson', title: 'NPM & Package Management', status: 'locked' },
          { id: 'f104-7', type: 'lesson', title: 'Vite: Modern Build Tool', status: 'locked' },
          { id: 'f104-8', type: 'challenge', title: 'Weather App with API', status: 'locked' },
          { id: 'f104-9', type: 'boss', title: 'Set Up Complete Dev Environment', status: 'locked' }
        ]
      },
      {
        id: 105,
        title: "React & Component Architecture",
        nodes: [
          { id: 'f105-1', type: 'lesson', title: 'React Philosophy & Virtual DOM', status: 'locked' },
          { id: 'f105-2', type: 'lesson', title: 'JSX Syntax & Expressions', status: 'locked' },
          { id: 'f105-3', type: 'lesson', title: 'Components: Functional vs Class', status: 'locked' },
          { id: 'f105-4', type: 'lesson', title: 'Props & Props Validation', status: 'locked' },
          { id: 'f105-5', type: 'lesson', title: 'useState: Managing Local State', status: 'locked' },
          { id: 'f105-6', type: 'lesson', title: 'useEffect: Side Effects & Lifecycle', status: 'locked' },
          { id: 'f105-7', type: 'lesson', title: 'Conditional Rendering & Lists', status: 'locked' },
          { id: 'f105-8', type: 'lesson', title: 'Event Handling in React', status: 'locked' },
          { id: 'f105-9', type: 'challenge', title: 'Multi-Step Form', status: 'locked' },
          { id: 'f105-10', type: 'boss', title: 'Build a Movie Search App', status: 'locked' }
        ]
      },
      {
        id: 106,
        title: "State Management & Data Flow",
        nodes: [
          { id: 'f106-1', type: 'lesson', title: 'Lifting State Up', status: 'locked' },
          { id: 'f106-2', type: 'lesson', title: 'Prop Drilling Problem', status: 'locked' },
          { id: 'f106-3', type: 'lesson', title: 'Context API & useContext', status: 'locked' },
          { id: 'f106-4', type: 'lesson', title: 'useReducer for Complex State', status: 'locked' },
          { id: 'f106-5', type: 'lesson', title: 'Redux: Actions, Reducers, Store', status: 'locked' },
          { id: 'f106-6', type: 'lesson', title: 'Zustand: Simple State Management', status: 'locked' },
          { id: 'f106-7', type: 'lesson', title: 'React Query for Server State', status: 'locked' },
          { id: 'f106-8', type: 'challenge', title: 'Shopping Cart with Context', status: 'locked' },
          { id: 'f106-9', type: 'boss', title: 'Full-Stack Dashboard with API', status: 'locked' }
        ]
      },
      {
        id: 107,
        title: "Styling & Design Systems",
        nodes: [
          { id: 'f107-1', type: 'lesson', title: 'CSS-in-JS vs Utility-First CSS', status: 'locked' },
          { id: 'f107-2', type: 'lesson', title: 'Tailwind CSS Fundamentals', status: 'locked' },
          { id: 'f107-3', type: 'lesson', title: 'Custom Tailwind Configuration', status: 'locked' },
          { id: 'f107-4', type: 'lesson', title: 'Styled Components & Emotion', status: 'locked' },
          { id: 'f107-5', type: 'lesson', title: 'Design Tokens & Theming', status: 'locked' },
          { id: 'f107-6', type: 'lesson', title: 'Component Libraries (MUI, Chakra)', status: 'locked' },
          { id: 'f107-7', type: 'lesson', title: 'Dark Mode Implementation', status: 'locked' },
          { id: 'f107-8', type: 'challenge', title: 'Build a Design System', status: 'locked' },
          { id: 'f107-9', type: 'boss', title: 'Complete UI Component Library', status: 'locked' }
        ]
      },
      {
        id: 108,
        title: "Testing & Quality",
        nodes: [
          { id: 'f108-1', type: 'lesson', title: 'Testing Philosophy & Types', status: 'locked' },
          { id: 'f108-2', type: 'lesson', title: 'Jest: Unit Testing Basics', status: 'locked' },
          { id: 'f108-3', type: 'lesson', title: 'React Testing Library', status: 'locked' },
          { id: 'f108-4', type: 'lesson', title: 'Testing Hooks & Components', status: 'locked' },
          { id: 'f108-5', type: 'lesson', title: 'Mocking API Calls & Data', status: 'locked' },
          { id: 'f108-6', type: 'lesson', title: 'Cypress: E2E Testing', status: 'locked' },
          { id: 'f108-7', type: 'lesson', title: 'Visual Regression Testing', status: 'locked' },
          { id: 'f108-8', type: 'challenge', title: 'Write Test Suite for App', status: 'locked' },
          { id: 'f108-9', type: 'boss', title: 'Full Test Coverage Project', status: 'locked' }
        ]
      },
      {
        id: 109,
        title: "Performance & Optimization",
        nodes: [
          { id: 'f109-1', type: 'lesson', title: 'Web Vitals: LCP, FID, CLS', status: 'locked' },
          { id: 'f109-2', type: 'lesson', title: 'React.memo & useMemo', status: 'locked' },
          { id: 'f109-3', type: 'lesson', title: 'Code Splitting with React.lazy', status: 'locked' },
          { id: 'f109-4', type: 'lesson', title: 'Lazy Loading Images & Routes', status: 'locked' },
          { id: 'f109-5', type: 'lesson', title: 'Bundle Analysis & Optimization', status: 'locked' },
          { id: 'f109-6', type: 'lesson', title: 'Service Workers & PWA', status: 'locked' },
          { id: 'f109-7', type: 'lesson', title: 'Chrome DevTools Performance Tab', status: 'locked' },
          { id: 'f109-8', type: 'challenge', title: 'Optimize Slow React App', status: 'locked' },
          { id: 'f109-9', type: 'boss', title: 'Achieve 90+ Lighthouse Score', status: 'locked' }
        ]
      },
      {
        id: 110,
        title: "Deployment & Production",
        nodes: [
          { id: 'f110-1', type: 'lesson', title: 'Production Build Process', status: 'locked' },
          { id: 'f110-2', type: 'lesson', title: 'Environment Variables & Secrets', status: 'locked' },
          { id: 'f110-3', type: 'lesson', title: 'Vercel Deployment', status: 'locked' },
          { id: 'f110-4', type: 'lesson', title: 'Netlify & Continuous Deployment', status: 'locked' },
          { id: 'f110-5', type: 'lesson', title: 'Custom Domain & DNS Setup', status: 'locked' },
          { id: 'f110-6', type: 'lesson', title: 'Error Tracking with Sentry', status: 'locked' },
          { id: 'f110-7', type: 'lesson', title: 'Analytics & User Monitoring', status: 'locked' },
          { id: 'f110-8', type: 'challenge', title: 'Deploy with CI/CD Pipeline', status: 'locked' },
          { id: 'f110-9', type: 'boss', title: 'Launch Production App', status: 'locked' }
        ]
      }
    ]
  }
];

export const CS_INTERESTS = [
  // Programming Languages
  { id: 1, name: "Python", category: "Programming Languages", color: "bg-blue-500" },
  { id: 2, name: "JavaScript", category: "Programming Languages", color: "bg-yellow-500" },
  { id: 3, name: "Java", category: "Programming Languages", color: "bg-red-500" },
  { id: 4, name: "C++", category: "Programming Languages", color: "bg-blue-600" },
  { id: 5, name: "C#", category: "Programming Languages", color: "bg-purple-600" },
  { id: 6, name: "Go", category: "Programming Languages", color: "bg-cyan-500" },
  { id: 7, name: "Rust", category: "Programming Languages", color: "bg-orange-600" },
  { id: 8, name: "Swift", category: "Programming Languages", color: "bg-orange-500" },
  { id: 9, name: "Kotlin", category: "Programming Languages", color: "bg-purple-500" },
  { id: 10, name: "TypeScript", category: "Programming Languages", color: "bg-blue-400" },
  { id: 11, name: "Ruby", category: "Programming Languages", color: "bg-red-600" },
  { id: 12, name: "PHP", category: "Programming Languages", color: "bg-indigo-500" },
  { id: 13, name: "Scala", category: "Programming Languages", color: "bg-red-500" },
  { id: 14, name: "R", category: "Programming Languages", color: "bg-blue-500" },
  { id: 15, name: "Dart", category: "Programming Languages", color: "bg-cyan-600" },

  // Web Development
  { id: 16, name: "React", category: "Web Development", color: "bg-cyan-500" },
  { id: 17, name: "Vue.js", category: "Web Development", color: "bg-green-500" },
  { id: 18, name: "Angular", category: "Web Development", color: "bg-red-500" },
  { id: 19, name: "Node.js", category: "Web Development", color: "bg-green-600" },
  { id: 20, name: "Next.js", category: "Web Development", color: "bg-black" },
  { id: 21, name: "HTML/CSS", category: "Web Development", color: "bg-orange-500" },
  { id: 22, name: "Tailwind CSS", category: "Web Development", color: "bg-teal-500" },
  { id: 23, name: "Bootstrap", category: "Web Development", color: "bg-purple-600" },
  { id: 24, name: "Svelte", category: "Web Development", color: "bg-orange-600" },
  { id: 25, name: "Express.js", category: "Web Development", color: "bg-gray-700" },

  // Mobile Development
  { id: 26, name: "iOS Development", category: "Mobile Development", color: "bg-gray-800" },
  { id: 27, name: "Android Development", category: "Mobile Development", color: "bg-green-500" },
  { id: 28, name: "React Native", category: "Mobile Development", color: "bg-blue-500" },
  { id: 29, name: "Flutter", category: "Mobile Development", color: "bg-blue-400" },
  { id: 30, name: "Xamarin", category: "Mobile Development", color: "bg-blue-600" },

  // AI & Machine Learning
  { id: 31, name: "Machine Learning", category: "AI & ML", color: "bg-purple-500" },
  { id: 32, name: "Deep Learning", category: "AI & ML", color: "bg-purple-600" },
  { id: 33, name: "Neural Networks", category: "AI & ML", color: "bg-indigo-500" },
  { id: 34, name: "Natural Language Processing", category: "AI & ML", color: "bg-purple-400" },
  { id: 35, name: "Computer Vision", category: "AI & ML", color: "bg-pink-500" },
  { id: 36, name: "TensorFlow", category: "AI & ML", color: "bg-orange-500" },
  { id: 37, name: "PyTorch", category: "AI & ML", color: "bg-red-500" },
  { id: 38, name: "Reinforcement Learning", category: "AI & ML", color: "bg-green-600" },
  { id: 39, name: "Large Language Models", category: "AI & ML", color: "bg-violet-500" },
  { id: 40, name: "GANs", category: "AI & ML", color: "bg-fuchsia-500" },

  // Data Science
  { id: 41, name: "Data Analysis", category: "Data Science", color: "bg-blue-500" },
  { id: 42, name: "Data Visualization", category: "Data Science", color: "bg-green-500" },
  { id: 43, name: "Big Data", category: "Data Science", color: "bg-yellow-600" },
  { id: 44, name: "Pandas", category: "Data Science", color: "bg-blue-600" },
  { id: 45, name: "NumPy", category: "Data Science", color: "bg-blue-400" },
  { id: 46, name: "SQL", category: "Data Science", color: "bg-orange-500" },
  { id: 47, name: "Apache Spark", category: "Data Science", color: "bg-orange-600" },
  { id: 48, name: "Tableau", category: "Data Science", color: "bg-blue-500" },
  { id: 49, name: "Power BI", category: "Data Science", color: "bg-yellow-500" },

  // Cloud & DevOps
  { id: 50, name: "AWS", category: "Cloud & DevOps", color: "bg-orange-500" },
  { id: 51, name: "Azure", category: "Cloud & DevOps", color: "bg-blue-500" },
  { id: 52, name: "Google Cloud", category: "Cloud & DevOps", color: "bg-blue-400" },
  { id: 53, name: "Docker", category: "Cloud & DevOps", color: "bg-blue-600" },
  { id: 54, name: "Kubernetes", category: "Cloud & DevOps", color: "bg-blue-500" },
  { id: 55, name: "CI/CD", category: "Cloud & DevOps", color: "bg-green-500" },
  { id: 56, name: "Jenkins", category: "Cloud & DevOps", color: "bg-red-600" },
  { id: 57, name: "Terraform", category: "Cloud & DevOps", color: "bg-purple-600" },
  { id: 58, name: "Ansible", category: "Cloud & DevOps", color: "bg-red-500" },

  // Databases
  { id: 59, name: "PostgreSQL", category: "Databases", color: "bg-blue-600" },
  { id: 60, name: "MongoDB", category: "Databases", color: "bg-green-600" },
  { id: 61, name: "MySQL", category: "Databases", color: "bg-blue-500" },
  { id: 62, name: "Redis", category: "Databases", color: "bg-red-600" },
  { id: 63, name: "Firebase", category: "Databases", color: "bg-yellow-500" },
  { id: 64, name: "Cassandra", category: "Databases", color: "bg-blue-400" },
  { id: 65, name: "DynamoDB", category: "Databases", color: "bg-blue-600" },

  // Cybersecurity
  { id: 66, name: "Ethical Hacking", category: "Cybersecurity", color: "bg-red-600" },
  { id: 67, name: "Penetration Testing", category: "Cybersecurity", color: "bg-red-500" },
  { id: 68, name: "Network Security", category: "Cybersecurity", color: "bg-blue-600" },
  { id: 69, name: "Cryptography", category: "Cybersecurity", color: "bg-purple-600" },
  { id: 70, name: "Security Analysis", category: "Cybersecurity", color: "bg-red-700" },
  { id: 71, name: "Blockchain Security", category: "Cybersecurity", color: "bg-orange-600" },

  // Blockchain & Web3
  { id: 72, name: "Blockchain", category: "Blockchain & Web3", color: "bg-yellow-600" },
  { id: 73, name: "Smart Contracts", category: "Blockchain & Web3", color: "bg-purple-500" },
  { id: 74, name: "Ethereum", category: "Blockchain & Web3", color: "bg-blue-600" },
  { id: 75, name: "Solidity", category: "Blockchain & Web3", color: "bg-gray-700" },
  { id: 76, name: "Web3.js", category: "Blockchain & Web3", color: "bg-orange-500" },
  { id: 77, name: "NFTs", category: "Blockchain & Web3", color: "bg-pink-500" },

  // Game Development
  { id: 78, name: "Unity", category: "Game Development", color: "bg-gray-800" },
  { id: 79, name: "Unreal Engine", category: "Game Development", color: "bg-blue-600" },
  { id: 80, name: "Game Design", category: "Game Development", color: "bg-purple-500" },
  { id: 81, name: "Godot", category: "Game Development", color: "bg-blue-500" },
  { id: 82, name: "3D Graphics", category: "Game Development", color: "bg-green-500" },

  // System & Architecture
  { id: 83, name: "Operating Systems", category: "System & Architecture", color: "bg-gray-700" },
  { id: 84, name: "Computer Architecture", category: "System & Architecture", color: "bg-blue-600" },
  { id: 85, name: "Distributed Systems", category: "System & Architecture", color: "bg-purple-600" },
  { id: 86, name: "Microservices", category: "System & Architecture", color: "bg-green-600" },
  { id: 87, name: "System Design", category: "System & Architecture", color: "bg-indigo-600" },

  // Algorithms & DS
  { id: 88, name: "Data Structures", category: "Algorithms & DS", color: "bg-blue-500" },
  { id: 89, name: "Algorithms", category: "Algorithms & DS", color: "bg-green-500" },
  { id: 90, name: "Dynamic Programming", category: "Algorithms & DS", color: "bg-purple-500" },
  { id: 91, name: "Graph Theory", category: "Algorithms & DS", color: "bg-orange-500" },
  { id: 92, name: "Competitive Programming", category: "Algorithms & DS", color: "bg-red-500" },

  // IoT & Embedded
  { id: 93, name: "IoT", category: "IoT & Embedded", color: "bg-teal-500" },
  { id: 94, name: "Arduino", category: "IoT & Embedded", color: "bg-cyan-600" },
  { id: 95, name: "Raspberry Pi", category: "IoT & Embedded", color: "bg-red-600" },
  { id: 96, name: "Embedded Systems", category: "IoT & Embedded", color: "bg-blue-700" },

  // AR/VR
  { id: 97, name: "Augmented Reality", category: "AR/VR", color: "bg-purple-500" },
  { id: 98, name: "Virtual Reality", category: "AR/VR", color: "bg-blue-600" },
  { id: 99, name: "Mixed Reality", category: "AR/VR", color: "bg-indigo-500" },

  // Software Engineering
  { id: 100, name: "Agile", category: "Software Engineering", color: "bg-green-500" },
  { id: 101, name: "Scrum", category: "Software Engineering", color: "bg-blue-500" },
  { id: 102, name: "Software Testing", category: "Software Engineering", color: "bg-red-500" },
  { id: 103, name: "Git", category: "Software Engineering", color: "bg-orange-600" },
  { id: 104, name: "Design Patterns", category: "Software Engineering", color: "bg-purple-500" },
  { id: 105, name: "Clean Code", category: "Software Engineering", color: "bg-green-600" },

  // UI/UX
  { id: 106, name: "UI Design", category: "UI/UX", color: "bg-pink-500" },
  { id: 107, name: "UX Design", category: "UI/UX", color: "bg-purple-500" },
  { id: 108, name: "Figma", category: "UI/UX", color: "bg-red-500" },
  { id: 109, name: "User Research", category: "UI/UX", color: "bg-blue-500" },
  { id: 110, name: "Prototyping", category: "UI/UX", color: "bg-green-500" },
];

export const STUDENTS_MOCK = [
  { id: 1, name: "Alex Morgan", risk: "low", progress: 78, lastActive: "2m ago" },
  { id: 2, name: "Sam Smith", risk: "high", progress: 45, lastActive: "2d ago" },
  { id: 3, name: "Jordan Lee", risk: "medium", progress: 62, lastActive: "5h ago" },
  { id: 4, name: "Casey West", risk: "low", progress: 92, lastActive: "10m ago" },
];

export const MOCK_LESSON = {
  id: 1,
  title: "Basics of Perception",
  questions: [
    {
      id: 1,
      text: "Which sense processes visual information?",
      options: ["Auditory", "Visual", "Olfactory", "Tactile"],
      correct: 1
    },
    {
      id: 2,
      text: "True or False: The brain fills in blind spots.",
      options: ["True", "False"],
      correct: 0
    }
  ]
};

export const LEADERBOARD_DATA = [
  { rank: 4, name: "Brody Bennet", score: 19231, trend: 'up', avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Brody" },
  { rank: 5, name: "Sarah Connor", score: 15322, trend: 'down', avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sarah" },
  { rank: 6, name: "John Doe", score: 15101, trend: 'up', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { rank: 7, name: "Alice Smith", score: 13899, trend: 'down', avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alice" },
  { rank: 8, name: "Mike Ross", score: 12456, trend: 'down', avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Mike" },
];

export const DAILY_MISSIONS = [
  { id: 1, title: "Complete 1 Lesson", progress: 0, target: 1, reward: 50, type: "coins", icon: "📚" },
  { id: 2, title: "Practice for 15 minutes", progress: 8, target: 15, reward: 25, type: "coins", icon: "⏱️" },
  { id: 3, title: "Answer 10 questions correctly", progress: 7, target: 10, reward: 30, type: "coins", icon: "✅" },
  { id: 4, title: "Maintain your streak", progress: 1, target: 1, reward: 10, type: "diamonds", icon: "🔥" },
];

export const FEATURED_LESSONS = [
  { id: 1, title: "Neural Networks Basics", duration: "12 min", difficulty: "Beginner", category: "AI", color: "bg-blue-500" },
  { id: 2, title: "Machine Learning Ethics", duration: "8 min", difficulty: "Intermediate", category: "Ethics", color: "bg-purple-500" },
  { id: 3, title: "Data Visualization", duration: "15 min", difficulty: "Beginner", category: "Data Science", color: "bg-green-500" },
];

export const WEEKLY_STATS = {
  lessonsCompleted: 12,
  timeSpent: 145, // minutes
  questionsAnswered: 89,
  accuracy: 87, // percentage
  streak: 5,
  weeklyGoal: 15,
};