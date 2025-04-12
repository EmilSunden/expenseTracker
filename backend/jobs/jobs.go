package jobs

import (
	"expenses/models"
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
)

// ResetRecurringExpenses resets the isPaid status for recurring expenses.
func ResetRecurringExpenses(db *gorm.DB) error {
	// Example query: Reset the `is_paid` flag for all recurring expenses.
	result := db.Model(&models.Expense{}).
		Where("is_paid = ? AND billing_period = ?", true, "recurring").
		Update("is_paid", false)
	if result.Error != nil {
		return fmt.Errorf("failed to reset recurring expenses: %w", result.Error)
	}

	log.Printf("Reset %d recurring expenses at %s", result.RowsAffected, time.Now().Format(time.RFC3339))
	return nil
}
