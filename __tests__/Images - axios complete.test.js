import { mount } from '@vue/test-utils'
import flushPromises from "flush-promises"          
import axios from 'axios'
import Images from '../src/components/Images - axios complete.vue'            

// Mock AJAX request
const mockImageList = { 
  data:
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
 
jest.mock('axios', () => ({
    get: jest.fn( () => mockImageList )              
}))
  
// Test
test('loads images on component mount and correct image deletion', async () => {               
    var wrapper = mount(Images)

    // Assert that the component call axios.get the right amount of times and with the right parameters.
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('photos')

    // Wait until the DOM updates from the AJAX module request.
    await flushPromises()                     

    // Retrieve elements to test.                                      
    var img_containers = wrapper.findAll('[data-test="img_container"]')
    
    // Assert that we recieved the correct number of data.
    expect(wrapper.vm.images.length).toBe(3);
    expect(img_containers).toHaveLength(3)
    
      // Assert that we've rendered the content from the API.
    expect(img_containers.at(0).text()).toContain('Album ID: 1')
    expect(img_containers.at(0).text()).toContain('Image ID: 1')
    const img_1 = img_containers.at(0).find('img');
    expect( img_1.attributes('alt') ).toBe('Full image');

    // Act (delete image) and assert that the corresponding modifications are carried out
    await wrapper.get('.picture').trigger('click') 
    expect(wrapper.vm.images.length).toBe(2) 
    img_containers = wrapper.findAll('[data-test="img_container"]')
    expect(img_containers).toHaveLength(2) 
})
