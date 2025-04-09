package postgres

import (
	"fmt"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB, models ...interface{}) error {
	// Run migrations
	err := db.AutoMigrate(models...)
	if err != nil {
		return fmt.Errorf("failed to run migrations: %w", err)
	}
	return nil
}
