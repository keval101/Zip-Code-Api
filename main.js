//Zipcode Listner
document.querySelector('#zipform').addEventListener('submit', getLocationInfo);
//Delete Lister
document.querySelector('body').addEventListener('click', deleteLocation);

function getLocationInfo(e){
    e.preventDefault()

    //get zipcode value
    const zip = document.querySelector('.zip').value;
    
    //Make Request
    fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(response =>{
        if(response.status != 200){
            showIcon('remove');

            document.querySelector('#output').innerHTML = `
            <article class="message is-danger">
                <div class="message-body">Invalid Zipcode, Please try again.</div>
            </article>`;
            throw Error (response.statusText);
        }else{
            return response.json();
        }
    })
    .then(data => {
        //Show Location Info
        let output = document.querySelector('#output').innerHTML ='';

        data.places.forEach(place =>{
            output += `
            <article class="message is-success">
            <div class="message-header">
              <p>Location Info</p>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body location">
                <ul>
                    <li><strong>City: </strong>${place ['place name']}</li>
                    <li><strong>State: </strong>${place ['state']}</li>
                    <li><strong>Latitude: </strong>${place ['latitude']}</li>
                    <li><strong>Longitude: </strong>${place ['longitude']}</li>
                </ul>
            </div>
          </article>
            `; 
        });

        //insert into output
        document.querySelector('#output').innerHTML = output;

    })
    .catch(err => console.log(err))
}

function showIcon(icon){
    //Clear Icons
    document.querySelector('.icon-remove').style.display='none';
    document.querySelector('.icon-check').style.display='none';

    //Show Correct Icon
    document.querySelector(`.icon-${icon}`).style.display='inline-flex';
};

function deleteLocation(e){
    if(e.target.className == 'delete'){
         document.querySelector('.message').remove();
         document.querySelector('.zip').value ='';
    }
}