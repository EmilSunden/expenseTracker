package postgres

import (
	"expenses/models"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Connect to PostgreSQL database
func Connect() (*gorm.DB, error) {
	config := NewConfig()
	connectionString, err := config.GetConnectionString()
	if err != nil {
		return nil, fmt.Errorf("failed to get connection string: %w", err)
	}
	dialector := postgres.Open(connectionString)
	db, err := gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	// Run migrations
	err = Migrate(db, &models.Expense{}, &models.Category{})
	if err != nil {
		return nil, fmt.Errorf("failed to run migrations: %w", err)
	}
	return db, nil
}
