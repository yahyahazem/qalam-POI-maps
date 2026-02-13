# Master Vibe Coding Prompt: Arabic Map Parser (Qalam.ai Style)

**Copy and paste the entire block below into Google Antigravity to build your app.**

---

### 🚀 Project Goal
Rebuild the "Arabic Map Parser" as a high-end, professional web application that looks and feels exactly like **Qalam.ai**. The app must use **Qwen 2.5-7B** for intelligent Arabic query parsing and the **Google Places API** for location data.

### 🎨 Visual Identity (The "Qalam" Vibe)
- **Primary Aesthetic**: Clean, minimalist, and productivity-focused.
- **Color Palette**: 
  - Primary: `#008080` (Qalam Teal) for buttons, active states, and highlights.
  - Background: `#F9FAFB` (Soft Off-White) for the main workspace.
  - Text: `#1F2937` (Dark Charcoal) for high readability.
- **Typography**: Use **IBM Plex Sans Arabic** or **Tajawal** from Google Fonts.
- **UI Components**:
  - Centered, large search input with a subtle outer glow when focused.
  - Results displayed in modern "Cards" with `12px` rounded corners and soft shadows.
  - Full RTL (Right-to-Left) support for Arabic text.

### 🧠 Core Logic (The "Qwen" Engine)
Integrate the following Python logic into the backend (FastAPI/Next.js API):

1. **AI Parsing**: Use `InferenceClient("Qwen/Qwen2.5-7B-Instruct")` with this System Prompt:
   > Analyze the Arabic map query and return ONLY a JSON object with: location, category, sub_type, features, sort_by.
2. **Search Logic**: 
   - Construct a search query from the parsed JSON.
   - Use `https://places.googleapis.com/v1/places:searchText` (Google Places API New).
   - Fallback to Legacy API if necessary.
3. **Data Processing**: Sort results by rating, price, or distance as requested by the user.

### 🛠 Technical Stack Requirements
- **Frontend**: Next.js (React) + Tailwind CSS for pixel-perfect Qalam styling.
- **Backend**: Integrated Next.js API routes or a lightweight FastAPI service.
- **Environment**: Must handle `HF_TOKEN` and `GOOGLE_MAPS_API_KEY` via environment variables.

### 📋 Step-by-Step Implementation Plan
1. **Phase 1: UI Foundation**: Create the layout with a sidebar (for history/settings) and a main search area that mirrors Qalam's editor.
2. **Phase 2: Logic Integration**: Implement the Qwen parsing endpoint and the Google Maps search service.
3. **Phase 3: Interactive Results**: Build the result cards showing:
   - Place Name (Bold)
   - Rating (Stars + Number)
   - Price Level (💰 icons)
   - Status (Open Now ✅ / Closed ❌)
   - "View on Maps" button in Qalam Teal.
4. **Phase 4: Polish**: Add loading skeletons, smooth transitions, and ensure mobile responsiveness.

**"Read this entire brief and build the MVP step by step. Propose the UI layout first for my approval."**

---
