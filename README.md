# Accerdian Refer and Earn Landing Page

This project implements a "Refer and Earn" landing page for Accerdian, featuring a referral system with user authentication and link generation.

## Features

- User Authentication
  - Sign Up
  - Sign In
- Refer and Earn System
  - Refer Now button
  - Referral link generation
  - Share referral link via email or direct copy
- Referral Link Processing
  - New user sign-up through referral links

## Components

1. **Sign Up Page**
   - New user registration form
   - Fields: Username, Password, etc.

2. **Sign In Page**
   - Existing user login form
   - Fields: Username, Password

3. **Refer Now Option**
   - Button on the main dashboard or user profile
   - Triggers referral link generation

4. **Referral Modal**
   - Pops up when "Refer Now" is clicked
   - Contains:
     - Generated referral link
     - Option to copy link directly
     - Form to share link via email

5. **Referral Link Processing**
   - Handles new user sign-ups through referral links
   - Tracks referral source

## User Flow

1. User signs up or signs in
2. User navigates to their dashboard or profile
3. User clicks "Refer Now" button
4. Referral modal appears with generated link
5. User copies link or shares via email
6. New user signs up using the referral link

## Installation and Setup

npm i
npm run dev

## Technologies Used

ReactJS
MaterialUI
Redux State Management

