function Traitement(chaine)
{
    var longueur = chaine.length;
    if(Verifchaine(chaine, longueur) == 1)
    {
        return;
    }
    
    var POSTFIXE = Transformpostfixe(chaine, longueur);
    document.arithmetique2.postfixe.value = POSTFIXE;

    document.arithmetique2.eval.value = Evaluation(POSTFIXE);
}

function Verifchaine(chaine, longueur)
{
    for(let i = 0; i < longueur; i++)
    {
        if(chaine.charCodeAt(i) < 40 || chaine.charCodeAt(i) > 57 || chaine.charCodeAt(i) == 44 || chaine.charCodeAt(i) == 46)
        {
            alert("N'entrez que des chiffres et les opérateurs suivants svp : ( ) * + - / ");
            return 1;
        }
    }
    return 0;
}

function Transformpostfixe(chaine, longueur)
{
    var postfixeEXPR = "";
    var pile = [];
    var newchaine = chaine + ")";
    pile.push("(");
    
    for(let i = 0; i < longueur+1; i++)
    {
        if(newchaine.charCodeAt(i) >= 48 && newchaine.charCodeAt(i) <= 57)
        {
            postfixeEXPR += newchaine.charAt(i);
        }
        else if(newchaine.charCodeAt(i) == 40)
        {
            pile.splice(0,0,newchaine.charAt(i));
        }
        else if(newchaine.charCodeAt(i) == 43 || newchaine.charCodeAt(i) == 42 || newchaine.charCodeAt(i) == 45 || newchaine.charCodeAt(i) == 47)
        {
            //console.log(newchaine.charCodeAt(i));
            if(newchaine.charCodeAt(i) == 47 || newchaine.charCodeAt(i) == 42)
            {   
                while(pile[0] == "/" || pile[0] == "*")
                {
                    postfixeEXPR += pile[0];
                    pile.splice(0,1);
                }
                pile.splice(0,0,newchaine.charAt(i));
            }
            else if(newchaine.charAt(i) == "+" || newchaine.charAt(i) == "-")
            {
                while(pile[0] == "/" || pile[0] == "*" || pile[0] == "+" || pile[0] == "-")
                {
                    postfixeEXPR += pile[0];
                    pile.splice(0,1);
                }
                pile.splice(0,0,newchaine.charAt(i));
            }
            
        }
        else if(newchaine.charCodeAt(i) == 41)
        {
            while(pile[0] != "(")
            {
                postfixeEXPR += pile[0];
                pile.splice(0,1);
            }
            pile.splice(0,1);
        }
    }
    console.log(postfixeEXPR);
    return postfixeEXPR;
}

function Evaluation(chaine)
{
    var pile = [];
    var longueur = chaine.length;
    for(let i = 0; i < longueur; i++)
    {
        if(chaine.charCodeAt(i) >= 48 && chaine.charCodeAt(i) <= 57)
        {
            pile.splice(0,0,chaine.charAt(i));
        }
        else if(chaine.charCodeAt(i) == 43 || chaine.charCodeAt(i) == 42 || chaine.charCodeAt(i) == 45 || chaine.charCodeAt(i) == 47)
        {
            var operation = 0;
            if(chaine.charCodeAt(i) == 43)
            {
                operation = parseFloat(pile[0]) + parseFloat(pile[1]);
                console.log("operation :"+operation);
                console.log("pile :"+pile);
            }
            else if(chaine.charCodeAt(i) == 42)
            {
                operation = pile[0] * pile[1];
                console.log("operation :"+operation);
                console.log("pile :"+pile);
            }
            else if(chaine.charCodeAt(i) == 45)
            {
                operation = pile[1] - pile[0];
                console.log("operation :"+operation);
                console.log("pile :"+pile);
            }
            else if(chaine.charCodeAt(i) == 47)
            {
                operation = pile[1] / pile[0];
                console.log("operation :"+operation);
                console.log("pile :"+pile);
            }
            pile.splice(0,1);
            pile.splice(0,1);
            pile.splice(0,0,operation);
            console.log(pile);
        }
    }
    console.log(pile);
    return pile[0];
}