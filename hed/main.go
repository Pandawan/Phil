package main

import (
	"fmt"
	// "os"
	"github.com/hashgraph/hedera-sdk-go"
)

func main() {
	accountID := hedera.AccountID{Account: 1002}

	client, err := hedera.Dial("testnet.hedera.com:51002")
	if err != nil {
		panic(err)
	}

	//
	// client.SetNode(hedera.AccountID{Account: 3})
	// client.SetOperator(accountID, func() hedera.SecretKey {
	// 	operatorSecret, err := hedera.SecretKeyFromString(os.Getenv("OPERATOR_SECRET"))
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	return operatorSecret
	// })
	//
	defer client.Close()

	balance, err := client.Account(accountID).Balance().Get()
	// if err != nil {
	// 	fmt.Println(err)
	// }

	fmt.Println(balance)
	
	// operatorAccountID := hedera.AccountID{Account: 2}
	// response, err := client.CreateAccount().
	// 	Key(public).
	// 	InitialBalance(0).
	// 	Operator(operatorAccountID).
	// 	Node(nodeAccountID).
	// 	Memo("[test] hedera-sdk-go v2").
	// 	Sign(operatorSecret).
	// 	Execute()

	// if err != nil {
	// 	panic(err)
	// }

	// transactionID := response.ID
	// fmt.Printf("created account; transaction = %v\n", transactionID)

	// //
	// // Get receipt to prove we created it ok
	// //

	// fmt.Printf("wait for 2s...\n")
	// time.Sleep(2 * time.Second)

	// receipt, err := client.Transaction(*transactionID).Receipt().Get()
	// if err != nil {
	// 	panic(err)
	// }

	// if receipt.Status != hedera.StatusSuccess {
	// 	panic(fmt.Errorf("transaction has a non-successful status: %v", receipt.Status.String()))
	// }

	// fmt.Printf("account = %v\n", *receipt.AccountID)
}