# Study Buddy
## Project Purpose:
This project is a small prototype for a web app, designed by me to the specifications of the business students in Entrepreneurship 3330 Design Thinking for Startups course at the D'Amore-McKim School of Business at Northeastern University. The Study Buddy is designed to a be a combined Hardware and Software solution, where young students struggling to learn time management could have the help and emotional support of the Buddy, while also learning discipline, and having a bit of gamification for their work. This project is strictly the prototype for the web application that would complement the Buddy, which would also run its own software. The purpose of this prototype was to give some insight into how the web application would function, both for the young student and their parent.
## Project Structure:
### Frontend:
The Frontend of this project is designed with React. The student user is able to log in to the application, create tasks, work on them, mark them as complete. The parent user is able to moinitor their students progress in real time, and has access to more diagnostic information into their student work habits. There is basic user authentication on the login-screen using cookies, and based on whether the user is a parent or not, they will be directed to the correct screen and able to see their information.
### Backend:
The backend is designed with Express and NodeJs, which communicate with a MySQL database, querying and inserting student information and updates. The backend is quite light at the moment, but is in a great spot to expand and flesh out. The user demonstration we were aiming for was much more look-and-feel focused, but there are several functionalities implemented.
### Planned Updates:
I would like to expand the capabilities of each user more. The number of things each user can do on their page is quite limited, especially with the parents overview. I plan to give the parent page more functionality and expand it so that they can imput tasks for their student, and schedule their work times. Especially with younger students, I think this would be very necessary. I would also like to implement more of the gamification into the students side. Even though most of this is supposed to be in the hardware buddy I feel the application is incomplete without showing that off.

## How to use this Application:
This application is fully supported though docker. Simply install docker, download the respository, and in the StudyBuddy folder run "docker compose up --build" and the application will launch. Go to localhost:3000 to log in.
### Student login:
Username: jdoe@gmail.com
Password: 54321
### Parent login:
Username sdoe@gmail.com
Password: 12345
