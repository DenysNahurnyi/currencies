# Currencies server

In case of nuclear apocalypse, when all world stock markets fall you will have access to all currencies information using next API`s
(I`he deloyed them on Heroku cloud service with BASE_URL = https://currencies-serv.herokuapp.com):
- Get authToken to interact with all api's: [GET] BASE_URL/api/token
- Get list of all currencies and their descriptions: [GET] BASE_URL/api
- Get list of all currencies and rates: [GET] BASE_URL/api/rates
- Get full description of one defined currency: [GET] BASE_URL/api/rates/:abbr
- Update currencies info in database: [PUT] BASE_URL/api/update

Feel free to download it and interact localy :)