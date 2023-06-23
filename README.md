# WebsiteStatus

## Frontend

### Installation

1. Make sure you have Node.js installed on your machine.
2. Clone the frontend repository using the following command:

```bash
git clone https://github.com/Shult/websiteStatus-Frontend.git
```

3. Navigate to the frontend directory:
```bash
cd websiteStatus-Frontend
```

4. Install the dependencies:
```bash
npm install
```
### Configuration

1. Open the src/environments/environment.ts file.
2. Set the apiUrl property to http://localhost:3000 to match your backend server URL.

### Usage

To start the frontend application, run the following command:
```bash
ng serve
```

The application will be accessible at http://localhost:4200 in your browser.

### Deployment
To deploy the frontend application, run the following command:
```bash
ng build --prod
```

This will generate a production-ready version of the application in the dist directory. You can then host these files on a web server of your choice.
