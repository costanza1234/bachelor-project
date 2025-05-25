# Islands of Knowledge

A research tool and educational game to help researchers understand how children search for information online.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/bachelor-project.git
   cd bachelor-project
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **(Optional) Set up environment variables:**
   - If you use APIs (e.g., Google Custom Search), create a `.env` file in the root directory:
     ```
     REACT_APP_API_KEY=your_api_key
     REACT_APP_SEARCH_ENGINE_ID=your_search_engine_id
     REACT_APP_GOOGLE_AI_STUDIO_API_KEY=your_google_ai_studio_api_key
     ```

---

## 🏃‍♂️ Running the App

Start the development server:

```sh
npm start
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- The app will reload automatically when you make changes.

---

## 🗂️ Project Structure

```

bachelor-project/
├── public/               # Public assets, i.e. Background video and islands images
│
├── report/               # Latex report files
│
├── src/                  # Code for the project
│
    ├── components/           # Reusable UI components
    │   ├── BackButton.js
    │   ├── DownloadButton.js
    │   ├── Footer.js
    │   ├── GameFinish.js
    │   ├── GameStart.js
    │   ├── Header.js
    │   ├── HomeButton.js
    │   ├── Layout.js
    │   ├── Map.js
    │   ├── MapIsland.js
    │   ├── QueryInput.js
    │   ├── QuestionLayout.js
    │   ├── Results.js
    │   ├── Score.js
    │   └── UserAnswer.js
    │
    ├── data/                 # Static data and language files
    │   ├── languages.js
    │   └── questions.js
    │
    ├── pages/                # Page-level components for routing
    │   ├── ChoicePage.js
    │   ├── ChooseLanguagePage.js
    │   ├── FinishPage.js
    │   ├── GameStartPage.js
    │   ├── MapPage.js
    │   └── QuestionPage.js
    │
    ├── styles/               # CSS modules for styling
    │   ├── answer.css
    │   ├── choiceButton.css
    │   ├── header.css
    │   ├── landing.css
    │   ├── layout.css
    │   ├── map.css
    │   ├── question.css
    │   ├── responsive.css
    │   └── results.css
    │
    ├── utils/              # Utility functions and context
        ├── Hooks/          # Custom hooks for game logic
            └── useMapHooks.js
    │   ├── GameStateContext.js
    │   └── helpers.js
    │
    ├── App.js                # Main app component and routing
    ├── index.js              # Entry point
    └── index.css             # Global styles
│
├── .env                  # Environment variables (optional)
├── .gitignore            # Git ignore file
├── package-lock.json     # Lock file for npm dependencies
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

---

## 🧩 Key Concepts

- **Game State Management:**  
  Uses React Context (`GameStateContext.js`) to manage game progress, user answers, and session data. This allows for easy access to game state across components. This is also where the tracking of user actions and choices is implemented.

- **Language Support:**  
  All user-facing text is managed in `data/languages.js` for easy localization.

- **Routing:**  
  Uses React Router for navigation between pages (`src/pages/`).

- **UI Components:**  
  Modular and reusable components are in `src/components/`.

- **Styling:**  
  CSS modules in `src/styles/` for scoped styling.

- **Background Video:**  
  The app features a looping background video (`public/bg.mp4`) with a color mask for visual effect.

---

## 📝 Customization

- **Add/Change Questions:**  
  Edit `data/questions.js` and update `data/languages.js` to add or translate questions.

- **Add More Languages:**  
  Add a new language object in `data/languages.js` and update the language selection logic in `ChooseLanguagePage.js`.

- **Change Background Video:**  
  Replace `assets/bg.mp4` with your own video file.

---

## 🧪 Research & Data

- **Download Data:**  
  Use the download button in the footer to export user interaction data as JSON (password protected). The password is `log`.

- **Session Tracking:**  
  The app tracks user actions, query choices, and time spent for research analysis. More details on data collection can be found in the `utils/GameStateContext.js` file.

---

## ❓ Troubleshooting

- **Cache/Build Errors:**  
  If you see errors related to missing files in `.cache`, try:

  ```sh
  rm -rf node_modules/.cache
  npm start
  ```

- **API Keys:**  
  Make sure your `.env` file is set up if you use external APIs.

---

## 📄 License

This project is for academic and research purposes.

---

## 👩‍💻 Author

Costanza Rodriguez Gavazzi  
Bachelor Project, Università della Svizzera Italiana

---

## 🙏 Acknowledgements

- [Create React App](https://github.com/facebook/create-react-app)
- [Mantine UI](https://mantine.dev/)
- [React Router](https://reactrouter.com/)
