// Reference to buttons on pricing page
const monthBtn = document.getElementById('month'); 
const yearBtn = document.getElementById('year'); 
const lifetimeBtn = document.getElementById('lifetime'); 

// Reference to price tag on premium card 
const price = document.getElementById('per-time');

// selects a time period when button is pressed
const select_period = function () {
    const period = this.id; // get the name button that pressed 

    if ( period == 'month') {
        // change value of text
        price.innerHTML = '<span style="color: var(--black);" id="price">&euro;3.99</span>/month';
        // apply suitable classes 
        monthBtn.className = 'selected';
        yearBtn.className = '';
        lifetimeBtn.className = '';

    }
    else if ( period == 'year' ) {
        // change value of text
        price.innerHTML = '<span style="color: var(--black);" id="price">&euro;39.99</span>/year';
        // apply suitable classes 
        monthBtn.className = '';
        yearBtn.className = 'selected';
        lifetimeBtn.className = '';
    }
    else if ( period == 'lifetime' ) {
        // change value of text
        price.innerHTML = '<span style="color: var(--black);" id="price">&euro;79.99</span> once-off';
        // apply suitable classes 
        monthBtn.className = '';
        yearBtn.className = '';
        lifetimeBtn.className = 'selected';
    }
}

// click event listeners for buttons
monthBtn.addEventListener("click", select_period);
yearBtn.addEventListener("click", select_period);
lifetimeBtn.addEventListener("click", select_period);

