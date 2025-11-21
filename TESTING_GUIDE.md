# Kenya Ranked - Testing Guide

## Quick Start

1. **Start the development server:**
   ```bash
   cd /home/comon/dev/comon/kenya-ranked
   pnpm dev
   ```

2. **Open in browser:**
   Navigate to `http://localhost:3000`

## What to Test

### 1. Homepage - New Features

#### Data Freshness Banner
- [ ] Look for the blue banner below the hero section
- [ ] Should say "Data Status: All indicators updated as of November 2024..."

#### Kenya's Story in Numbers Section
- [ ] Scroll down to see the narrative section
- [ ] Should have two columns: "Kenya's Strengths" (green) and "Key Challenges" (red)
- [ ] Each column should have 3 cards with metrics
- [ ] "Looking Ahead" section at the bottom with blue gradient

#### Enhanced Metric Cards
- [ ] Each metric card should have:
  - Info icon (ℹ️) in top right
  - Data freshness indicator (colored dot)
  - Last updated timestamp at bottom
  - "Learn More" button

#### Interactive Features
- [ ] Hover over info icon → tooltip should appear
- [ ] Click "Learn More" → modal should open with detailed information
- [ ] Modal should have "What is this?", "How it's measured", and "Data Source" sections
- [ ] Press ESC or click outside → modal should close

### 2. Language Switcher

- [ ] Look in the navigation bar (top right)
- [ ] Should see English 🇬🇧 and Kiswahili 🇰🇪 buttons
- [ ] Click Kiswahili → page should reload with Swahili translations
- [ ] Navigation items should change to Swahili
- [ ] Click English → should switch back

### 3. Data Export (To be added to pages)

- [ ] Export button should appear on indicators page
- [ ] Click Export → dropdown with CSV, Excel, JSON options
- [ ] Select format → file should download

### 4. Accessibility Testing

#### Keyboard Navigation
- [ ] Press Tab → should navigate through all interactive elements
- [ ] Focus indicators should be visible
- [ ] Press Enter on "Learn More" → modal should open
- [ ] Press ESC in modal → should close

#### Screen Reader (if available)
- [ ] All images should have alt text
- [ ] Buttons should have descriptive labels
- [ ] Data should be announced properly

### 5. Responsive Design

- [ ] Resize browser window
- [ ] Narrative section should stack on mobile (single column)
- [ ] Cards should be responsive
- [ ] Navigation should show mobile menu on small screens

## Common Issues & Fixes

### Issue: Page won't load
**Fix:** Check the terminal for compilation errors. Look for red error messages.

### Issue: Components not showing
**Fix:** Check browser console (F12) for JavaScript errors.

### Issue: Styles look broken
**Fix:** Ensure Tailwind CSS is compiling. Check for CSS errors in console.

### Issue: Language switcher doesn't work
**Fix:** Check browser console. LocalStorage might need to be cleared.

### Issue: Modals don't open
**Fix:** Check for JavaScript errors. Ensure useState is working properly.

## Browser Console Checks

Open browser console (F12) and check for:
- ❌ Red errors → Need to fix
- ⚠️ Yellow warnings → Can ignore most, but review
- 🔵 Blue info → Normal Next.js messages

## Performance Checks

1. **Lighthouse Audit:**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit for Performance, Accessibility, Best Practices, SEO
   - Target scores: 90+ for all categories

2. **Page Load Time:**
   - Should load in under 2 seconds on good connection
   - Check Network tab for slow resources

## Known Limitations

1. **Packages Installing:** If you see errors about missing packages (resend, xlsx, date-fns), the installation might still be running. Wait for `pnpm add` to complete.

2. **First Load:** First page load might be slower as Next.js compiles pages.

3. **Hot Reload:** When you save files, page should auto-reload. If not, manually refresh.

## Reporting Issues

If you find issues, note:
1. What page you're on
2. What action you took
3. What error message you see (screenshot if possible)
4. Browser console errors (F12 → Console tab)

## Next Steps After Testing

1. Fix any errors found
2. Add export buttons to remaining pages
3. Create embed widget pages
4. Implement comparison mode enhancements
5. Set up email notifications with Resend
6. Run full accessibility audit
7. Deploy to Vercel for staging testing
