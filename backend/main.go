package main

import (
	"expenses/app"
	"expenses/config"
	"expenses/jobs"
	"expenses/postgres"
	"log"

	"github.com/robfig/cron/v3"
)

func main() {
	config.LoadEnv()
	db, err := postgres.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	// Create a new cron scheduler
	c := cron.New(cron.WithSeconds())

	// Schedule the job to run at 00:00:00 on the first day of every month
	// Cron Spec: "0 0 0 1 * *" means: second 0, minute 0, hour 0, day of month 1, every month, every day of week
	_, err = c.AddFunc("0 0 0 1 * *", func() {
		if err := jobs.ResetRecurringExpenses(db); err != nil {
			log.Printf("Error in recurring job: %v", err)
		} else {
			log.Println("Recurring expense reset completed successfully.")
		}
	})
	if err != nil {
		log.Fatalf("Failed to schedule recurring job: %v", err)
	}
	// Start the cron scheduler in its own goroutine
	c.Start()
	defer c.Stop()
	app.Run(db)
}
