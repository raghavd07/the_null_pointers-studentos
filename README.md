# Student OS
> A smart academic assistant for students - track performance, predict risks, and generate AI powered study plans.
----
## Overview
StudentOS is an intelligent student productivity system designed to help college students:
* **Track attendance** and avoid shortages
* **Monitor CGPA** with accurate grade calculations
* **Evaluate Placement Readiness**
* **Analyse Stress** and sleep patterns
* **Generate personalised AI Study plans**
---
## Features
### Attendance Tracker
* Calculates current attendance percentage
* Predicts no. safe absent classes
* Smart Warnings (**SAFE/WARNING/CRITICAL**)
---

### CGPA Calculator
* Multi-subject input with credits
* Instant CGPA + breakdown
---

### Placement Analyzer
* Readiness score out of 100
* Considers CGPA, skills, projects, internships
* AI-generated career suggestions
---

### Sleepiness & Stress Module
* Calculates fatigue score
* Considers sleep, screen time, caffeine, mood
* Provides actionable advice

---

### AI Study Plan Generator
* Uses Groq AI (LLM)
* Generates 7-day structured plan
* Personalized based on all modules

---

## Tech Stack
### Frontend
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
- ![Font Awesome](https://img.shields.io/badge/Font_Awesome-%23538DD7.svg?style=for-the-badge&logo=fontawesome&logoColor=white)
- Custom dark UI (Glassmorphism)

### Backend
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* Groq AI(LLM)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
---
## Installation and Setup
### 1. Clone the repo
```
git clone https://github.com/raghavd07/the_null_pointers-studentos.git
```
### 2. Setup Backend
```
cd backend
npm install
npm run dev
```
create ```.env```
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/studentOS
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secret
```
##### Please create a Groq api key by clicking [here](https://console.groq.com/keys)
### 3. Setup Frontend
```
cd frontend
npm install
npm run dev
```
---
## API Endpoints
| Method  | Route |   Description |
| ------------- |:-------------:|:-------------:|
| POST      | ```auth/login```     | User Login
| POST     | ```chat```     | AI Analysis
| POST     | ```generate-plan```     | Study plan generation
---
## Data Flow
1. User inputs Data
2. Data stored in **localstorage**
3. Sent to backend when needed
4. Backend processes + Analysis
5. Results Displayed in UI
---
## Use case
StudentOS helps students:
* Avoid attendance shortages
* Improve academic planning
* Reduce burnout
* Prepare for better placements
---

## Future Improvements

- Dashboard analytics
- Mobile responsiveness
- Calendar integration
- Progress tracking overtime
---

# Authors
- Raghav Damera
- Eshwanth Bharatwaj Pendyala
- Jayakrishna Rayarakula
- Sai Charith Reddy Chekuri
# **If you like this project, consider giving it a star!⭐**
