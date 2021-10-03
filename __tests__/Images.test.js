import { mount } from '@vue/test-utils'
import flushPromises from "flush-promises"                          // <<---  flushPromises  (creo que ya viene incluido en Vue Test Utils y no es necesario instalarlo a parte)
import axios from 'axios'
import Images from '../src/components/Images.vue'            
    
const mockImageList = { 
  data:       // El array de datos no es necesario que se ponga en una propiedad "data", pero si se pone el array directamente, entonces en el componente recuerda no acceder a ninguna propiedad .data a la hora de asignar la respuesta de la petición al dato Vue. Es recomendado ponerlo en una propiedad "data" porque así emulamos la petición real AJAX en la cual los datos del objeto response recibido se encuentran en la propiedad .data, de esta forma también, si en el componente ponemos una URL real, los datos se renderizarán correctamente, porque el código del componente accede a la propiedad .data. 
    [
        {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
            "albumId": 1,
            "id": 3,
            "title": "officia porro iure quia iusto qui ipsa ut modi",
            "url": "https://via.placeholder.com/600/24f355",
            "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        }
    ]
}
 
// To test HTTP requests, we can use .mock() from Jest to tell Jest to mock any module, in this case the axios module and for a get request (axios.get()) call.
jest.mock('axios', () => ({
    get: jest.fn( () => mockImageList )                                               // jest.fn( () => mockPostList )               // In this case, a Jest mock function  jest.fn()  is used and it returns for the get request the  mockPostList constant defined previously instead of the real axios response.
    //get: () => Promise.resolve( mockPostList )                                     // () => Promise.resolve( mockPostList )  
    /*
    Si pongo:
    get: () => Promise.resolve( mockPostList )    en vez de...   
    get: jest.fn( () => mockPostList )
    las funciones de  expect(axios.get)  no funcionan. Dice que "received value -de expect(received)- must be a mock or spy function", 
    es decir, que con Promise.resolve(), axios.get -como parámetro de expect()- no es ni un mock ni una spy function, pero con los objetos del wrapper -como parámetros de expect()- 
    no hay problema.
    Así que si queremos consultar información de la petición AJAX (y no los datos que se reciben o que se renderizan en el DOM), es necesario usar jest.fn(). 
    */
}))
  
test('loads images on component mount', async () => {                     // <<---  flushPromises  (async word is needed only if we use flushPromises)
    var wrapper = mount(Images)

    //await wrapper.get('button').trigger('click')                          

    // Let's assert that we've called axios.get the right amount of times and with the right parameters.
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('photos')

    // Wait until the DOM updates.
    await flushPromises()                                             // <<---  flushPromises

    // Finally, we make sure we've rendered the content from the API.
    const img_containers = wrapper.findAll('[data-test="img_container"]')

    expect(wrapper.vm.images.length).toBe(3);                         // The wrapper object contains events, data, and everything related to the component. The vm on the wrapper will have the data (allow to access Vue data).
    expect(img_containers).toHaveLength(3)
    console.log(img_containers);
    

    expect(img_containers.at(0).text()).toContain('Album ID: 1')
    expect(img_containers.at(0).text()).toContain('Image ID: 1')

    const img_1 = img_containers.at(0).find('img');                     //  <--  APUNTES:  .find() es la forma de buscar en elementos hijos
    //expect(img_1.src).toContain('https://via.placeholder.com/150/92c952');
    expect( img_1.attributes('alt') ).toBe('Full image');
    


    await wrapper.get('.picture').trigger('click') 
    expect(wrapper.vm.images.length).toBe(2) 
    //expect(img_containers).toHaveLength(2) 
})
