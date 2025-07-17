# CodeDock AI

A modern, responsive Next.js application showcasing an AI-powered coding companion interface. Built with TypeScript, Tailwind CSS, and Next.js 14.

## Features

- 🎨 **Modern UI/UX**: Beautiful gradient designs and smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Next.js for optimal loading speeds
- 🎯 **TypeScript**: Full type safety and better development experience
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid styling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Icons**: Heroicons (SVG)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for code generation feature)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DockerAi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp env.example .env.local

# Edit .env.local and add your OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### OpenAI API Setup

The code generation feature requires an OpenAI API key:

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Add the key to your `.env.local` file:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

**Note**: The API key is required for the `/codedock` page to generate code using GPT-3.5-turbo. If no API key is configured, the app will use a fallback mode with predefined responses for testing purposes.

## API Endpoints

### POST `/api/generate`

Generates code using OpenAI's GPT-3.5-turbo model.

**Request Body:**
```json
{
  "prompt": "Create a React component for a user profile card"
}
```

**Response:**
```json
{
  "response": "// Generated code here...",
  "message": "Code generated successfully using OpenAI GPT-3.5-turbo!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "model": "gpt-3.5-turbo",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 300,
    "total_tokens": 450
  }
}
```

**Error Responses:**
- `400`: Invalid or missing prompt
- `401`: Invalid OpenAI API key
- `429`: Rate limit exceeded
- `500`: Server error or OpenAI service unavailable

### Testing the API

You can test the API endpoints using the included test script:

```bash
# Make sure the development server is running first
npm run dev

# In another terminal, run the test
node test-api.js
```

Or test manually with curl:

```bash
# Test GET endpoint
curl http://localhost:3000/api/generate

# Test POST endpoint
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a React component"}'
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts  # OpenAI API integration
│   ├── codedock/
│   │   └── page.tsx      # Code generation interface
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main landing page
├── components/           # Reusable components (to be added)
└── lib/                  # Utility functions (to be added)
```

## Features Overview

The CodeDock AI application includes:

### Landing Page (`/`)
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **Features Section**: Three key features with beautiful cards
- **Call-to-Action**: Prominent section to encourage user engagement
- **Footer**: Comprehensive footer with navigation links
- **Responsive Navigation**: Sticky header with mobile-friendly design

### Code Generator (`/codedock`)
- **AI-Powered Code Generation**: Uses OpenAI GPT-3.5-turbo for intelligent code generation
- **Interactive Form**: User-friendly interface with textarea for prompts
- **Real-time Loading**: Shows loading state while generating code
- **Error Handling**: Comprehensive error handling for API failures
- **Code Display**: Formatted code output with syntax highlighting
- **Responsive Design**: Works seamlessly on all devices

## Customization

### Colors
The application uses a blue-purple gradient theme. You can customize colors by modifying:
- `tailwind.config.js` for theme colors
- `src/app/globals.css` for CSS custom properties

### Content
Update the content in `src/app/page.tsx` to match your specific needs.

## Deployment

The application can be deployed to various platforms:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository. 