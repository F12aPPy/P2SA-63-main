// Code generated by entc, DO NOT EDIT.

package antenatal

const (
	// Label holds the string label denoting the antenatal type in the database.
	Label = "antenatal"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldAddedTime holds the string denoting the added_time field in the database.
	FieldAddedTime = "added_time"

	// EdgeUser holds the string denoting the user edge name in mutations.
	EdgeUser = "user"
	// EdgePatient holds the string denoting the patient edge name in mutations.
	EdgePatient = "patient"
	// EdgeBabystatus holds the string denoting the babystatus edge name in mutations.
	EdgeBabystatus = "babystatus"

	// Table holds the table name of the antenatal in the database.
	Table = "antenatals"
	// UserTable is the table the holds the user relation/edge.
	UserTable = "antenatals"
	// UserInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	UserInverseTable = "users"
	// UserColumn is the table column denoting the user relation/edge.
	UserColumn = "owner_id"
	// PatientTable is the table the holds the patient relation/edge.
	PatientTable = "antenatals"
	// PatientInverseTable is the table name for the Patient entity.
	// It exists in this package in order to avoid circular dependency with the "patient" package.
	PatientInverseTable = "patients"
	// PatientColumn is the table column denoting the patient relation/edge.
	PatientColumn = "patient_id"
	// BabystatusTable is the table the holds the babystatus relation/edge.
	BabystatusTable = "antenatals"
	// BabystatusInverseTable is the table name for the Babystatus entity.
	// It exists in this package in order to avoid circular dependency with the "babystatus" package.
	BabystatusInverseTable = "babystatuses"
	// BabystatusColumn is the table column denoting the babystatus relation/edge.
	BabystatusColumn = "babystatus_id"
)

// Columns holds all SQL columns for antenatal fields.
var Columns = []string{
	FieldID,
	FieldAddedTime,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Antenatal type.
var ForeignKeys = []string{
	"babystatus_id",
	"patient_id",
	"owner_id",
}
