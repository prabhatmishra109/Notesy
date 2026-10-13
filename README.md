# Notesy – AI-Powered Notes Processing and Sharing Platform

Notesy is a smart, AI-powered web application designed to simplify note management, summarization, and sharing. It helps students and professionals save time by converting lengthy notes into concise summaries, extracting important keywords, highlighting key points, and providing audio playback.

## 🚀 Features

- **User Authentication:** Secure user registration and login.
- **Profile Management:** View and update personal information.
- **AI-Powered Summarization:** Generate concise summaries from lengthy notes using generative AI.
- **Keyword Extraction:** Identify important keywords for quick revision.
- **Key Point Highlighting:** Focus on important information from notes.
- **Text-to-Speech:** Listen to summaries and key content.
- **Notes Sharing:** Share summarized notes with other registered users.
- **Download Notes:** Download summaries in supported formats, including text and PDF.
- **Feedback System:** Submit feedback and suggestions.
- **Contact & Support:** Communicate with the administrator.
- **Admin Dashboard:** Manage users, review feedback, and monitor platform activities.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Bootstrap / UI styling libraries

### Backend
- Java 21
- Spring Boot
- Spring MVC
- Spring Data JPA
- RESTful APIs

### Database
- MySQL

### Tools
- Visual Studio Code
- Spring Tool Suite (STS)
- Postman
- Git & GitHub
- Node.js and npm

## 🏗️ System Architecture

Notesy follows a client-server architecture with three main components:

1. **Frontend:** React.js provides an interactive and responsive user interface.
2. **Backend:** Spring Boot handles business logic, authentication, API requests, and AI integration.
3. **Database:** MySQL stores user information, notes, summaries, and related application data.

The frontend communicates with the backend through REST APIs, while the backend manages database operations and AI summarization requests.

## ⚙️ Installation and Setup

### Prerequisites
- Java JDK 21
- Node.js and npm
- MySQL Server
- Visual Studio Code or Spring Tool Suite

### 1. Clone the Repository

```bash
git clone https://github.com/prabhatmishra109/Notesy.git
cd Notesy
```

### 2. Configure the Database

- Start your MySQL server.
- Create the database required by the backend.
- Configure your database URL, username, and password in the backend's `application.properties` file.
- Configure any required AI API credentials using environment variables or local configuration.

### 3. Run the Backend

Open the Spring Boot backend project in STS and run the main application class.

Alternatively, if the backend contains a Maven wrapper, run:

```bash
./mvnw spring-boot:run
```

On Windows Command Prompt, use:

```bash
mvnw.cmd spring-boot:run
```

### 4. Run the Frontend

Open the frontend project directory in the terminal and execute:

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal to access Notesy.

**Note:** Adjust the commands and configuration according to the actual frontend and backend folder structure in your repository.

## 🎯 Project Objectives

- Simplify the process of understanding lengthy notes.
- Improve learning efficiency through AI-generated summaries.
- Support visual and audio-based learning.
- Enable convenient sharing and downloading of notes.
- Demonstrate the practical use of AI in web application development.

## 🔮 Future Enhancements

- Multilingual summarization and speech support.
- OCR for extracting text from images and scanned documents.
- Voice note transcription and summarization.
- Customizable summary length and format.
- Enhanced sharing permissions and offline audio downloads.

## 👨‍💻 Developer

**Prabhat Mishra**

- GitHub: [@prabhatmishra109](https://github.com/prabhatmishra109)
- LinkedIn: [Prabhat Mishra](https://linkedin.com/in/prabhat-mishra-5286ba366/)

## 📄 License

This project is developed for educational and portfolio purposes. Add a license file if you intend to distribute the project under a specific open-source license.
