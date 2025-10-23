# Koa AI Chat Bot

A Next.js-based AI chatbot application featuring intelligent responses, knowledge management, and advanced training capabilities.

## Features

- **AI-Powered Chat**: GPT-4o mini integration with contextual responses
- **Knowledge Management**: GitBook documentation integration with MongoDB storage
- **Training System**: Secret training mode for custom knowledge enhancement
- **Client Management**: Message limits and usage tracking
- **Modern Interface**: Responsive design with smooth animations

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Initialize knowledge base** (optional)
   ```bash
   curl -X POST http://localhost:3000/api/training/gitbook-init
   ```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

## Configuration

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_OPENAI_API_KEY` | OpenAI API key for GPT-4o mini |
| `MONGODB_URI` | MongoDB connection string |

### MongoDB Setup

**MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string and add to `.env.local`

**Local MongoDB**
```bash
mongodb://localhost:27017/koa-ai-chat
```

## Training System

The application includes a secret training mode that allows users to enhance the bot's knowledge base.

### How to Use Training Mode

1. **Activate**: Send a secret code as the first line of your message
2. **Train**: All subsequent messages are analyzed and stored
3. **Exit**: Send `exit training mode` to stop the session

### Training Features

- **AI Analysis**: Automatic content analysis for intent, sentiment, and topics
- **Knowledge Integration**: Training data becomes part of the searchable knowledge base
- **Natural Responses**: Bot responds conversationally during training sessions

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main landing page
│   ├── layout.tsx                  # Root layout
│   └── api/                        # API routes
├── components/
│   └── ChatModal.tsx               # Main chat interface
├── lib/
│   └── mongodb.ts                  # MongoDB connection utilities
├── models/                         # Database models
└── types/                          # TypeScript definitions
```

## API Endpoints

### Core APIs
- `POST /api/client/status` - Get client status and message count
- `POST /api/client/increment` - Increment message count
- `POST /api/training/secret-training` - Handle training sessions
- `POST /api/training/gitbook-init` - Initialize knowledge base
- `POST /api/training/gitbook-search` - Search content

### Admin APIs
- `GET /api/admin/training-data` - View training sessions
- `GET /api/admin/training-gitbook` - View GitBook content

## Troubleshooting

### Common Issues

**API Key Problems**
- Verify `.env.local` exists with correct variable names
- Restart development server after environment changes

**MongoDB Connection**
- Check `MONGODB_URI` format and credentials
- Ensure database is accessible

**Training Mode**
- Verify secret codes in `.env.local`
- Check MongoDB connectivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Stay Connected
| Platform | Link | Purpose |
|----------|------|---------|
| Telegram | [t.me/FroganBee.sol](https://t.me/froganbee_sol) | Announcements & Support |
| X | [x.com/FroganBee.sol](https://x.com/froganbee_sol) | News & Updates |

## License

MIT License
