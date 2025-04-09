package dto

type ExpenseInput struct {
	Title       string  `json:"title" binding:"required"`
	Description string  `json:"description,omitempty"`
	Amount      float64 `json:"amount" binding:"required"`
	CategoryID  uint    `json:"category_id" `
}
