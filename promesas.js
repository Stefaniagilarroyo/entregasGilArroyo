// estos son los estados que pasa en una promesa: Pending, Fullfilled, rejected. //

function llegar()
    {
        console.log("Llegue al resto")
    }

    const ordenar = new Promise((resolve, reject)=>{
        const ok = true;
        setTimeout(()=> {
            if(ok){
                resolve('acá esta tu comida')
            else 
            }
        })
    })


function ordenar() {
    console.log("Ordenar comida")
    setTimeout(()=> {
        console.log("preparando la comida")
    },3000)
}

function comer() {
    console.log("Comer")
}

function pagar() {
    console.log("Pagar")
}

function retirarme() {
    console.log("Chau")
}

llegar()
ordenar()
    .then((res)=>{
        console.log(res)
        comer();
        pagar();
        retirarme();
    },
    (error)=> {
        console.log("rejected", error)
    }
)
    .catch((err)=>{
        console.log(err)
    })
    .finally(()=>{
        console.groupCollapsed("esto siempre va a suceder")
    })
