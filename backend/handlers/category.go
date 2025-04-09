package handlers

import (
	"expenses/dto"
	"expenses/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddCategory(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var categoryInput dto.CategoryInput
		if err := c.ShouldBindJSON(&categoryInput); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		category := models.Category{
			Name: *categoryInput.CategoryName,
		}
		if err := db.Create(&category).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
