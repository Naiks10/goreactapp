import React from 'react'

import { Helmet } from 'react-helmet'

import { getRole, isMobile } from "./components/Functions/Funcs"
import MainPage from './components/MainPage/MainPage'
import BackMenu from './components/BackMenu/BackMenu'
import { ProjectCreateWindow } from './components/BodyElements/Projects/ProjetcsCreate'
import { Auth } from './components/Auth/Auth'
import { StartPageMenu } from './components/StartPageMenu/StartPageMenu'
import { MainMenuButton, BackMenuButton } from './components/BackMenu/BackMenuButton'
import { ProjectsView, ClientsView, WorkersView, SettingsView, MessagesView, MainNavigation } from './components/BodyElements/BodyPanel'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { ProjectViewPage } from './components/InPages/ProjectViewPage'
import history from './components/Functions/history'

//#--consts-with-pages--#//

const Start_View = () => (
  <StartPageMenu />
)

const Projects_View = () => (
  <ProjectsView />
)

const Main_Page = () => (
  <MainPage />
)

const ProjetcNewPage = () => (
  <ProjectCreateWindow />
)

const Clients_View = () => (
  <ClientsView />
)

const Messages_View = () => (
  <MessagesView />
)

const Workers_View = () => (
  <WorkersView />
)

const Settings_View = () => (
  <SettingsView />
)

const LoginView = () => (
  <Auth />
)

//#--return-all-components--#//

const ProjectContext = React.createContext(false)

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
            case '1':
              return (
                <BackMenu>
                  <MainMenuButton/>
                  <BackMenuButton path="/workspace/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/workspace/client_s" text="Клиенты" src="assets/img/users.png" />
                  <BackMenuButton path="/workspace/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workspace/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/workspace/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            case '2':
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/workers" text="Сотрудники" src="assets/img/customer.png" />
                  <BackMenuButton path="/settings" text="Настройки" src="assets/img/options.png" />
                </BackMenu>
              )
              break;
            case '3':
              return (
                <BackMenu>
                  <MainMenuButton />
                  <BackMenuButton path="/projects" text="Проекты" src="assets/img/orders.png" />
                  <BackMenuButton path="/messages" text="Сообщения" src="assets/img/messages.png" />
                  <BackMenuButton path="/settings" text="Настройки" src="assets/img/options.png" />
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
              case '1': //manager
                return (
                  <Switch>
                    <Route path="/workspace/start" exact component={StartPageMenu} />
                    <Route path="/workspace/create_project" component={ProjetcNewPage} />
                    <Route exact path="/workspace/projects" component={StartPageMenu} />
                    <Route path="/workspace/projects/:id" component={ProjectViewPage} />
                    <Route path="/workspace/client_s" component={Clients_View} />
                    <Route path="/workspace/messages" component={Messages_View} />
                    <Route path="/workspace/workers" component={Workers_View} />
                    <Route path="/workspace/settings" component={Settings_View} />
                  </Switch>
                )
                break;
              case '2': //developer
                return (
                  <Switch>
                    <Route path="/projects" component={Projects_View} />
                    {/* Git Tree in Future */}
                    <Route path="/messages" component={Messages_View} />
                    <Route path="/workers" component={Workers_View} />
                    <Route path="/settings" component={Settings_View} />
                  </Switch>
                )
                break;
              case '3': //client
                return (
                  <Switch>
                    <Route path="/projects" component={Projects_View} />
                    <Route path="/messages" component={Messages_View} />
                    <Route path="/settings" component={Settings_View} />
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
