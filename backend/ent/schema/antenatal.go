package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Antenatal holds the schema definition for the Antenatal entity.
type Antenatal struct {
	ent.Schema
}

// Fields of the Antenatal.
func (Antenatal) Fields() []ent.Field {
	return []ent.Field{
		field.Time("added_time"),
	}
}

// Edges of the Antenatal.
func (Antenatal) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("antenatals").Unique(),
		edge.From("patient", Patient.Type).Ref("antenatals").Unique(),
		edge.From("babystatus", Babystatus.Type).Ref("antenatals").Unique(),
	}
}
