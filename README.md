# Sigma · SGPA Engine & Study Planner

Sigma is a dynamic, interactive dashboard designed for college students (especially optimized for Indian engineering grading systems) to simulate, track, and achieve their desired target SGPA. By inputting current internal marks and simulating upcoming exam scores, Sigma calculates exactly what grades and marks are required in pending exams to hit a desired target.

It also integrates an AI Study Planner that generates custom, exam-focused study guides (concepts, common pitfalls, and practice MCQs) for specific topics.

---

## 🚀 Features

- **Live SGPA Simulator**: Drag the target SGPA slider or type your desired score. Sigma dynamically computes the required average grade points across pending subjects in real-time.
- **Component-Level Tracking**: Breaks down each subject's score into three distinct evaluation components:
  - **Internal Assessment** (out of 40) — Pass: 16
  - **MCQ Test** (out of 20) — Pass: 7
  - **External Examination** (out of 40) — Pass: 16
- **Subject Wizard**: Add custom subjects with credit weights and sprints (Sprint 1 / Sprint 2).
- **AI Study Guide Generator**: Deep-dive into any pending topic with Claude. Generate exam-oriented summaries, common mistakes, and 8 custom-tailored MCQs with exhaustive explanations.
- **Print & Export**: Clean CSS styling for printing or exporting study plans and target score sheets to PDF.
- **Local Persistence**: Zero backend required. Your subjects, scores, and study plans are securely cached in `localStorage`.

---

## 🛠️ Grading System Configuration

The app follows a 10-point credit-weighted SGPA scale by default. You can customize the grading tiers and components at the top of [`src/lib/grading.js`](file:///Users/saish/Documents/Coding/SGPA/src/lib/grading.js):

| Marks Range | Grade | Grade Points |
|-------------|-------|--------------|
| 90 - 100    | O     | 10           |
| 80 - 89     | A+    | 9            |
| 70 - 79     | A     | 8            |
| 60 - 69     | B+    | 7            |
| 55 - 59     | B     | 6            |
| 50 - 54     | C     | 5            |
| 40 - 49     | P     | 4            |
| < 40        | F     | 0            |

*Note: Passing requires meeting individual component thresholds (Internals: 16/40, MCQs: 7/20, External: 16/40).*

---

## 💻 Tech Stack

- **Frontend**: React 19, Vite 8, Lucide React
- **Styling**: Vanilla CSS (Modern glassmorphism & dark-themed dashboard)
- **AI integration**: Anthropic Claude API (specifically optimized for `claude-sonnet`)
- **State & Storage**: LocalStorage wrapper for local persistence

---

## 🏃 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saish-3/SGPA.git
   cd SGPA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

### Building for Production

To compile the application for hosting:
```bash
npm run build
```
This generates the optimized, static build files inside the `dist/` directory.

---

## 📄 License

This project is licensed under the ISC License. See `package.json` for details.

---

*Made with ❤️ to help engineering students plan their semesters smarter.*
