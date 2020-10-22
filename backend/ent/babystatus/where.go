// Code generated by entc, DO NOT EDIT.

package babystatus

import (
	"github.com/F12aPPy/app/ent/predicate"
	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// BabystatusName applies equality check predicate on the "babystatus_name" field. It's identical to BabystatusNameEQ.
func BabystatusName(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameEQ applies the EQ predicate on the "babystatus_name" field.
func BabystatusNameEQ(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameNEQ applies the NEQ predicate on the "babystatus_name" field.
func BabystatusNameNEQ(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameIn applies the In predicate on the "babystatus_name" field.
func BabystatusNameIn(vs ...string) predicate.Babystatus {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Babystatus(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldBabystatusName), v...))
	})
}

// BabystatusNameNotIn applies the NotIn predicate on the "babystatus_name" field.
func BabystatusNameNotIn(vs ...string) predicate.Babystatus {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.Babystatus(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldBabystatusName), v...))
	})
}

// BabystatusNameGT applies the GT predicate on the "babystatus_name" field.
func BabystatusNameGT(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameGTE applies the GTE predicate on the "babystatus_name" field.
func BabystatusNameGTE(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameLT applies the LT predicate on the "babystatus_name" field.
func BabystatusNameLT(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameLTE applies the LTE predicate on the "babystatus_name" field.
func BabystatusNameLTE(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameContains applies the Contains predicate on the "babystatus_name" field.
func BabystatusNameContains(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.Contains(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameHasPrefix applies the HasPrefix predicate on the "babystatus_name" field.
func BabystatusNameHasPrefix(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.HasPrefix(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameHasSuffix applies the HasSuffix predicate on the "babystatus_name" field.
func BabystatusNameHasSuffix(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.HasSuffix(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameEqualFold applies the EqualFold predicate on the "babystatus_name" field.
func BabystatusNameEqualFold(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.EqualFold(s.C(FieldBabystatusName), v))
	})
}

// BabystatusNameContainsFold applies the ContainsFold predicate on the "babystatus_name" field.
func BabystatusNameContainsFold(v string) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s.Where(sql.ContainsFold(s.C(FieldBabystatusName), v))
	})
}

// HasAntenatals applies the HasEdge predicate on the "antenatals" edge.
func HasAntenatals() predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(AntenatalsTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, AntenatalsTable, AntenatalsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasAntenatalsWith applies the HasEdge predicate on the "antenatals" edge with a given conditions (other predicates).
func HasAntenatalsWith(preds ...predicate.Antenatal) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(AntenatalsInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, AntenatalsTable, AntenatalsColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.Babystatus) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.Babystatus) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Babystatus) predicate.Babystatus {
	return predicate.Babystatus(func(s *sql.Selector) {
		p(s.Not())
	})
}