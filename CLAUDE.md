# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page for "El Vals de la Novia" (The Bride's Waltz), a Spanish wedding consultation service. The project is built with Next.js 14, TypeScript, and Tailwind CSS, featuring a professional landing page with an integrated reservation modal.

## Current State

The project is now a fully functional Next.js application with:
- `src/app/page.tsx` - Main landing page component with reservation modal
- `src/app/layout.tsx` - Root layout with metadata
- `src/app/globals.css` - Tailwind CSS styles
- Complete Next.js 14 setup with TypeScript and Tailwind CSS
- `landing.html` - Legacy file (can be removed)

## Architecture

### Main Component (`src/app/page.tsx`)
- React functional component with hooks for state management
- Modal system for reservation forms
- Form handling with validation and success states
- Email simulation for reservation requests

### Design System
- Tailwind CSS with warm color palette (#F4E7E4 background, #1F1F1F text)
- Consistent rounded corners (rounded-2xl) throughout
- Semi-transparent overlays with backdrop blur
- Mobile-first responsive design

### Key Features
- **Reservation Modal**: Clean, conversion-optimized form with 4 essential fields
- **Fixed CTA Bar**: Always-visible bottom bar for mobile conversion
- **Loading States**: Spinner animation during form submission
- **Success States**: Clear confirmation messaging
- **Responsive Design**: Works seamlessly on mobile and desktop

## Development Commands

```bash
npm run dev     # Start development server (localhost:3000)
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Form Integration

The reservation modal includes:
- Name (required)
- Email (required)
- Wedding date (optional)
- Message/details (optional)

Currently simulates email sending with 2-second delay. To integrate with real email service:
1. Replace the `handleSubmit` function in `page.tsx`
2. Add email service API (SendGrid, Resend, etc.)
3. Update environment variables for email configuration

## Key Configuration

- All text is in Spanish targeting Spanish-speaking users
- Uses semantic HTML structure with proper heading hierarchy
- Modal z-index is set to 50 to ensure it appears above all content
- Form validation uses HTML5 native validation

## Styling Notes

- Uses Tailwind's backdrop-blur for modern glass-morphism effects
- Consistent spacing with Tailwind's spacing scale
- Hover states and transitions for better UX
- Custom focus states for form accessibility