# Kenton Energy - AI Assistant Chat Widget

A Next.js + TypeScript web application featuring a floating AI assistant chat widget for Kenton Energy, a renewable energy provider.

## Features

- 🎨 **Modern UI**: Clean energy brand aesthetic with greens, whites, and subtle gradients
- 💬 **Floating Chat Button**: Bottom-left corner chat button that opens the assistant panel
- 🤖 **AI Assistant**: Interactive chat interface with:
  - Friendly greeting message
  - FAQ pills for quick questions
  - Postcode collection for personalized quotes
  - Mock tariff plan display with selection
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **TypeScript**: Fully typed for better developer experience
- 🎯 **Tailwind CSS**: Utility-first CSS framework for rapid styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3005](http://localhost:3005) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main landing page
├── components/
│   ├── ChatButton.tsx       # Floating chat button
│   ├── ChatWidget.tsx       # Main chat panel component
│   ├── MessageBubble.tsx    # Individual message display
│   └── TariffCard.tsx       # Tariff plan card component
├── lib/
│   └── chatData.ts          # Mock data and FAQ answers
└── public/                  # Static assets
```

## Components

### ChatButton
Floating button component positioned at the bottom-left corner. Toggles the chat widget visibility.

### ChatWidget
Main chat interface featuring:
- Header with assistant branding
- FAQ pills for quick questions
- Message history with user/assistant bubbles
- Tariff plan cards (displayed after postcode entry)
- Input field for user messages

### MessageBubble
Displays individual chat messages with different styling for user vs assistant messages.

### TariffCard
Displays tariff plan information with features, pricing, and a select button.

## Future Integration Points

The chat widget includes a placeholder comment in `ChatWidget.tsx` where you can integrate:
- LLM API (OpenAI, Anthropic, etc.)
- Salesforce Agentforce
- Custom backend API for real-time quote generation

## Available Tariff Plans

1. **🌿 Kenton Green Saver**: 100% renewable, fixed 12-month rate - $120/mo
2. **⚡ Kenton Flex Plan**: Variable pricing, adjusts monthly - $115/mo
3. **☀️ Kenton Smart Eco+**: Smart meter enabled, dynamic pricing - $105/mo

## Scripts

- `npm run dev` - Start development server on port 3005
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Hooks** - State management

## License

ISC

