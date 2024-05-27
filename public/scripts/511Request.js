var apiKey = 'fac23cdd-333b-41fc-b6d2-fc3628fbfb1d'

var i = 0

function makeRequest(moduleName, params=[], callback) {
    if (Array.isArray(params)) {
        if (params.length > 0) {
            params.forEach(function(param, i) {
                params[i] = param.join('=')
            })
            params = `&${params.join('&')}`
        }
        else {
            params = ''
        }
    }

    var url = `https://api.511.org/transit/${moduleName}?api_key=${apiKey}${params}`
    // console.log(url)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // var data = response.json()
            if (typeof data === 'string') {
                if (
                    (data.startsWith('{') && data.endsWith('}')) || 
                    (data.startsWith('[') && data.endsWith(']'))
                ) data = JSON.parse(data)
            }
            callback(data)
            firstErr = false
        })
        .catch(err => {
            console.error(err);
        });
}