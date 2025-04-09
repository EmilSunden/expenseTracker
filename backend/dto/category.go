package dto

type CategoryInput struct {
	// Either a category ID or a category name must be provided.
	CategoryID   *uint   `json:"category_id,omitempty"`
	CategoryName *string `json:"category_name,omitempty"`
}
