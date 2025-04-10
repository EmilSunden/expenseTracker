package handlers

import (
	"errors"
	"expenses/dto"
	"expenses/models"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

func AddCategory(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var categoryInput dto.CategoryInput
		
		if err := c.ShouldBindJSON(&categoryInput); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		 // For demonstration, assume CategoryInput.CategoryName is a *string
		if categoryInput.CategoryName == nil || *categoryInput.CategoryName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Category name is required"})
			return
		}
		category := models.Category{
			Name:  *categoryInput.CategoryName,
		}
		if err := db.Create(&category).Error; err != nil {
			fmt.Printf("Create error: %#v\n", err)
			// Try to cast to a pq.Error
			var pgErr *pq.Error
			if errors.As(err, &pgErr) && pgErr.Code == "23505" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Category already exists"})
				return
			}
			// Fallback to checking the error string if type assertion fails:
			if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Category already exists"})
				return
			}
			// For any other error, return a generic message.
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create category: %v", err)})
			return
		}

		c.JSON(http.StatusOK, category)
	}
}

// TODO: update category and delete category
// Get all categories
func GetCategories(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var categories []models.Category
		if err := db.Find(&categories).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, categories)
	}
}
