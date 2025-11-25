// Comprehensive lesson content for Frontend Web Development path
export const LESSON_CONTENT = {
  // Chapter 1: HTML & CSS Fundamentals
  'f101-1': {
    title: 'HTML Document Structure & DOCTYPE',
    duration: '15 min',
    content: `
      <h2>Understanding HTML Document Structure</h2>
      <p>Every HTML document follows a standard structure that browsers use to render web pages correctly.</p>
      
      <h3>The DOCTYPE Declaration</h3>
      <p>The DOCTYPE tells the browser which version of HTML you're using. For HTML5, it's simple:</p>
      <code>&lt;!DOCTYPE html&gt;</code>
      
      <h3>Basic HTML Structure</h3>
      <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Your content goes here --&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>

      <h3>Key Elements Explained</h3>
      <ul>
        <li><strong>&lt;html&gt;</strong>: Root element containing all other elements</li>
        <li><strong>&lt;head&gt;</strong>: Contains metadata, links to CSS, and page title</li>
        <li><strong>&lt;meta charset="UTF-8"&gt;</strong>: Defines character encoding</li>
        <li><strong>&lt;meta name="viewport"&gt;</strong>: Makes your site responsive on mobile</li>
        <li><strong>&lt;body&gt;</strong>: Contains all visible content</li>
      </ul>

      <h3>Why Structure Matters</h3>
      <p>Proper structure ensures:</p>
      <ul>
        <li>Better SEO (search engines can read your content)</li>
        <li>Accessibility for screen readers</li>
        <li>Consistent rendering across browsers</li>
        <li>Easier maintenance and debugging</li>
      </ul>

      <h3>Practice Exercise</h3>
      <p>Create a basic HTML file with proper structure, including a title, heading, and paragraph.</p>
    `,
    quiz: [
      {
        question: "What does DOCTYPE html tell the browser?",
        options: ["The HTML version being used", "The page title", "The character encoding", "The language"],
        correct: 0
      },
      {
        question: "Which element contains the visible page content?",
        options: ["<html>", "<head>", "<body>", "<meta>"],
        correct: 2
      }
    ]
  },

  'f101-2': {
    title: 'Semantic HTML5 Elements',
    duration: '20 min',
    content: `
      <h2>What is Semantic HTML?</h2>
      <p>Semantic HTML uses elements that clearly describe their meaning to both the browser and developer.</p>
      
      <h3>Why Use Semantic Elements?</h3>
      <ul>
        <li><strong>Accessibility</strong>: Screen readers can better navigate your site</li>
        <li><strong>SEO</strong>: Search engines understand your content structure</li>
        <li><strong>Readability</strong>: Developers can quickly understand code</li>
        <li><strong>Maintainability</strong>: Easier to update and modify</li>
      </ul>

      <h3>Common Semantic Elements</h3>
      
      <h4>&lt;header&gt;</h4>
      <p>Represents introductory content or navigation. Usually contains logo, site title, and main navigation.</p>
      <pre>&lt;header&gt;
  &lt;h1&gt;My Website&lt;/h1&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;</pre>

      <h4>&lt;nav&gt;</h4>
      <p>Contains navigation links - major blocks of navigation only.</p>
      <pre>&lt;nav&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/about"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>

      <h4>&lt;main&gt;</h4>
      <p>The main content of the document. Should be unique and not repeated across pages.</p>
      <pre>&lt;main&gt;
  &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;</pre>

      <h4>&lt;article&gt;</h4>
      <p>Self-contained content that could be distributed independently (blog post, news article).</p>

      <h4>&lt;section&gt;</h4>
      <p>Thematic grouping of content, typically with a heading.</p>

      <h4>&lt;aside&gt;</h4>
      <p>Content tangentially related to main content (sidebar, pull quotes).</p>

      <h4>&lt;footer&gt;</h4>
      <p>Footer for nearest sectioning content or root. Usually contains copyright, links, contact info.</p>

      <h3>Non-Semantic vs Semantic</h3>
      <p>❌ Non-semantic: &lt;div id="nav"&gt;, &lt;div class="header"&gt;</p>
      <p>✅ Semantic: &lt;nav&gt;, &lt;header&gt;</p>

      <h3>Practice Exercise</h3>
      <p>Convert a div-based layout to use semantic HTML5 elements.</p>
    `,
    quiz: [
      {
        question: "Which element represents the main content unique to the page?",
        options: ["<section>", "<main>", "<article>", "<div>"],
        correct: 1
      },
      {
        question: "What's the benefit of semantic HTML for accessibility?",
        options: ["Faster loading", "Better colors", "Screen readers can navigate better", "Smaller file size"],
        correct: 2
      }
    ]
  },

  'f101-3': {
    title: 'Forms, Inputs & Validation',
    duration: '25 min',
    content: `
      <h2>HTML Forms</h2>
      <p>Forms are how users interact with your website by submitting data.</p>
      
      <h3>Basic Form Structure</h3>
      <pre>&lt;form action="/submit" method="POST"&gt;
  &lt;label for="username"&gt;Username:&lt;/label&gt;
  &lt;input type="text" id="username" name="username" required&gt;
  
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>

      <h3>Form Attributes</h3>
      <ul>
        <li><strong>action</strong>: URL where form data is sent</li>
        <li><strong>method</strong>: HTTP method (GET or POST)</li>
        <li><strong>enctype</strong>: How form data is encoded (needed for file uploads)</li>
      </ul>

      <h3>Input Types</h3>
      
      <h4>Text Inputs</h4>
      <pre>&lt;input type="text"&gt; - Single line text
&lt;input type="email"&gt; - Email with validation
&lt;input type="password"&gt; - Hidden text
&lt;input type="tel"&gt; - Phone number
&lt;input type="url"&gt; - Website URL
&lt;textarea&gt; - Multi-line text</pre>

      <h4>Number & Date</h4>
      <pre>&lt;input type="number" min="0" max="100" step="5"&gt;
&lt;input type="range" min="0" max="100"&gt;
&lt;input type="date"&gt;
&lt;input type="time"&gt;
&lt;input type="datetime-local"&gt;</pre>

      <h4>Selection</h4>
      <pre>&lt;input type="checkbox"&gt;
&lt;input type="radio" name="group"&gt;
&lt;select&gt;
  &lt;option value="1"&gt;Option 1&lt;/option&gt;
&lt;/select&gt;</pre>

      <h4>File & Other</h4>
      <pre>&lt;input type="file" accept="image/*"&gt;
&lt;input type="color"&gt;
&lt;input type="hidden"&gt;</pre>

      <h3>HTML5 Validation</h3>
      <ul>
        <li><strong>required</strong>: Field must be filled</li>
        <li><strong>minlength/maxlength</strong>: Text length limits</li>
        <li><strong>min/max</strong>: Number range</li>
        <li><strong>pattern</strong>: Regex validation</li>
        <li><strong>type</strong>: Built-in validation (email, url)</li>
      </ul>

      <pre>&lt;input 
  type="email" 
  required 
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Enter a valid email"
&gt;</pre>

      <h3>Labels & Accessibility</h3>
      <p>Always use labels with inputs for accessibility:</p>
      <pre>&lt;label for="email"&gt;Email:&lt;/label&gt;
&lt;input type="email" id="email" name="email"&gt;</pre>

      <h3>Practice Exercise</h3>
      <p>Create a registration form with validation: name, email, password, age, and agree to terms checkbox.</p>
    `,
    quiz: [
      {
        question: "Which attribute makes a form field mandatory?",
        options: ["mandatory", "required", "must-fill", "needed"],
        correct: 1
      },
      {
        question: "What input type provides built-in email validation?",
        options: ["type='text'", "type='email'", "type='validation'", "type='mail'"],
        correct: 1
      }
    ]
  },

  'f101-4': {
    title: 'CSS Selectors & Specificity',
    duration: '30 min',
    content: `
      <h2>CSS Selectors</h2>
      <p>Selectors determine which HTML elements your CSS rules apply to.</p>
      
      <h3>Basic Selectors</h3>
      
      <h4>Element Selector</h4>
      <pre>p { color: blue; }  /* All paragraphs */</pre>

      <h4>Class Selector</h4>
      <pre>.button { padding: 10px; }  /* All elements with class="button" */</pre>

      <h4>ID Selector</h4>
      <pre>#header { background: navy; }  /* Element with id="header" */</pre>

      <h4>Universal Selector</h4>
      <pre>* { margin: 0; }  /* All elements */</pre>

      <h3>Attribute Selectors</h3>
      <pre>[type="text"] { border: 1px solid gray; }
[href^="https"] { color: green; }  /* Starts with */
[href$=".pdf"] { color: red; }  /* Ends with */
[href*="example"] { color: blue; }  /* Contains */</pre>

      <h3>Combinators</h3>
      
      <h4>Descendant Selector (space)</h4>
      <pre>div p { color: red; }  /* All p inside div, any level deep */</pre>

      <h4>Child Selector (>)</h4>
      <pre>div > p { color: blue; }  /* Direct children only */</pre>

      <h4>Adjacent Sibling (+)</h4>
      <pre>h1 + p { font-weight: bold; }  /* p immediately after h1 */</pre>

      <h4>General Sibling (~)</h4>
      <pre>h1 ~ p { color: gray; }  /* All p siblings after h1 */</pre>

      <h3>Pseudo-Classes</h3>
      <pre>a:hover { color: red; }
a:visited { color: purple; }
a:active { color: yellow; }
input:focus { border: 2px solid blue; }
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(3n) { color: red; }  /* Every 3rd */</pre>

      <h3>Pseudo-Elements</h3>
      <pre>p::first-letter { font-size: 2em; }
p::first-line { font-weight: bold; }
.quote::before { content: '"'; }
.quote::after { content: '"'; }
::selection { background: yellow; }</pre>

      <h3>CSS Specificity</h3>
      <p>When multiple rules target the same element, specificity determines which wins.</p>
      
      <h4>Specificity Hierarchy (highest to lowest)</h4>
      <ol>
        <li>Inline styles: <code>style="color: red"</code> (1,0,0,0)</li>
        <li>IDs: <code>#header</code> (0,1,0,0)</li>
        <li>Classes, attributes, pseudo-classes: <code>.button, [type], :hover</code> (0,0,1,0)</li>
        <li>Elements, pseudo-elements: <code>div, ::before</code> (0,0,0,1)</li>
      </ol>

      <h4>Calculating Specificity</h4>
      <pre>#nav .menu li a:hover
= 0,1,2,2
= 1 ID + 2 classes + 2 elements</pre>

      <h4>!important</h4>
      <p>⚠️ Overrides everything but avoid using it:</p>
      <pre>p { color: red !important; }  /* Nuclear option */</pre>

      <h3>Best Practices</h3>
      <ul>
        <li>Prefer classes over IDs for styling</li>
        <li>Keep specificity low for easier maintenance</li>
        <li>Avoid !important unless absolutely necessary</li>
        <li>Use meaningful class names</li>
      </ul>

      <h3>Practice Exercise</h3>
      <p>Create CSS rules using different selectors and determine which styles will apply based on specificity.</p>
    `,
    quiz: [
      {
        question: "Which selector has the highest specificity?",
        options: [".class", "#id", "element", "[attribute]"],
        correct: 1
      },
      {
        question: "What does 'div > p' select?",
        options: ["All p elements", "p elements inside div at any level", "p elements that are direct children of div", "p elements after div"],
        correct: 2
      }
    ]
  },

  'f101-5': {
    title: 'Box Model, Margin & Padding',
    duration: '25 min',
    content: `
      <h2>The CSS Box Model</h2>
      <p>Every HTML element is a rectangular box made up of four parts.</p>
      
      <h3>Box Model Components</h3>
      <pre>
┌─────────────────────────────────┐
│         MARGIN                  │
│  ┌──────────────────────────┐   │
│  │      BORDER              │   │
│  │  ┌────────────────────┐  │   │
│  │  │    PADDING         │  │   │
│  │  │  ┌──────────────┐  │  │   │
│  │  │  │   CONTENT    │  │  │   │
│  │  │  │   (width x   │  │  │   │
│  │  │  │    height)   │  │  │   │
│  │  │  └──────────────┘  │  │   │
│  │  └────────────────────┘  │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
      </pre>

      <h3>Content Area</h3>
      <p>The actual content (text, images). Size set with width and height.</p>
      <pre>.box {
  width: 300px;
  height: 200px;
}</pre>

      <h3>Padding</h3>
      <p>Space between content and border. Background color extends into padding.</p>
      <pre>/* All sides */
padding: 20px;

/* Vertical | Horizontal */
padding: 20px 40px;

/* Top | Right | Bottom | Left (clockwise) */
padding: 10px 20px 30px 40px;

/* Individual sides */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 30px;
padding-left: 40px;</pre>

      <h3>Border</h3>
      <p>Line around padding and content.</p>
      <pre>border: 2px solid black;
border-width: 2px;
border-style: solid; /* solid, dashed, dotted, double */
border-color: black;

/* Individual sides */
border-top: 1px solid red;
border-radius: 10px; /* Rounded corners */</pre>

      <h3>Margin</h3>
      <p>Space outside the border. Creates distance between elements.</p>
      <pre>/* Same syntax as padding */
margin: 20px;
margin: 20px 40px;
margin: 10px 20px 30px 40px;

/* Centering horizontally */
margin: 0 auto;

/* Negative margins (pull elements closer) */
margin-top: -10px;</pre>

      <h3>Margin Collapse</h3>
      <p>Vertical margins between elements collapse to the larger value:</p>
      <pre>/* Element A: margin-bottom: 30px
   Element B: margin-top: 20px
   Actual gap: 30px (not 50px!) */</pre>

      <h3>Box-Sizing</h3>
      <p>Controls how width/height are calculated.</p>
      
      <h4>content-box (default)</h4>
      <pre>/* Width only includes content
   Total width = width + padding + border */
box-sizing: content-box;
width: 300px;
padding: 20px;
border: 5px solid;
/* Total width = 300 + 40 + 10 = 350px */</pre>

      <h4>border-box (recommended)</h4>
      <pre>/* Width includes padding and border
   Total width = width */
box-sizing: border-box;
width: 300px;
padding: 20px;
border: 5px solid;
/* Total width = 300px */</pre>

      <h3>Global Box-Sizing Reset</h3>
      <pre>* {
  box-sizing: border-box;
}</pre>

      <h3>Common Patterns</h3>
      <pre>/* Card with padding */
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Centered container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}</pre>

      <h3>Practice Exercise</h3>
      <p>Create a card component with proper spacing using the box model. Calculate total dimensions with different box-sizing values.</p>
    `,
    quiz: [
      {
        question: "With border-box, what does width include?",
        options: ["Content only", "Content + padding", "Content + padding + border", "Content + padding + border + margin"],
        correct: 2
      },
      {
        question: "What happens with 30px bottom margin and 20px top margin between elements?",
        options: ["50px gap", "30px gap", "20px gap", "25px gap"],
        correct: 1
      }
    ]
  },

  // Add more lessons for remaining topics...
  'f101-6': {
    title: 'Typography & Web Fonts',
    duration: '20 min',
    content: `
      <h2>Web Typography</h2>
      <p>Typography is crucial for readability and design.</p>
      
      <h3>Font Properties</h3>
      <pre>font-family: 'Arial', sans-serif;
font-size: 16px;
font-weight: 400; /* 100-900, or bold */
font-style: italic;
line-height: 1.5; /* 1.5x font size */
letter-spacing: 0.5px;
text-transform: uppercase;</pre>

      <h3>Font Stacks</h3>
      <p>List multiple fonts as fallbacks:</p>
      <pre>font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;</pre>

      <h3>Generic Font Families</h3>
      <ul>
        <li><strong>serif</strong>: Times New Roman (decorative strokes)</li>
        <li><strong>sans-serif</strong>: Arial (clean, modern)</li>
        <li><strong>monospace</strong>: Courier (fixed-width for code)</li>
        <li><strong>cursive</strong>: Comic Sans (handwriting style)</li>
        <li><strong>fantasy</strong>: Impact (decorative)</li>
      </ul>

      <h3>Google Fonts</h3>
      <p>1. Link in HTML head:</p>
      <pre>&lt;link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"&gt;</pre>
      
      <p>2. Use in CSS:</p>
      <pre>font-family: 'Roboto', sans-serif;</pre>

      <h3>Variable Fonts</h3>
      <pre>font-variation-settings: 'wght' 450, 'wdth' 100;</pre>

      <h3>Text Properties</h3>
      <pre>text-align: left | center | right | justify;
text-decoration: underline | line-through | none;
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
word-spacing: 5px;
white-space: nowrap | pre | pre-wrap;</pre>

      <h3>Responsive Typography</h3>
      <pre>/* Fluid font size */
font-size: clamp(1rem, 2.5vw, 2rem);

/* Media queries */
@media (max-width: 768px) {
  body { font-size: 14px; }
}</pre>

      <h3>Best Practices</h3>
      <ul>
        <li>Use 16px base font size for body text</li>
        <li>Line height 1.5-1.7 for readability</li>
        <li>Limit line length to 45-75 characters</li>
        <li>Ensure sufficient color contrast</li>
        <li>Use max 2-3 font families per site</li>
      </ul>
    `,
    quiz: [
      {
        question: "What's the recommended line-height for body text?",
        options: ["1.0", "1.2", "1.5-1.7", "2.0"],
        correct: 2
      }
    ]
  },

  // Chapter 3: JavaScript Essentials
  'f103-1': {
    title: 'Variables: var, let, const',
    duration: '20 min',
    content: `
      <h2>JavaScript Variables</h2>
      <p>Variables store data that can be used and manipulated in your program.</p>
      
      <h3>Three Ways to Declare Variables</h3>
      
      <h4>const (Preferred)</h4>
      <p>Cannot be reassigned. Use for values that won't change.</p>
      <pre>const PI = 3.14159;
const userName = "John";
// PI = 3.14; ❌ Error: Cannot reassign const

// Objects/arrays can be modified:
const user = { name: "John" };
user.name = "Jane"; ✅ OK
user.age = 30; ✅ OK</pre>

      <h4>let (Use when value will change)</h4>
      <p>Can be reassigned. Block-scoped.</p>
      <pre>let score = 0;
score = 10; ✅ OK
score = score + 5;

let message = "Hello";
message = "Goodbye"; ✅ OK</pre>

      <h4>var (Avoid - Old way)</h4>
      <p>Function-scoped, causes issues. Don't use in modern code.</p>
      <pre>var oldWay = "not recommended";
// Problems: hoisting, no block scope</pre>

      <h3>Scope</h3>
      
      <h4>Block Scope (let, const)</h4>
      <pre>if (true) {
  let x = 10;
  const y = 20;
}
// x and y don't exist here</pre>

      <h4>Function Scope (var)</h4>
      <pre>function test() {
  var z = 30;
}
// z doesn't exist here</pre>

      <h3>Naming Rules</h3>
      <ul>
        <li>Start with letter, $ or _</li>
        <li>Can contain letters, numbers, $ or _</li>
        <li>Case sensitive (myVar ≠ myvar)</li>
        <li>No reserved words (let, const, function, etc.)</li>
      </ul>

      <h3>Naming Conventions</h3>
      <pre>// camelCase for variables and functions
const firstName = "John";
let userAge = 25;

// PascalCase for classes
class UserProfile {}

// UPPERCASE for constants
const MAX_USERS = 100;
const API_KEY = "abc123";</pre>

      <h3>When to Use Each</h3>
      <ul>
        <li><strong>const</strong>: Default choice, use 80% of the time</li>
        <li><strong>let</strong>: When value needs to change (counters, toggles)</li>
        <li><strong>var</strong>: Never (kept for old code compatibility)</li>
      </ul>

      <h3>Common Patterns</h3>
      <pre>// Configuration
const CONFIG = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// Counter
let count = 0;
count++;

// Toggle
let isVisible = false;
isVisible = !isVisible;</pre>
    `,
    quiz: [
      {
        question: "Which keyword should you use by default?",
        options: ["var", "let", "const", "define"],
        correct: 2
      },
      {
        question: "Can you modify properties of a const object?",
        options: ["Yes", "No", "Only arrays", "Only strings"],
        correct: 0
      }
    ]
  },

  'f103-6': {
    title: 'DOM Manipulation & Selection',
    duration: '30 min',
    content: `
      <h2>The Document Object Model (DOM)</h2>
      <p>The DOM is a tree representation of HTML that JavaScript can manipulate.</p>
      
      <h3>Selecting Elements</h3>
      
      <h4>Modern Methods (Use these)</h4>
      <pre>// Single element
const header = document.querySelector('#header');
const button = document.querySelector('.btn-primary');
const firstPara = document.querySelector('p');

// Multiple elements (NodeList)
const allButtons = document.querySelectorAll('.btn');
const allParagraphs = document.querySelectorAll('p');</pre>

      <h4>Legacy Methods (Still common)</h4>
      <pre>document.getElementById('header');
document.getElementsByClassName('btn'); // HTMLCollection
document.getElementsByTagName('p');</pre>

      <h3>Manipulating Content</h3>
      
      <h4>Text Content</h4>
      <pre>const heading = document.querySelector('h1');
heading.textContent = 'New Title'; // Plain text
heading.innerText = 'New Title'; // Respects styling</pre>

      <h4>HTML Content</h4>
      <pre>const div = document.querySelector('.container');
div.innerHTML = '&lt;p&gt;New paragraph&lt;/p&gt;'; // ⚠️ Security risk with user input</pre>

      <h3>Manipulating Attributes</h3>
      <pre>const img = document.querySelector('img');
img.src = 'new-image.jpg';
img.alt = 'Description';
img.setAttribute('data-id', '123');
img.getAttribute('src');
img.removeAttribute('alt');
img.hasAttribute('src'); // true/false</pre>

      <h3>Manipulating Styles</h3>
      <pre>const box = document.querySelector('.box');

// Inline styles
box.style.color = 'red';
box.style.backgroundColor = 'blue'; // camelCase
box.style.fontSize = '20px';

// CSS classes (better)
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('dark-mode');
box.classList.contains('active'); // true/false</pre>

      <h3>Creating Elements</h3>
      <pre>// Create
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello!';
newDiv.classList.add('message');

// Add to DOM
document.body.appendChild(newDiv);
container.prepend(newDiv); // Add at start
container.append(newDiv); // Add at end
container.insertBefore(newDiv, referenceNode);</pre>

      <h3>Removing Elements</h3>
      <pre>const element = document.querySelector('.remove-me');
element.remove(); // Modern
element.parentElement.removeChild(element); // Legacy</pre>

      <h3>Traversing the DOM</h3>
      <pre>const element = document.querySelector('.item');

// Parent
element.parentElement;
element.closest('.container'); // Nearest ancestor

// Children
element.children; // HTMLCollection
element.firstElementChild;
element.lastElementChild;

// Siblings
element.nextElementSibling;
element.previousElementSibling;</pre>

      <h3>Practical Example</h3>
      <pre>// Create a todo item
function addTodo(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('todo-item');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();
  
  li.appendChild(deleteBtn);
  document.querySelector('.todo-list').appendChild(li);
}</pre>

      <h3>Best Practices</h3>
      <ul>
        <li>Use querySelector/querySelectorAll for consistency</li>
        <li>Cache DOM selections in variables</li>
        <li>Prefer classList over inline styles</li>
        <li>Be careful with innerHTML and user input</li>
        <li>Use data attributes for storing metadata</li>
      </ul>
    `,
    quiz: [
      {
        question: "Which method selects multiple elements?",
        options: ["querySelector", "getElementById", "querySelectorAll", "getElement"],
        correct: 2
      },
      {
        question: "What's safer than innerHTML for text content?",
        options: ["innerText", "textContent", "text", "Both A and B"],
        correct: 3
      }
    ]
  }
};

// Helper function to get lesson content
export const getLessonContent = (lessonId) => {
  return LESSON_CONTENT[lessonId] || null;
};

// Helper to check if lesson has content
export const hasLessonContent = (lessonId) => {
  return lessonId in LESSON_CONTENT;
};
