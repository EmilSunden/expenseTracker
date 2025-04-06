package routes

import (
	"expenses/handlers"
	"expenses/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB) *gin.Engine {
	router := gin.Default()

	// initialize services
	srv := services.NewServices(db)

	// Setup routes
	router.POST("/api/expense/add", handlers.AddExpense(db))
	router.GET("/api/expenses/get", handlers.GetExpenses(db))
	router.DELETE("/api/expense/:id/delete", handlers.DeleteExpense(db))

	router.POST("/api/expense/:id/category", handlers.AddOrUpdateCategoryToExpense(db))

	router.POST("/api/category/add", handlers.AddCategory(db))

	router.GET("/api/expenses/total", handlers.TotalExpenses(srv.Expense))

	return router
}
