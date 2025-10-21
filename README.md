# SBA-319

Github Repository Link: https://github.com/AgnesRC/SBA-319.git

In this project, I used Node.js and MongoDB to create a databse that manages Flights, Travelers, and Airports data.

Routes:  
Flights:  
GET: /flights => displays all flights  
DELETE: /flights/:id => deletes a flight by id given  
PUT: /flights/:id' => replaces a flight by id given  
POST: /flights/create => creates a new flight  
POST: /flights/test-invalid-flight => tests flight entry validation  
GET: flights/seed => resets flight data 

Airport 
GET: /airports => displays all airports  
DELETE: /airports/:id => deletes an airport by id given  
PUT: /airports/:id' => replaces an airport by id given  
POST: /airports/create => creates a new airport  
GET: airports/seed => resets airport data  

Travelers  
GET: /travelers => displays all travelers  
DELETE: /travelers/:id => deletes a traveler by id given  
PUT: /travelers/:id' => replaces a traveler by id given  
POST: /travelers/create => creates a new traveler  
GET: /travelers/seed => resets travelers data  



Routes were tested using Postman.
