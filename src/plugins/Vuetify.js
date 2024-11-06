import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

      // Определение темы
      const myTheme = {
        dark: true, // Определяет светлую или темную тему
      }

      export default createVuetify({
        components,
        directives,
        theme: {
          defaultTheme: 'myTheme',
          themes: {
            myTheme, // Добавляет тему к Vuetify
          },
        },
      })