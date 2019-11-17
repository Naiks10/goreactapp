import React from 'react'

import { getRole } from "./components/Functions/Funcs"

import MainPage from './components/MainPage/MainPage'
import BackMenu from './components/BackMenu/BackMenu'
import { Auth } from './components/Auth/Auth'
import { MainMenuButton, BackMenuButton } from './components/BackMenu/BackMenuButton'
import { ProjectsView, ClientsView, WorkersView, SettingsView, MessagesView, MainNavigation } from './components/BodyElements/BodyPanel'
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom'


const Projects_View = () => (
  <ProjectsView />
)

const Main_Page = () => (
  <MainPage />
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

function MainView() {

  var role = getRole()

  return (
    <div className="animated fadeIn">
      {(() => {
        switch (role) {
          case '1':
            return (
              <BackMenu>
                <MainMenuButton />
                <BackMenuButton path="/workspace/project_s" text="Проекты" src="assets/img/orders.png" />
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
      <div style={{ marginLeft: 90 }}>
        <HashRouter>
          <MainNavigation />
          {(() => {
            switch (role) {
              case '1': //manager
                return (
                  <Switch>
                    <Route path="/workspace/" exact component={Projects_View} />
                    <Route path="/workspace/project_s" component={Projects_View} />
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
        </HashRouter>
      </div>
    </div>
  )
}



const Main_View = () => (
  <MainView />
)




function App() {
  return (
    <Switch>
      <Route path="/" exact component={() => { return <Redirect to="/p/main" /> }} />
      <Route path="/p" component={Main_Page} />
      <Route path="/login" component={LoginView} />
      <Route path="/workspace" component={() => {
        var role = getRole()
        if (role === 0) {
          return <Redirect to="/login" />
        } else {
          return <Main_View />
        }
      }} />
    </Switch>
  )
}



export default App
