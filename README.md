# Atlas Story App

Atlas Story App provides story writers a platform to store and share their stories, characters, substories, and world elements. The web application supports stories that are in any stage of development, ranging from sparse outlines to extremely intricate worlds.

Story owners can add other users as collaborators to their story, so that multiple users can edit a single story. Stories can be set to private, with only the owner and specified collaborators and viewers being able to access the story.

Atlas Story App is currently live on the following domain: https://www.atlas-story.app/

## Technical Details

Atlas Story App uses a combination of technologies, commonly refered to as the MERN stack. The codebase is written in JavaScript, with HTML and CSS also being used in the Front-End.

### Front-End Web Application

React is the primary library used in the front-end web application.

A notable package, "react-icons", allows FontAwesome icons to be displayed throughout the user interface.

### Back-End Server and Database

The Node.js server utilizes Express.js for managing HTTP Requests and Responses as well as URL routing for mapping requests to functions.

The data is stored in a MongoDB database whose NoSQL document-based data structure allows greater versitility in the continually changing design, implementation, and maintenance of the data structures.

### Hosting

The Platform as a Service, Heroku, is used to deploy both the front-end web application and the back-end server.
