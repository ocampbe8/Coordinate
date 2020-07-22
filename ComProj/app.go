// app.go

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/denisenkom/go-mssqldb"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type App struct {
	Router *mux.Router
	DB     *sql.DB
}

func (a *App) Run(addr string) {
	http.ListenAndServe(addr, a.Router)
}

func (a *App) Initialize() error {
	var err error
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s", "localhost", "Coordinate", "Coordinate", 1433, "serviceProj")
	//connString := fmt.Sprintf("sqlserver://%s:%s@localhost?database=%s&connection+timeout=30", "Coordinate", "Coordinate", "ServiceProj")

	log.Println(connString)
	a.DB, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal(err)
	}
	a.Router = mux.NewRouter()
	a.initializeRoutes()
	return err

}

func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/", a.getHome).Methods("GET")
	a.Router.HandleFunc("/NonProfits", a.getNonProfits).Methods("GET")
	a.Router.HandleFunc("/NonProfits/{id:[0-9]+}", a.delVolunteer).Methods("DELETE")
	a.Router.HandleFunc("/NonProfits/{id:[0-9]+}", a.updVolunteer).Methods("PUT")
	a.Router.HandleFunc("/NonProfits", a.createVolunteer).Methods("POST")

	a.Router.HandleFunc("/Volunteers", a.getVolunteers).Methods("GET")
	a.Router.HandleFunc("/Volunteers/{id:[0-9]+}", a.delVolunteer).Methods("DELETE")
	a.Router.HandleFunc("/Volunteers/{id:[0-9]+}", a.updVolunteer).Methods("PUT")
	a.Router.HandleFunc("/Volunteers", a.createVolunteer).Methods("POST")

	a.Router.HandleFunc("/Events", a.getEvents).Methods("GET")
	a.Router.HandleFunc("/Events/{id:[0-9]+}", a.delEvent).Methods("DELETE")
	a.Router.HandleFunc("/Events/{id:[0-9]+}", a.updEvent).Methods("PUT")
	a.Router.HandleFunc("/Events", a.createEvent).Methods("POST")

	a.Router.HandleFunc("/Qualifications", a.getQualifications).Methods("GET")
	a.Router.HandleFunc("/Qualifications/{id:[0-9]+}", a.delQualification).Methods("DELETE")
	a.Router.HandleFunc("/Qualifications/{id:[0-9]+}", a.updQualification).Methods("PUT")
	a.Router.HandleFunc("/Qualifications", a.createQualification).Methods("POST")

	a.Router.HandleFunc("/Request", a.getRequests).Methods("GET")
	a.Router.HandleFunc("/Request/{id:[0-9]+}", a.delRequest).Methods("DELETE")
	a.Router.HandleFunc("/Request/{id:[0-9]+}", a.updRequest).Methods("PUT")
	a.Router.HandleFunc("/Request", a.createRequest).Methods("POST")

}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func (a *App) getHome(w http.ResponseWriter, r *http.Request) {
	// A default home
	var m = "You made it!"
	respondWithJSON(w, http.StatusOK, m)
}
