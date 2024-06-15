# Ecommerce Project
Welcome to the Ecommerce project repository! This project integrates server-side development using Express.js, front-end development with Node.js, and blockchain technology for decentralized transactions. Below are instructions to get started with setting up and running the project locally.

Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v14 or higher)
npm (Node Package Manager)

# Installation

Clone the repository:
```
git clone https://github.com/Bruno-Ferr/AmazRecreated.git
cd AmazRecreated
```
## Install dependencies:

The project is composed by 3 folders, one containing all the front-end using next.js, other is the server with node, express.js and mongodb and the last one is the AMZ folder, which have all the necessary hardhat code to run your blockchain locally. (If you prefer, you can use ignore this and use the testnet).

p.s: The contract has not been deployed to a testnet yet!

Don't forget to create an .env file for the server and frontend, it will be needed to call the contract, server and db functions.

### Install dependencies for frontend
```
cd frontend
npm install
```
To run your frontend, run the command:
```
npm run dev
```

### Install dependencies for server
```
cd server
npm install
```
To run the server, run this command:
```
npm run dev
```

### Install dependencies for hardhat
```
cd AMZ
npm install
```

Initialize the local blockchain:
```
npx hardhat node
```
To deploy your contract, run:
```
npm run dev
```

Usage
Access the frontend application at http://localhost:3000.
The server will be running on http://localhost:4000.
Contributing
Thank you for considering contributing to this project. To contribute, follow these steps:

Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.

License
This project is licensed under the MIT License.