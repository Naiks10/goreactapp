import React from 'react'

import { Helmet } from 'react-helmet'

import { getRole, isMobile } from "./components/Functions/Funcs"
import MainPage from './components/MainPage/MainPage'
import BackMenu from './components/BackMenu/BackMenu'
import { ProjectCreateWindow, ProjectCreateWindowManager } from './components/BodyElements/Projects/ProjetcsCreate'
import { Auth } from './components/Auth/Auth'
import { StartPageMenu } from './components/StartPageMenu/StartPageMenu'
import { ClientsPage } from './components/Clients/ClientsPage'
import { MainMenuButton, BackMenuButton } from './components/BackMenu/BackMenuButton'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { ProjectViewPage } from './components/InPages/ProjectViewPage/ProjectViewPage'
import history from './components/Functions/history'
import { WorkersPage } from './components/Workers/WorkersPage'
import { ClientViewPage } from './components/Clients/ClientPage'

//#--consts-with-pages--#//


const Main_Page = () => (
  <MainPage />
)

const ProjetcNewPage = () => (
  <ProjectCreateWindow />
)


const ProjetcNewPageManager = () => (
  <ProjectCreateWindowManager />
)
const LoginView = () => (
  <Auth />
)

//#--return-all-components--#//


function MainView() {

  var role = getRole()

  var ves = 90

  if (localStorage.getItem("type") === "bottom") {
    ves = 0
  } else {
    ves = 90
  }

  return (
    <div className="animated fadeIn">
      <Router history={history}>
        {(() => {
          switch (role) {
            case '1': //admin
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/clients" text="Клиенты" src="assets/img/users.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                  <BackMenuButton path="/workspace/settings" text="Отладка" src="assets/img/debug_ico.png" />
                </BackMenu>
              )
            case '2': //manager
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/clients" text="Клиенты" src="assets/img/users.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
            case '3': //developer-head
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            case '4': //developer
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            case '5': //tester
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            case '6': //Клиент
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            case '4':
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            default:
              return (<Redirect to="/login" />)
          }
        })()}
        <div style={{ marginLeft: ves }}>
          {(() => {
            switch (role) {
              case '1': //admin
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPage} />
                    <Route exact path="/workspace/clients" component={ClientsPage} />
                    <Route path="/workspace/workers" component={WorkersPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                    <Route path="/workspace/clients/:id" component={ClientViewPage} />
                  </Switch>
                )
                break;
              case '2': //manager
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPageManager} />
                    <Route path="/workspace/clients" component={ClientsPage} />
                    <Route path="/workspace/workers" component={WorkersPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                    <Route path="/workspace/clients/:id" component={ClientViewPage} />
                  </Switch>
                )
                break;
              case '3': //dev-head
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPage} />
                    <Route path="/workspace/clients" component={ClientsPage} />
                    <Route path="/workspace/workers" component={WorkersPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                  </Switch>
                )
              case '4': //dev
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPage} />
                    <Route path="/workspace/clients" component={ClientsPage} />
                    <Route path="/workspace/workers" component={WorkersPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                  </Switch>
                )
              case '5': //dev-test
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPage} />
                    <Route path="/workspace/clients" component={ClientsPage} />
                    <Route path="/workspace/workers" component={WorkersPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                  </Switch>
                )
              case '6': //client
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPage} />
                    <Route path="/workspace/clients" component={ClientsPage} />
                    <Route path="/workspace/workers" component={WorkersPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                  </Switch>
                )
                break;
            }
          })()}
        </div>
      </Router>
    </div>
  )
}



const Main_View = () => (
  <MainView />
)


//#--return-app--#//

function App() {
  return (
    <Switch>
      <Route path="/" exact component={() => { return <Redirect to="/home/start" /> }} />
      <Route path="/home" component={Main_Page} />
      <Route path="/login" component={LoginView} />
      <Route path="/workspace" component={() => {
        var role = getRole()
        if (role === 0) {
          return <Redirect to="/login" />
        } else {
          return (
            <div>
              <Helmet title="Plan Active" bodyAttributes={{ style: 'background-color : #fcfcfc' }} />
              <Main_View />
            </div>
          )
        }
      }} />
    </Switch>
  )
}



export default App
