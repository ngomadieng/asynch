
//TACHE:1
//fonction pour creer une fonction
const delay=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
//Creation de la fonction asynchrone 'iterateWithAsyncAwait'
async function iterateWithAsyncAwait(values){
    for(const value of values){
        console.log(value);//enregistre la valeur actuelle
        await delay(1000);//attend une seconde
    }
}
//Exemple d'une tableau de valeur
const values=[1,2,3,4,5];
iterateWithAsyncAwait(values)





//TACHE:2 ET TACHE:3

//Fonction simulant un appel api avec une promesse
const simulApiCall=()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const data={ message:"donnees obtenues avec succes",timestamp: new Date()};
            resolve(data) ;   

        },2000);
    
    });
        
};
//fonction asynchrone pour attendre la reponse de l'api
const awaitcall=async()=>{
    try{
        console.log("Attente des donnees de l'api...");
        const data=await simulApiCall();//attendez la reponse de l'api
        console.log("donnees recues:",data);//Enregistrer ou traiter les donneees

    }catch(error){
        console.error("erreur lors de l'obtention des donnees:",error);
    }
}
awaitcall();



//TACHE:3

//fonction asynchrone appelée chainedAsyncFunctions, qui exécute trois fonctions asynchrones de manière séquentielle
async function chainedAsyncFunctions() {
    async function delayAndLog(message) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(message);
    }
  
    await delayAndLog('Première fonction');
    await delayAndLog('Deuxième fonction');
    await delayAndLog('Troisième fonction');
  }
  
  chainedAsyncFunctions();






  //Tache:4
  
  //fonction pour simuler un appel api
const apiCall1=()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({data:"donnees de l'api1"})
        },2000);
    });
};

const apiCall2=()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({data:"donnees de l'api2"})
        },3000);
    });
};

async function concurrentRequete(){
    console.log("Appels api simultanes...");
    try{
        //effectuer deux appels simultanements
        const [reponse1, reponse2]=await Promise.all([apiCall1(), apiCall2()]);
        //enregistrer les resultats
        console.log("Resultats api 1:", reponse1.data);
        console.log("Resultats api 2:", reponse2.data);
    
    }catch(error){
        console.error("Erreur lors des appels:", error);
    }
};
//exemple d'utilisation 
concurrentRequete();




//TACHE:5
async function parallelCalls(urls) {  
    try {  
        // Création d'un tableau de promesses en utilisant fetch pour chaque URL  
        const fetchPromises = urls.map(url => fetch(url));  
        
        // Attente que toutes les promesses soient résolues  
        const responses = await Promise.all(fetchPromises);  
        
        // Vérification si la réponse est ok et extraction des données  
        const dataPromises = responses.map(response => {  
            if (!response.ok) {  
                throw new Error(`Erreur lors de la récupération de ${response.url}: ${response.status}`);  
            }  
            return response.json(); // Retourne une promesse qui résout les données JSON  
        });  
        
        // Attente que toutes les promesses de données soient résolues  
        const data = await Promise.all(dataPromises);  
        
        return data; // Retourne les données récupérées  
    } catch (error) {  
        console.error('Erreur lors des appels parallèles:', error);  
        throw error; // Propagation de l'erreur pour un traitement ultérieur  
    }  
}  

// Exemple d'utilisation  
const urls = [  
    'https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226',  
    'https://randomuser.me/api/',  
    'https://jsonplaceholder.typicode.com/posts/3'  
];  

parallelCalls(urls)  
    .then(data => {  
        console.log('Données récupérées:', data);  
    })  
    .catch(error => {  
        console.error('Erreur:', error);  
    });