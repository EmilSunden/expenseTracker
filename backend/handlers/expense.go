package handlers

import (
	"expenses/dto"
	"expenses/models"
	"expenses/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// AddExpense adds a new expense
func AddExpense(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input dto.ExpenseInput
		// parse the request body into the expense struct
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		expense := models.Expense{
			Title:       input.Title,
			Description: input.Description,
			Amount:      input.Amount,
		}
		// create the expense in the database
		if err := db.Create(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to create expense"})
			return
		}
		// return the created expense
		c.JSON(201, gin.H{"expense": expense})
	}
}

func AddOrUpdateCategoryToExpense(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		// Get the expense ID from URL, e.g ./expense/:id/category
		expenseIDParam := c.Param("id")
		expenseID, err := strconv.ParseUint(expenseIDParam, 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid expense ID"})
			return
		}
		var input dto.CategoryInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}

		if input.CategoryID == nil && input.CategoryName == nil {
			c.JSON(400, gin.H{"error": "Category ID or name is required"})
			return
		}

		// Find the expense
		var expense models.Expense
		if err := db.First(&expense, expenseID).Error; err != nil {
			c.JSON(404, gin.H{"error": "Expense not found"})
			return
		}

		var category models.Category
		if input.CategoryID != nil {
			// Use the provided existing category by ID
			if err := db.First(&category, *input.CategoryID).Error; err != nil {
				c.JSON(404, gin.H{"error": "Category not found"})
				return
			}
		} else if input.CategoryName != nil {
			// Look for an existing category by name
			if err := db.Where("name = ?", *input.CategoryName).First(&category).Error; err != nil {
				// If not found, create a new category
				category = models.Category{Name: *input.CategoryName}
				if err := db.Create(&category).Error; err != nil {
					c.JSON(500, gin.H{"error": "Failed to create category"})
					return
				}
			}
		}

		// Update the expenses's foreign key without modifying the category record itself
		expense.CategoryID = &category.ID
		if err := db.Save(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to update expense"})
			return
		}

		// Optionally, preload the Category and return the update expense
		if err := db.Preload("Category").First(&expense, expense.ID).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to preload category"})
			return
		}
		c.JSON(200, gin.H{"expense": expense})

	}
}

// GetExpense retrieves expenses
func GetExpenses(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var expenses []models.Expense
		// Get the expenses from the database
		if err := db.Preload("Category").Find(&expenses).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to retrieve expenses"})
			return
		}
		// return the expenses
		c.JSON(200, gin.H{"expenses": expenses})
	}

}
func UpdateExpense(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input dto.ExpenseInput
		// parse the request body into the expense struct
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		expense := models.Expense{
			Title:       input.Title,
			Description: input.Description,
			Amount:      input.Amount,
		}
		// create the expense in the database
		if err := db.Save(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to update expense"})
			return
		}
		// return the created expense
		c.JSON(200, gin.H{"expense": expense})
	}
}

func DeleteExpense(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the expense ID from URL, e.g ./expense/:id
		expenseIDParam := c.Param("id")
		expenseID, err := strconv.ParseUint(expenseIDParam, 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid expense ID"})
			return
		}
		// Find the expense
		var expense models.Expense
		if err := db.First(&expense, expenseID).Error; err != nil {
			c.JSON(404, gin.H{"error": "Expense not found"})
			return
		}
		// Delete the expense
		if err := db.Delete(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to delete expense"})
			return
		}
		// Return a success message
		c.JSON(200, gin.H{"message": "Expense deleted successfully"})
	}
}

func TotalExpenses(expenseService *services.ExpenseService) gin.HandlerFunc {
	return func(c *gin.Context) {
		total, err := expenseService.GetTotalExpenses()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate total expenses"})
			return
		}
		// Return the total expenses
		c.JSON(http.StatusOK, gin.H{"total_expenses": total})
	}
}
