package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Babystatus holds the schema definition for the Babystatus entity.
type Babystatus struct {
	ent.Schema
}

// Fields of the Babystatus.
func (Babystatus) Fields() []ent.Field {
	return []ent.Field{
		field.String("babystatus_name").NotEmpty().Unique(),
	}
}

// Edges of the Babystatus.
func (Babystatus) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("antenatals", Antenatal.Type).StorageKey(edge.Column("babystatus_id")),
	}
}
