package postgres

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Host     string
	Database string
	User     string
	Password string
	Port     string
}

func NewConfig() Config {
	return Config{
		Host:     os.Getenv(("HOST")),
		Database: os.Getenv(("POSTGRES_DATABASE")),
		User:     os.Getenv(("POSTGRES_USER")),
		Password: os.Getenv(("POSTGRES_PASSWORD")),
		Port:     os.Getenv(("POSTGRES_PORT")),
	}
}

func (c Config) GetConnectionString() (string, error) {
	port, err := strconv.Atoi(c.Port)
	if err != nil {
		return "", fmt.Errorf("invalid port: %v", err)
	}
	connectionString := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		c.Host, port, c.User, c.Password, c.Database)
	return connectionString, nil
}
