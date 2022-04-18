const test = document.querySelector("h3")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]


const test2 = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

//Prints
const gagne = () => `${joueurActif} a gagné`
const test3 = () => "Egalité"
const tourjoueur = () => `C'est au tour de ${joueurActif}`

test.innerHTML = tourjoueur()
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#retry").addEventListener("click", playagain)

function gestionClicCase(){
	const indexCase = parseInt(this.dataset.index)
	
	if(etatJeu[indexCase] != "" || !jeuActif){
	return
	}
	etatJeu[indexCase] = joueurActif
	this.innerHTML = joueurActif
	
	verifGagne()
}//Pour récuperer l'index de la case cliquée

function verifGagne(){
	let tourGagnant = false
	for(let Victorycondition of test2){
		let val1 = etatJeu[Victorycondition[0]]
		let val2 = etatJeu[Victorycondition[1]]
		let val3 = etatJeu[Victorycondition[2]]
		if(val1 === "" || val2 === "" || val3 === ""){
			continue
		}
		if(val1 === val2 && val2 === val3){
			tourGagnant = true
			break
		}
	}
	if(tourGagnant){
		test.innerHTML = gagne()
		jeuActif = false
		return
	}
	
	if(!etatJeu.includes("")){
		test.innerHTML = test3()
		jeuActif = false
		return
	}
	
	joueurActif = joueurActif === "X" ? "O" : "X"
	test.innerHTML = tourjoueur()
}

function playagain(){
	joueurActif = "X"
	jeuActif = true
	etatJeu = ["", "", "", "", "", "", "", "", ""]
	test.innerHTML = tourjoueur()
	document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}
