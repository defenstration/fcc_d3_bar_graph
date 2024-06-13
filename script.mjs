const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
const width = "400px"
const height = "300px"


fetch(dataUrl).then(response => {
    if (!response.ok) {
        throw new Error("response not ok" + response.statusText)
    }
    return response.json()
    })
    .then(data => {
        
        console.log(data)
    })
    .catch(error => {
        console.error("There has been an error", error)
    })

