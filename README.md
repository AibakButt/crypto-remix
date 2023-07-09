# Crypto Tracker App

Welcome to the Crypto Tracker App! This application is a simple cryptocurrency tracker built using the Remix framework, Prisma ORM, Tailwind CSS, DaisyUI, and the CoinCap API.

## Getting Started

### Prerequisites

- Node.js version 14.0.0 or higher.

### Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory in the terminal.

3. Run the following command to install the required dependencies:

   ```shell
   npm install
   ```

4. To start the application, run the following command

   ```shell
   npm run dev
   ```

5. Visit **localhost:3000**, app should be live and running in the browser.




## Application Architechture
This app has these main folders:
- /prisma
- /styles
- /app/components
- /app/routes
- /app/routes/coins
- /app/utils
Let's discuss them one by one.

### /prisma:
It contains sqlite database and schema.prisma file. The schema file describe the application schema like in our case, we have one entity/model *coin* and the when we run the migration, our model is reflected into the database which is stored in *dev.db* file.

### /styles:
This folder contains the global styles which will complie into the /app/syles.css which we run our server.

### /app/components:
This folder contains reuseble components that would be use in different routes. These are React functional components *<CoinModal/>*, *<Toast/>*, *<TopNav/>*.
The CoinModal is used to display the details of the coin and submit the form. We will see how the POST request is sent to the server later on.
The Toast component is used to display the toast messages through out the application.
And the TopNav is a component that is displayed on the top of each page.

### /app/routes:
It contains the *_index.tsx* file which acts as landing page of this app. As we have only one route /coins in our case, so, we have only one button which redirects us to the coins page in which coins data is fetched from the api and displayed in the table.

### /app/routes/coins:
It contains *index.tsx* file which is a container of the *coin page* which is responsible to fetch the coins data from the remix server. we did this operation using *useLoader* function. and there is another folder /api which contains all the apis that would be needed for *coins*, 

In our case we have a *get.tsx* file to fetch the data, and in this file, we use *fetch* function to fetch the data from the third party and then return that data to the frontend. 

And we have *create.tsx* file, which is reponsible to save the data into the database using *action* function, We submit the form from the frontend, and in remix action function we get that data, validate it through custom validation and then save it into the database using prisma.


### /app/utils
In the last, we have utils folder to save the constants and prisma instance. 
We can export the prisma instance anywhere in the app through this *db.server.ts* file.