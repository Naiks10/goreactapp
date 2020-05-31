package main

import (
	"bufio"
	"flag"
	"fmt"
	"goreactapp/database/functions"
	"io/ioutil"
	"os"
	"strconv"

	"gopkg.in/yaml.v2"
)

var configDir string

type Conf struct {
	Model struct {
		System   string
		Driver   string
		Address  string
		Port     string
		UserName string
		Password string
		DataBase string
		SSLMode  string
	}

	Controller struct {
		Port string
		Data string
	} `yaml:"controller/go"`

	View struct {
		BuildSystem string `yaml:"system"`
		Command     string `yaml:"command to build"`
		Src         string
		Index       string
		Dest        string `yaml:"destination"`
	}
}

func GetConf() Conf {
	Init()
	perm := os.Geteuid()
	fmt.Println("=============================")
	if perm == 0 {
		fmt.Println("STATUS : ROOT ACCESS")
	} else {
		fmt.Println("STATUS : BASIC USER ACCESS")
	}
	fmt.Println("=============================")
	conf := Conf{}
	data, err := ioutil.ReadFile("./" + configDir)
	if err != nil {
		fmt.Println("ERROR : CHECK YOUR CONFIG FILE => ", err.Error())
		panic(err)
	}
	yaml.Unmarshal(data, &conf)

	functions.SetDB(conf.Model.Driver, "user="+conf.Model.UserName+" password="+conf.Model.Password+" host="+conf.Model.Address+" port="+conf.Model.Port+" database="+conf.Model.DataBase+" sslmode="+conf.Model.SSLMode)
	return conf
}

func SetConf(conf Conf) []byte {
	data, _ := yaml.Marshal(conf)
	return data
}

func Init() {

	IsNew := flag.
		Bool(
			"init",
			false,
			"it's a initial parametr to create conf file",
		)

	IsDir := flag.
		String(
			"config",
			"config.yml",
			"it's a config path setting argument",
		)

	flag.Parse()

	configDir = *IsDir

	if *IsNew {
		News()
	}
}

func InputData(text string, variable *string) {
	fmt.Println(text)
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Print("> ")
	scanner.Scan()
	if scanner.Text() == "" {
		fmt.Println("Error : field is empty")
		InputData(text, variable)
	} else {
		*variable = scanner.Text()
	}
}

func InputPort(text string, variable *string) {
	fmt.Println(text)
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Print("> ")
	scanner.Scan()
	if scanner.Text() == "" {
		fmt.Println("Error : field is empty")
		InputPort(text, variable)
	} else {
		*variable = ":" + scanner.Text()
	}
}

func InputInteger(text string, variable *int) {
	fmt.Println(text)
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Print("> ")
	scanner.Scan()
	if scanner.Text() == "" {
		fmt.Println("Error : field is zero")
		InputInteger(text, variable)
	} else {
		*variable, _ = strconv.Atoi(scanner.Text())
	}
}

func InputBinary(text string, variable *string) {
	fmt.Println(text)
	//scanner := bufio.NewReader(os.Stdin)
	fmt.Print("> ")
	reader := bufio.NewReader(os.Stdin)
	char, _, _ := reader.ReadRune()
	switch char {
	case 'y', 'Y':
		*variable = "enable"
	case 'n', 'N':
		*variable = "disable"
	default:
		fmt.Println("error")
		InputBinary(text, variable)
	}
}

func News() {
	conf := Conf{}
	fmt.Println("-------DB settings-------")
	InputData("Select your DBMS [postgres]", &conf.Model.System)
	InputData("Write your driver [pq | pgx]", &conf.Model.Driver)
	InputData("Select your address for DBMS [localhost]", &conf.Model.Address)
	InputData("Write your port for DBMS [5432]", &conf.Model.Port)
	InputData("Write your DBMS username [postgres]", &conf.Model.UserName)
	InputData("Write your DBMS password", &conf.Model.Password)
	InputData("Choose DB", &conf.Model.DataBase)
	InputBinary("Use SSL? [Y/n]", &conf.Model.SSLMode)
	fmt.Println("-------Server settings-------")
	InputPort("Choose port for app [8085]", &conf.Controller.Port)
	InputData("Choose data dir for app [/data/]", &conf.Controller.Data)
	fmt.Println("-------Client settings-------")
	InputData("Choose build system for client [npm | flutter | yarn]", &conf.View.BuildSystem)
	InputData("Choose build command for client [run build]", &conf.View.Command)
	InputData("Choose source dir for client [src]", &conf.View.Src)
	InputData("Choose root file for client [index.html]", &conf.View.Index)
	InputData("Choose destination for builded client [build]", &conf.View.Dest)

	fmt.Println(conf)

	ioutil.WriteFile("./"+configDir, SetConf(conf), 0777)
}
