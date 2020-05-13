import React from "react"
import MainNavigation from "./MainNavigation"
import MainPage from "../OutPages/Main/Main"
import NewsPage from "../OutPages/News/News"
import DevelopmentPage from "../OutPages/Development/Development"
import Helmet from "react-helmet"
import AboutPage from "../OutPages/About/About"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"


//#--main-class--#//
class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Router>
                    <MainNavigation />
                    <Helmet bodyAttributes={
                        { style: 'background: linear-gradient(-90deg, rgba(219,219,219,1) 0%, rgba(255,255,255,1) 100%);' }
                    } />
                    <Route
                        path="/home/start"
                        component={MainPage} />
                    <Route
                        path="/home/news"
                        component={NewsPage} />
                    <Route
                        path="/home/about"
                        component={AboutPage} />
                    <Route
                        path="/home/development"
                        component={DevelopmentPage} />
                </Router>
            </div>
        )
    }
}

export default Main;