package models

import (
	"gorm.io/gorm"
)

type Expense struct {
	gorm.Model
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description,omitempty"`
	Amount      float64   `json:"amount" gorm:"not null"`
	CategoryID  *uint     `json:"category_id,omitempty"`
	Category    *Category `json:"category" gorm:"foreignKey:CategoryID"`
}
