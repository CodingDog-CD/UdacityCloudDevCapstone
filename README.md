# UdacityCloudDevCapstone
Project planning tool

# Features
Create work order, where each work order has its own properties: </br>
* `name`: name of the work order </br>
* `description`: description of the work order </br>
* `dueDate`: the deadline of the work order </br>
* `createdAt`: when is the work order created </br>
* `done`: has the work order been finished </br>
* `project`: which project does this work order belong to </br>
* `assignedTo`: current owner of the work order </br>
* `woId`: the unique id number of the work order </br>

Update work order. The following properties can be updated: </br>
* `name`: name can be changed. </br>
* `description`: description can be modified. </br>
* `dueDate`: the deadline can be adjusted. </br>
* `done`: this check box can be selected to mark it has been finished. </br>
* `assignedTo`: the work order can be assigned to another person. To do this, you have to give the user ID of the corresponding account. The user ID corresponds to the value of `sub` property of JWT token payload. This Id will show up (in browser) when a user logs in.</br>

Delete work order. </br>
* each user can only delete the work order assigned to herself/himself.

Load work order. </br>
* each user can only read and modify work orders which are assigned to her/him.

# Install and Deploy
* The backend is achieved using serverless. To install the dependencies, go to /ProjectManagementTool and carry out the following command:
```
npm installproject
```

* To deploy the backend using serverless framework, go to /ProjectManagementTool and carry out the following command:
```
sls deploy --verbose
```
***For testing this app, you don't have to deploy it again as I already deployed it using my AWS account.***
If you want to deploy it in your AWS account, please setup the serverless in your environment at first. (e.g. install serverless framework, setup AWS role)
After you deployed it using your AWS account, please change the `apiEndpoint` in /client/src/config.ts correspondingly

* The frontend: go to /client and install dependencies using the following command:
```
npm install
```

# Run
To use this web app, please go to /client and give the following command after you carried out the install and deploythe steps described above:
```
npm run start
```
Then the frontend will be called in your working environment.

# Test
I provided a Postman test collection. Before you test it, please make sure the correctness of the configuration variables. 
* `apiid`: if you didn't deploy it by yourself in your AWS account, you don't have to change it
* `authToken`: please run the frontend and get your corresponding authToken. The authToken shall be configured correctly in the postman test collection.
