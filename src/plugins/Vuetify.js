import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

      // Определение темы (опционально)
      const myTheme = {
        dark: false, // Определяет светлую или темную тему
        colors: {
          primary: '#1867C0', // Определяет цвет primary 
          secondary: '#5C6BC0', // Определяет цвет secondary
          accent: '#FF4081',  // Определяет цвет accent 
        },
      }

      export default createVuetify({
        components,
        directives,
        theme: {
          defaultTheme: 'myTheme', // Использует вашу тему
          themes: {
            myTheme, // Добавляет тему к Vuetify
          },
        },
      })