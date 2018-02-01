import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
     {id : 1, name :'Salman'},
    {id : 2, name :'Ranbir'},
    {id : 3, name :'Deepika'},
    {id : 4, name :'Priyanka'},
    {id : 5, name :'Ranveer'},
    {id : 6, name :'Shahrukh'},
    {id : 7, name :'Amithabh'},
    {id : 8, name :'Amir'},
    {id : 9, name :'Akshay'},
    {id : 10, name :'Rajnikant'},    
    ];
    return {heroes};
  }
}