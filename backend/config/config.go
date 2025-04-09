package config

import (
	"fmt"
	"os"
)

type Config struct {
	Port string
}

func NewConfig() Config {
	// if port is not set, default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return Config{
		Port: port,
	}
}

func (c Config) HTTPAddress() string {
	return fmt.Sprintf(":%s", c.Port)
}
