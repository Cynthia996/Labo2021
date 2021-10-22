const d= document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector("crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById(".crud-template").conten,
    $fragment= d.createDocumentFragment();


    const getAll = async ()=>{
        try{
            let res=await axios.get("http://localhost:3000/personas");
            json= await res.data;

            console.log(json);

            json.forEach(element => {
                $template.querySelector(".nombre").textContent = element.nombre;
                $template.querySelector(".apellido").textContent = element.apellido;
                $template.querySelector(".localidad").textContent = element.localidad;
                $template.querySelector(".edit").dataset.id = element.id;
                $template.querySelector(".edit").dataset.nombre = element.nombre;
                $template.querySelector(".edit").dataset.apellido = element.apellido;
                $template.querySelector(".edit").dataset.localidad = element.localidad;
                $template.querySelector(".delete").dataset.id = element.id;

                let$clone =d.importNode($template,true);
                $fragment.appendChild($clone);
            });
            $table.querySelector(".tbody").appendChild($fragment);
        
        } catch(err){
        
                let mensaje=err.statusText || "Ocurrio un error";
                $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}:${message}</b></p>`);
        }


    }
    d.addEventListener("DOMcontentLoaded", getAllpersonas);

    d.addEventListener("submit", async e=>{
        if (e.target === $form){
            e.preventDefault();
            if(!e.target.id.value){
                try {
                    let options ={
                        method:"POST",
                        headers:{
                            "Content-type":"application/json;charset =utf-8"
                        },
                        data:JSON.stringify({
                            nombre: e.target.nombre.value,
                            apellido: e.target.apellido.value,
                            localidad: e.target.localidad.value,
                        })
                    },
                        res= await axios("http://localhost:3000/personas,options"),
                        json= await res.data;

                    location.reload();
                    

                } catch(error){
                    let message =err.statusText || "Ocurrio un error"
                    $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}:${message}</b></p>`);
                }
            } else {
                try{
                    let options={
                        method:"PUT",
                        headers:{
                            "Content-type":"application/json;charset =utf-8"
                        },
                        data:JSON.stringify({
                            nombre: e.target.nombre.value,
                            apellido: e.target.apellido.value,
                            localidad: e.target.localidad.value,
                        })
                    },
                        res= await axios(`http://localhost:3000/personas/${e.target.id.value}`,options),
                        json= await res.data;

                    

                    location.reload();

                } catch (error) {
                    let mensaje=err.response.statusText || "Ocurrio un error";
                    $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}:${message}</b></p>`);
                }
            
            }
        }
    });
    d.addEventListener("click", async e=>{
        if(e.target.matches(".edit")){
            $title.textContent ="Editar Persona";
            $form.nombre.value=e.target.dataset.nombre;
            $form.apellido.value=e.target.dataset.apellido;
            $form.localidad.value=e.target.dataset.localidad;
            $form.id.value=e.target.dataset.id;

        }
        if(e.target.matches(".delete")){
            let isdelete = confirm(`Estas seguro de eliminar ${e.target.dataset.id}?`)
            if(isdelete){
                try{
                    let options ={
                        method:"DELETE",
                        headers:{
                            "Content-type":"application/json;charset =utf-8"
                        }
                    },
                    res= await axios(`http://localhost:3000/personas/${e.target.dataset.id`,options),
                    json= await res.data;

                    location.reload();

                } catch (err) {
                    let message= err.statusText || "Ocurrio un error";
                    alert(`Error ${err.status}: ${message}`);
                }
            }
        }

    });
    


