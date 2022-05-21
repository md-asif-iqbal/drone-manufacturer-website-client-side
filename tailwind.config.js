module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
    daisyui: {
      themes: [
        {
          mytheme: {
                          
                "primary": "#097c71",
                          
                "secondary": "#e5676d",
                          
                "accent": "#ffc9d5",
                          
                "neutral": "#221C2C",
                          
                "base-100": "#F5F5F5",
                          
                "info": "#3D97EB",
                          
                "success": "#46E789",
                          
                "warning": "#DD8603",
                          
                "error": "#F22C33",
          },
        },
      ],
    },
    plugins: [
      require('daisyui'),
    ],

  }  

