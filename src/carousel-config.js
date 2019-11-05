export const carouselData = [
    "https://images.unsplash.com/photo-1568786696736-7c34207e506c?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
    "https://images.unsplash.com/photo-1568765615118-e1e523d4e759?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
    "https://images.unsplash.com/photo-1568785629399-0cd9324febdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
    "https://images.unsplash.com/photo-1568786685515-82fc211cea51?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    "https://images.unsplash.com/photo-1568735563668-a0992625c7d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    "https://images.unsplash.com/photo-1568707727808-ea969eb3b1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    "https://images.unsplash.com/photo-1568707950056-647f0c2fd17b?ixlib=rb-1.2.1&auto=format&fit=crop&w=923&q=80",
    "https://images.unsplash.com/photo-1568790701845-576c41693437?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=934&q=80",
  ];
  
  export const configTypes = [
    "Single Slide", "Multiple Slides", "Responsive", "Lazy Loading (enabled by default)", "Autoplay"
  ]
  
  export const demoConfigs = [
    {
      slidesToShow: 1,
      slidesToScroll: 1,
    }, 
    {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
    {
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    },
    {
      slidesToShow: 3,
      slidesToScroll: 2,
      transitionDelay: 0.45
    },
    {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true
    }
  ]