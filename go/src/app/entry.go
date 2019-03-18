package main

import (
	"log"
	"net/http"
	"encoding/json"
)

type Response struct {
	isSuccess bool
	data string `json:"-"`
	message string
}

type Request struct {
	isSuccess bool
	data string `json:"-"`
	message string
}

func main() {
	log.Println("testing the wonders of go on a chromebook")
	http.HandleFunc("/", HandleHelloWorld)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func HandleHelloWorld(writer http.ResponseWriter, req *http.Request) {
	var requestBody Response
	decoder := json.NewDecoder(req.Body)
	_ = decoder.Decode(&requestBody)
	//if err != nil {
	//	panic(err)
	//}
	log.Println(requestBody)
}
