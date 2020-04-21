# IRSA CMS
### Italian Renaissance Swordsmanship Academy Client Management System

This document serves as documentation for the IRSA CMS. Multiple deployments for this application exist on heroku's servers, but full instructions on how to run the project locally will be provided.

### Pre-requisites

To run this project, you must own a device that can run a modern computer operating system and you must have admin privileges on that device. 

### Dependent Libraries

If using Windows, you must enable the Windows Subsystem for Linux and install a suitable Linux shell environment. In a unix environment, all you will need is a modern package manager or the ability to compile things from source.

The biggest dependency for the project is having a node environment set up. Go to https://nodejs.org/en/ to find installation instructions for node for your system.

After installing node, you need the node package manager `npm`. Npm should be available in all major package managers via their install command.

### Download Instructions

Either use git clone with this repository url, or use the download zip button at the top right of github. 

### Build Instructions

To build the application, use the change directory command `cd` to get into the top level directory. Run `npm install` to install dependencies for the expressjs backend.

After that finishes, run `cd client` to get into the react application. First run `npm install` to get all dependencies. Then run `npm run build` to compile the react application.

### Run Instructions

Change directory to the top level directory first. Next, run `npm start`. The server is now running on your device, and should be reachable at http://localhost:5000.

### Troubleshooting

One issue you may run into running the app locally is a firewall issue. Make sure to allow applications on your device to receive inbound connections from the local device. This allows you to run the application and use it in your browser.

Another issue commonly faced is `npm install` erroring out mysteriously. To remedy this, make sure your version of npm is as new as possible. Also remove the node_modules folder in both the top level directory and the client folder then try reinstalling. 

If any questions arise that are not answered here, please email us at juniordesign.allez@gmail.com.