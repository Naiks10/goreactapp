import React from "react"
import MainNavigation from "./MainNavigation"
import MainPage from "../OutPages/Main/Main"
import NewsPage from "../OutPages/News/News"
import DevelopmentPage from "../OutPages/Development/Development"
import Helmet from "react-helmet"
import AboutPage from "../OutPages/About/About"
import { Route, Switch, HashRouter } from "react-router-dom"


class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <MainNavigation />
                    <Helmet bodyAttributes={
                        {style : 'background: linear-gradient(-90deg, rgba(219,219,219,1) 0%, rgba(255,255,255,1) 100%);'}
                    }/>
                    <Route path="/p/main" component={MainPage} />
                    <Route path="/p/news" component={NewsPage} />
                    <Route path="/p/about" component={AboutPage} />
                    <Route path="/p/development" component={DevelopmentPage} />
                </HashRouter>
            </div>
        )
    }
}

export default Main;