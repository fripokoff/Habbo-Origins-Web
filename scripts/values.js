var html = "";

function extractValuesFromHTML(html) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const items = doc.querySelectorAll('.grid-item');
	const extractedValues = [];

	items.forEach(item => {
		const name = item.querySelector('h2').innerText;
		const colaValue = item.querySelector('.cola-value') ? item.querySelector('.cola-value').innerText : 'N/A';
		const hcValue = item.querySelector('.hc-value') ? item.querySelector('.hc-value').innerText : 'N/A';
		const images = item.querySelectorAll('img');
		const imageUrls = Array.from(images).map(img => {
			// Split l'URL de l'image par '/' et trouve l'index de 'imgs'
			const parts = img.src.split('/');
			const imgsIndex = parts.indexOf('imgs');
			// Rejoint les parties de l'URL à partir de 'imgs' jusqu'à la fin
			return parts.slice(imgsIndex).join('/');
		  });

		extractedValues.push({
			name,
			colaValue,
			hcValue,
			images: imageUrls[0]
		});
	});

	return extractedValues;
}

function getOriginValues() {
	fetch('https://originvalues.com/')
		.then(response => response.text())
		.then(html => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			const xpath1 = '/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[1]';
			const xpath2 = '/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[2]';

			function extractContentByXPath(doc, xpath) {
				if (doc instanceof Document && doc.evaluate) {
					const result = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
					return result.singleNodeValue ? result.singleNodeValue.innerHTML : 'Contenu non trouvé';
				} else {
					console.error("L'objet 'doc' n'est pas un document valide.");
					return 'Contenu non trouvé';
				}
			}
			let rares = extractContentByXPath(doc, xpath1);
			let club = extractContentByXPath(doc, xpath2);

			rares = extractValuesFromHTML(rares);
			club = extractValuesFromHTML(club);
			setTimeout(() => {
				document.getElementById('loader').style.display = 'none';
				appendItems(rares)
				appendItems(club)
			}, 1000);

		})
		.catch(error => console.error('Erreur lors de la récupération des données:', error));

}

function appendItems(items) {
	const container = document.getElementById('items');
	container.innerHTML = '';

	items.forEach(item => {
		const div = document.createElement('div');
		div.className = 'chat';
		div.innerHTML = `
	  <div class="row">
	  <div class="furni_icon main-box">
		<img class="big-furni" src="https://originvalues.com/${item.images}"/>
	  </div>
	  <div class="dialog left">
		<div class="row">
		  <div class="furni_icon">
			<img class="furni_icon" src="https://originvalues.com/imgs/furni/habbo_cola.png"/>
		  </div>
		  <div class="warning__title">${item.colaValue}</div>
		</div>
		<div class="row">
		  <div class="furni_icon">
			<img class="furni_icon" src="https://originvalues.com/imgs/hc_icon.png"/>
		  </div>
		  <div class="warning__title">${item.hcValue}</div>
		</div>
	  </div>
	  </div>`;
		container.appendChild(div);
	});
}

document.getElementById('refreshBtn').addEventListener('click', function() {
	document.getElementById('loader').style.display = 'block';
	document.getElementById('items').innerHTML = '';
	getOriginValues();
});

getOriginValues();