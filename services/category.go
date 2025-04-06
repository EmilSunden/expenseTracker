package services

import (
	"gorm.io/gorm"
)

// Optionally, you could define another service for categories.
type CategoryService struct {
	DB *gorm.DB
}

func NewCategoryService(db *gorm.DB) *CategoryService {
	return &CategoryService{DB: db}
}
