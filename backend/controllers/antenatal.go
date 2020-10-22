package controllers

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/F12aPPy/app/ent/babystatus"
	"github.com/F12aPPy/app/ent/patient"
	"github.com/F12aPPy/app/ent/user"

	"github.com/F12aPPy/app/ent"
	"github.com/gin-gonic/gin"
)

// AntenatalController defines the struct for the antenatal controller
type AntenatalController struct {
	client *ent.Client
	router gin.IRouter
}

// Antenatal defines the struct for the antenatal
type Antenatal struct {
	PatientID    int
	BabystatusID int
	UserID       int
	Added        string
}

// CreateAntenatal handles POST requests for adding antenatal entities
// @Summary Create antenatal
// @Description Create antenatal
// @ID create-antenatal
// @Accept   json
// @Produce  json
// @Param antenatal body Antenatal true "Antenatal entity"
// @Success 200 {object} ent.Antenatal
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /antenatals [post]
func (ctl *AntenatalController) CreateAntenatal(c *gin.Context) {
	obj := Antenatal{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "antenatal binding failed",
		})
		return
	}

	p, err := ctl.client.Patient.
		Query().
		Where(patient.IDEQ(int(obj.PatientID))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "patient not found",
		})
		return
	}

	u, err := ctl.client.User.
		Query().
		Where(user.IDEQ(int(obj.UserID))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "user not found",
		})
		return
	}

	bs, err := ctl.client.Babystatus.
		Query().
		Where(babystatus.IDEQ(int(obj.BabystatusID))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "babystatus not found",
		})
		return
	}

	time, err := time.Parse(time.RFC3339, obj.Added)
	a, err := ctl.client.Antenatal.
		Create().
		SetAddedTime(time).
		SetUser(u).
		SetPatient(p).
		SetBabystatus(bs).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, a)
}

// ListAntenatal handles request to get a list of antenatal entities
// @Summary List antenatal entities
// @Description list antenatal entities
// @ID list-antenatal
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Antenatal
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /antenatals [get]
func (ctl *AntenatalController) ListAntenatal(c *gin.Context) {
	limitQuery := c.Query("limit")
	limit := 10
	if limitQuery != "" {
		limit64, err := strconv.ParseInt(limitQuery, 10, 64)
		if err == nil {
			limit = int(limit64)
		}
	}

	offsetQuery := c.Query("offset")
	offset := 0
	if offsetQuery != "" {
		offset64, err := strconv.ParseInt(offsetQuery, 10, 64)
		if err == nil {
			offset = int(offset64)
		}
	}

	antenatals, err := ctl.client.Antenatal.
		Query().
		WithUser().
		WithPatient().
		WithBabystatus().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, antenatals)
}

// DeleteAntenatal handles DELETE requests to delete a antenatal entity
// @Summary Delete a antenatal entity by ID
// @Description get antenatal by ID
// @ID delete-antenatal
// @Produce  json
// @Param id path int true "Antenatal ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /antenatals/{id} [delete]
func (ctl *AntenatalController) DeleteAntenatal(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Antenatal.
		DeleteOneID(int(id)).
		Exec(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{"result": fmt.Sprintf("ok deleted %v", id)})
}

// NewAntenatalController creates and registers handles for the antenatal controller
func NewAntenatalController(router gin.IRouter, client *ent.Client) *AntenatalController {
	ac := &AntenatalController{
		client: client,
		router: router,
	}
	ac.register()
	return ac
}

// InitAntenatalController registers routes to the main engine
func (ctl *AntenatalController) register() {
	antenatals := ctl.router.Group("/antenatals")

	antenatals.GET("", ctl.ListAntenatal)

	// CRUD
	antenatals.POST("", ctl.CreateAntenatal)
	antenatals.DELETE(":id", ctl.DeleteAntenatal)
}
