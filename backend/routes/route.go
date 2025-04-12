package routes

import (
	"expenses/config"
	"expenses/handlers"
	"expenses/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB) *gin.Engine {
	router := gin.Default()

	corsConfig := config.CorsConfig()

	router.Use(cors.New(corsConfig))

	// initialize services
	srv := services.NewServices(db)

	// Setup routes
	router.POST("/api/expenses", handlers.AddExpense(db))
	router.GET("/api/expenses", handlers.GetExpenses(db))
	router.PATCH("/api/expenses/:id", handlers.UpdateExpense(db))
	router.DELETE("/api/expenses/:id", handlers.DeleteExpense(db))
	router.GET("/api/categories/:id/expenses", handlers.GetExpensesByCategoryID(db))
	router.PATCH("/api/expenses/:id/paid-status", handlers.ToggleExpensePaidStatus(db))
	router.GET("/api/expenses/paid", handlers.GetPaidExpenses(db))
	router.PATCH("/api/expenses/:id/recurring", handlers.ToggleRecurringExpense(db))


	router.POST("/api/categories", handlers.AddCategory(db))
	router.GET("/api/categories", handlers.GetCategories(db))


	router.GET("/api/expenses/total", handlers.TotalExpenses(srv.Expense))
	return router
}
