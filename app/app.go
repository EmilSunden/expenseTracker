package app

import (
	"expenses/config"
	"expenses/routes"
	"net/http"

	"gorm.io/gorm"
)

func Run(db *gorm.DB) error {
	config.LoadEnv()
	config := config.NewConfig()

	address := config.HTTPAddress()

	handlers := routes.Route(db)
	return http.ListenAndServe(address, handlers)
}
