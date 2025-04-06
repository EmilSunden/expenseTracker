package services

import (
	"expenses/models"

	"gorm.io/gorm"
)

// Define individual service structs if needed.
type ExpenseService struct {
	DB *gorm.DB
}

func NewExpenseService(db *gorm.DB) *ExpenseService {
	return &ExpenseService{DB: db}
}

func (s *ExpenseService) GetTotalExpenses() (float64, error) {
	var total float64
	if err := s.DB.Model(&models.Expense{}).Select("SUM(amount)").Scan(&total).Error; err != nil {
		return 0, err
	}
	return total, nil
}
