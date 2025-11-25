# CS ChatBot Setup Guide 🤖

Your learning platform now has a Gen-Z style AI chatbot powered by Google's Gemini API!

## Features ✨

- **Gen-Z Personality**: Casual, friendly communication style with slang and emojis
- **Smart Topic Detection**: Automatically detects CS topics (algorithms, data structures, JavaScript, Python, React, CSS, databases)
- **Fallback System**: Works offline with pre-written responses when API is unavailable
- **Conversation Memory**: Remembers last 6 messages for context
- **Real-time Chat**: Instant responses with animated loading states
- **Beautiful UI**: Floating chat window with smooth animations

## Quick Setup 🚀

### 1. Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Add API Key to Your Project

Open the `.env` file in your project root and add your API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env` file to Git! It's already in `.gitignore`.

### 3. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## How to Use 💬

1. **Open ChatBot**: Click the purple chat button (💬) in the header
2. **Ask Questions**: Type any computer science question
3. **Get Answers**: AI responds in Gen-Z style with explanations

### Example Questions:
- "explain binary search algorithm"
- "what's the difference between let and const in js?"
- "how does useState hook work in React?"
- "what are data structures?"
- "explain CSS flexbox"

## Fallback Mode 🔋

If the API is down or not configured, the chatbot automatically switches to **Backup Mode**:
- Uses pre-written responses for common CS topics
- Still functional and helpful
- Shows yellow border to indicate fallback mode

### Fallback Topics Covered:
- Algorithms & Big O notation
- Data Structures (arrays, trees, graphs)
- JavaScript (async/await, promises)
- Python (libraries, syntax)
- CSS (flexbox, grid, animations)
- React (hooks, components)
- Databases (SQL vs NoSQL)

## Technical Details 🛠️

### Components:
- `src/components/ChatBot.jsx` - Main chatbot component
- Integration in `Header.jsx` and `App.jsx`

### API:
- **Model**: Gemini 2.0 Flash (latest)
- **Endpoint**: Google Generative Language API v1
- **Features**: Context-aware, temperature: 0.9 for creative responses

### State Management:
- `messages` - Chat history
- `isLoading` - Loading indicator
- `apiStatus` - Tracks online/fallback mode
- Auto-scroll to latest message

## Troubleshooting 🔧

### ChatBot button not showing?
- Make sure you're logged in as a user (not admin)
- Check if Header component received `onOpenChatBot` prop

### API not working?
1. Verify API key is correct in `.env`
2. Check console for error messages
3. Ensure dev server was restarted after adding API key
4. Fallback mode should activate automatically

### Chatbot not opening?
- Check browser console for errors
- Verify `ChatBot` component is imported in `App.jsx`

## Customization Options 🎨

### Change Personality:
Edit the `systemPrompt` in `ChatBot.jsx` (line 105-115)

### Add More Fallback Topics:
Add to `FALLBACK_RESPONSES` object (line 5-45)

### Adjust Conversation History:
Change `.slice(-6)` to keep more/fewer messages (line 142)

### Modify Colors/Style:
- Header button: `Header.jsx` line 117-135
- Chat window: `ChatBot.jsx` styles

## API Limits 📊

**Free Tier** (Gemini API):
- 60 requests per minute
- 1,500 requests per day
- Generous quota for learning projects

If you hit limits:
- Fallback mode activates automatically
- Responses still work with pre-written content
- Consider upgrading if needed

## Privacy & Security 🔒

- API key stored in `.env` (not committed to Git)
- Messages not permanently stored
- Conversation history cleared on page refresh
- Only last 6 messages sent to API for context

## Future Enhancements 💡

Potential features to add:
- [ ] Save chat history to localStorage
- [ ] Code syntax highlighting in responses
- [ ] Voice input/output
- [ ] Export chat transcripts
- [ ] Multi-language support
- [ ] Custom topics/focus areas

---

**Enjoy your AI study buddy!** 🎉

Got questions? The chatbot can probably help with that! 😉
