export const getData = fetch("https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39"
    )
      .then(res => res.json())
      .then(
        (result) => {
          return result.hits
        },
        
        (error) => {
          console.log(error)
          return []
        }
      )