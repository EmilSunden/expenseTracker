package handlers

import (
	"expenses/dto"
	"expenses/models"
	"expenses/services"
	"net/http"
	"strconv"
	"time"

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
		if input.CategoryID != nil && *input.CategoryID != 0 {
			// Assign the provided CategoryID
			expense.CategoryID = input.CategoryID
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

func ToggleExpensePaidStatus(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		expenseIDParam := c.Param("id")
		expenseID, err := strconv.ParseUint(expenseIDParam, 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid expense ID"})
			return
		}

		var expense models.Expense
		if err := db.First(&expense, expenseID).Error; err != nil {
			c.JSON(404, gin.H{"error": "Expense not found"})
			return
		}
		if expense.IsPaid {
			expense.IsPaid = false
			expense.PaidAt = nil
		} else {
			expense.IsPaid = true
			now := time.Now()
			expense.PaidAt = &now
		}
		// Save the updated expense in the database

		if err := db.Save(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to update expense"})
			return
		}

		c.JSON(200, gin.H{"expense": expense})
	}
}

func ToggleRecurringExpense(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		expenseIDParam := c.Param("id")
		expenseID, err := strconv.ParseUint(expenseIDParam, 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid expense ID"})
			return
		}

		var expense models.Expense
		if err := db.First(&expense, expenseID).Error; err != nil {
			c.JSON(404, gin.H{"error": "Expense not found"})
			return
		}

		expense.IsRecurring = !expense.IsRecurring

		if err := db.Save(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to update expense"})
			return
		}

		c.JSON(200, gin.H{"expense": expense})
	}
}

func GetPaidExpenses(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var expenses []models.Expense
		// Get the expenses from the database
		if err := db.Preload("Category").Where("is_paid = ?", true).Find(&expenses).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to retrieve expenses"})
			return
		}
		// return the expenses
		c.JSON(200, gin.H{"expenses": expenses})
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

// GetExpensesByCategory retrieves expenses by category
func GetExpensesByCategoryID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		categoryIDParam := c.Param("id")
		categoryID, err := strconv.ParseUint(categoryIDParam, 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid category ID"})
			return
		}

		var expenses []models.Expense
			// Preload the Category association so that the category field is filled in each expense
			if err := db.Preload("Category").Where("category_id = ?", categoryID).Find(&expenses).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve expenses"})
				return
			}

		c.JSON(200, gin.H{"expenses": expenses})
	}
}

func UpdateExpense(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the expense ID from URL, e.g. /expense/:id
		expenseIDParam := c.Param("id")
		expenseID, err := strconv.ParseUint(expenseIDParam, 10, 64)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid expense ID"})
			return
		}

		// Retrieve the existing expense
		var expense models.Expense
		if err := db.First(&expense, expenseID).Error; err != nil {
			c.JSON(404, gin.H{"error": "Expense not found"})
			return
		}

		// Parse the request body into the input struct
		var input dto.ExpenseInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}

		// Overwrite fields with the new values
		expense.Title = input.Title
		expense.Description = input.Description
		expense.Amount = input.Amount

		if input.CategoryID != nil && *input.CategoryID != 0 {
			// Optional: Verify that the category exists:
			var category models.Category
			if err := db.First(&category, *input.CategoryID).Error; err != nil {
				c.JSON(404, gin.H{"error": "Category not found"})
				return
			}
			// Assign the provided CategoryID
			expense.CategoryID = input.CategoryID
		} else {
			// If no CategoryID is provided, set it to nil
			expense.CategoryID = nil
		}


		// Save the updated expense in the database
		if err := db.Save(&expense).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to update expense"})
			return
		}

		// Return the updated expense (optionally preload the Category if needed)
		if err := db.Preload("Category").First(&expense, expense.ID).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to preload category"})
			return
		}

		// Return the updated expense
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
