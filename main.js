/*
    1. Send an AJAX request to remote ok api
    2. Test that request to make sure it worked
    3. Use the data to create HTML  
*/

const container = document.getElementById('container');

const url = "https://remoteok.com/api?tag=css";
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(xhttp.responseText)
        data.slice(1).forEach(function(row, i) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row')
            rowDiv.innerHTML = `
                <div class="left-section">
                    <h5 class="company">${row.company}</h5>
                    <h3 class="position">${row.position}</h3>
                    <p class="location">${row.location}</p>
                </div>

                <div class="middle-section">
                    ${row.tags.map(tag => {
                        return `<div class="tag">${tag}</div>`
                    }).join('')}
                </div>

                <div class="middle-right-section">
                    ${new Date(row.date).toLocaleString()}
                </div>

                <div class="right-section">
                    <a href=${row.url} target="_blank">
                        <button class="apply">Apply</button>
                    </a>
                </div>
            `;
            container.appendChild(rowDiv)
        })
    }
};
xhttp.open("GET", url, true);
xhttp.send();