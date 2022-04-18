var EtatJeu;
const User = 'O';
const IA = 'X';
const Victoryconditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const statut = document.querySelector("h2")
const Ogagne = () => `O a gagné`
const Xgagne = () => `X a gagné`
const egalite = () => "Egalité"


const cases = document.querySelectorAll('.case');
InitGame();

function InitGame() {
	statut.innerHTML = "Vous jouez contre l'IA";
	EtatJeu = [0,1,2,3,4,5,6,7,8];
	//console.log(EtatJeu)
	for (var i = 0; i < cases.length; i++) {
		cases[i].innerText = '';
		cases[i].addEventListener('click', gestionClickCase, false);
	}
}

function gestionClickCase(position) 
{
	if (typeof EtatJeu[position.target.id] == 'number')
	{
		turn(position.target.id, User)
		if (!Egalite())
		{
			 turn(C(), IA);
		}
	}
}

function Egalite() 
{
	//console.log(!Verifgagne(EtatJeu,User));
	if (vides().length == 0 && !Verifgagne(EtatJeu,User)) 
	{
		Message("E");
		return true;
	}
	
	return false;
}

function turn(positionId, joueur) 
{
	EtatJeu[positionId] = joueur;
	cases[positionId].innerText = joueur;
	let gameWon = Verifgagne(EtatJeu, joueur);
	if (gameWon)
	{ 
	gameOver(gameWon);
	}
}

function Verifgagne(board, joueur)
{
		
	let gameWon = null;
	for(let Victorycondition of Victoryconditions)
	{
		var val1 = board[Victorycondition[0]];
		var val2 = board[Victorycondition[1]];
		var val3 = board[Victorycondition[2]];
		/*console.log("val1 :"+val1);
		console.log("val2 :"+val2);
		console.log("val3 :"+val3);
		console.log("joueur :"+joueur);*/
		if(val1==joueur&&val1 === val2&&val2 === val3)
		{

				gameWon = {joueur: joueur};
			break;
		}
	}
	
	return gameWon;
}

function gameOver(gameWon) 
{
	for (var i = 0; i < cases.length; i++) 
	{
		cases[i].removeEventListener('click', gestionClickCase, false);
	}
	Message(gameWon.joueur == User ? "O" : "X");
}

function Message(gagnant) 
{
	if(gagnant==="O")
	{
		statut.innerHTML = Ogagne();
	}
	else if(gagnant==="X")
	{
		statut.innerHTML = Xgagne();
	}
	else if(gagnant==="E")
	{
		statut.innerHTML = egalite();
	}
}

function vides() 
{
	//console.log(EtatJeu.filter(s => typeof s == 'number'));
	return EtatJeu.filter(s => typeof s == 'number');//retourne un tableau avec les index des cases libres	
}

function C() 
{
	return MINMAX(EtatJeu, IA).index;
}

function MINMAX(tab, joueur) 
{
	var possibilités = vides(tab);
	if (Verifgagne(tab, User))//soit verifgagne retourne gamewon qui est 'null' ou "joueur : O"
	{
		//console.log("egalite :"+score);
		return {score: -1};
	} 
	if (Verifgagne(tab, IA)) 
	{
		//console.log("egalite :"+score);
		return {score: 1};
	} 
	if (possibilités.length === 0) 
	{
		//console.log("egalite :"+score);
		return {score: 0};
	}//Si il n'y a ni victoire, ni égalité, c'est qu'il reste des coups à jouer, c'est à dire qu'on a pas trouvé une feuille de l'arbre donc on continue notre récursivité
	var Ks = [];
	for (let i = 0; i < possibilités.length; i++) 
	{
		var K = {};
		K.index = tab[possibilités[i]];//tab est en fait EtatJeu (notre grille de jeu, mais il faut qu'elle soit modifiée localement à minmax, sinon cela effacerait le jeu)
		tab[possibilités[i]] = joueur;//tandis que possibilités est le tableau d'index vides (obtenu grace a la fonction vides(), la on test de jouer des coups pour le joueur actif)

		if (joueur == IA) //Maintenant qu'on a testé notre coup, on va réappeller MINMAX, cela remplace en quelque sorte la fonction d'évaluation, car on va aller jusqu'a ce que MINMAX soit égal a 1,-1 ou 0 c'est à dire une fin de partie
		{
			var result = MINMAX(tab, User);//On va remonter jusqu'a une feuille de cette manière, on switch de joueur a chaque appel successif, comme sur l'exemple en VBA
			K.score = result.score;//Le coup testé (d'index K) se voit attribuer le score de la feuille correspondante
		} else 
		{
			var result = MINMAX(tab, IA);
			K.score = result.score;
		}

		tab[possibilités[i]] = K.index;// on attribue a chaque possibilité son index dans le tableau de jeu, ensuite on va le concaténer avec son score, ce qui permet une bonne lecture pour les deux conditions ligne 175 et 186

		Ks.push(K);// on attribue a chacune des possibilités le score qui lui est attribué 
		//console.log(Ks);
	}

	var CoupdelIA;//Ce sera le retour final de notre fonction appelée dans turn, on a fini la récursivité
	if(joueur === IA) 
	{
		var CAMARCHEBORDEL = -Infinity;
		for(let i = 0; i < Ks.length; i++) 
		{
			if (Ks[i].score > CAMARCHEBORDEL) 
			{
				CAMARCHEBORDEL = Ks[i].score;
				CoupdelIA = i;
			}
		}
	} else 
	{
		var CAMARCHEBORDEL = Infinity;
		for(let i = 0; i < Ks.length; i++) 
		{
			if (Ks[i].score < CAMARCHEBORDEL) 
			{
				CAMARCHEBORDEL = Ks[i].score;
				CoupdelIA = i;
			}
		}
	}

	return Ks[CoupdelIA];
}