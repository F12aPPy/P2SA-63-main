// Code generated by entc, DO NOT EDIT.

package user

const (
	// Label holds the string label denoting the user type in the database.
	Label = "user"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldUserName holds the string denoting the user_name field in the database.
	FieldUserName = "user_name"
	// FieldUserEmail holds the string denoting the user_email field in the database.
	FieldUserEmail = "user_email"

	// EdgeAntenatals holds the string denoting the antenatals edge name in mutations.
	EdgeAntenatals = "antenatals"

	// Table holds the table name of the user in the database.
	Table = "users"
	// AntenatalsTable is the table the holds the antenatals relation/edge.
	AntenatalsTable = "antenatals"
	// AntenatalsInverseTable is the table name for the Antenatal entity.
	// It exists in this package in order to avoid circular dependency with the "antenatal" package.
	AntenatalsInverseTable = "antenatals"
	// AntenatalsColumn is the table column denoting the antenatals relation/edge.
	AntenatalsColumn = "owner_id"
)

// Columns holds all SQL columns for user fields.
var Columns = []string{
	FieldID,
	FieldUserName,
	FieldUserEmail,
}

var (
	// UserNameValidator is a validator for the "user_name" field. It is called by the builders before save.
	UserNameValidator func(string) error
	// UserEmailValidator is a validator for the "user_email" field. It is called by the builders before save.
	UserEmailValidator func(string) error
)
