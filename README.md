# StyleAI - AI Fashion Platform

A comprehensive Generative AI fashion recommendation platform providing personalized styling advice, outfit recommendations, image-based analysis, and trend insights.

## Features

### 🎨 Core Features
- **AI Outfit Generator**: Create personalized outfit recommendations based on preferences (occasion, style, season, formality)
- **Style Analyzer**: Upload images to receive AI-powered styling insights, color analysis, and item detection
- **Trend Insights**: Stay updated with AI-curated fashion trends and seasonal forecasts
- **My Wardrobe**: Organize clothing collections with analytics and AI styling suggestions
- **User Authentication**: Secure sign-up and sign-in with Supabase Auth
- **Real-time Data Sync**: All user data persisted across devices

### 🛠️ Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS v4
- **Routing**: React Router v7 (Data mode)
- **UI Components**: Radix UI, Motion (Framer Motion)
- **Backend**: Supabase (Auth, Database, Storage, Edge Functions)
- **Server**: Hono web framework on Deno
- **Deployment**: Figma Make (Vite build system)

## Architecture

```
Frontend (React) → Server (Hono/Deno) → Database (Supabase KV Store)
                                       → Storage (Supabase Storage)
                                       → Auth (Supabase Auth)
```

### Backend API Endpoints

#### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - Sign in existing user

#### Wardrobe Management
- `GET /wardrobe` - Get all wardrobe items
- `POST /wardrobe` - Add new item
- `PUT /wardrobe/:itemId` - Update item
- `DELETE /wardrobe/:itemId` - Delete item

#### Outfit Management
- `GET /outfits` - Get saved outfits
- `POST /outfits` - Save outfit
- `DELETE /outfits/:outfitId` - Delete outfit

#### Favorites
- `POST /favorites` - Add to favorites
- `DELETE /favorites/:type/:itemId` - Remove from favorites
- `GET /favorites` - Get all favorites

#### User Preferences
- `GET /preferences` - Get user preferences
- `PUT /preferences` - Update preferences

#### Image Upload
- `POST /upload` - Upload image for analysis
- `GET /image/:path` - Get signed URL for image

#### Analytics
- `GET /analytics` - Get user analytics and statistics

## Getting Started

### Prerequisites
- Modern web browser
- Internet connection
- Email address for account creation

### Local Development Setup
1. The app is already configured and connected to Supabase
2. All dependencies are pre-installed
3. The backend server runs automatically on Supabase Edge Functions

### Using the Application

1. **Sign Up / Sign In**
   - Navigate to the app
   - Click "Sign In" button
   - Create a new account or sign in with existing credentials
   - No email verification required (configured for prototyping)

2. **Explore Features**
   - **Home**: Overview of platform features
   - **Outfit Generator**: Set preferences and generate AI outfit recommendations
   - **Style Analyzer**: Upload images or try sample outfits for AI analysis
   - **Trends**: Browse current fashion trends with popularity metrics
   - **My Wardrobe**: Add, manage, and organize your clothing items

3. **Managing Your Wardrobe**
   - Click "Add Item" to add clothing items
   - Fill in item details (name, category, color, season)
   - View items in grid or list mode
   - Delete items by clicking the trash icon
   - Get AI-powered outfit suggestions based on your wardrobe

## Data Storage

The application uses Supabase KV (Key-Value) store for data persistence:

- **User Profiles**: `user:{userId}:profile`
- **Wardrobe Items**: `wardrobe:{userId}:{itemId}`
- **Outfits**: `outfit:{userId}:{outfitId}`
- **Favorites**: `favorite:{userId}:{type}:{itemId}`

Images are stored in Supabase Storage bucket: `make-6d671ce4-fashion-images`

## Security & Authentication

- JWT-based authentication with Supabase
- Access tokens stored in localStorage
- Protected routes require authentication
- Service role key used only on backend
- Signed URLs for private image access

## Deployment

The application is automatically deployed when you:
1. Make changes in Figma Make
2. Save your work
3. The platform handles build and deployment

### Backend Deployment
- Server code in `/supabase/functions/server/index.tsx`
- Automatically deployed as Supabase Edge Function
- Runs on Deno runtime
- Accessible at: `https://{projectId}.supabase.co/functions/v1/make-server-6d671ce4`

## API Integration

The frontend communicates with the backend via `/src/app/utils/api.ts`:

```typescript
// Example: Add wardrobe item
const response = await wardrobeApi.add({
  name: "Blue Denim Jacket",
  category: "Outerwear",
  color: "Blue",
  season: "All Season"
});
```

All API calls automatically handle:
- Authentication headers
- Error handling
- Response parsing
- Token management

## Future Enhancements

Potential features to add:
- Real AI/ML integration for actual image analysis
- Social sharing of outfits
- Shopping recommendations with affiliate links
- Weather-based outfit suggestions
- Color palette generation
- Style quiz for personalized recommendations
- Community features and outfit voting
- Virtual try-on with AR
- Integration with e-commerce platforms

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Clear browser localStorage
   - Try signing out and back in
   - Check network connection

2. **Items Not Loading**
   - Ensure you're signed in
   - Check browser console for errors
   - Refresh the page

3. **Image Upload Issues**
   - File size limit: 10MB
   - Supported formats: PNG, JPG, JPEG
   - Check internet connection

## Support

For issues or questions:
1. Check browser console for error messages
2. Ensure you have a stable internet connection
3. Try clearing cache and localStorage
4. Sign out and sign in again

## Privacy Notice

This application is designed for prototyping purposes. It is not intended for collecting Personally Identifiable Information (PII) or securing highly sensitive data. Always comply with privacy regulations when handling user data.

## License

Built with Figma Make - A rapid web application prototyping platform.

---

**Note**: This application uses mock AI analysis for demonstration. In a production environment, integrate with actual AI/ML services like OpenAI Vision API, Google Cloud Vision, or custom-trained models for real fashion analysis.
