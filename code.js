// FUNCIONES
function getCountryData(name) {
// "name" es el argumento donde se mencionará el nombre del país
  /*
  Función para llamar a la API por pais
  */
	const requester = new XMLHttpRequest();
	requester.onreadystatechange = function () {
		if (this.readyState != 4) {
			return
		}
		if (this.status == 200) {
			let arrListCountries = JSON.parse(this.responseText);
			let objCountry = {};
      // objCountry engloba todos los datos del país elegido "name"
			objCountry.name = (arrListCountries[0]["name"]);
			objCountry.flag = (arrListCountries[0]["flag"]);
			objCountry.callingCodes = (arrListCountries[0]["callingCodes"][0]);
			objCountry.capital = (arrListCountries[0]["capital"]);
			objCountry.population = (arrListCountries[0]["population"]);
			objCountry.gini = (arrListCountries[0]["gini"]);
			objCountry.languages = (arrListCountries[0]["languages"][0]["nativeName"]);
			objCountry.currency = (arrListCountries[0]["currencies"][0]["name"]);
			objCountry.symbol = (arrListCountries[0]["currencies"][0]["symbol"]);
			// Esta función recibe la orden de ejecutar el objeto
			// En funciones no afecta si están el local o global (scope)
			showCountry(objCountry);
		}
	}
	requester.open("GET", "https://restcountries.eu/rest/v2/name/" + name)
	requester.send()
}

function showCountry(objCountry) {
// objCountry es el objeto donde están los datos a mostrar de cada país
  /*
  Función para crear la card de cada país
  */
	const listCountries = document.querySelectorAll('#countryCard')[0];
	listCountries.innerHTML = `
	<div class="card mx-auto" style="width: 18rem;">
	  <img src=${objCountry["flag"]} class="size-flag">
	  <div class="card-body">
	    <h5 class="card-title"> País: ${objCountry["name"]}</h5>
	    <p>Código de larga distancia: <b>${objCountry["callingCodes"]}</b></p>
	    <p>Capital: <b>${objCountry["capital"]}</b></p>
	    <p>Población: <b>${objCountry["population"]}</b> habitantes</p>
	    <p><a href="https://es.wikipedia.org/wiki/Coeficiente_de_Gini" target="_blank">Coeficiente GINI</a>: <b>${objCountry["gini"]}</b></p>
	    <p>Idioma oficial: <b>${objCountry["languages"]}</b></p>
	    <p>Moneda: <b>${objCountry["currency"]}</b></p>
	    <p>Símbolo de moneda: <b>${objCountry["symbol"]}</b></p>
	  </div>
	</div>
  `
}

function showListCountries() {
  /*
  Función para mostrar la lista de paises, es llamada vía html con onload en el body
  */
	const requester = new XMLHttpRequest();
	requester.onreadystatechange = function () {
		if (this.readyState != 4) {
			return
		}
		if (this.status == 200) {
			let arrListCountries = JSON.parse(this.responseText);
			for (var i = 0; i < arrListCountries.length; i++) {
				let completeList = arrListCountries[i]["name"];
				getcompleteList(completeList);
			}
		}
	}
	requester.open("GET", "https://restcountries.eu/rest/v2/all")
	requester.send()
}

function getcompleteList(completeList) {
  /*
  Función para crear el menú de la lista de países
  */
	document.querySelector('#menu').innerHTML += `
 <option value="${completeList}">${completeList}</option>
 `
}

// Binds - Ejecuciones
const clickCountry = document.querySelectorAll('#menu')[0];
// Vincula la acción del listado de países. Al hacer click crear la card del país elegido
clickCountry.addEventListener('click', function () {
	getCountryData(clickCountry.value);
});
