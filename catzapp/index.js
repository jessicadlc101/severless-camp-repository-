function y1k3s() { 
    let name = document.getElementById("name").value 
    
    let endpoint = "https://catass.com/cat/cute/says/" + name
    if(name != '') { 
        document.getElementById("image").src = endpoint
    
    }
}