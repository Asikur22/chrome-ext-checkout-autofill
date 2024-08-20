document.getElementById('autofill').addEventListener('click', () => {
	const button = document.getElementById('autofill');
	const options = {
		enableCompanyName: document.getElementById('enableCompanyName').checked,
		enableAdditionalInfo: document.getElementById('enableAdditionalInfo').checked,
		userCountry: document.getElementById('userCountry').value
	};
	
	button.classList.add('loading'); // Add loading state
	
	// Updated fetch URL with the 'format=json' query string
	fetch(`https://randomuser.me/api/?nat=${options.userCountry}&format=json`)
		.then(response => response.json())
		.then(data => {
			const user = data.results[0];
			
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id },
					function: (user, options) => {
						function fillForm(user, options) {
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
							
							const firstNameField = document.querySelector('input[name="billing_first_name"]');
							if (firstNameField) firstNameField.value = name.first;
							
							const lastNameField = document.querySelector('input[name="billing_last_name"]');
							if (lastNameField) lastNameField.value = name.last;
							
							const addressField = document.querySelector('input[name="billing_address_1"]');
							if (addressField) addressField.value = location.street.name;
							
							const cityField = document.querySelector('input[name="billing_city"]');
							if (cityField) cityField.value = location.city;
							
							const postcodeField = document.querySelector('input[name="billing_postcode"]');
							if (postcodeField) postcodeField.value = location.postcode;
							
							const phoneField = document.querySelector('input[name="billing_phone"]');
							if (phoneField) phoneField.value = user.phone;
							
							const emailField = document.querySelector('input[name="billing_email"]');
							if (emailField) emailField.value = user.email;
							
							if (options.enableCompanyName) {
								const companyName = companyNameOptions[Math.floor(Math.random() * companyNameOptions.length)];
								const companyNameField = document.querySelector('input[name="billing_company"]');
								if (companyNameField) companyNameField.value = companyName;
							}
							
							if (options.enableAdditionalInfo) {
								const additionalInfo = additionalInfoOptions[Math.floor(Math.random() * additionalInfoOptions.length)];
								const additionalInfoField = document.querySelector('#order_comments');
								if (additionalInfoField) additionalInfoField.value = additionalInfo;
							}
							
							const countryField = document.querySelector('select[name="billing_country"]');
							if (countryField) {
								countryField.value = options.userCountry; // Update country field
								countryField.dispatchEvent(new Event('change', { bubbles: true })); // Dispatch change event
							}
							
							const stateField = document.querySelector('select[name="billing_state"]');
							if (stateField) {
								const userState = user.location.state; // Assume user state is available
								if (userState) {
									let options = stateField.options;
									
									// Loop through options and find the one with matching text
									for (let i = 0; i < options.length; i++) {
										if (options[i].text === userState) {
											stateField.value = options[i].value;
											
											// Trigger the change event so that Select2 knows about the update
											stateField.dispatchEvent(new Event('change', { bubbles: true })); // Dispatch change event
											break;
										}
									}
								}
							}
							
							// Log the user data to the console
							console.log("Filled user data:", user);
						}
						
						fillForm(user, options);
					},
					args: [user, options]
				}, () => {
					// Remove loading state when done
					button.classList.remove('loading');
				});
			});
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
			button.classList.remove('loading'); // Remove loading state in case of error
		});
});
