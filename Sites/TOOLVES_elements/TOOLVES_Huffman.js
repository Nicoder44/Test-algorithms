function trouverlenombre(caracteres)
{
    if(caracteres == 1 || caracteres == 2)
    {
        return 1;
    }
    var nombre;
    for(let i = 0; 2**i <= caracteres ; i++)
    {
        if(2**i == caracteres)
        {
            nombre = i;
            return nombre;
        }
        else if(2**i > caracteres/2)
        {
            nombre = i + 1;
        }
    }
    //console.log(nombre);
    var poids = caracteres * nombre;
    return nombre;
}

function Reset(){document.bilan.verif.value="";document.bilan.output.value ="";document.bilan.poids.value ="";document.Question4.input.value="";document.fin.table.value="";document.Question4.output.value="";document.noeuds.output.value = "";}
    

function Occurence(chaine)
{
    Reset();
    document.Question4.input.value = chaine;
    var Tab=[];
    var longueur = chaine.length;

    for(let i = 0; i < longueur; i++)
    {
        Tab[i] = chaine[i];
    }
    //console.log(Tab);

    Tab = Array.from(new Set (Tab));
    //console.log(Tab);
   
    var longueur2 = Tab.length;
    var Tabdesnombresdefois = new Array(longueur2);

    for(let i = 0; i<longueur2;i++)
    {
        Tabdesnombresdefois[i] = 0;
        for(let j = 0; j < longueur; j++)
        {
            if(Tab[i]==chaine[j])
            {
                Tabdesnombresdefois[i] += 1;
            }
        }
    }
    
    var Occurences = new Array(longueur2);
    for(let i = 0; i<longueur2;i++)
    {
        Occurences[i] = Tab[i] + Tabdesnombresdefois[i];
        console.log(Occurences);
    }
    
    console.log(Tabdesnombresdefois);
    console.log(Tab);
    var temp;
    var temp2;
    for(let i = 0; i < longueur2; i++)
    {
        for(let j = i; j < longueur2 ; j++)
        {
            if(Tabdesnombresdefois[i] > Tabdesnombresdefois[j])
            {
                temp = Tabdesnombresdefois[i];
                temp2 = Tab[i];
                //console.log("temp2 :"+ temp2+"Tab[i] :"+Tab[i]);
                Tabdesnombresdefois[i] = Tabdesnombresdefois[j];
                Tab[i] = Tab[j];
                //console.log("Tab[i] :"+Tab[i]+" Tab[j] :"+Tab[j]);
                Tabdesnombresdefois[j] = temp;
                Tab[j] = temp2; 
                //console.log("Tab[j] :"+Tab[j]+" temp2"+temp2);  
            }
        }
        document.Question4.output.value += " [ "+Tab[i]+" : "+Tabdesnombresdefois[i]+" ] ";
    }
    
    console.log(Tabdesnombresdefois);
    console.log(Tab);

    //Je suis pas sur que ca va marcher, je vais tenter de :
    //Parcourir mon Tabdesnombresdefois jusqu'à ce qu'il n'y ait plus qu'un élément dedans (boucle do while)
    //A chaque parcours, je vais additionner les deux plus petits élements de ce tableau, et allouer un noeud (qui contiendra les deux caractères correspondants et le nombre additionné d'apparition des deux)
    //Le noeud sera donc un tableau comprenant deux caractères, ou d'autres noeuds
    //Le noeud sera ajouté a un tableau de tableaux qui sera l'arbre
    
    var x = Tabdesnombresdefois.length;
    var TOUSLESNOEUDS = [];
    do
    {
            //console.log(".length du tableau "+x);
            var NOEUD = {};
            var FEUILLE = {};
            var FEUILLE2 = {};
        for(let i = 0; i < longueur2; i++)
        {
            for(let j = i; j < longueur2 ; j++)
            {
                if(Tabdesnombresdefois[i] >= Tabdesnombresdefois[j])
                {
                    if(Tabdesnombresdefois[i] == Tabdesnombresdefois[j])
                    {
                        var test1 = Tab[j].length;
                        var test2 = Tab[i].length;
                        if((test1 < test2)&&test1==1)
                        {
                            
                            temp = Tabdesnombresdefois[i];
                            temp2 = Tab[i];
                            Tabdesnombresdefois[i] = Tabdesnombresdefois[j];
                            Tab[i] = Tab[j];
                            Tabdesnombresdefois[j] = temp;
                            Tab[j] = temp2;
                        }
                    }
                    else if(Tabdesnombresdefois[i] > Tabdesnombresdefois[j])
                    {
                        temp = Tabdesnombresdefois[i];
                        temp2 = Tab[i];
                        Tabdesnombresdefois[i] = Tabdesnombresdefois[j];
                        Tab[i] = Tab[j];
                        Tabdesnombresdefois[j] = temp;
                        Tab[j] = temp2; 
                    } 
                }
            }
        }
        
        console.log(Tabdesnombresdefois);
        console.log(Tab);
       
        if(Tab[0].length==1)
        {
            FEUILLE.valeur = Tabdesnombresdefois[0];
            FEUILLE.caracs = Tab[0];
            TOUSLESNOEUDS.splice(0,0,FEUILLE);
        }
        if(Tab[1].length==1)
        {
            FEUILLE2.valeur = Tabdesnombresdefois[1];
            FEUILLE2.caracs = Tab[1];
            TOUSLESNOEUDS.splice(0,0,FEUILLE2);
        }
        
        NOEUD.valeur = Tabdesnombresdefois[0] + Tabdesnombresdefois[1];
        Tabdesnombresdefois[0] += Tabdesnombresdefois[1];
        Tab[0] += Tab[1];
        NOEUD.caracs = Tab[0];
        Tabdesnombresdefois.splice(1 ,1);
        Tab.splice(1,1);
        console.log(Tabdesnombresdefois);
        console.log(Tab);
        console.log(NOEUD);  
        x = Tabdesnombresdefois.length;
        if(NOEUD.valeur == TOUSLESNOEUDS[0].valeur)
        {
            TOUSLESNOEUDS.splice(1,0,NOEUD);
        }
        else
        {
        TOUSLESNOEUDS.splice(0,0,NOEUD);
        }
        console.log(TOUSLESNOEUDS);
    }while(x!=1);

    //Juste pour l'affichage :
    var resultat ="";
    var comptagenoeud = 0;
    var comptagefeuille = 1;
   /*for(let i = 0;i<TOUSLESNOEUDS.length-1;i++)
    {
        if(TOUSLESNOEUDS[i].valeur>1&&TOUSLESNOEUDS[i].valeur==TOUSLESNOEUDS[i+1].valeur&&TOUSLESNOEUDS[i].caracs.length<TOUSLESNOEUDS[i+1].caracs.length)
        {
            var correction = {}
            correction = TOUSLESNOEUDS[i];
            TOUSLESNOEUDS[i] = TOUSLESNOEUDS[i+1];
            TOUSLESNOEUDS[i+1] = correction;
        }
    }*/
    for(var i in TOUSLESNOEUDS)
    {
        if(TOUSLESNOEUDS[i].caracs.length == 1)
        {
            resultat += "(Feuille "+comptagefeuille+"[valeur :"+TOUSLESNOEUDS[i].valeur+" caracteres :"+TOUSLESNOEUDS[i].caracs+"])";
            comptagefeuille++;
        }
        else
        {
            resultat += "(Noeud "+comptagenoeud+"[valeur :"+TOUSLESNOEUDS[i].valeur+" caracteres :"+TOUSLESNOEUDS[i].caracs+"])";
            comptagenoeud++;
        }
    }
    document.noeuds.output.value = resultat;
    //Voila on est content on a nos noeuds dans une fenetre youpi
    
    //Maintenant c'est assez simple car notre TOUSLESNOEUDS alterne entre un fils gauche et un fils droit
    var TABLEDESCODES = [];
    var carassociés = [];
    var caracacoder;
    var noeudetfeuilles = TOUSLESNOEUDS.length;
    
    for(let i = 0; i<longueur2; i++)
    {
        var n = 0;
        TABLEDESCODES[i] = "";
        caracacoder = TOUSLESNOEUDS[0].caracs[i];
        for(j=1;j<noeudetfeuilles;j++)
        {
            n++;
            if(TOUSLESNOEUDS[j].caracs.includes(caracacoder))
            {
                //console.log("caracoder :"+caracacoder+" noeud :"+TOUSLESNOEUDS[j].caracs);
                if(TOUSLESNOEUDS[j].caracs.length == 1)
                {
                    if(TOUSLESNOEUDS[j-1].caracs.length == 1 ||(TOUSLESNOEUDS[j+1].caracs.length!=1 && TOUSLESNOEUDS[j-1].caracs.length!=1))
                    {
                        if(TOUSLESNOEUDS[j-1].caracs.length == 1)
                        {
                        TABLEDESCODES[i] += 0;
                        }
                        else if(TOUSLESNOEUDS[j+1].caracs.length!=1 && TOUSLESNOEUDS[j-1].caracs.length!=1)
                        {
                            if(TOUSLESNOEUDS[j].caracs[0]==TOUSLESNOEUDS[j-1].caracs[0])
                            {
                                TABLEDESCODES[i] += 0;
                                console.log("bug feuille isolée évité");
                            }
                            else
                            {
                                TABLEDESCODES[i] += 1;
                                console.log("bug feuille isolée évité");
                            }
                        }
                    }
                    else
                    {
                        TABLEDESCODES[i] += 1;
                    }
                }
                else
                {
                TABLEDESCODES[i] += n%2;
                }
            }
            if(TOUSLESNOEUDS[j].caracs.length==1&&j<noeudetfeuilles-1)
            {
                if(TOUSLESNOEUDS[j+1].caracs.length!=1 && TOUSLESNOEUDS[j-1].caracs.length!=1)//J'ai eu du mal a voir ca, c'est pour les feuilles isolées au milieu de l'arbre, elles perturbaient l'alternance gauche droite
                {
                    if(TOUSLESNOEUDS[j].caracs[0]==TOUSLESNOEUDS[j-1].caracs[0])
                    {
                        if(j%2==0)
                        {
                            n++;
                            console.log("test");
                        }
                    }
                }
            }   
        }
        document.fin.table.value+=caracacoder+" : "+TABLEDESCODES[i]+"  ";
        console.log("caracacoder :"+caracacoder+"  "+TABLEDESCODES[i]);
        carassociés[i] = caracacoder;
    }
    //J'ai enfin réussi, j'ai corrigé plusieurs cas particuliers de bugs, j'espere ne pas en avoir oublié, on passe au codage
    console.log(carassociés);
    console.log(TABLEDESCODES);
    var compressé = "";
    for(let i = 0; i < longueur; i++)
    {
        for(j = 0; j<longueur2;j++)
            if(chaine[i]==carassociés[j])
            {
                compressé += TABLEDESCODES[j];
            }
    }
    document.bilan.output.value = compressé;
    var poids = longueur *8;
    var poidsoptimisé = trouverlenombre(longueur)*longueur;
    var poidshuffman = compressé.length;
    document.bilan.poids.value = "poids en ASCII :"+poids+" poids optimisé question 1 : "+poidsoptimisé+" poids huffman : "+poidshuffman;
    var cache = "";
    for(let i = 0; i < poidshuffman;i++)
    {
        cache += compressé[i];
        for(let j = 0; j < longueur2; j++)
        {
            if(cache == TABLEDESCODES[j])
            {
                document.bilan.verif.value += carassociés[j];
                cache = "";
            }
        }
    }
}


function sertarien(value)
{
    document.Question3.nom2.value = trouverlenombre(value);
}