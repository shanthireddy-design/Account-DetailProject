let acctData = [
	{ acctNum: 'AAA - 1234', user: 'Alice' },
	{ acctNum: 'AAA - 5231', user: 'Bob' },
	{ acctNum: 'AAA - 9921', user: 'Alice' },
	{ acctNum: 'AAA - 8191', user: 'Alice' }
];

let balance = {
	'AAA - 1234': 4593.22,
	'AAA - 9921': 0,
	'AAA - 5231': 232142.5,
	'AAA - 8191': 4344
};

function getAccounts(accDetails, balances, user = '', sortBy = 'acctNum', order = 'asc') {
	let result = [];
	let filteredAcc = accDetails;

	if(user) {
		filteredAcc = accDetails.filter((data, index) => {
			return data.user === user;
		});
	}

	let sortedAcc = filteredAcc.map((data, index) => {
        return Object.assign(data, { balance: balances[data.acctNum]});
    });

	sortedAcc.sort((a, b) => {
		if (order === 'desc') {
			if (sortBy === 'balance') {
				return a.balance < b.balance ? 1 : -1;
			}
			return a.acctNum < b.acctNum ? 1 : -1;
		}
		if (sortBy === 'balance') {
			return a.balance > b.balance ? 1 : -1;
		}
		return a.acctNum > b.acctNum ? 1 : -1;
	});


	sortedAcc.map((data, index) => result.push(data.acctNum));

	console.log('Final Result = ', result);
}


Outputs:-
1. Filtered by Bob-
getAccounts(acctData, balance, 'Bob');
Final Result =  ["AAA - 5231"]

2. Filtered by Charlie-
getAccounts(acctData, balance, 'Charlie');
Final Result =  []

3. sorted by acctNum-
getAccounts(acctData, balance);
Final Result =  (4) ["AAA - 1234", "AAA - 5231", "AAA - 8191", "AAA - 9921"]

4. Filtered by Alice, sorted by balance in ascending order
getAccounts(acctData, balance, 'Alice', 'balance');
Final Result =  (3) ["AAA - 9921", "AAA - 8191", "AAA - 1234"]

5. Filtered by Alice, sorted by balance in descending order
getAccounts(acctData, balance, 'Alice', 'balance', 'desc');
Final Result =  (3) ["AAA - 1234", "AAA - 8191", "AAA - 9921"]
