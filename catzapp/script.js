function y1k3s() { 
    let name = document.getElementById("name").value 
    
    let endpoint = "https://cataas.com/cat/says/cat" + name
    if(name != '') { 
        document.getElementById("image").src = endpoint
    
    }
}