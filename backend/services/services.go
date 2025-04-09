package services

import "gorm.io/gorm"

// Services holds all the services you want to inject.
type Services struct {
	Expense  *ExpenseService
	Category *CategoryService
}

// NewServices returns a Services struct with all services initialized.
func NewServices(db *gorm.DB) *Services {
	return &Services{
		Expense:  NewExpenseService(db),
		Category: NewCategoryService(db),
	}
}
