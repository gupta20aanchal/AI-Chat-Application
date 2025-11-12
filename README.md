# 🤖 AI Chat Application

A simple, responsive AI chat interface built using **React**, **Vite**, and the **Gemini API**.  
This app allows users to chat with an AI assistant in real time, with a clean and minimal UI.

---

## 🚀 Features

- 🔐 **Secure Environment Variables** (API key stored safely in `.env`)
- 💬 **Interactive Chat UI**
- ⚡ Built with **React + Vite** for fast development
- 🎨 **Tailwind CSS** for modern, responsive design
- ☁️ **Deployed on Vercel**

---

## 🧩 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **API:** Google Gemini (or compatible LLM API)
- **Deployment:** Vercel

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/gupta20aanchal/AI-Chat-Application.git
cd AI-Chat-Application
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create a .env File
Create a new file named .env in the project root and add:
```bash

VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_API_URL=https://your_api_endpoint_here
```
⚠️ Note: The .env file is ignored by Git and should not be uploaded to GitHub.

### 4. Run the App Locally
```bash

npm run dev
Visit http://localhost:5173 in your browser.
```
### 🌍 Deployment
This project is deployed using Vercel.
You can access the live version here:
👉 AI Chat Application

### 🧠 How It Works
The user sends a message in the chat.

The message history (conversation) is formatted and sent to the LLM API.

The AI response is displayed in the chat window.

All API communication is handled securely using environment variables.

### 📂 Project Structure
src/
  api/
    llm.js
  components/
    App.jsx
    Sidebar.jsx
    ChatWindow.jsx
    MessageList.jsx
    MessageItem.jsx
    MessageInput.jsx

  context/
    ChatContext.jsx
  utils/
    storage.js
    exportJson.js
  styles
  main.jsx
  index.css

### 👩‍💻 Author
Aanchal Gupta
📫 GitHub Profile

### 📝 License
This project is for learning and demonstration purposes.
Feel free to fork and build upon it.

