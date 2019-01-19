package main

import (
	"fmt"
	"net/http"
	"log"
	"math/rand"
	// "github.com/hashgraph/hedera-sdk-go"
	"github.com/julienschmidt/httprouter"
)

func main() {
	router := httprouter.New()
	router.GET("/donate", handler)

	log.Fatal(http.ListenAndServe(":6969", router))
}

func handler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	charity, id := charitySelector()
	fmt.Println(charity, id)

	// accountID := hedera.AccountID{Account: 1002}
	// client, err := hedera.Dial("testnet.hedera.com:51002")
	// if err != nil {
	// 	panic(err)
	// }
	
	// client.SetNode(hedera.AccountID{Account: 3})
	// client.SetOperator(accountID, func() hedera.SecretKey {
	// 	operatorSecret, err := hedera.SecretKeyFromString("302e020100300506032b657004220420d07c25742a1ea56a470747a445c84a917e1c8d8d18e0cbcb806ef5d58e3046e2")
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	return operatorSecret
	// })
	
	// defer client.Close()

	// balance, err := client.Account(accountID).Balance().Get()
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// fmt.Println(balance)
	//----------
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

	fmt.Fprintln(w, charity)
}

func charitySelector() (string, int) {
	var hash map[string]int
	hash = make(map[string]int)

	hash["Defenders of Wildlife"] = 1
	hash["Sierra Club"]= 2
	hash["Global Footprint Network"] = 3
	hash["Marine Conservation Institute"] = 4
	hash["Earth Day Network"] = 5

	key, value := "", 0
	i := rand.Intn(5)
	for key, value = range hash {
		i--
		if (i == 0) { break }
	}

	return key, value
}