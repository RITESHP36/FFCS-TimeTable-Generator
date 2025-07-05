# 🎓 Automated University Timetable Scheduler

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

This web-based scheduling optimizer solves the complex combinatorial problem of generating clash-free university timetables from hundreds of conflicting course and faculty time slots, specifically tailored for VIT's Fully Flexible Credit System (FFCS).

By implementing a powerful permutation algorithm in JavaScript, this tool drastically reduces scheduling time for students. It has successfully served over **2,200 unique users** in the first 2 days, eliminating hours of stressful manual planning and spreadsheet juggling.

### ✨ **[Live Application](https://ffcs-helper.vercel.app/)**

---

## 🖼️ Project Showcase

<details>
<summary><b>Click to view screenshots of the user workflow</b></summary>
<br>

**1. Intuitive Input Interface:** Users easily add subjects, faculty, and their corresponding time slots. Faculty preferences can be ranked using simple drag-and-drop style arrows.
<br>
<img src="https://i.imgur.com/vH0iP1T.png" alt="Input Interface" width="800">

<br>

**2. Instant Generation:** The core algorithm processes all combinations and instantly displays the total number of clash-free timetables found.
<br>
<img src="https://i.imgur.com/kK7q3H2.png" alt="Generation Results" width="800">

<br>

**3. Review Multiple Options:** All generated timetables are neatly displayed, allowing students to compare and find the perfect schedule.
<br>
<img src="https://i.imgur.com/R3Qk2Qp.png" alt="Timetable Results" width="800">

<br>

**4. Finalize & Share:** Select the preferred timetable for a detailed view, ready to be printed or shared via a unique link.
<br>
<img src="https://i.imgur.com/6Xy10x3.png" alt="Final Timetable View" width="800">

</details>

---

## 🎯 The Problem & The Solution

### The Challenge
University course registration, especially under a Fully Flexible Credit System (FFCS), is a high-stress period for students. They must manually sift through PDFs and websites to find suitable course slots and faculty, often using spreadsheets to perform trial-and-error to avoid clashes. This process is time-consuming, error-prone, and leads to immense frustration due to the sheer number of possible combinations (a combinatorial explosion).

### The Solution
The **Automated University Timetable Scheduler** transforms this process. It provides a clean, centralized interface where students input their desired courses and faculty preferences. The application's core logic then:
1.  **Parses** all possible faculty-slot combinations for each course.
2.  **Executes a high-speed permutation algorithm** to generate every possible complete timetable.
3.  **Validates** each timetable in real-time to detect and eliminate any with time clashes.
4.  **Presents** all viable, clash-free options to the user in a clear, visual format.

This turns hours of manual work into a few seconds of computation, empowering students to make informed decisions quickly and confidently.

---

## ⭐ Key Features

*   **Dynamic Course & Faculty Input:** Add any number of subjects and specify the available faculty and their unique time slots for each.
*   **Faculty Preference Ranking:** Use intuitive up/down arrows to prioritize preferred faculty, influencing the order of the final results.
*   **High-Speed Clash Detection:** A robust permutation algorithm at its core ensures only 100% clash-free timetables are generated.
*   **Multiple Optimal Solutions:** The tool doesn't just find one schedule; it finds *all* possible schedules, giving users the power of choice.
*   **Interactive Timetable Viewer:** Browse through all generated timetables in a clean, comparable grid format.
*   **Print & Share Functionality:** Easily print your final timetable or copy a link to save it for later.

---

## 🛠️ Tech Stack

This project was built using a modern, lightweight, and efficient technology stack:

| Category        | Technology / Library                                                                                                                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Frontend**   | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)                                                                                                                                                              |
| **Build Tool**      | ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                      |
| **Styling**         | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                                                                                |
| **Routing**         | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)                                                                                                                                                     |
| **UI & UX**       | ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react-icons&logoColor=white) ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF3333?style=for-the-badge) |
| **Analytics**       | ![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                     |
| **Contact Form**    | `EmailJS` for client-side email sending.                                                                                                                                                                                                                                   |

---

## 🚀 Getting Started

To run a local copy of this project, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/ffcs-helper.git
    cd ffcs-helper
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
