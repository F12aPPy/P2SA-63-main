package main

import (
	"context"
	"log"

	"github.com/F12aPPy/app/controllers"
	"github.com/F12aPPy/app/ent"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Users struct {
	User []User
}

type User struct {
	UserName  string
	UserEmail string
}

type Patients struct {
	Patient []Patient
}

type Patient struct {
	PatientName string
	PatientAge  int
}

type Babystatuss struct {
	Babystatus []Babystatus
}

type Babystatus struct {
	Babystatus string
}

// @title SUT SA Example API
// @version 1.0
// @description This is a sample server for SUT SE 2563
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

// @securitydefinitions.oauth2.application OAuth2Application
// @tokenUrl https://example.com/oauth/token
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @authorizationUrl https://example.com/oauth/authorize
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.password OAuth2Password
// @tokenUrl https://example.com/oauth/token
// @scope.read Grants read access
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
// @tokenUrl https://example.com/oauth/token
// @authorizationUrl https://example.com/oauth/authorize
// @scope.admin Grants read and write access to administrative information
func main() {
	router := gin.Default()
	router.Use(cors.Default())

	client, err := ent.Open("sqlite3", "file:ent.db?cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("fail to open sqlite3: %v", err)
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	v1 := router.Group("/api/v1")
	controllers.NewUserController(v1, client)
	controllers.NewPatientController(v1, client)
	controllers.NewBabystatusController(v1, client)
	controllers.NewAntenatalController(v1, client)

	// Set Users Data
	users := Users{
		User: []User{
			User{"นพ.แดง ดินดี", "Dang_dinde@gmail.com"},
			User{"นพ.รักษา ไม่หาย", "raksaa10@hotmail.com"},
		},
	}

	for _, u := range users.User {
		client.User.
			Create().
			SetUserEmail(u.UserEmail).
			SetUserName(u.UserName).
			Save(context.Background())
	}

	// Set Patient Data
	patients := Patients{
		Patient: []Patient{
			Patient{"นาง มาดี จริงใจ", 20},
			Patient{"นาง สมหญิง นอนน้อย", 25},
		},
	}

	for _, p := range patients.Patient {
		client.Patient.
			Create().
			SetPatientName(p.PatientName).
			SetPatientAge(p.PatientAge).
			Save(context.Background())
	}

	// Set Babystatus Data
	babystatuss := []string{"ไม่มีความผิดปกติ", "มีความผิดปกติที่ช่วงศรีษะ", "มีความผิดปกติที่ช่วงแขน", "มีความผิดปกติที่ช่วงลำตัว", "มีความผิดปกติที่ช่วงขา"}

	for _, bs := range babystatuss {
		client.Babystatus.
			Create().
			SetBabystatusName(bs).
			Save(context.Background())
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run()
}
