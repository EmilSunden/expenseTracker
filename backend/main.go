package main

import (
	"expenses/app"
	"expenses/config"
	"expenses/postgres"
	"log"
)

func main() {
	config.LoadEnv()
	db, err := postgres.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	app.Run(db)
}
