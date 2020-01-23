/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { Provider } from "mobx-react"
import { types, onSnapshot } from "mobx-state-tree"
import { ThemeProvider } from "styled-components"

const theme = {
  red: {
    default: "hsla(357, 93%, 59%, 1)",
    dark: "hsla(357, 93%, 20%, 1)",
    light: "hsla(357, 93%, 75%, 1)",
    text: "#fff",
  },
  green: {
    default: "hsla(141, 44%, 48%, 1)",
    dark: "hsla(141, 44%, 20%, 1)",
    light: "hsla(141, 44%, 68%, 1)",
    text: "#fff",
  },
  yellow: {
    default: "hsla(39, 98%, 53%, 1)",
    dark: "hsla(39, 98%, 25%, 1)",
    light: "hsla(39, 98%, 75%, 1)",
    text: "#fff",
  },
  blue: {
    default: "hsla(189, 61%, 34%, 1)",
    dark: "hsla(189, 61%, 14%, 1)",
    light: "hsla(189, 61%, 54%, 1)",
    text: "#fff",
  },
  beige: "hsla(50, 20%, 82%, 1)",
  buttons: {
    default: "rgba(255, 255, 255, 1)",
    saving: "rgba(255, 255, 255, 0.8)",
    text: "hsla(189, 61%, 14%, 1)",
  },
}

const TestModel = types
  .model("TestModel", {
    name: "",
    email: "",
    hasDogo: false,
  })
  .actions(self => {
    return {
      resetUser: () => {
        self.name = ""
        self.email = ""
        self.hasDogo = false
        self.dogo.resetDogo()
      },
      setUser(data) {
        self.name = data.name
        self.email = data.email
      },
      setHasDogo(hasDogo) {
        self.hasDogo = hasDogo
      },
    }
  })

const Store = types.model("Store", {
  testModel: TestModel,
})

const initialState = {
  testModel: {},
}

const savedInitialState = localStorage.getItem("tedsapp")
  ? JSON.parse(localStorage.getItem("tedsapp"))
  : null

console.log({
  init:
    savedInitialState && Store.is(savedInitialState)
      ? savedInitialState
      : initialState,
})

const store = Store.create(
  savedInitialState && Store.is(savedInitialState)
    ? savedInitialState
    : initialState
)

onSnapshot(store, snapshot => {
  localStorage.setItem("tedsapp", JSON.stringify(snapshot))
})

console.log({ store })

export default ({ element }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </Provider>
)
