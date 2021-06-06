const btnDarkLight =  document.querySelector("#light-dark-mode");
// let  x= 0;
btnDarkLight.addEventListener("click", function(){
    document.body.classList.toggle("light");
    // if(x ==0){
    //  btnDarkLight.children[0].src= "images/icon-moon.svg"   
    //  x=1;
    // }else{
    //     btnDarkLight.children[0].src= "images/icon-sun.svg" 
    //     x=0;
    // }
    
})

// añadir tareas

// variables
const inputTask = document.querySelector(".input-task");
const taskContainer = document.querySelector(".tareas-container");
const taskAdded = document.querySelector(".añadir");


// actualiza numero de tareas
const itemsLeft = document.querySelector(".n-items");
itemsLeft.textContent = printElemensLeft();

const filterTask = document.querySelectorAll(".filter")[0];
const filterTaskMobile = document.querySelectorAll(".filter")[1];
const btnClearTask = document.querySelector(".clear-completed");

// eventos
inputTask.addEventListener("keyup", addTask);
taskContainer.addEventListener("click", interactiveTask);
filterTask.addEventListener("click", filterMyTask);
filterTaskMobile.addEventListener("click", filterMyTask);
btnClearTask.addEventListener("click", clearItems);
// funciones
function addTask (e){
    if(e.keyCode ===13){

    // previene el envio del formulario
        e.preventDefault();

        if(inputTask.value != ""){
             // creaion del div tareas añadidas
        const taskAdded = document.createElement("div");
        taskAdded.classList.add("añadir", "text-white", "align-items-center", "d-flex", "p-3", "border-light", "border-bottom");
        taskContainer.appendChild(taskAdded);

            // creacion del albel
            const labelTask = document.createElement("div");
            labelTask.classList.add("d-flex", "align-items-center", "cursor-pointer", "mb-0", "w-100");
            taskAdded.appendChild(labelTask);

            // creacion checkbox

            const inputCheckbox = document.createElement("input");
            inputCheckbox.type = "checkbox";
            labelTask.appendChild(inputCheckbox);

            // creacion del parrafo task

            const parrafoTask = document.createElement("p");
            parrafoTask.classList.add("mb-0", "ml-3" );
            parrafoTask.textContent = inputTask.value;
            labelTask.appendChild(parrafoTask);
            inputTask.value = "";

            // boton equi(x), cerrar
            const boxEquis = document.createElement("div");
            boxEquis.classList.add("cross", "cursor-póinter");
            taskAdded.appendChild(boxEquis);

            itemsLeft.textContent = printElemensLeft();

        }
       
    }

    
}

function interactiveTask (e){
    // elimina el card al dar click en equis
        if(e.target.classList.contains("cross")){
            e.target.parentElement.remove();
            itemsLeft.textContent = printElemensLeft();
        }else{
                // añade clase completado a la tarea

            if(e.target.checked == true){
                e.target.parentElement.parentElement.classList.add("completed");
                itemsLeft.textContent = printElemensLeft();
            }else{
                e.target.parentElement.parentElement.classList.remove("completed");
                itemsLeft.textContent = printElemensLeft();
            }
        }

        

}

// funcion que muestra items left
function printElemensLeft(){
    const tasks = Array.from(taskContainer.children);

    let toDoCompleted = tasks.filter(function(taskCard){
        if(!taskCard.classList.contains("completed")){
            return taskCard
        }
    });

    return toDoCompleted.length;
}

function filterMyTask(e){
    const task = Array.from(taskContainer.children);

    // creando el iterador a ciclo
    task.forEach(function(taskCard){
        if(e.target.id == "all"){
                taskCard.classList.add("d-flex");

                // estilo del focus
                e.target.classList.add("click");
                e.target.nextElementSibling.classList.remove("click");
                 e.target.nextElementSibling.nextElementSibling.classList.remove("click");

            } else if(e.target.id == "active"){

                if(taskCard.classList.contains("completed")){
                  taskCard.classList.add("d-none");
                  taskCard.classList.remove("d-flex");  
                }else{
                    taskCard.classList.add("d-flex");
                  taskCard.classList.remove("d-none");
                }

                // estilo del focus
                e.target.classList.add("click");
                e.target.previousElementSibling.classList.remove("click");
                 e.target.nextElementSibling.classList.remove("click");
                
                
            }else if(e.target.id == "completed"){
                if(taskCard.classList.contains("completed")){
                    taskCard.classList.add("d-flex");
                    taskCard.classList.remove("d-none");  
                  }else{
                      taskCard.classList.add("d-none");
                    taskCard.classList.remove("d-flex");
                  }

                  // estilo del focus
                e.target.classList.add("click");
                e.target.previousElementSibling.classList.remove("click");
                 e.target.previousElementSibling.previousElementSibling.classList.remove("click");
            }
    });

     
        
    
       

 }
function clearItems(e){
    const tasks = Array.from(taskContainer.children);

    let arrayCompleted = tasks.filter(function(taskCard){
        if(taskCard.classList.contains("completed")){
            return taskCard
        }
    });

    arrayCompleted.forEach(function(element,i){
        arrayCompleted[i].remove();
    });
}