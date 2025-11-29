function saveOptions() {
	const enableCompanyName = document.getElementById( 'enableCompanyName' ).checked;
	const enableAdditionalInfo = document.getElementById( 'enableAdditionalInfo' ).checked;
	const userCountry = document.getElementById( 'userCountry' ).value;
	
	chrome.storage.local.set( {
		enableCompanyName: enableCompanyName,
		enableAdditionalInfo: enableAdditionalInfo,
		userCountry: userCountry
	} );
}

// Function to restore options from Chrome storage
function restoreOptions() {
	chrome.storage.local.get( ['enableCompanyName', 'enableAdditionalInfo', 'userCountry'], ( items ) => {
		document.getElementById( 'enableCompanyName' ).checked = items.enableCompanyName || false;
		document.getElementById( 'enableAdditionalInfo' ).checked = items.enableAdditionalInfo || false;
		document.getElementById( 'userCountry' ).value = items.userCountry || 'US'; // Default to US if not set
	} );
}

// Add event listeners
document.addEventListener( 'DOMContentLoaded', restoreOptions );
document.getElementById( 'enableCompanyName' ).addEventListener( 'change', saveOptions );
document.getElementById( 'enableAdditionalInfo' ).addEventListener( 'change', saveOptions );
document.getElementById( 'userCountry' ).addEventListener( 'change', saveOptions );

document.getElementById( 'autofill' ).addEventListener( 'click', () => {
	const button = document.getElementById( 'autofill' );
	const options = {
		enableCompanyName: document.getElementById( 'enableCompanyName' ).checked,
		enableAdditionalInfo: document.getElementById( 'enableAdditionalInfo' ).checked,
		userCountry: document.getElementById( 'userCountry' ).value
	};
	
	button.classList.add( 'loading' ); // Add loading state
	
	// Updated fetch URL with the 'format=json' query string
	fetch( `https://randomuser.me/api/?nat=${options.userCountry}&format=json` )
		.then( response => response.json() )
		.then( data => {
			const user = data.results[0];
			
			chrome.tabs.query( {active: true, currentWindow: true}, ( tabs ) => {
				chrome.scripting.executeScript( {
					target: {tabId: tabs[0].id},
					function: ( user, options ) => {
						function fillForm( user, options ) {
							const name = user.name;
							const location = user.location;
							
							// Options for company names and additional info
							const companyNameOptions = [
								"Fake Company Inc.",
								"Example Corp.",
								"Demo Ltd.",
								"Test Enterprises",
								"Sample LLC"
							];
							
							const additionalInfoOptions = [
								"Please handle with care.",
								"Gift wrap this item.",
								"Leave at the front door.",
								"Contact me before delivery.",
								"Prefer delivery in the afternoon.",
								"Urgent: Requires signature on delivery.",
								"Do not ring the doorbell.",
								"Delivery by the end of the day, please."
							];
							
							// Helper function to fill fields for both billing and shipping
							function fillAddressFields( prefix, data ) {
								// First Name
								const firstNameField = document.querySelector( `input[name="${prefix}_first_name"]` );
								if ( firstNameField ) {
									firstNameField.value = data.name.first;
								}
								
								// Last Name
								const lastNameField = document.querySelector( `input[name="${prefix}_last_name"]` );
								if ( lastNameField ) {
									lastNameField.value = data.name.last;
								}
								
								// Company (only for billing, typically)
								if ( prefix === 'billing' && options.enableCompanyName ) {
									const companyName = companyNameOptions[Math.floor( Math.random() * companyNameOptions.length )];
									const companyNameField = document.querySelector( `input[name="${prefix}_company"]` );
									if ( companyNameField ) {
										companyNameField.value = companyName;
									}
								}
								
								// Address
								const addressField = document.querySelector( `input[name="${prefix}_address_1"]` );
								if ( addressField ) {
									addressField.value = data.location.street.name;
								}
								
								// City
								const cityField = document.querySelector( `input[name="${prefix}_city"]` );
								if ( cityField ) {
									cityField.value = data.location.city;
								}
								
								// Postal Code
								const postcodeField = document.querySelector( `input[name="${prefix}_postcode"]` );
								if ( postcodeField ) {
									postcodeField.value = data.location.postcode;
								}
								
								// Phone (only for billing, typically)
								if ( prefix === 'billing' ) {
									const phoneField = document.querySelector( `input[name="${prefix}_phone"]` );
									if ( phoneField ) {
										phoneField.value = data.user.phone;
									}
									
									// Email (only for billing)
									const emailField = document.querySelector( `input[name="${prefix}_email"]` );
									if ( emailField ) {
										emailField.value = data.user.email;
									}
								}
								
								// Country
								const countryField = document.querySelector( `select[name="${prefix}_country"]` );
								if ( countryField ) {
									countryField.value = options.userCountry;
									countryField.dispatchEvent( new Event( 'change', {bubbles: true} ) );
								}
								
								// State
								const stateField = document.querySelector( `select[name="${prefix}_state"]` );
								if ( stateField && data.location.state ) {
									let stateOptions = stateField.options;
									
									// Loop through options and find the one with matching text
									for ( let i = 0; i < stateOptions.length; i ++ ) {
										if ( stateOptions[i].text === data.location.state ) {
											stateField.value = stateOptions[i].value;
											
											// Trigger the change event so that Select2 knows about the update
											stateField.dispatchEvent( new Event( 'change', {bubbles: true} ) );
											break;
										}
									}
								}
							}
							
							// Fill billing address
							fillAddressFields( 'billing', { name, location, user } );
							
							// Fill shipping address with different data
							const shippingUser = user; // You could fetch another user for shipping if needed
							fillAddressFields( 'shipping', { name, location, user: shippingUser } );
							
							// Handle additional info (order comments)
							if ( options.enableAdditionalInfo ) {
								const additionalInfo = additionalInfoOptions[Math.floor( Math.random() * additionalInfoOptions.length )];
								const additionalInfoField = document.querySelector( '#order_comments' );
								if ( additionalInfoField ) {
									additionalInfoField.value = additionalInfo;
								}
							}
							
							// Also try to fill common non-prefixed fields
							const firstNameField = document.querySelector( 'input[name="first_name"]' );
							if ( firstNameField ) {
								firstNameField.value = name.first;
							}
							
							const lastNameField = document.querySelector( 'input[name="last_name"]' );
							if ( lastNameField ) {
								lastNameField.value = name.last;
							}
							
							const emailField = document.querySelector( 'input[type="email"]' );
							if ( emailField && emailField.value === '' ) {
								emailField.value = user.email;
							}
							
							const phoneField = document.querySelector( 'input[type="tel"]' );
							if ( phoneField && phoneField.value === '' ) {
								phoneField.value = user.phone;
							}
							
							// Log the user data to the console
							console.log( "Filled user data:", user );
						}
						
						fillForm( user, options );
					},
					args: [user, options]
				}, () => {
					// Remove loading state when done
					button.classList.remove( 'loading' );
				} );
			} );
		} )
		.catch( error => {
			console.error( 'Error fetching user data:', error );
			button.classList.remove( 'loading' ); // Remove loading state in case of error
		} );
} );
