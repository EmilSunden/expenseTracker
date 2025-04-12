package models

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	gorm.Model
	Title         string     `json:"title" gorm:"not null"`
	Description   string     `json:"description,omitempty"`
	Amount        float64    `json:"amount" gorm:"not null"`
	CategoryID    *uint      `json:"category_id,omitempty"`
	Category      *Category  `json:"category" gorm:"foreignKey:CategoryID"`
	IsPaid        bool       `json:"isPaid" gorm:"not null;default:false"`
	PaidAt        *time.Time `json:"paid_at"`
	BillingPeriod string     `json:"billing_period"`
	IsRecurring  bool       `json:"is_recurring" gorm:"not null;default:true"`
}
