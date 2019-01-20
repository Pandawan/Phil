package main

import (
	"fmt"
	"net/http"
	"log"
	"os"
	"time"
	"math/rand"
	"strings"

	"github.com/hashgraph/hedera-sdk-go"
	"github.com/julienschmidt/httprouter"
)

var secret = "302e020100300506032b657004220420d07c25742a1ea56a470747a445c84a917e1c8d8d18e0cbcb806ef5d58e3046e2"

func main() {
	router := httprouter.New()
	router.GET("/donate", handler)

	port := os.Getenv("PORT")

	if port == "" {
		port = "6969"
	}

	log.Fatal(http.ListenAndServe(":" + port, router))
}

func handler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	charity, id := charitySelector()
	
	fmt.Println(charity, id)
	fmt.Fprintln(w, charity)
	
	url := "https://dweet.io/dweet/for/quagmire?" + strings.Replace(charity, " ", "_", -1)
	fmt.Println(url)
	http.Get(url)

	// balance()
	transfer()
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

func balance() {
	accountID := hedera.AccountID{Account: 1002}
	client, err := hedera.Dial("testnet.hedera.com:51002")
	if err != nil {
		panic(err)
	}
	
	client.SetNode(hedera.AccountID{Account: 3})
	client.SetOperator(accountID, func() hedera.SecretKey {
		operatorSecret, err := hedera.SecretKeyFromString(secret)
		if err != nil {
			panic(err)
		}
		return operatorSecret
	})
	
	defer client.Close()

	balance, err := client.Account(accountID).Balance().Get()
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(balance)
}

func transfer() {
	operatorAccountID := hedera.AccountID{Account: 1002}
	operatorSecret, err := hedera.SecretKeyFromString(secret)
	if err != nil {
		panic(err)
	}

	// Read and decode target account
	targetAccountID, err := hedera.AccountIDFromString("0.0.1002")
	if err != nil {
		panic(err)
	}

	//
	// Connect to Hedera
	//

	client, err := hedera.Dial("testnet.hedera.com:51002")
	if err != nil {
		panic(err)
	}

	client.SetNode(hedera.AccountID{Account: 3})
	client.SetOperator(operatorAccountID, func() hedera.SecretKey {
		return operatorSecret
	})

	defer client.Close()

	//
	// Get balance for target account
	//

	balance, err := client.Account(targetAccountID).Balance().Get()
	if err != nil {
		panic(err)
	}

	fmt.Printf("target account balance = %v\n", balance)

	//
	// Transfer 1 hbar to target
	//

	nodeAccountID := hedera.AccountID{Account: 3}
	response, err := client.TransferCrypto().
		// Move 1 out of operator account
		Transfer(operatorAccountID, -1).
		// And place in our new account
		Transfer(targetAccountID, 1).
		Operator(operatorAccountID).
		Node(nodeAccountID).
		Memo("[test] hedera-sdk-go v2").
		Sign(operatorSecret). // Sign it once as operator
		Sign(operatorSecret). // And again as sender
		Execute()

	if err != nil {
		panic(err)
	}

	transactionID := response.ID
	fmt.Printf("transferred; transaction = %v\n", transactionID)

	//
	// Get receipt to prove we sent ok
	//

	fmt.Printf("wait for 2s...\n")
	time.Sleep(2 * time.Second)

	receipt, err := client.Transaction(*transactionID).Receipt().Get()
	if err != nil {
		panic(err)
	}

	if receipt.Status != hedera.StatusSuccess {
		panic(fmt.Errorf("transaction has a non-successful status: %v", receipt.Status.String()))
	}

	fmt.Printf("wait for 2s...\n")
	time.Sleep(2 * time.Second)

	//
	// Get balance for target account (again)
	//

	balance, err = client.Account(targetAccountID).Balance().Get()
	if err != nil {
		panic(err)
	}

	fmt.Printf("new target account balance = %v\n", balance)
}