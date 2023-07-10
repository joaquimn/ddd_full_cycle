# ddd_full_cycle
install node js
pull the repo and run the following 

npm i typescript --save-dev
npx tsc --init
npm i tslint --save-dev
npx tslint --init     

Installing testing tools

// some will throw a warning because the JSON was already been created
// in this case just ignore and everything should be good
// I have uploaded the seeting to help

npm i -D jest @types/jest ts-node --save-dev
npm i -D @swc/jest @swc/cli @swc/core
npm install --save-dev ts-jest
npm install --save-dev @jest/globals
npm i uuid @types/uuid

// installing db to work in mem to speed up the tests
 npm install sequelize reflect-metadata sequelize-typescript
 npm install sqlite3