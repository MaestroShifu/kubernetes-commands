# Kubernetes

## Comandos Minikube

* **Iniciar mi cluster:** `minikube start --vm-driver=<driver_name>` 

* **Pausar sin afectar las aplicaciones implementadas:** `minikube pause` 

* **Reiniciar una instancia pausada:** `minikube unpause` 

* **Detiene un cluster:** `minikube stop` 

* **Aumenta el limite de memoria:** `minikube config set memory <value_memory>` 

* **Explorar el catalogo de servicios de kubernetes:** `minikube addons list` 

* **Elimina todos los clusteres:** `minikube delete --all` 

* **Revisar el estado del cluster:** `minikube status`

* **Para exponer un servicio:** `minikube service <name_service> -n <name_namespace>`

## Comandos Kubectl

### Manage pods

* **QoS Classes:**
    - Guaranteed: Significa que el pod recibe una calidad de servicio garantizada.
    - Burstable: Almenos uno de los pods cumple con las caracteristicas de calidad de servicio.
    - BestEffort: No poseen ningun limite y son los mas peligrosos. 

* **Listar los pods:** `kubectl get pods`

* **Describir con el manifiesto del pod (Como se creo):** `kubectl get pod <name_pod> -o yaml`

* **Filtrar los pods con labels:** `kubectl get pods -l <name_label>=<value_filter>`

* **Ver la descripcion del pod:** `kubectl describe pod <name_pod>`

* **Ver todos los recursos que tiene el api de kubernetes:** `kubectl api-resources`

* **Eliminar un pod:** `kubectl delete pod <name_pod>` o `kubectl delete pod <name_pod> <name_pod2> <name_pod3>`

* **Realizar un port-forward:** `kubectl port-forward <name_pod> 7000:<pod_port>` Puedes aceder por medio de http://localhost:7000

* **Ingresar a la consola de un pod:** `kubectl exec -ti <name_pod> -- sh` 0 `kubectl exec -ti <name_pod> -c <name_container> -- sh`

* **Ver los logs de un pod :** `kubectl logs <name_pod> -f`

* **Api version:** `kubectl api-versions`

* **Aplicar un manifiesto de kubernetes:** `kubectl apply -f <file_name>.yaml`

* **Eliminar por medio de un manifiesto de kubernetes:** `kubectl delete -f <file_name>.yaml`

### Manage replicasets

* **Listas los replica sets:** `kubectl get replicaset`

* **Describir con el manifiesto del replicaset (Como se creo):** `kubectl get replicaset <name_replicaset> -o yaml`

* **Ver desccripcion del replicaset:** `kubectl describe replicaset <name_replicaset>`

### Manage deployment

* **Listar los deployments:** `kubectl get deployment`

* **Nos cuenta como estuvo el estado del deployment (Para desplegar cosas nuevas):** `kubectl rollout status deployment <name_deployment>`

* **Mostrar historico de cambios del deployment:** `kubectl rollout history <name_deployment>`

* **Mostrar detalle de un historico en especifico:** `kubectl rollout history <name_deployment> --revision=<revision_id>`

* **Aplicar un manifiesto de kubernetes y almacenamos el ultimo comando:** `kubectl apply -f <file_name>.yaml --record`

* **Sirve para hacer un rollback :** `kubectl rollout undo deployment <name_deployment> --to-revision=<revision_id>`

### Manage service

* **Listar todos los servicios:** `kubectl get service`

* **Descripcion de un servicio:** `kubectl describe service <name_service>`

* **Lista los endpoints de los servicios:** `kubectl get endpoints`

* **Descripcion de los endpoints de un servicio especifico:** `kubectl describe endpoints <name_service>`

### Manage namespaces

* **Listar todos los namespace:** `kubectl get namespaces`

* **Listar todos los pods de un namespace:** `kubectl get pods -n <name_namespace>`

* **Crea un nuevo namespace:** `kubectl create namespace <name_namespace>`

* **Ver descripcion del namespace:** `kubectl describe namespaces <name_namespace>`

* **Manejo de DNS de los namspace:** `<service_name>.<namspace_name>.svc.cluster.local`
 
## Limit range

* **Listar los limit range:** `kubectl get limitrange -n <name_namespace>`

* **Ver descripcion de un limit range:** `kubectl describe limitrange <name_limitrange> -n <name_namespace>`

## Resource quota

* **Listar los resource quota:** `kubectl get resourcequotas -n <name_namespace>`

* **Ver descripcion de un resource quota:** `kubectl describe resourcequotas <name_resourcequotas> -n <name_namespace>`

## Utilitarios de Kubernetes

* **Revisar los contextos que posee:** `kubectl config current-context`

* **Descripcion de nuestra configuracion:** `kubectl config view`

* **Como crear un nuevo contexto:** `kubectl config set-context <name_context> --namespace=<name_namespace> --cluster=<name_cluster> --user=<user_name>`

* **Cambiar de contexto:** `kubectl config use-context <name_context>`

* **Listar los nodos que tenemos:** `kubectl get nodes`

* **Describir un nodo especifico:** `kubectl describe node <name_nodes>`

* **Consultar informacion del cluster:** `kubectl cluster-info`

* **Ver el contexto actual de usuario:** `kubectl config current-context`

* **Sirve para crear una coneccion del cluster:** `kubectl config set-cluster <cluster_name> --server=<host_cluster> --certificate-authority=<path_key_crt>`

* **Agregar credenciales:** `kubectl config set-credentials <name_user> --client-certificate=<key_user_crt> --client-key=<user_key>`

* **Establecemos un contexto de usuario:** `kubectl config set-context <name_context> --cluster=<name_cluster> --user=<name_user>`

* **Cambiamos de contexto:** `kubectl config use-context <name_context>`

* **Listar los cluster rols:** `kubectl get clusterroles`


## Probes

* Son pruebas que ejecutan en los pods para saber que esten corriendo y funcionando satisfactoriamente, se suele validar de 3 formas:
    - Por comandos, si es igual a 0 es que todo esta bien.
    - Por TCP, valida si x puerto esta funcionando.
    - Por HTTP, valida haciendo llamado a una url y todo esta ok si la respuesta es (200 - 399).
* Tipos de probes:
    * **Liveness:** Es una prueba que se ejecuta cada N intervalo de tiempo y espera una respuesta.
    * **Readiness:** Es un diagnostico que se realiza para validar que este listo y agregarlo a los endpoints del servicio.
    * **Startup:** Pausa el liveness y readiness mientras se configura el pod. 

## Secrets vs ConfigMaps
* **Secret:** Es data que no puede mostrarse ya que su informacion es sensible.
* **ConfigMaps:** Guardamos data no sensible.

## Volumenes
### Tipos de volumenes
* **EmptyDir: (App stateless)** 
    - Sirve para crear un directorio dentro del Pod.
    - Si el pod muere, la data se pierde.
    - Suele ser bueno como un mini cache.
* **hostPath: (Es util solo para desarrollo)**
    - Sirve para crear un volumen dentro del nodo.
    - Tiene una accesibilidad global en los pods.
    - Si el nodo muere, se pierde todo.
    - No se replica en los distintos nodos.
* **Cloud Vols:**
    - Es un volumen creado en la nube.

### PV(Persistent Volume) - PVC(Persitent volume claim)
* **PV:**
    - El es el encargado de crear el recurso en cloud. 
* **PVC:**
    - Es la reclamacion de un volument persistente.
* **Reclaim Policy:**
    - Retain: No se elimina el PV y se mantiene la informacion, por ende no se puede volver a reclamar.
    - Recycle: Elimina la informacion y se reutiliza el espacio por otro PVC.
    - Delete: Al borrar el PVC se elimina el volumen y su hardware fisico.




# Ejemplo de implementacion en minicube [Ejemplo de creacion de pods y interconectar](./k8s-hand-on/)

* Para desplegar primero tenemos que crear nuestra imagen docker `docker build -t <name_image> .` -> [Documentacion](https://docs.docker.com/get-started/02_our_app/)
* Creamos el manifiesto del k8s y utilizamos el nombre de la imagen que creamos.
* Si utilizas minikube, para subir imagenes -> [Documentacion](https://minikube.sigs.k8s.io/docs/handbook/pushing/)
* Creamos un nuevo pod para validar de forma manual que exista y funcione nuestra aplicacion `kubectl run test --image=nginx`
* Ingresamos al pod por medio de `kubectl exec -ti test -- sh`
* Ya dentro reaizamos un curl apuntando a la IP del servicio creado. ***Nota:*** Ten encuenta que la informacion la consigues `kubectl get service`









