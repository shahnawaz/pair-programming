# Pair Programming

### Solution 1
- Brute-Force approach
- Branch: `brute-force` (file link - [click here](https://github.com/shahnawaz/pair-programming/blob/brute-force/test.ts))
- Time Complexities:
  - syncContacts = `O(1)`
  - prospectiveUsers = `O(N * (N + M + .... Z))` (heavy READ Operation)

### Solution 2
- Optimal Approach for efficient READ Operation, using structured Data
- Branch: `main` (link)
- Time Complexities:
    - syncContacts = `O(M + N)` (slightly compromised here)
    - prospectiveUsers = `O(N)` (Efficient approach, helps faster Mobile usability)


## Solution 2 Explanation

### API Endpoints ([Controllers](https://github.com/shahnawaz/pair-programming/tree/main/src/controllers))
- Endpoints are exposed from controllers
- Used by test app (inside [index.ts](https://github.com/shahnawaz/pair-programming/blob/main/src/index.ts)) to run test cases
- User Controller
- Directory Controller

### Business Logic ([Services](https://github.com/shahnawaz/pair-programming/tree/main/src/services))
- All business logic is segregated inside services
- User Service
  - isZiinaUser
- Directory
  - syncContact
    - Slight compromise on WRITE to get efficient readability
  - prospectiveUsers
    - Improved Data READ

### Data Store [Facade](https://github.com/shahnawaz/pair-programming/blob/main/src/services/data-store.ts)
- Acting as a data store manager
- It can use mock data (from here)

Data Store

<img width="831" alt="image" src="https://github.com/shahnawaz/pair-programming/assets/6070111/81fd5849-62db-4537-a117-5a4489cd6728">

### [Test Cases](https://github.com/shahnawaz/pair-programming/blob/main/src/index.ts)
- Few dummy test cases are added to verify API and Business functionality.


### How to run
- Clone repo 
  - SSH: `git clone git@github.com:shahnawaz/pair-programming.git`
  - HTTPS: `git clone https://github.com/shahnawaz/pair-programming.git`
- Make sure you have node and npm install in your machine
- Run the following command to install packages
  - `npm install`
- Run the following command to run test cases
  - `npm test`

Test Output

<img width="611" alt="image" src="https://github.com/shahnawaz/pair-programming/assets/6070111/69756645-9da9-47df-9789-45cffa09bbbe">